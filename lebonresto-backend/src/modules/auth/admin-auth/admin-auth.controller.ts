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
import { AdminAuthService } from './admin-auth.service';
import { AdminLoginDto } from './dto/auth.dto';
import { RequestOtpDto, ResetPasswordDto } from '../customer-auth/dto/otp-password.dto';
import { AdminJwtAuthGuard } from './guards/admin-jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';

@Controller('auth/admin')
export class AdminAuthController {
    constructor(
        private readonly authService: AdminAuthService,
        private readonly configService: ConfigService,
    ) { }

    @Post('login')
    async login(
        @Body() dto: AdminLoginDto,
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
        const token = req.cookies['admin_refresh_token'];
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
        const token = req.cookies['admin_refresh_token'];
        await this.authService.logout(token);

        res.clearCookie('admin_refresh_token');
        return { success: true };
    }

    @Post('password/forgot')
    async forgotPassword(@Body() dto: RequestOtpDto) {
        return this.authService.requestOtp({ ...dto, purpose: 'reset' });
    }

    @Post('password/reset')
    async resetPassword(@Body() dto: ResetPasswordDto) {
        return this.authService.resetPassword(dto);
    }

    @UseGuards(AdminJwtAuthGuard)
    @Get('me')
    getProfile(@Req() req) {
        return req.user;
    }

    private setRefreshCookie(res: Response, token: string) {
        const maxAge = 7 * 24 * 60 * 60 * 1000;

        res.cookie('admin_refresh_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/', // or /auth/admin but / is safer for SPA routing consistency if desired
            maxAge: maxAge,
        });
    }
}
