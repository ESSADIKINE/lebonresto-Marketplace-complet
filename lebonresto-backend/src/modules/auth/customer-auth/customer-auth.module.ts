import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CustomersModule } from '../../customers/customers.module';
import { DatabaseModule } from '../../../database/database.module';
import { CustomerAuthController } from './customer-auth.controller';
import { CustomerAuthService } from './customer-auth.service';
import { CustomerRefreshTokenRepository } from './repositories/customer-refresh-token.repository';
import { CustomerOtpRepository } from './repositories/customer-otp.repository';
import { CustomerJwtStrategy } from './strategies/customer-jwt.strategy';

@Module({
    imports: [
        CustomersModule,
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
    controllers: [CustomerAuthController],
    providers: [
        CustomerAuthService,
        CustomerRefreshTokenRepository,
        CustomerOtpRepository,
        CustomerJwtStrategy,
    ],
    exports: [CustomerAuthService],
})
export class CustomerAuthModule { }
