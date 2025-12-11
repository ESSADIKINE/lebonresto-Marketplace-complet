import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    UseGuards,
    Request,
    ParseUUIDPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SavedRestaurantsService } from './saved-restaurants.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Assuming generic guard covers it or use specific CustomerGuard

@ApiTags('saved-restaurants')
@ApiBearerAuth()
@Controller() // We will use specific paths rather than a global prefix if we want to mix /restaurants and /me
export class SavedRestaurantsController {
    constructor(private readonly savedRestaurantsService: SavedRestaurantsService) { }

    @Post('restaurants/:id/save')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Save a restaurant to favorites' })
    saveRestaurant(
        @Param('id', ParseUUIDPipe) restaurantId: string,
        @Request() req,
    ) {
        // Assuming JWT strategy puts user in req.user
        // and user.id is the customer/user ID.
        // We should strictly ensure it's a customer if business logic requires, but generic userId works for now.
        const userId = req.user.id || req.user.sub;
        return this.savedRestaurantsService.saveRestaurant(userId, restaurantId);
    }

    @Delete('restaurants/:id/save')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Unsave a restaurant from favorites' })
    unsaveRestaurant(
        @Param('id', ParseUUIDPipe) restaurantId: string,
        @Request() req,
    ) {
        const userId = req.user.id || req.user.sub;
        return this.savedRestaurantsService.unsaveRestaurant(userId, restaurantId);
    }

    @Get('me/saved-restaurants')
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Get my saved restaurants' })
    getMySavedRestaurants(@Request() req) {
        const userId = req.user.id || req.user.sub;
        return this.savedRestaurantsService.getSavedRestaurants(userId);
    }
}
