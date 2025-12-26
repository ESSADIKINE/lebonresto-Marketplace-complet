import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../../../../database/supabase.service';

@Injectable()
export class CustomerRefreshTokenRepository {
    private readonly table = 'customer_refresh_tokens';

    constructor(private readonly supabase: SupabaseService) { }

    async create(data: {
        customer_id: string;
        token_hash: string;
        expires_at: Date;
        user_agent?: string;
        ip?: string;
    }) {
        const { error } = await this.supabase
            .getClient()
            .from(this.table)
            .insert(data);

        if (error) {
            console.error('Error creating refresh token:', error);
            throw new InternalServerErrorException('Could not create refresh token');
        }
    }

    async findOneByHash(tokenHash: string) {
        const { data, error } = await this.supabase
            .getClient()
            .from(this.table)
            .select('*')
            .eq('token_hash', tokenHash)
            .single();

        if (error && error.code !== 'PGRST116') {
            throw new InternalServerErrorException(error.message);
        }
        return data;
    }

    async revoke(id: string) {
        const { error } = await this.supabase
            .getClient()
            .from(this.table)
            .update({ revoked_at: new Date() })
            .eq('id', id);

        if (error) {
            throw new InternalServerErrorException('Could not revoke token');
        }
    }

    async revokeAllForCustomer(customerId: string) {
        const { error } = await this.supabase
            .getClient()
            .from(this.table)
            .update({ revoked_at: new Date() })
            .eq('customer_id', customerId);

        if (error) {
            throw new InternalServerErrorException('Could not revoke tokens');
        }
    }

    async delete(id: string) {
        const { error } = await this.supabase
            .getClient()
            .from(this.table)
            .delete()
            .eq('id', id);

        if (error) throw new InternalServerErrorException(error.message);
    }
}
