import {
    IsBoolean,
    IsEmail,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsDateString,
    IsUUID,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRestaurantLeadDto {
    @ApiProperty({ example: 'Le Bon Resto Casablanca' })
    @IsNotEmpty()
    @IsString()
    restaurant_name: string;

    @ApiPropertyOptional({ example: '392b6c18-72aa-436d-9a45-a7bce9447df7', description: 'UUID of the selected city' })
    @IsOptional()
    @IsUUID()
    city_id?: string;

    @ApiPropertyOptional({ example: 'Casablanca', description: 'Name of the city if not in list' })
    @IsOptional()
    @IsString()
    city_name?: string;

    @ApiPropertyOptional({ example: 'UUID...', description: 'UUID of the selected category' })
    @IsOptional()
    @IsUUID()
    category_id?: string;

    @ApiPropertyOptional({ example: 'Marocain', description: 'Name of category if not in list' })
    @IsOptional()
    @IsString()
    category_name?: string;

    @ApiPropertyOptional({ example: 60 })
    @IsOptional()
    @IsInt()
    seats_count?: number;

    @ApiPropertyOptional({ example: false })
    @IsOptional()
    @IsBoolean()
    has_terrace?: boolean;

    @ApiPropertyOptional({ example: false })
    @IsOptional()
    @IsBoolean()
    has_delivery?: boolean;

    @ApiPropertyOptional({ example: false })
    @IsOptional()
    @IsBoolean()
    has_takeaway?: boolean;

    @ApiProperty({ example: 'Youssef Benali' })
    @IsNotEmpty()
    @IsString()
    contact_name: string;

    @ApiPropertyOptional({ example: 'Gérant' })
    @IsOptional()
    @IsString()
    contact_role?: string;

    @ApiProperty({ example: 'youssef@example.com' })
    @IsNotEmpty()
    @IsEmail()
    contact_email: string;

    @ApiPropertyOptional({ example: '+212600000000' })
    @IsOptional()
    @IsString()
    contact_phone?: string;

    @ApiPropertyOptional({ example: '€€' })
    @IsOptional()
    @IsString()
    average_price_level?: string;

    @ApiPropertyOptional({ example: 'Excel, Cahier' })
    @IsOptional()
    @IsString()
    current_tools?: string;

    @ApiPropertyOptional({ example: 'Je veux augmenter mes réservations.' })
    @IsOptional()
    @IsString()
    message?: string;

    @ApiPropertyOptional({ example: '2023-10-27T10:00:00Z' })
    @IsOptional()
    @IsDateString()
    preferred_contact_at?: string;
}
