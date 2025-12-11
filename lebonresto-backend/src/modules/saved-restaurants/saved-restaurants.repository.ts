import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';

@Injectable()
export class SavedRestaurantsRepository {
    private readonly table = 'saved_restaurants';

    constructor(private readonly supabase: SupabaseService) { }

    async create(customerId: string, restaurantId: string) {
        const { data: existing } = await this.supabase
            .getClient()
            .from(this.table)
            .select('*')
            .eq('customer_id', customerId)
            .eq('restaurant_id', restaurantId)
            .single();

        // ON CONFLICT DO NOTHING simulation
        if (existing) return existing;

        const { data, error } = await this.supabase
            .getClient()
            .from(this.table)
            .insert({
                customer_id: customerId,
                restaurant_id: restaurantId,
            })
            .select()
            .single();

        if (error) {
            throw new InternalServerErrorException(error.message);
        }

        return data;
    }

    async remove(customerId: string, restaurantId: string): Promise<void> {
        const { error } = await this.supabase
            .getClient()
            .from(this.table)
            .delete()
            .eq('customer_id', customerId)
            .eq('restaurant_id', restaurantId);

        if (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findByCustomer(customerId: string) {
        const { data, error } = await this.supabase
            .getClient()
            .from(this.table)
            .select('*, restaurant:restaurants(*)')
            .eq('customer_id', customerId);

        if (error) {
            throw new InternalServerErrorException(error.message);
        }

        return data;
    }
}
