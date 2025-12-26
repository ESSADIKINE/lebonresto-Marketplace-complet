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
import { CustomerAuthService } from './customer-auth.service';
import { CustomerLoginDto, CustomerRegisterDto } from './dto/auth.dto';
import { RequestOtpDto, VerifyOtpDto, ResetPasswordDto } from './dto/otp-password.dto';
import { CustomerJwtAuthGuard } from './guards/customer-jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';

@Controller('auth/customer')
export class CustomerAuthController {
    constructor(
        private readonly authService: CustomerAuthService,
        private readonly configService: ConfigService,
    ) { }

    @Post('register')
    async register(@Body() dto: CustomerRegisterDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    async login(
        @Body() dto: CustomerLoginDto,
        @Res({ passthrough: true }) res: Response,
        @Req() req: Request,
        @Ip() ip: string,
    ) {
        const userAgent = req.headers['user-agent'] || 'unknown';
        const result = await this.authService.login(dto, userAgent, ip);

        // Set Refresh Token Cookie
        this.setRefreshCookie(res, result.refresh_token);

        // Don't send refresh token in body
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
        const refreshToken = req.cookies['refresh_token'];

        // If no token, 401 immediately (prevents 500 if service expects string)
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token missing');
        }

        try {
            const userAgent = req.headers['user-agent'] || 'unknown';
            const result = await this.authService.refresh(refreshToken, userAgent, ip);
            this.setRefreshCookie(res, result.refresh_token);
            return { access_token: result.access_token };
        } catch (error) {
            // Clear invalid cookie to stop client from retrying loop
            res.clearCookie('refresh_token');
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    @Post('logout')
    async logout(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const refreshToken = req.cookies['refresh_token'];
        await this.authService.logout(refreshToken);

        res.clearCookie('refresh_token');
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
        // Force purpose to reset
        return this.authService.requestOtp({ ...dto, purpose: 'reset' });
    }

    @Post('password/reset')
    async resetPassword(@Body() dto: ResetPasswordDto) {
        return this.authService.resetPassword(dto);
    }

    @UseGuards(CustomerJwtAuthGuard)
    @Get('me')
    getProfile(@Req() req) {
        return req.user;
    }

    private setRefreshCookie(res: Response, token: string) {
        const expiresInParams = this.configService.get('JWT_REFRESH_EXPIRES_IN') || '7d';
        // Parse 7d to milliseconds roughly or just use basic logic. 
        // Assuming 7d. 7 * 24 * 60 * 60 * 1000
        const maxAge = 7 * 24 * 60 * 60 * 1000;

        res.cookie('refresh_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: maxAge,
        });
    }
}
