import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Res,
    UseGuards,
    UnauthorizedException,
    Ip,
} from '@nestjs/common';
import { OwnerAuthService } from './owner-auth.service';
import { OwnerLoginDto, OwnerRegisterDto } from './dto/auth.dto';
import { RequestOtpDto, VerifyOtpDto, ResetPasswordDto } from '../customer-auth/dto/otp-password.dto';
import { OwnerJwtAuthGuard } from './guards/owner-jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';

@Controller('auth/owner')
export class OwnerAuthController {
    constructor(
        private readonly authService: OwnerAuthService,
        private readonly configService: ConfigService,
    ) { }

    @Post('register')
    async register(@Body() dto: OwnerRegisterDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    async login(
        @Body() dto: OwnerLoginDto,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request,
        @Ip() ip: string,
    ) {
        const userAgent = req.headers['user-agent'] || 'unknown';
        const result = await this.authService.login(dto, userAgent, ip);

        this.setRefreshCookie(res, result.refresh_token);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { refresh_token, ...response } = result;
        return response;
    }

    @Post('refresh')
    async refresh(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
        @Ip() ip: string,
    ) {
        const refreshToken = req.cookies['refresh_token']; // Note: if domain sharing, ensure unique cookie name? 
        // Usually owner app runs on separate subdomain or same domain. 
        // To avoid conflicts if on same localhost, we might want 'owner_refresh_token'.
        // Let's stick to 'refresh_token' but typically path could restrict it, but path is /auth/owner/refresh.
        // However, if cookie path is /, it overlaps.
        // Recommended: Use different cookie name 'owner_refresh_token'.
        // I Will use 'owner_refresh_token' to be safe.

        // Changing logic to look for owner specific cookie?
        const token = req.cookies['owner_refresh_token'];
        if (!token) throw new UnauthorizedException('Refresh token missing');

        const userAgent = req.headers['user-agent'] || 'unknown';
        const result = await this.authService.refresh(token, userAgent, ip);

        this.setRefreshCookie(res, result.refresh_token);

        return { access_token: result.access_token };
    }

    @Post('logout')
    async logout(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const token = req.cookies['owner_refresh_token'];
        await this.authService.logout(token);

        res.clearCookie('owner_refresh_token');
        return { success: true };
    }

    @Post('otp/send')
    async sendOtp(@Body() dto: RequestOtpDto) {
        return this.authService.requestOtp(dto);
    }

    @Post('otp/verify')
    async verifyOtp(@Body() dto: VerifyOtpDto) {
        return this.authService.verifyOtp(dto);
    }

    @Post('password/forgot')
    async forgotPassword(@Body() dto: RequestOtpDto) {
        return this.authService.requestOtp({ ...dto, purpose: 'reset' });
    }

    @Post('password/reset')
    async resetPassword(@Body() dto: ResetPasswordDto) {
        return this.authService.resetPassword(dto);
    }

    @UseGuards(OwnerJwtAuthGuard)
    @Get('me')
    getProfile(@Req() req) {
        return req.user;
    }

    private setRefreshCookie(res: Response, token: string) {
        const maxAge = 7 * 24 * 60 * 60 * 1000;

        res.cookie('owner_refresh_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: maxAge,
        });
    }
}
