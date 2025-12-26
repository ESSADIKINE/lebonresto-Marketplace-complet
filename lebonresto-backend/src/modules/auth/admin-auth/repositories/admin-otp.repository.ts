import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../../../../database/supabase.service';

@Injectable()
export class AdminOtpRepository {
    private readonly table = 'admin_otps';

    constructor(private readonly supabase: SupabaseService) { }

    async create(data: {
        admin_id: string;
        otp_hash: string;
        purpose: string;
        expires_at: Date;
    }) {
        const { error } = await this.supabase
            .getClient()
            .from(this.table)
            .insert(data);

        if (error) throw new InternalServerErrorException('Could not create OTP');
    }

    async findLatestValid(adminId: string, purpose: string) {
        const { data, error } = await this.supabase
            .getClient()
            .from(this.table)
            .select('*')
            .eq('admin_id', adminId)
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
