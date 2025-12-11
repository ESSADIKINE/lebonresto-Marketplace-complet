import { Injectable, BadRequestException } from '@nestjs/common';
import { RestaurantsRepository } from './restaurants.repository';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantStatus } from './entities/restaurant.entity';
import { CloudinaryService } from '../images/cloudinary.service';

import { CitiesRepository } from '../cities/cities.repository';
import { CategoriesRepository } from '../categories/categories.repository';

@Injectable()
export class RestaurantsService {
  constructor(
    private readonly restaurantsRepository: RestaurantsRepository,
    private readonly cloudinaryService: CloudinaryService,
    private readonly citiesRepository: CitiesRepository,
    private readonly categoriesRepository: CategoriesRepository,
  ) { }

  async create(createRestaurantDto: CreateRestaurantDto) {
    // Initialize default values for fields not in DTO
    const restaurantData = {
      ...createRestaurantDto,
      rating_count: 0,
      rating_avg: 0,
      is_active: createRestaurantDto.is_active ?? true,
      status: createRestaurantDto.status ?? RestaurantStatus.BASIC,
    };

    const createdRestaurant = await this.restaurantsRepository.create(restaurantData);

    // Increment city count
    if (createdRestaurant.city_id) {
      await this.citiesRepository.incrementRestaurantCount(createdRestaurant.city_id);
    }

    // Increment category count
    if (createdRestaurant.category_id) {
      await this.categoriesRepository.incrementRestaurantCount(createdRestaurant.category_id);
    }

    return createdRestaurant;
  }

  async findAll(filters: {
    status?: string | string[];
    sort?: string;
    cityId?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    q?: string;
    latitude?: number;
    longitude?: number;
    radius?: number;
  }) {
    return this.restaurantsRepository.findAll(filters);
  }

  async getPromos() {
    return this.restaurantsRepository.findWithPromos();
  }

  async getMostReserved(month?: string, limit: number = 10) {
    let startDate: Date;
    let endDate: Date;

    const now = new Date();

    if (month) {
      // Parse YYYY-MM
      const parts = month.split('-');
      if (parts.length !== 2) {
        // Fallback or error? defaulting to current month if bad format
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      } else {
        const year = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10) - 1; // JS month is 0-indexed
        startDate = new Date(year, m, 1);
      }
    } else {
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    // End date is start of next month
    endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    return this.restaurantsRepository.findMostReserved(
      startDate.toISOString(),
      endDate.toISOString(),
      limit
    );
  }

  async search(params: {
    cityId?: string;
    categoryId?: string;
    tagId?: string;
    q?: string;
  }) {
    return this.restaurantsRepository.search(params);
  }

  async findOne(id: string) {
    return this.restaurantsRepository.findOne(id);
  }

  async update(id: string, updateRestaurantDto: UpdateRestaurantDto) {
    const existingRestaurant = await this.restaurantsRepository.findOne(id);
    const updatedRestaurant = await this.restaurantsRepository.update(id, updateRestaurantDto);

    // Handle city change count update
    if (
      updateRestaurantDto.city_id &&
      existingRestaurant.city_id !== updateRestaurantDto.city_id
    ) {
      if (existingRestaurant.city_id) {
        await this.citiesRepository.decrementRestaurantCount(existingRestaurant.city_id);
      }
      await this.citiesRepository.incrementRestaurantCount(updateRestaurantDto.city_id);
    }

    // Handle category change count update
    if (
      updateRestaurantDto.category_id &&
      existingRestaurant.category_id !== updateRestaurantDto.category_id
    ) {
      if (existingRestaurant.category_id) {
        await this.categoriesRepository.decrementRestaurantCount(existingRestaurant.category_id);
      }
      await this.categoriesRepository.incrementRestaurantCount(updateRestaurantDto.category_id);
    }

    return updatedRestaurant;
  }

  async remove(id: string) {
    const restaurant = await this.restaurantsRepository.findOne(id);
    await this.restaurantsRepository.remove(id);

    // Decrement city count
    if (restaurant.city_id) {
      await this.citiesRepository.decrementRestaurantCount(restaurant.city_id);
    }

    // Decrement category count
    if (restaurant.category_id) {
      await this.categoriesRepository.decrementRestaurantCount(restaurant.category_id);
    }
  }

  // Relational Methods

  async getMenus(id: string) {
    return this.restaurantsRepository.findMenus(id);
  }

  async getPlats(id: string) {
    return this.restaurantsRepository.findPlats(id);
  }

  async getImages(id: string) {
    return this.restaurantsRepository.findImages(id);
  }

  async addImage(restaurantId: string, url: string, label?: string) {
    return this.restaurantsRepository.addImage(restaurantId, url, label);
  }

  async getTags(id: string) {
    return this.restaurantsRepository.findTags(id);
  }

  async addTag(restaurantId: string, tagId: string) {
    return this.restaurantsRepository.addTag(restaurantId, tagId);
  }

  /**
   * Link multiple tags to a restaurant
   * @param restaurantId - The restaurant ID
   * @param tagIds - Array of tag IDs
   */
  async addTags(restaurantId: string, tagIds: string[]) {
    return this.restaurantsRepository.addTags(restaurantId, tagIds);
  }

  /**
   * Upload multiple images to a restaurant
   * @param restaurantId - The restaurant ID
   * @param files - Array of image files
   * @param body - Optional label or labels array
   */
  async uploadMultipleImages(
    restaurantId: string,
    files: Express.Multer.File[],
    body: { label?: string; labels?: string[] },
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Aucun fichier reçu');
    }

    // Check image limits based on status
    const restaurant = await this.restaurantsRepository.findOne(restaurantId);
    const currentImageCount =
      await this.restaurantsRepository.countImages(restaurantId);
    const newImagesCount = files.length;
    const totalImages = currentImageCount + newImagesCount;

    let limit = 5; // Default BASIC
    if (restaurant.status === RestaurantStatus.STANDARD) {
      limit = 10;
    } else if (restaurant.status === RestaurantStatus.PREMIUM) {
      limit = 15;
    }

    if (totalImages > limit) {
      throw new BadRequestException(
        `Le restaurant a atteint la limite d'images pour son statut ${restaurant.status} (Max: ${limit}, Actuel: ${currentImageCount}, Tentative d'ajout: ${newImagesCount})`,
      );
    }

    const uploadedImages: any[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Determine label for this image
      let imageLabel: string;
      if (body.labels && body.labels[i]) {
        imageLabel = body.labels[i];
      } else if (body.label) {
        imageLabel = body.label;
      } else {
        imageLabel = `Image ${i + 1}`;
      }

      // Upload to Cloudinary
      const uploadResult = await this.cloudinaryService.uploadImage(file);

      // Save to database
      const savedImage = await this.restaurantsRepository.addImage(
        restaurantId,
        uploadResult.secure_url,
        imageLabel,
      );

      uploadedImages.push(savedImage);
    }

    return {
      count: uploadedImages.length,
      images: uploadedImages,
    };
  }

  async getEvents(id: string) {
    return this.restaurantsRepository.findEvents(id);
  }

  async getReservations(id: string) {
    return this.restaurantsRepository.findReservations(id);
  }

  async getFeedback(id: string) {
    return this.restaurantsRepository.findFeedback(id);
  }

  async getSummary(id: string) {
    const restaurant = await this.findOne(id);
    const plats = await this.getPlats(id);
    const menus = await this.getMenus(id);
    const events = await this.getEvents(id);
    const feedback = await this.getFeedback(id);

    const avgRating =
      feedback.length > 0
        ? feedback.reduce((acc, curr) => acc + curr.rating, 0) / feedback.length
        : 0;

    return {
      ...restaurant,
      counts: {
        plats: plats.length,
        menus: menus.length,
        events: events.length,
        feedback: feedback.length,
      },
      avgRating,
    };
  }
}
