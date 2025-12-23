import { apiSlice } from './apiSlice';
import {
    Restaurant,
    GetRestaurantsParams,
    GetMostReservedParams,
    GetPromoRestaurantsParams
} from './types';

/**
 * Restaurant API Endpoints (Public)
 * 
 * Handles fetching restaurant listings, details, and related data
 */

export const restaurantsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get All Restaurants (with filters)
        getRestaurants: builder.query({
            query: (filters = {}) => {
                const params = new URLSearchParams();

                // If promoOnly is active, switch endpoint to /restaurants/promos
                const isPromoRequest = filters.promoOnly === true || filters.promoOnly === 'true';
                const endpoint = isPromoRequest ? '/restaurants/promos' : '/restaurants';

                if (filters.cityId || filters.city_id) params.append('cityId', filters.cityId || filters.city_id);
                if (filters.categoryId || filters.category_id) params.append('categoryId', filters.categoryId || filters.category_id);
                if (filters.tags) params.append('tags', filters.tags);
                if (filters.q) params.append('q', filters.q);
                if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
                if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
                if (filters.minRating) params.append('minRating', filters.minRating.toString());
                if (filters.page) params.append('page', filters.page.toString());
                if (filters.limit) params.append('limit', filters.limit.toString());
                // Geospatial params
                if (filters.latitude) params.append('latitude', filters.latitude.toString());
                if (filters.longitude) params.append('longitude', filters.longitude.toString());
                if (filters.radius) params.append('radius', filters.radius.toString());

                if (filters.status) params.append('status', filters.status);

                // Sort might be different for promos, but passing it is safe usually
                if (filters.sort) params.append('sort', filters.sort);

                const queryString = params.toString();
                return `${endpoint}${queryString ? `?${queryString}` : ''}`;
            },
            providesTags: (result) =>
                result && result.data && Array.isArray(result.data)
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'Restaurant' as const, id })),
                        { type: 'Restaurant' as const, id: 'LIST' },
                    ]
                    : [{ type: 'Restaurant' as const, id: 'LIST' }],
        }),

        // Get Single Restaurant by ID
        getRestaurantById: builder.query({
            query: (id) => `/restaurants/${id}`,
            providesTags: (result, error, id) => [{ type: 'Restaurant', id }],
        }),

        // Get Unified Restaurant Details
        getRestaurantDetails: builder.query({
            query: (id) => `/restaurants/${id}/details`,
            providesTags: (result, error, id) => [
                { type: 'Restaurant', id },
                { type: 'Menu', id: `RESTAURANT_${id}` },
                { type: 'Plat', id: `RESTAURANT_${id}` },
                { type: 'Event', id: `RESTAURANT_${id}` },
                { type: 'Feedback', id: `RESTAURANT_${id}` },
            ],
        }),

        // Get Restaurant Images
        getRestaurantImages: builder.query({
            query: (restaurantId) => `/restaurants/${restaurantId}/images`,
            providesTags: (result, error, restaurantId) => [
                { type: 'Restaurant', id: restaurantId },
            ],
        }),

        // Get Restaurant Menus
        getRestaurantMenus: builder.query({
            query: (restaurantId) => `/restaurants/${restaurantId}/menus`,
            providesTags: (result, error, restaurantId) => [
                { type: 'Menu', id: `RESTAURANT_${restaurantId}` },
            ],
        }),

        // Get Restaurant Plats (Dishes)
        getRestaurantPlats: builder.query({
            query: (restaurantId) => `/restaurants/${restaurantId}/plats`,
            providesTags: (result, error, restaurantId) => [
                { type: 'Plat', id: `RESTAURANT_${restaurantId}` },
            ],
        }),

        // Get Restaurant Events
        getRestaurantEvents: builder.query({
            query: (restaurantId) => `/restaurants/${restaurantId}/events`,
            providesTags: (result, error, restaurantId) => [
                { type: 'Event', id: `RESTAURANT_${restaurantId}` },
            ],
        }),

        // Get Restaurant Feedback (Reviews)
        getRestaurantFeedback: builder.query({
            query: (restaurantId) => `/restaurants/${restaurantId}/feedback`,
            providesTags: (result, error, restaurantId) => [
                { type: 'Feedback', id: `RESTAURANT_${restaurantId}` },
            ],
        }),

        // --- New Endpoints for Home Page ---



        // ... (existing code)

        // Get Restaurants with Promos
        getPromoRestaurants: builder.query<Restaurant[], GetPromoRestaurantsParams | void>({
            query: ({ limit = 10, cityId }: GetPromoRestaurantsParams = {}) => {
                const params = new URLSearchParams();
                if (limit) params.append('limit', limit.toString());
                if (cityId) params.append('cityId', cityId.toString());
                return `/restaurants/promos?${params.toString()}`;
            },
            providesTags: [{ type: 'Restaurant', id: 'PROMOS' }],
        }),

        // Get Most Reserved Restaurants
        getMostReservedRestaurants: builder.query<Restaurant[], GetMostReservedParams | void>({
            query: ({ limit = 10, period = 'month', cityId }: GetMostReservedParams = {}) => {
                const params = new URLSearchParams();
                if (limit) params.append('limit', limit.toString());
                if (period) params.append('period', period);
                if (cityId) params.append('cityId', cityId.toString());
                return `/restaurants/most-reserved?${params.toString()}`;
            },
            providesTags: [{ type: 'Restaurant', id: 'MOST_RESERVED' }],
        }),

        // Get Recommended (Premium status)
        getRecommendedRestaurants: builder.query<Restaurant[], GetRestaurantsParams | void>({
            query: ({ limit = 12 }: GetRestaurantsParams = {}) => {
                const params = new URLSearchParams();
                if (limit) params.append('limit', limit.toString());
                // User requested to filter by premium status instead of sort=recommended
                params.append('status', 'premium');
                return `/restaurants?${params.toString()}`;
            },
            providesTags: [{ type: 'Restaurant', id: 'RECOMMENDED' }],
        }),

        // Get Latest Restaurants
        getLatestRestaurants: builder.query<Restaurant[], GetRestaurantsParams | void>({
            query: ({ limit = 10, sort = 'newest' }: GetRestaurantsParams = {}) => {
                const params = new URLSearchParams();
                if (limit) params.append('limit', limit.toString());
                if (sort) params.append('sort', sort);
                return `/restaurants?${params.toString()}`;
            },
            providesTags: [{ type: 'Restaurant', id: 'LATEST' }],
        }),

        // --- Detail Page Endpoints ---

        getRestaurantTags: builder.query({
            query: (id) => `/restaurants/${id}/tags`,
            providesTags: (result, error, id) => [{ type: 'Tag', id: `RESTAURANT_${id}` }],
        }),

        getRestaurantSummary: builder.query({
            query: (id) => `/restaurants/${id}/summary`,
            providesTags: (result, error, id) => [{ type: 'Restaurant', id: `SUMMARY_${id}` }],
        }),

        saveRestaurant: builder.mutation({
            query: (id) => ({
                url: `/restaurants/${id}/save`,
                method: 'POST',
            }),
            invalidatesTags: ['SavedRestaurant'],
        }),

        unsaveRestaurant: builder.mutation({
            query: (id) => ({
                url: `/restaurants/${id}/save`,
                method: 'DELETE',
            }),
            invalidatesTags: ['SavedRestaurant'],
        }),

        getSavedRestaurants: builder.query({
            query: () => '/me/saved-restaurants',
            providesTags: ['SavedRestaurant'],
        }),
    }),
});

export const {
    useGetRestaurantsQuery,
    useGetRestaurantByIdQuery,
    useGetRestaurantDetailsQuery,
    useGetRestaurantImagesQuery,
    useGetRestaurantMenusQuery,
    useGetRestaurantPlatsQuery,
    useGetRestaurantEventsQuery,
    useGetRestaurantFeedbackQuery,
    useGetPromoRestaurantsQuery,
    useGetMostReservedRestaurantsQuery,
    useGetRecommendedRestaurantsQuery,
    useGetLatestRestaurantsQuery,
    useGetRestaurantTagsQuery,
    useGetRestaurantSummaryQuery,
    useSaveRestaurantMutation,
    useUnsaveRestaurantMutation,
    useGetSavedRestaurantsQuery,
} = restaurantsApi;
