import { Module } from '@nestjs/common';
import { SavedRestaurantsService } from './saved-restaurants.service';
import { SavedRestaurantsController } from './saved-restaurants.controller';
import { SavedRestaurantsRepository } from './saved-restaurants.repository';
import { DatabaseModule } from '../../database/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [SavedRestaurantsController],
    providers: [SavedRestaurantsService, SavedRestaurantsRepository],
    exports: [SavedRestaurantsService],
})
export class SavedRestaurantsModule { }
