import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsNumber,
  IsUUID,
  Min,
  Max,
  IsInt,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateFeedbackDto {
  @ApiProperty({ example: 'uuid-customer' })
  @IsUUID()
  @IsNotEmpty()
  customer_id: string;

  @ApiProperty({ example: 'uuid-restaurant' })
  @IsUUID()
  @IsNotEmpty()
  restaurant_id: string;

  @ApiPropertyOptional({ example: 'uuid-reservation' })
  @IsOptional()
  @IsUUID()
  reservation_id?: string;

  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rating_cuisine: number;

  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rating_service: number;

  @ApiProperty({ example: 5, minimum: 1, maximum: 5 })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsNotEmpty()
  rating_ambiance: number;

  @ApiPropertyOptional({ example: 'Great food!' })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiPropertyOptional({ example: 0.5 })
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  sentiment_score?: number;
}
