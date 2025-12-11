import { PartialType } from '@nestjs/swagger';
import { CreateRestaurantLeadDto } from './create-restaurant-lead.dto';

export class UpdateRestaurantLeadDto extends PartialType(CreateRestaurantLeadDto) { }
