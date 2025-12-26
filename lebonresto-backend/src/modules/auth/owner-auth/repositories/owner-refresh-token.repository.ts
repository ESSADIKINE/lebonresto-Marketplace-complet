import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../../../../database/supabase.service';

@Injectable()
export class OwnerRefreshTokenRepository {
    private readonly table = 'owner_refresh_tokens';

    constructor(private readonly supabase: SupabaseService) { }

    async create(data: {
        owner_id: string;
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
            console.error('Error creating owner refresh token:', error);
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

    async revokeAllForOwner(ownerId: string) {
        const { error } = await this.supabase
            .getClient()
            .from(this.table)
            .update({ revoked_at: new Date() })
            .eq('owner_id', ownerId);

        if (error) throw new InternalServerErrorException('Could not revoke tokens');
    }
}
