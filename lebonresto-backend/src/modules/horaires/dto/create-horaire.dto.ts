import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsBoolean,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    Max,
    Min,
    ValidateIf,
} from 'class-validator';

export class CreateHoraireDto {
    @ApiProperty({ description: 'Day of week (1 = Monday, 7 = Sunday)', example: 1 })
    @IsInt()
    @Min(1)
    @Max(7)
    @IsNotEmpty()
    day_of_week: number;

    @ApiProperty({ description: 'Is the restaurant closed on this day?', example: false })
    @IsBoolean()
    @IsNotEmpty()
    is_closed: boolean;

    @ApiPropertyOptional({ description: 'Opening time (HH:MM)', example: '09:00' })
    @ValidateIf((o) => !o.is_closed)
    @IsString()
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, {
        message: 'open_time must be in HH:MM or HH:MM:SS format',
    })
    open_time?: string;

    @ApiPropertyOptional({ description: 'Closing time (HH:MM)', example: '23:00' })
    @ValidateIf((o) => !o.is_closed)
    @IsString()
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, {
        message: 'close_time must be in HH:MM or HH:MM:SS format',
    })
    close_time?: string;

    @ApiPropertyOptional({ description: 'Break start time (HH:MM)', example: '14:00' })
    @IsOptional()
    @IsString()
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, {
        message: 'break_start must be in HH:MM or HH:MM:SS format',
    })
    break_start?: string | null;

    @ApiPropertyOptional({ description: 'Break end time (HH:MM)', example: '18:00' })
    @IsOptional()
    @IsString()
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/, {
        message: 'break_end must be in HH:MM or HH:MM:SS format',
    })
    break_end?: string | null;

    @ApiPropertyOptional({ description: 'Additional notes', example: 'Fermé jours fériés' })
    @IsOptional()
    @IsString()
    notes?: string | null;
}
