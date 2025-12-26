import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OwnersModule } from '../../owners/owners.module'; // Adjust path
import { DatabaseModule } from '../../../database/database.module';
import { OwnerAuthController } from './owner-auth.controller';
import { OwnerAuthService } from './owner-auth.service';
import { OwnerRefreshTokenRepository } from './repositories/owner-refresh-token.repository';
import { OwnerOtpRepository } from './repositories/owner-otp.repository';
import { OwnerJwtStrategy } from './strategies/owner-jwt.strategy';

@Module({
    imports: [
        OwnersModule,
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
    controllers: [OwnerAuthController],
    providers: [
        OwnerAuthService,
        OwnerRefreshTokenRepository,
        OwnerOtpRepository,
        OwnerJwtStrategy,
    ],
    exports: [OwnerAuthService],
})
export class OwnerAuthModule { }
