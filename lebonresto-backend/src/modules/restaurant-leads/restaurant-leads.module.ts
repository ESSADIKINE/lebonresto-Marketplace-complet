import { Module } from '@nestjs/common';
import { RestaurantLeadsService } from './restaurant-leads.service';
import { RestaurantLeadsController } from './restaurant-leads.controller';
import { RestaurantLeadsRepository } from './restaurant-leads.repository';

@Module({
    controllers: [RestaurantLeadsController],
    providers: [RestaurantLeadsService, RestaurantLeadsRepository],
    exports: [RestaurantLeadsService],
})
export class RestaurantLeadsModule { }
