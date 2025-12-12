import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseUUIDPipe,
    Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { HorairesService } from './horaires.service';
import { CreateHoraireDto } from './dto/create-horaire.dto';
import { UpdateHoraireDto } from './dto/update-horaire.dto';

@ApiTags('horaires')
@Controller('restaurants/:restaurantId/horaires')
export class HorairesController {
    constructor(private readonly horairesService: HorairesService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new opening hour (horaire) for a restaurant' })
    @ApiParam({ name: 'restaurantId', description: 'Restaurant UUID' })
    @ApiBody({ type: CreateHoraireDto })
    create(
        @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
        @Body() createHoraireDto: CreateHoraireDto,
    ) {
        return this.horairesService.create(restaurantId, createHoraireDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all opening hours for a restaurant' })
    @ApiParam({ name: 'restaurantId', description: 'Restaurant UUID' })
    findAll(@Param('restaurantId', ParseUUIDPipe) restaurantId: string) {
        return this.horairesService.findAllByRestaurant(restaurantId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a specific opening hour by ID' })
    @ApiParam({ name: 'restaurantId', description: 'Restaurant UUID' })
    @ApiParam({ name: 'id', description: 'Horaire UUID' })
    findOne(
        @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
        @Param('id', ParseUUIDPipe) id: string,
    ) {
        // Note: We might want to verify the horaire actually belongs to restaurantId
        // But for now, we just fetch by ID as IDs are unique UUIDs.
        return this.horairesService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update an opening hour (full update)' })
    @ApiParam({ name: 'restaurantId', description: 'Restaurant UUID' })
    @ApiParam({ name: 'id', description: 'Horaire UUID' })
    update(
        @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateHoraireDto: UpdateHoraireDto,
    ) {
        return this.horairesService.update(id, updateHoraireDto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Partially update an opening hour' })
    @ApiParam({ name: 'restaurantId', description: 'Restaurant UUID' })
    @ApiParam({ name: 'id', description: 'Horaire UUID' })
    partialUpdate(
        @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateHoraireDto: UpdateHoraireDto,
    ) {
        return this.horairesService.update(id, updateHoraireDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an opening hour' })
    @ApiParam({ name: 'restaurantId', description: 'Restaurant UUID' })
    @ApiParam({ name: 'id', description: 'Horaire UUID' })
    remove(
        @Param('restaurantId', ParseUUIDPipe) restaurantId: string,
        @Param('id', ParseUUIDPipe) id: string,
    ) {
        return this.horairesService.remove(id);
    }
}
