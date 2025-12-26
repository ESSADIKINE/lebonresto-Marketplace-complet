import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../../../../database/supabase.service';

@Injectable()
export class OwnerOtpRepository {
    private readonly table = 'owner_otps';

    constructor(private readonly supabase: SupabaseService) { }

    async create(data: {
        owner_id: string;
        otp_hash: string;
        purpose: string;
        expires_at: Date;
    }) {
        const { error } = await this.supabase
            .getClient()
            .from(this.table)
            .insert(data);

        if (error) {
            throw new InternalServerErrorException('Could not create OTP');
        }
    }

    async findLatestValid(ownerId: string, purpose: string) {
        const { data, error } = await this.supabase
            .getClient()
            .from(this.table)
            .select('*')
            .eq('owner_id', ownerId)
            .eq('purpose', purpose)
            .is('consumed_at', null)
            .gt('expires_at', new Date().toISOString())
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle();

        if (error && error.code !== 'PGRST116') {
            throw new InternalServerErrorException('Error finding OTP');
        }
        return data;
    }

    async markConsumed(id: string) {
        const { error } = await this.supabase
            .getClient()
            .from(this.table)
            .update({ consumed_at: new Date() })
            .eq('id', id);

        if (error) throw new InternalServerErrorException('Could not consume OTP');
    }

    async incrementAttempts(id: string, currentAttempts: number) {
        const { error } = await this.supabase
            .getClient()
            .from(this.table)
            .update({ attempts: currentAttempts + 1 })
            .eq('id', id);

        if (error) throw new InternalServerErrorException('Could not update OTP attempts');
    }
}
