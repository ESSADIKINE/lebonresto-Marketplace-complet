import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../../../../database/supabase.service';

@Injectable()
export class AdminRefreshTokenRepository {
    private readonly table = 'admin_refresh_tokens';

    constructor(private readonly supabase: SupabaseService) { }

    async create(data: {
        admin_id: string;
        token_hash: string;
        expires_at: Date;
        user_agent?: string;
        ip?: string;
    }) {
        const { error } = await this.supabase
            .getClient()
            .from(this.table)
            .insert(data);

        if (error) throw new InternalServerErrorException('Could not create refresh token');
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

        if (error) throw new InternalServerErrorException('Could not revoke token');
    }
}
