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
    const { rating_cuisine, rating_service, rating_ambiance } = createFeedbackDto;

    // Explicit calculation provided by prompt
    const globalRating = Math.round(((rating_cuisine + rating_service + rating_ambiance) / 3) * 10) / 10;

    const payload = {
      ...createFeedbackDto,
      rating: globalRating
    };

    const feedback = await this.feedbackRepository.create(payload);
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

  async update(id: string, updateFeedbackDto: UpdateFeedbackDto) {
    const existing = await this.feedbackRepository.findOne(id);

    // Merge existing values with updates to recompute rating if necessary
    // If a field is updated, use it; otherwise use existing.
    // However, UpdateDto is partial.
    // If NO rating fields are updated, we don't need to recompute.
    // If ANY rating field is updated, ALL 3 must be available (either from update or existing) to recompute?
    // Prompt says: "If any of rating_cuisine, rating_service, rating_ambiance is updated, recompute rating".

    let payload = { ...updateFeedbackDto } as any;

    if (
      updateFeedbackDto.rating_cuisine !== undefined ||
      updateFeedbackDto.rating_service !== undefined ||
      updateFeedbackDto.rating_ambiance !== undefined
    ) {
      const r_cuisine = updateFeedbackDto.rating_cuisine ?? existing.rating_cuisine;
      const r_service = updateFeedbackDto.rating_service ?? existing.rating_service;
      const r_ambiance = updateFeedbackDto.rating_ambiance ?? existing.rating_ambiance;

      // Safety check if existing was somehow null (shouldn't be per logic but safe to handle)
      if (r_cuisine != null && r_service != null && r_ambiance != null) {
        const globalRating = Math.round(((r_cuisine + r_service + r_ambiance) / 3) * 10) / 10;
        payload.rating = globalRating;
      }
    }

    return this.feedbackRepository.update(id, payload);
  }

  async remove(id: string) {
    const feedback = await this.feedbackRepository.findOne(id);
    if (feedback && feedback.restaurant_id) {
      await this.restaurantsRepository.decrementRatingCount(feedback.restaurant_id);
    }
    return this.feedbackRepository.remove(id);
  }
}
