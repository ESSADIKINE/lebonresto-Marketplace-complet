import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { SupabaseService } from '../../database/supabase.service';
import { CreateHoraireDto } from './dto/create-horaire.dto';
import { UpdateHoraireDto } from './dto/update-horaire.dto';

@Injectable()
export class HorairesRepository {
    private readonly table = 'horaires';

    constructor(private readonly supabase: SupabaseService) { }

    async findAllByRestaurant(restaurantId: string) {
        const { data, error } = await this.supabase
            .getClient()
            .from(this.table)
            .select('*')
            .eq('restaurant_id', restaurantId)
            .order('day_of_week', { ascending: true });

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
            throw new NotFoundException(`Horaire with ID ${id} not found`);
        }

        return data;
    }

    async create(restaurantId: string, dto: CreateHoraireDto) {
        // 1. Verify Restaurant Exists
        const { data: restaurant, error: rError } = await this.supabase
            .getClient()
            .from('restaurants')
            .select('id')
            .eq('id', restaurantId)
            .single();

        if (rError || !restaurant) {
            throw new NotFoundException(`Restaurant with ID ${restaurantId} not found`);
        }

        // 2. Check for Unique Constraint (restaurant_id, day_of_week)
        // We can do a check or let the DB fail if there is a unique constraint.
        // For better DX, checking here is good.
        const { data: existing } = await this.supabase
            .getClient()
            .from(this.table)
            .select('id')
            .eq('restaurant_id', restaurantId)
            .eq('day_of_week', dto.day_of_week)
            .single();

        if (existing) {
            throw new BadRequestException(
                `Horaire for day ${dto.day_of_week} already exists for this restaurant. Use update instead.`,
            );
        }

        // 3. Prepare payload (handle optionals)
        const payload = {
            restaurant_id: restaurantId,
            day_of_week: dto.day_of_week,
            is_closed: dto.is_closed,
            open_time: dto.is_closed ? null : dto.open_time,
            close_time: dto.is_closed ? null : dto.close_time,
            break_start: dto.is_closed ? null : (dto.break_start || null),
            break_end: dto.is_closed ? null : (dto.break_end || null),
            notes: dto.notes || null,
        };

        const { data: created, error } = await this.supabase
            .getClient()
            .from(this.table)
            .insert(payload)
            .select()
            .single();

        if (error) {
            throw new InternalServerErrorException(error.message);
        }

        return created;
    }

    async update(id: string, dto: UpdateHoraireDto) {
        // Check if exists first
        await this.findOne(id);

        const payload: any = { ...dto };

        // Explicitly handle nulls if keys are present but undefined/null in DTO?
        // In NestJS + PartialType, missing keys are undefined.
        // We want to allow setting break_start to null.
        // However, Supabase update ignores keys that are undefined.
        // If we want to set to NULL, we must pass null.

        if (dto.is_closed === true) {
            payload.open_time = null;
            payload.close_time = null;
            payload.break_start = null;
            payload.break_end = null;
        } else {
            // If not closed, preserve or update values.
            // Special Case: user wants to CLEAR break_start (send explicit null or empty?).
            // If break_start is undefined in DTO, we shouldn't touch it?
            // OR adhering to the prompt: "If break_start / break_end not provided -> store NULL" (Likely refers to Create).
            // For Update, typical PATCh behavior is "only update what's sent".
            // But if I want to remove a break? I should send null.
        }

        const { data: updated, error } = await this.supabase
            .getClient()
            .from(this.table)
            .update(payload)
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
    }
}
