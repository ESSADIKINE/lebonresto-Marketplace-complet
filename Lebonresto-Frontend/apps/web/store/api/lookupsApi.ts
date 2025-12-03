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
    }),
});

export const {
    useGetCitiesQuery,
    useGetCategoriesQuery,
    useGetTagsQuery,
} = lookupsApi;
