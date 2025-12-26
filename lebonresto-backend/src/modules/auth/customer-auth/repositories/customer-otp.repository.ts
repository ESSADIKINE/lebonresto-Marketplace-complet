import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../../../../database/supabase.service';

@Injectable()
export class CustomerOtpRepository {
    private readonly table = 'customer_otps';

    constructor(private readonly supabase: SupabaseService) { }

    async create(data: {
        customer_id: string;
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

    async findLatestValid(customerId: string, purpose: string) {
        // Find non-consumed, non-expired OTP
        // Supabase filtering on dates might need careful ISO string formatting, rely on code check or simple select
        const { data, error } = await this.supabase
            .getClient()
            .from(this.table)
            .select('*')
            .eq('customer_id', customerId)
            .eq('purpose', purpose)
            .is('consumed_at', null)
            .gt('expires_at', new Date().toISOString())
            .order('created_at', { ascending: false })
            .limit(1)
            .maybeSingle(); // Use maybeSingle to avoid 406 if multiple valid? actually we just want latest

        if (error && error.code !== 'PGRST116') {
            console.error("Error finding OTP", error);
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

        if (error) {
            throw new InternalServerErrorException('Could not consume OTP');
        }
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
