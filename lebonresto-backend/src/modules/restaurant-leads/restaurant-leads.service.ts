import { Injectable } from '@nestjs/common';
import { RestaurantLeadsRepository } from './restaurant-leads.repository';
import { CreateRestaurantLeadDto } from './dto/create-restaurant-lead.dto';
import { UpdateRestaurantLeadDto } from './dto/update-restaurant-lead.dto';

@Injectable()
export class RestaurantLeadsService {
    constructor(
        private readonly restaurantLeadsRepository: RestaurantLeadsRepository,
    ) { }

    create(createRestaurantLeadDto: CreateRestaurantLeadDto) {
        const data = {
            ...createRestaurantLeadDto,
            status: 'new', // Explicitly set default status
            source: 'for-restaurants-landing',
        };
        return this.restaurantLeadsRepository.create(data);
    }

    findAll() {
        return this.restaurantLeadsRepository.findAll();
    }

    findOne(id: string) {
        return this.restaurantLeadsRepository.findOne(id);
    }

    update(id: string, updateRestaurantLeadDto: UpdateRestaurantLeadDto) {
        return this.restaurantLeadsRepository.update(id, updateRestaurantLeadDto);
    }

    remove(id: string) {
        return this.restaurantLeadsRepository.remove(id);
    }
}
