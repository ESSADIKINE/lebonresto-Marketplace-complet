import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { Event } from './entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);
  private readonly table = 'events';

  constructor(private readonly supabase: SupabaseService) { }

  async create(
    createEventDto: CreateEventDto,
    imageUrl?: string,
  ): Promise<Event> {
    const { data, error } = await this.supabase
      .getClient()
      .from(this.table)
      .insert({ ...createEventDto, image_url: imageUrl })
      .select()
      .single();

    if (error) {
      this.logger.error(`Error creating event: ${error.message}`);
      throw new InternalServerErrorException('Could not create event');
    }

    return data;
  }

  async findAllByRestaurant(restaurantId: string): Promise<Event[]> {
    const { data, error } = await this.supabase
      .getClient()
      .from(this.table)
      .select('*')
      .eq('restaurant_id', restaurantId);

    if (error) {
      this.logger.error(`Error finding events: ${error.message}`);
      throw new InternalServerErrorException('Error finding events');
    }

    return data;
  }

  async findAll(): Promise<Event[]> {
    const { data, error } = await this.supabase
      .getClient()
      .from(this.table)
      .select('*, restaurant:restaurants(*)')
      .gte('event_date', new Date().toISOString())
      .order('event_date', { ascending: true });

    if (error) {
      this.logger.error(`Error finding all events: ${error.message}`);
      throw new InternalServerErrorException('Error finding all events');
    }

    return data;
  }

  async findPromotions(): Promise<Event[]> {
    const now = new Date().toISOString();
    const { data, error } = await this.supabase
      .getClient()
      .from(this.table)
      .select('*, restaurant:restaurants(*)')
      .eq('is_promo', true)
      .or(`promo_start_at.is.null,promo_start_at.lte.${now}`)
      .or(`promo_end_at.is.null,promo_end_at.gte.${now}`)
      .order('promo_end_at', { ascending: true });

    if (error) {
      this.logger.error(`Error finding promotions: ${error.message}`);
      throw new InternalServerErrorException('Error finding promotions');
    }

    return data;
  }
}
