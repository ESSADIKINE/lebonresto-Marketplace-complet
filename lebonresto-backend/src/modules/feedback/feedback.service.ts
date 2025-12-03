import { Injectable } from '@nestjs/common';
import { FeedbackRepository } from './feedback.repository';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { RestaurantsRepository } from '../restaurants/restaurants.repository';

@Injectable()
export class FeedbackService {
  constructor(
    private readonly feedbackRepository: FeedbackRepository,
    private readonly restaurantsRepository: RestaurantsRepository,
  ) { }

  async create(createFeedbackDto: CreateFeedbackDto) {
    const feedback = await this.feedbackRepository.create(createFeedbackDto);
    if (feedback && createFeedbackDto.restaurant_id) {
      await this.restaurantsRepository.incrementRatingCount(createFeedbackDto.restaurant_id);
    }
    return feedback;
  }

  findAll() {
    return this.feedbackRepository.findAll();
  }

  findOne(id: string) {
    return this.feedbackRepository.findOne(id);
  }

  update(id: string, updateFeedbackDto: UpdateFeedbackDto) {
    return this.feedbackRepository.update(id, updateFeedbackDto);
  }

  async remove(id: string) {
    const feedback = await this.feedbackRepository.findOne(id);
    if (feedback && feedback.restaurant_id) {
      await this.restaurantsRepository.decrementRatingCount(feedback.restaurant_id);
    }
    return this.feedbackRepository.remove(id);
  }
}
