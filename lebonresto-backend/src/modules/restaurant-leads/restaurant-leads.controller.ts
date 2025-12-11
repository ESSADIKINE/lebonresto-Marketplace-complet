/*
curl -X POST "http://localhost:3000/restaurant-leads" \
  -H "Content-Type: application/json" \
  -d '{
    "restaurant_name": "Le Bon Resto Casablanca",
    "city_name": "Casablanca",
    "category_name": "Marocain",
    "seats_count": 60,
    "has_terrace": true,
    "has_delivery": true,
    "has_takeaway": false,
    "contact_name": "Youssef Benali",
    "contact_email": "youssef@example.com",
    "contact_phone": "+212600000000",
    "average_price_level": "€€",
    "message": "Je veux augmenter mes réservations en semaine."
  }'

curl -X GET "http://localhost:3000/restaurant-leads"
*/

import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe,
} from '@nestjs/common';
import { RestaurantLeadsService } from './restaurant-leads.service';
import { CreateRestaurantLeadDto } from './dto/create-restaurant-lead.dto';
import { UpdateRestaurantLeadDto } from './dto/update-restaurant-lead.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('restaurant-leads')
@Controller('restaurant-leads')
export class RestaurantLeadsController {
    constructor(
        private readonly restaurantLeadsService: RestaurantLeadsService,
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create a new restaurant lead' })
    create(@Body() createRestaurantLeadDto: CreateRestaurantLeadDto) {
        return this.restaurantLeadsService.create(createRestaurantLeadDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all restaurant leads' })
    findAll() {
        return this.restaurantLeadsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a restaurant lead by ID' })
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.restaurantLeadsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a restaurant lead' })
    update(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateRestaurantLeadDto: UpdateRestaurantLeadDto,
    ) {
        return this.restaurantLeadsService.update(id, updateRestaurantLeadDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a restaurant lead' })
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.restaurantLeadsService.remove(id);
    }
}
