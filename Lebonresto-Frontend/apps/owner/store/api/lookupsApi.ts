import { apiSlice } from './apiSlice';

/**
 * Reference Data API Endpoints (Public)
 * 
 * Handles fetching cities, categories, and tags for filtering and display
 */

export const lookupsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get All Cities
        getCities: builder.query({
            query: () => '/cities',
            providesTags: ['City'],
        }),

        // Get All Categories
        getCategories: builder.query({
            query: () => '/categories',
            providesTags: ['Category'],
        }),

        // Get All Tags
        getTags: builder.query({
            query: () => '/tags',
            providesTags: ['Tag'],
        }),

        // Get City By ID
        getCityById: builder.query({
            query: (id) => `/cities/${id}`,
            providesTags: (result, error, id) => [{ type: 'City', id }],
        }),

        // Get Category By ID
        getCategoryById: builder.query({
            query: (id) => `/categories/${id}`,
            providesTags: (result, error, id) => [{ type: 'Category', id }],
        }),
    }),
});

export const {
    useGetCitiesQuery,
    useGetCategoriesQuery,
    useGetTagsQuery,
    useGetCityByIdQuery,
    useGetCategoryByIdQuery,
} = lookupsApi;
