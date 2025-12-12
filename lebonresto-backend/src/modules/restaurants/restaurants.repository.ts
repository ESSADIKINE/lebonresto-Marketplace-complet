import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantFullViewDto } from './dto/restaurant-full-view.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant, RestaurantStatus } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsRepository {
  private readonly table = 'restaurants';
  private readonly promoView = 'view_restaurants_with_promos';
  private readonly fullView = 'restaurant_full_view';

  constructor(private readonly supabase: SupabaseService) { }

  async findFullById(id: string): Promise<RestaurantFullViewDto> {
    const { data, error } = await this.supabase
      .getClient()
      .from(this.fullView)
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }

    return data;
  }

  async create(data: Partial<Restaurant>): Promise<Restaurant> {
    const { data: created, error } = await this.supabase
      .getClient()
      .from(this.table)
      .insert(data)
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return created;
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
  }): Promise<Restaurant[]> {
    let query = this.supabase
      .getClient()
      .from(this.table)
      .select('*, city:cities(*), category:categories(*)');

    // Filter by Status
    if (filters.status) {
      const statuses = Array.isArray(filters.status) ? filters.status : filters.status.split(',');
      if (statuses.length > 0) {
        query = query.in('status', statuses);
      }
    }

    // Filter by City (Multi-select)
    if (filters.cityId) {
      const ids = filters.cityId.split(',');
      if (ids.length > 0) {
        query = query.in('city_id', ids);
      }
    }

    // Filter by Category (Multi-select)
    if (filters.categoryId) {
      const ids = filters.categoryId.split(',');
      if (ids.length > 0) {
        query = query.in('category_id', ids);
      }
    }

    // Filter by Rating
    if (filters.minRating) {
      query = query.gte('rating_avg', filters.minRating);
    }

    // Filter by Text Search (q)
    if (filters.q) {
      query = query.or(`name.ilike.%${filters.q}%,description.ilike.%${filters.q}%`);
    }

    // Filter by Price Range
    if (filters.minPrice !== undefined) {
      query = query.gte('min_price', filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      query = query.lte('max_price', filters.maxPrice);
    }

    // Sorting
    if (filters.sort === 'createdAtDesc') {
      query = query.order('created_at', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data: rawData, error } = await query;

    if (error) {
      throw new InternalServerErrorException(error.message);
    }



    let data = rawData;

    // Filter by Distance (In-Memory) & Calculate Distance
    if (filters.latitude && filters.longitude) {
      const { latitude: userLat, longitude: userLng, radius } = filters;

      // Calculate distance for all restaurants first
      data = data.map(restaurant => {
        if (!restaurant.latitude || !restaurant.longitude) {
          return restaurant;
        }

        const R = 6371; // Earth radius in km
        const dLat = (restaurant.latitude - userLat) * (Math.PI / 180);
        const dLon = (restaurant.longitude - userLng) * (Math.PI / 180);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(userLat * (Math.PI / 180)) *
          Math.cos(restaurant.latitude * (Math.PI / 180)) *
          Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in km

        return { ...restaurant, distance };
      });

      // Filter by Radius if provided
      if (radius) {
        data = data.filter((r) => r.distance !== undefined && r.distance <= radius);
      } else {
        // If sorting by distance is implied or desired when location is provided
        // We probably only want to filter valid coordinates if we are doing distance logic
        data = data.filter(r => r.distance !== undefined);
      }

      // Sort by distance if distance filter is active OR just location is provided
      // (Usually if user gives location, they want closest first)
      data.sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
    }

    // In-memory sort fallback for Status if desired
    if (!filters.sort && data && !filters.radius) {
      const score = (s: string) => {
        if (s === RestaurantStatus.PREMIUM) return 3;
        if (s === RestaurantStatus.STANDARD) return 2;
        if (s === RestaurantStatus.BASIC) return 1;
        return 0;
      };
      data.sort((a, b) => {
        const diff = score(b.status) - score(a.status);
        if (diff !== 0) return diff;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
    }

    return data;
  }

  async findWithPromos() {
    // Uses the View created by SQL script
    const { data, error } = await this.supabase
      .getClient()
      .from(this.promoView)
      .select('*, city:cities(*), category:categories(*)')
      .order('max_discount_percentage', { ascending: false })
      .order('nearest_promo_start_at', { ascending: true, nullsFirst: false });

    if (error) {
      // Fallback if View doesn't exist?
      throw new InternalServerErrorException(`Could not fetch promos. Ensure 'view_restaurants_with_promos' exists. Error: ${error.message}`);
    }
    return data;
  }

  async findMostReserved(startDate: string, endDate: string, limit: number) {
    // Uses the RPC function created by SQL script
    const { data, error } = await this.supabase
      .getClient()
      .rpc('get_most_reserved_restaurants', {
        start_date: startDate,
        end_date: endDate,
        limit_count: limit
      });

    if (error) {
      throw new InternalServerErrorException(`Could not fetch most reserved. key: ${error.message}`);
    }
    return data;
  }

  async findOne(id: string): Promise<Restaurant> {
    const { data, error } = await this.supabase
      .getClient()
      .from(this.table)
      .select('*, city:cities(*), category:categories(*)')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }

    return data;
  }

  async update(id: string, data: Partial<Restaurant>): Promise<Restaurant> {
    const { data: updated, error } = await this.supabase
      .getClient()
      .from(this.table)
      .update(data)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return updated;
  }

  async remove(id: string): Promise<void> {
    const { error } = await this.supabase
      .getClient()
      .from(this.table)
      .delete()
      .eq('id', id);

    if (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Relational Queries

  async findMenus(restaurantId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('menus')
      .select('*')
      .eq('restaurant_id', restaurantId);
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async findPlats(restaurantId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('plats')
      .select('*')
      .eq('restaurant_id', restaurantId);
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async findImages(restaurantId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('restaurant_images')
      .select('*')
      .eq('restaurant_id', restaurantId);
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async findTags(restaurantId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('restaurant_tags')
      .select('tags(*)')
      .eq('restaurant_id', restaurantId);
    if (error) throw new InternalServerErrorException(error.message);
    return data.map((item: any) => item.tags);
  }

  async findEvents(restaurantId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('events')
      .select('*')
      .eq('restaurant_id', restaurantId);
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async findReservations(restaurantId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('reservations')
      .select('*')
      .eq('restaurant_id', restaurantId);
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async findFeedback(restaurantId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('feedback')
      .select('*')
      .eq('restaurant_id', restaurantId);
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }

  async search(filters: {
    cityId?: string;
    categoryId?: string;
    tagId?: string;
    q?: string;
  }) {
    let query = this.supabase.getClient().from(this.table).select('*, city:cities(*), category:categories(*)');

    if (filters.cityId) {
      query = query.eq('city_id', filters.cityId);
    }
    if (filters.categoryId) {
      const ids = filters.categoryId.split(',');
      query = query.in('category_id', ids);
    }
    if (filters.q) {
      query = query.or(
        `name.ilike.%${filters.q}%,description.ilike.%${filters.q}%`,
      );
    }

    if (filters.tagId) {
      // This is a bit complex with Supabase simple client, usually requires a join or subquery.
      // For simplicity in this "test connectivity" phase, we might fetch restaurant_tags first.
      const { data: tagData } = await this.supabase
        .getClient()
        .from('restaurant_tags')
        .select('restaurant_id')
        .eq('tag_id', filters.tagId);

      if (tagData) {
        const ids = tagData.map((t) => t.restaurant_id);
        query = query.in('id', ids);
      }
    }

    const { data, error } = await query;
    if (error) throw new InternalServerErrorException(error.message);
    return data;
  }



  /**
   * Add an image to a restaurant
   * @param restaurantId - The restaurant ID
   * @param url - The image URL
   * @param label - Optional label for the image
   */
  async addImage(restaurantId: string, url: string, label?: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('restaurant_images')
      .insert({
        restaurant_id: restaurantId,
        url,
        label: label ?? null,
      })
      .select('*')
      .single();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }

  /**
   * Link a tag to a restaurant
   * @param restaurantId - The restaurant ID
   * @param tagId - The tag ID
   */
  async addTag(restaurantId: string, tagId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from('restaurant_tags')
      .insert({
        restaurant_id: restaurantId,
        tag_id: tagId,
      })
      .select('*')
      .single();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }

  /**
   * Link multiple tags to a restaurant
   * @param restaurantId - The restaurant ID
   * @param tagIds - Array of tag IDs
   */
  async addTags(restaurantId: string, tagIds: string[]) {
    const records = tagIds.map((tagId) => ({
      restaurant_id: restaurantId,
      tag_id: tagId,
    }));

    const { data, error } = await this.supabase
      .getClient()
      .from('restaurant_tags')
      .insert(records)
      .select('*');

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }
  async countImages(restaurantId: string): Promise<number> {
    const { count, error } = await this.supabase
      .getClient()
      .from('restaurant_images')
      .select('*', { count: 'exact', head: true })
      .eq('restaurant_id', restaurantId);

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return count || 0;
  }

  async incrementRatingCount(id: string): Promise<void> {

    const { data: restaurant, error: fetchError } = await this.supabase
      .getClient()
      .from(this.table)
      .select('rating_count')
      .eq('id', id)
      .single();

    if (fetchError) throw new InternalServerErrorException(fetchError.message);

    const newCount = (restaurant.rating_count || 0) + 1;

    const { error: updateError } = await this.supabase
      .getClient()
      .from(this.table)
      .update({ rating_count: newCount })
      .eq('id', id);

    if (updateError) throw new InternalServerErrorException(updateError.message);
  }

  async decrementRatingCount(id: string): Promise<void> {
    const { data: restaurant, error: fetchError } = await this.supabase
      .getClient()
      .from(this.table)
      .select('rating_count')
      .eq('id', id)
      .single();

    if (fetchError) throw new InternalServerErrorException(fetchError.message);

    const currentCount = restaurant.rating_count || 0;
    const newCount = currentCount > 0 ? currentCount - 1 : 0;

    const { error: updateError } = await this.supabase
      .getClient()
      .from(this.table)
      .update({ rating_count: newCount })
      .eq('id', id);

    if (updateError) throw new InternalServerErrorException(updateError.message);
  }
  async findDetails(id: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from(this.table)
      .select(`
        *,
        city:cities(*),
        category:categories(*),
        tags:restaurant_tags(tags(*)),
        images:restaurant_images(*),
        menus(*),
        plats(*),
        events(*),
        feedback(*)
      `)
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }

    // Process Tags (flatten structure)
    const tags = data.tags ? data.tags.map((t: any) => t.tags) : [];

    // Calculate Aggregations
    const feedback = data.feedback || [];
    const rating_count = feedback.length;

    let rating_avg = 0;
    let avg_cuisine = 0;
    let avg_service = 0;
    let avg_ambiance = 0;

    if (rating_count > 0) {
      rating_avg = feedback.reduce((acc, curr) => acc + (curr.rating || 0), 0) / rating_count;
      avg_cuisine = feedback.reduce((acc, curr) => acc + (curr.rating_cuisine || 0), 0) / rating_count;
      avg_service = feedback.reduce((acc, curr) => acc + (curr.rating_service || 0), 0) / rating_count;
      avg_ambiance = feedback.reduce((acc, curr) => acc + (curr.rating_ambiance || 0), 0) / rating_count;
    }

    // Sort feedback by date desc
    const sortedFeedback = feedback.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return {
      ...data,
      tags, // Overwrite with flattened tags
      feedback: sortedFeedback,
      rating_avg: parseFloat(rating_avg.toFixed(1)), // Ensure numbers
      rating_count,
      avg_cuisine: parseFloat(avg_cuisine.toFixed(1)),
      avg_service: parseFloat(avg_service.toFixed(1)),
      avg_ambiance: parseFloat(avg_ambiance.toFixed(1)),
    };
  }
}
