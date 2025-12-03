import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CitiesRepository {
  private readonly table = 'cities';

  constructor(private readonly supabase: SupabaseService) { }

  async create(data: CreateCityDto) {
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

  async findAll() {
    const { data, error } = await this.supabase
      .getClient()
      .from(this.table)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from(this.table)
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`City with ID ${id} not found`);
    }

    return data;
  }

  async update(id: string, data: UpdateCityDto) {
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

  async remove(id: string) {
    const { error } = await this.supabase
      .getClient()
      .from(this.table)
      .delete()
      .eq('id', id);

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return { message: 'City deleted successfully' };
  }

  async incrementRestaurantCount(id: string) {
    // Supabase doesn't have a direct atomic increment via simple client easily without RPC,
    // but we can do a read-update or use rpc if defined.
    // For simplicity/compatibility with current setup, we'll fetch then update.
    // Ideally, use an RPC function: increment_city_count(city_id)

    // Attempt RPC first if you have it, otherwise fallback to fetch-update
    // const { error } = await this.supabase.getClient().rpc('increment_city_count', { city_id: id });

    // Fallback: Fetch current count
    const { data: city, error: fetchError } = await this.supabase
      .getClient()
      .from(this.table)
      .select('count_restaurants')
      .eq('id', id)
      .single();

    if (fetchError || !city) return; // Ignore if city not found or error

    const newCount = (city.count_restaurants || 0) + 1;

    await this.supabase
      .getClient()
      .from(this.table)
      .update({ count_restaurants: newCount })
      .eq('id', id);
  }

  async decrementRestaurantCount(id: string) {
    const { data: city, error: fetchError } = await this.supabase
      .getClient()
      .from(this.table)
      .select('count_restaurants')
      .eq('id', id)
      .single();

    if (fetchError || !city) return;

    const newCount = Math.max(0, (city.count_restaurants || 0) - 1);

    await this.supabase
      .getClient()
      .from(this.table)
      .update({ count_restaurants: newCount })
      .eq('id', id);
  }
}
