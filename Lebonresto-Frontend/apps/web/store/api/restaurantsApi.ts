import { apiSlice } from './apiSlice';

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

                if (filters.city_id) params.append('cityId', filters.city_id);
                if (filters.category_id) params.append('categoryId', filters.category_id);
                if (filters.tags) params.append('tags', filters.tags); // comma-separated tag ids
                if (filters.q) params.append('q', filters.q);
                if (filters.page) params.append('page', filters.page.toString());
                if (filters.limit) params.append('limit', filters.limit.toString());

                const queryString = params.toString();
                return `/restaurants${queryString ? `?${queryString}` : ''}`;
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
    }),
});

export const {
    useGetRestaurantsQuery,
    useGetRestaurantByIdQuery,
    useGetRestaurantImagesQuery,
    useGetRestaurantMenusQuery,
    useGetRestaurantPlatsQuery,
    useGetRestaurantEventsQuery,
    useGetRestaurantFeedbackQuery,
} = restaurantsApi;
