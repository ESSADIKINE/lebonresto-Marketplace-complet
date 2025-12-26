import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
    ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { OwnersService } from '../../owners/owners.service';
import { OwnerRefreshTokenRepository } from './repositories/owner-refresh-token.repository';
import { OwnerOtpRepository } from './repositories/owner-otp.repository';
import { OwnerLoginDto, OwnerRegisterDto } from './dto/auth.dto';
import { RequestOtpDto, ResetPasswordDto, VerifyOtpDto } from '../customer-auth/dto/otp-password.dto'; // Reuse checks
import { EmailService } from '../../email/email.service';

@Injectable()
export class OwnerAuthService {
    constructor(
        private readonly ownersService: OwnersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly refreshTokenRepo: OwnerRefreshTokenRepository,
        private readonly otpRepo: OwnerOtpRepository,
        private readonly emailService: EmailService,
    ) { }

    async register(dto: OwnerRegisterDto) {
        const existing = await this.ownersService.findOneByEmail(dto.email);
        if (existing) throw new BadRequestException('Email already in use');

        // OwnersService.create hashes password itself? Yes, based on file view.
        // But we need to check if it sets is_verified to false.
        // Since OwnersService.create takes CreateOwnerDto, we should adapt the logic or call direct repo?
        // Calling service is cleaner. We will update verification status after creation or assume service default (which might be null/false).

        // We construct CreateOwnerDto format
        const createData = {
            ...dto,
            vat_number: '',
            avatar_url: ''
        };

        // Create Logic in OwnersService hashes password.
        const owner = await this.ownersService.create(createData);

        // Default is_verified might be null/false. Let's force it to false if not set.
        // Actually, SQL Migration `DEFAULT false` handles it if column added.

        // Automatically send OTP
        await this.requestOtp({ email: dto.email, purpose: 'verify' });

        return {
            success: true,
            message: 'Registration successful. Please verify your email.',
            data: { id: owner.id, email: owner.email },
        };
    }

    async login(dto: OwnerLoginDto, userAgent: string, ip: string) {
        const owner = await this.ownersService.findOneByEmail(dto.email);
        if (!owner || !owner.password_hash) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(dto.password, owner.password_hash);
        if (!isMatch) throw new UnauthorizedException('Invalid credentials');

        const tokens = await this.generateTokens(owner);
        await this.storeRefreshToken(owner.id, tokens.refresh_token, userAgent, ip);

        // Update last login
        // we need to perform a cast or update OwnersService type
        await this.ownersService.update(owner.id, { last_login: new Date() } as any);

        return {
            success: true,
            ...tokens,
            user: {
                id: owner.id,
                email: owner.email,
                name: owner.name,
                company_name: owner.company_name,
                is_verified: owner.is_verified,
            },
            needsVerification: !owner.is_verified,
        };
    }

    async refresh(oldRefreshToken: string, userAgent: string, ip: string) {
        if (!oldRefreshToken) throw new UnauthorizedException('Refresh token missing');

        try {
            const payload = this.jwtService.verify(oldRefreshToken, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
            });

            const incomingTokenHash = this.hashToken(oldRefreshToken);
            const tokenRecord = await this.refreshTokenRepo.findOneByHash(incomingTokenHash);

            if (!tokenRecord || tokenRecord.revoked_at || new Date(tokenRecord.expires_at) < new Date()) {
                throw new UnauthorizedException('Invalid or expired refresh token');
            }

            const owner = await this.ownersService.findOne(payload.sub);
            if (!owner) throw new ForbiddenException('User not found');

            // Rotate
            await this.refreshTokenRepo.revoke(tokenRecord.id);
            const newTokens = await this.generateTokens(owner);
            await this.storeRefreshToken(owner.id, newTokens.refresh_token, userAgent, ip);

            return newTokens;

        } catch (e) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async logout(refreshToken: string) {
        if (refreshToken) {
            const hash = this.hashToken(refreshToken);
            const record = await this.refreshTokenRepo.findOneByHash(hash);
            if (record) await this.refreshTokenRepo.revoke(record.id);
        }
        return { success: true };
    }

    async requestOtp(dto: RequestOtpDto) {
        const owner = await this.ownersService.findOneByEmail(dto.email);
        if (!owner) throw new BadRequestException('User not found');

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpHash = await bcrypt.hash(otp, 10);
        const expiresAt = new Date(Date.now() + 10 * 60000);

        await this.otpRepo.create({
            owner_id: owner.id,
            otp_hash: otpHash,
            purpose: dto.purpose,
            expires_at: expiresAt
        });

        console.log(`[DEBUG] Generated OTP for ${dto.email}: ${otp}`);
        try {
            await this.emailService.sendOtp(dto.email, otp, dto.purpose);
        } catch (error) {
            console.error(`[OwnerAuthService] Failed to send OTP email: ${error.message}`);
        }
        return { success: true, message: 'OTP sent (check email or console)' };
    }

    async verifyOtp(dto: VerifyOtpDto) {
        const owner = await this.ownersService.findOneByEmail(dto.email);
        if (!owner) throw new BadRequestException('Invalid request');

        const otpRecord = await this.otpRepo.findLatestValid(owner.id, dto.purpose);
        if (!otpRecord) throw new BadRequestException('Invalid or expired OTP');

        if (otpRecord.attempts >= 5) throw new BadRequestException('Too many attempts');

        const isValid = await bcrypt.compare(dto.otp, otpRecord.otp_hash);
        if (!isValid) {
            await this.otpRepo.incrementAttempts(otpRecord.id, otpRecord.attempts);
            throw new BadRequestException('Invalid OTP');
        }

        await this.otpRepo.markConsumed(otpRecord.id);

        if (dto.purpose === 'verify') {
            await this.ownersService.update(owner.id, { is_verified: true } as any);
        }

        return { success: true, message: 'Verified successfully' };
    }

    async resetPassword(dto: ResetPasswordDto) {
        const owner = await this.ownersService.findOneByEmail(dto.email);
        if (!owner) throw new BadRequestException('Invalid request');

        const otpRecord = await this.otpRepo.findLatestValid(owner.id, 'reset');
        if (!otpRecord) throw new BadRequestException('Invalid or expired OTP');
        if (otpRecord.attempts >= 5) throw new BadRequestException('Too many attempts');

        const isValid = await bcrypt.compare(dto.otp, otpRecord.otp_hash);
        if (!isValid) {
            await this.otpRepo.incrementAttempts(otpRecord.id, otpRecord.attempts);
            throw new BadRequestException('Invalid OTP');
        }

        await this.otpRepo.markConsumed(otpRecord.id);

        const newHash = await bcrypt.hash(dto.newPassword, 10);
        await this.ownersService.update(owner.id, { password_hash: newHash } as any);

        await this.refreshTokenRepo.revokeAllForOwner(owner.id);

        return { success: true, message: 'Password reset successfully' };
    }

    private async generateTokens(owner: any) {
        const payload = { sub: owner.id, email: owner.email, role: 'owner' };
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_ACCESS_SECRET'),
                expiresIn: this.configService.get('JWT_ACCESS_EXPIRES_IN') || '15m',
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN') || '7d',
            }),
        ]);
        return { access_token: at, refresh_token: rt };
    }

    private async storeRefreshToken(ownerId: string, token: string, userAgent: string, ip: string) {
        const decoded = this.jwtService.decode(token) as any;
        const expiresAt = new Date(decoded.exp * 1000);
        const hash = this.hashToken(token);
        await this.refreshTokenRepo.create({
            owner_id: ownerId,
            token_hash: hash,
            expires_at: expiresAt,
            user_agent: userAgent,
            ip: ip
        });
    }

    private hashToken(token: string): string {
        const crypto = require('crypto');
        return crypto.createHash('sha256').update(token).digest('hex');
    }
}
