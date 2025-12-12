import { Module } from '@nestjs/common';
import { HorairesService } from './horaires.service';
import { HorairesController } from './horaires.controller';
import { HorairesRepository } from './horaires.repository';
import { DatabaseModule } from '../../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [HorairesController],
    providers: [HorairesService, HorairesRepository],
    exports: [HorairesService],
})
export class HorairesModule { }
