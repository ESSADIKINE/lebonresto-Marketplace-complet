import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
    ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CustomersService } from '../../customers/customers.service';
import { CustomerRefreshTokenRepository } from './repositories/customer-refresh-token.repository';
import { CustomerOtpRepository } from './repositories/customer-otp.repository';
import {
    CustomerLoginDto,
    CustomerRegisterDto,
} from './dto/auth.dto';
import { RequestOtpDto, ResetPasswordDto, VerifyOtpDto } from './dto/otp-password.dto';
import { EmailService } from '../../email/email.service';

@Injectable()
export class CustomerAuthService {
    constructor(
        private readonly customersService: CustomersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly refreshTokenRepo: CustomerRefreshTokenRepository,
        private readonly otpRepo: CustomerOtpRepository,
        private readonly emailService: EmailService,
    ) { }

    // 1. Register
    async register(dto: CustomerRegisterDto) {
        const existing = await this.customersService.findOneByEmail(dto.email);
        if (existing) throw new BadRequestException('Email already in use');

        const hashedPassword = await bcrypt.hash(dto.password, 10);
        // Assuming customersService.create takes { ...dto, password_hash }
        // We map 'password' to 'password_hash' and remove raw password
        const customer = await this.customersService.create({
            email: dto.email,
            name: dto.name,
            password_hash: hashedPassword,
            phone: dto.phone,
            is_verified: false,
        });

        // Automatically send OTP
        await this.requestOtp({ email: dto.email, purpose: 'verify' });

        return {
            success: true,
            message: 'Registration successful. Please verify your email.',
            data: { id: customer.id, email: customer.email },
        };
    }

    // 2. Login
    async login(dto: CustomerLoginDto, userAgent: string, ip: string) {
        const customer = await this.customersService.findOneByEmail(dto.email);
        if (!customer || !customer.password_hash) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(dto.password, customer.password_hash);
        if (!isMatch) throw new UnauthorizedException('Invalid credentials');

        // Generate Tokens
        const tokens = await this.generateTokens(customer);

        // Store Hashed Refresh Token
        await this.storeRefreshToken(customer.id, tokens.refresh_token, userAgent, ip);

        // Update last login
        await this.customersService.update(customer.id, { last_login: new Date() });

        return {
            success: true,
            ...tokens,
            user: {
                id: customer.id,
                email: customer.email,
                name: customer.name, // Keep existing if used, or prefer split names
                first_name: customer.first_name,
                last_name: customer.last_name,
                avatar_url: customer.avatar_url,
                phone: customer.phone,
                is_verified: customer.is_verified,
            },
            needsVerification: !customer.is_verified, // Front-end flag
        };
    }

    // 3. Refresh Token
    async refresh(oldRefreshToken: string, userAgent: string, ip: string) {
        if (!oldRefreshToken) throw new UnauthorizedException('Refresh token missing');

        try {
            // 1. Verify signature
            const payload = this.jwtService.verify(oldRefreshToken, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
            }); // Throws if invalid/expired

            // 2. Find in DB by comparing hash (Expensive scan? No, we can't find by hash if we store hash and have raw. 
            // Wait, we generate the token, we give it to user. User sends it back. 
            // Option A: We decode payload to get user ID, then check tokens for that user? 
            // Option B: We store the raw hash. To find it, we need to hash the incoming token and search. 
            // Correct approach: Store hash. Hash incoming. Find by hash.)

            // Hashing the incoming token to match DB
            // Note: bcrypt hash is salted, so we can't reproduce it easily for lookup unless we store the salt or use SHA256 for the token lookup key.
            // Better approach for Refresh Tokens:
            // The "Refresh Token" we send to client is `tokenId` + `secret`.
            // But here we are using JWT. The JWT itself changes.
            // Let's rely on payload.sub (customerId) and payload.jti (unique id) if available? 
            // Simplest secure way:
            // When we store, we can store a specific ID in the metadata, OR we iterate the user's tokens. 
            // Let's do: Token = JWT. We hash the WHOLE JWT string using a fast hash (SHA256) for lookup, AND bcrypt for verification? 
            // Or just bcrypt compare? bcrypt compare requires we find the record first.

            // Let's use SHA256 for the stored "token_hash" so we can lookup by hash.
            // Or if security requirement is strict bcrypt:
            // We need to find the token record by some ID embedded in the JWT? 
            // Let's say we don't embed ID. We iterate? No.
            // Compromise: We use SHA256 for the "token_hash" column. It's unique enough for lookup and secure enough for refresh tokens if the DB is leaked (still hard to reverse).
            // actually, requirements say "Refresh token MUST be stored hashed".
            // I will use SHA256 of the token string for storage and lookup.

            const incomingTokenHash = this.hashToken(oldRefreshToken);

            const tokenRecord = await this.refreshTokenRepo.findOneByHash(incomingTokenHash);
            if (!tokenRecord) {
                // Reuse detection: if valid signature but not in DB (or revoked), safe to assume theft?
                // For now just 401.
                throw new UnauthorizedException('Invalid or revoked refresh token');
            }

            if (tokenRecord.revoked_at) {
                throw new UnauthorizedException('Token already revoked');
            }

            if (new Date(tokenRecord.expires_at) < new Date()) {
                throw new UnauthorizedException('Refresh token expired');
            }

            // 3. User valid?
            const customer = await this.customersService.findOne(payload.sub);
            if (!customer) throw new ForbiddenException('User not found');

            // 4. Rotation: Revoke old, Issue new
            await this.refreshTokenRepo.revoke(tokenRecord.id);

            const newTokens = await this.generateTokens(customer);
            await this.storeRefreshToken(customer.id, newTokens.refresh_token, userAgent, ip);

            return newTokens;

        } catch (e) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    // 4. Logout
    async logout(refreshToken: string) {
        if (refreshToken) {
            const hash = this.hashToken(refreshToken);
            const record = await this.refreshTokenRepo.findOneByHash(hash);
            if (record) await this.refreshTokenRepo.revoke(record.id);
        }
        return { success: true };
    }

    // 5. OTP (Generic for Verify or Reset)
    async requestOtp(dto: RequestOtpDto) {
        const customer = await this.customersService.findOneByEmail(dto.email);
        if (!customer) throw new BadRequestException('User not found'); // Or silent success

        // Generate 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpHash = await bcrypt.hash(otp, 10);
        const expiresAt = new Date(Date.now() + 10 * 60000); // 10 mins

        await this.otpRepo.create({
            customer_id: customer.id,
            otp_hash: otpHash,
            purpose: dto.purpose,
            expires_at: expiresAt
        });


        // Send Real Email
        try {
            await this.emailService.sendOtp(dto.email, otp, dto.purpose);
        } catch (error) {
            console.error(`[CustomerAuthService] Failed to send OTP email: ${error.message}`);
            // Do not throw, allow flow to complete so user can use console OTP
        }

        return { success: true, message: 'OTP sent (check email or console)' };
    }

    async verifyOtp(dto: VerifyOtpDto) {
        const customer = await this.customersService.findOneByEmail(dto.email);
        if (!customer) throw new BadRequestException('Invalid request');

        const otpRecord = await this.otpRepo.findLatestValid(customer.id, dto.purpose);
        if (!otpRecord) throw new BadRequestException('Invalid or expired OTP');

        // Check max attempts
        if (otpRecord.attempts >= 5) throw new BadRequestException('Too many attempts');

        // Verify Hash
        const isValid = await bcrypt.compare(dto.otp, otpRecord.otp_hash);
        if (!isValid) {
            await this.otpRepo.incrementAttempts(otpRecord.id, otpRecord.attempts);
            throw new BadRequestException('Invalid OTP');
        }

        // Success
        await this.otpRepo.markConsumed(otpRecord.id);

        if (dto.purpose === 'verify') {
            await this.customersService.update(customer.id, { is_verified: true });
        }

        return { success: true, message: 'Verified successfully' };
    }

    async resetPassword(dto: ResetPasswordDto) {
        // Verify OTP first (manually reusing logic or calling verify logic but we need to consume it specifically for reset)
        // Actually verifyOtp consumes it. So we can't call verifyOtp then reset.
        // We need to implement atomic "verify and reset" or just verify here.

        const customer = await this.customersService.findOneByEmail(dto.email);
        if (!customer) throw new BadRequestException('Invalid request');

        const otpRecord = await this.otpRepo.findLatestValid(customer.id, 'reset');
        if (!otpRecord) throw new BadRequestException('Invalid or expired OTP');
        if (otpRecord.attempts >= 5) throw new BadRequestException('Too many attempts');

        const isValid = await bcrypt.compare(dto.otp, otpRecord.otp_hash);
        if (!isValid) {
            await this.otpRepo.incrementAttempts(otpRecord.id, otpRecord.attempts);
            throw new BadRequestException('Invalid OTP');
        }

        await this.otpRepo.markConsumed(otpRecord.id);

        // Update Password
        const newHash = await bcrypt.hash(dto.newPassword, 10);
        await this.customersService.update(customer.id, { password_hash: newHash });

        // Optional: Revoke all refresh tokens
        await this.refreshTokenRepo.revokeAllForCustomer(customer.id);

        return { success: true, message: 'Password reset successfully' };
    }


    // Helpers
    private async generateTokens(customer: any) {
        const payload = { sub: customer.id, email: customer.email, role: 'customer' };

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

    private async storeRefreshToken(customerId: string, token: string, userAgent: string, ip: string) {
        // Decode to get expiry
        const decoded = this.jwtService.decode(token) as any;
        const expiresAt = new Date(decoded.exp * 1000);
        const hash = this.hashToken(token); // SHA256

        await this.refreshTokenRepo.create({
            customer_id: customerId,
            token_hash: hash,
            expires_at: expiresAt,
            user_agent: userAgent,
            ip: ip
        });
    }

    private hashToken(token: string): string {
        // Simple SHA256 for lookup purposes
        const crypto = require('crypto');
        return crypto.createHash('sha256').update(token).digest('hex');
    }
}
