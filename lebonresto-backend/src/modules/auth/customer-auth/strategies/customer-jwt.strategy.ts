import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CustomersService } from '../../../customers/customers.service';

@Injectable()
export class CustomerJwtStrategy extends PassportStrategy(Strategy, 'jwt-customer') {
    constructor(
        private configService: ConfigService,
        private customersService: CustomersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_ACCESS_SECRET'),
        });
    }

    async validate(payload: any) {
        // payload = { sub: customerId, email: ..., role: 'customer' }
        // Optionally check if user exists or is revoked
        if (payload.role !== 'customer') {
            throw new UnauthorizedException('Not a customer token');
        }
        const user = await this.customersService.findOne(payload.sub);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
