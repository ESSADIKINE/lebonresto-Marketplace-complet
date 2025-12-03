import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesRepository {
  private readonly table = 'categories';

  constructor(private readonly supabase: SupabaseService) { }

  async create(data: CreateCategoryDto) {
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
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return data;
  }

  async update(id: string, data: UpdateCategoryDto) {
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

    return { message: 'Category deleted successfully' };
  }

  async incrementRestaurantCount(id: string) {
    const { data: category, error: fetchError } = await this.supabase
      .getClient()
      .from(this.table)
      .select('count_restaurants')
      .eq('id', id)
      .single();

    if (fetchError || !category) return;

    const newCount = (category.count_restaurants || 0) + 1;

    await this.supabase
      .getClient()
      .from(this.table)
      .update({ count_restaurants: newCount })
      .eq('id', id);
  }

  async decrementRestaurantCount(id: string) {
    const { data: category, error: fetchError } = await this.supabase
      .getClient()
      .from(this.table)
      .select('count_restaurants')
      .eq('id', id)
      .single();

    if (fetchError || !category) return;

    const newCount = Math.max(0, (category.count_restaurants || 0) - 1);

    await this.supabase
      .getClient()
      .from(this.table)
      .update({ count_restaurants: newCount })
      .eq('id', id);
  }
}
