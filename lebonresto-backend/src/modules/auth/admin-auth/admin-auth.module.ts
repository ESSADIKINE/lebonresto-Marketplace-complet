import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminsModule } from '../../admins/admins.module'; // Adjust path
import { DatabaseModule } from '../../../database/database.module';
import { AdminAuthController } from './admin-auth.controller';
import { AdminAuthService } from './admin-auth.service';
import { AdminRefreshTokenRepository } from './repositories/admin-refresh-token.repository';
import { AdminOtpRepository } from './repositories/admin-otp.repository';
import { AdminJwtStrategy } from './strategies/admin-jwt.strategy';

@Module({
    imports: [
        AdminsModule,
        PassportModule,
        DatabaseModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get('JWT_ACCESS_SECRET'),
                signOptions: {
                    expiresIn: configService.get('JWT_ACCESS_EXPIRES_IN') || '15m',
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AdminAuthController],
    providers: [
        AdminAuthService,
        AdminRefreshTokenRepository,
        AdminOtpRepository,
        AdminJwtStrategy,
    ],
    exports: [AdminAuthService],
})
export class AdminAuthModule { }
