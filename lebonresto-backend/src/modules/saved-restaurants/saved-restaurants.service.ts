import { Injectable } from '@nestjs/common';
import { SavedRestaurantsRepository } from './saved-restaurants.repository';

@Injectable()
export class SavedRestaurantsService {
    constructor(
        private readonly savedRestaurantsRepository: SavedRestaurantsRepository,
    ) { }

    async saveRestaurant(customerId: string, restaurantId: string) {
        return this.savedRestaurantsRepository.create(customerId, restaurantId);
    }

    async unsaveRestaurant(customerId: string, restaurantId: string) {
        return this.savedRestaurantsRepository.remove(customerId, restaurantId);
    }

    async getSavedRestaurants(customerId: string) {
        return this.savedRestaurantsRepository.findByCustomer(customerId);
    }
}
