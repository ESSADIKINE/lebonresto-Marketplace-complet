import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OwnerJwtAuthGuard extends AuthGuard('jwt-owner') { }
