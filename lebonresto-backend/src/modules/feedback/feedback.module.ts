import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { FeedbackRepository } from './feedback.repository';
import { DatabaseModule } from '../../database/database.module';

import { RestaurantsModule } from '../restaurants/restaurants.module';

@Module({
  imports: [DatabaseModule, RestaurantsModule],
  controllers: [FeedbackController],
  providers: [FeedbackService, FeedbackRepository],
  exports: [FeedbackService],
})
export class FeedbackModule { }
