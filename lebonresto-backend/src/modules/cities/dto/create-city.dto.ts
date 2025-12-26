import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCityDto {
  @ApiProperty({ example: 'Casablanca' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Grand Casablanca' })
  @IsOptional()
  @IsString()
  region?: string;

  @ApiPropertyOptional({ example: 'Morocco', default: 'Morocco' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ example: 0, default: 0 })
  @IsOptional()
  count_restaurants?: number;

  @ApiPropertyOptional({ example: 'https://example.com/city.jpg' })
  @IsOptional()
  @IsString()
  city_image?: string;

  @ApiPropertyOptional({ example: 33.5731 })
  @IsOptional()
  latitude?: number;

  @ApiPropertyOptional({ example: -7.5898 })
  @IsOptional()
  longitude?: number;

  @ApiPropertyOptional({ example: 'https://example.com/icon.png' })
  @IsOptional()
  @IsString()
  icon_url?: string;
}
