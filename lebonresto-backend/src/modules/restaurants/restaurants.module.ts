import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsRepository } from './restaurants.repository';
import { DatabaseModule } from '../../database/database.module';
import { ImagesModule } from '../images/images.module';

import { CitiesModule } from '../cities/cities.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [DatabaseModule, ImagesModule, CitiesModule, CategoriesModule],
  controllers: [RestaurantsController],
  providers: [RestaurantsService, RestaurantsRepository],
  exports: [RestaurantsService, RestaurantsRepository],
})
export class RestaurantsModule { }
