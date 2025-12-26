import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OwnersService } from '../../../owners/owners.service';

@Injectable()
export class OwnerJwtStrategy extends PassportStrategy(Strategy, 'jwt-owner') {
    constructor(
        private configService: ConfigService,
        private ownersService: OwnersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_ACCESS_SECRET'),
        });
    }

    async validate(payload: any) {
        if (payload.role !== 'owner') {
            throw new UnauthorizedException('Not an owner token');
        }
        const user = await this.ownersService.findOne(payload.sub);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
