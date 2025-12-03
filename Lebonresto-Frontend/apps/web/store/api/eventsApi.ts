import { apiSlice } from './apiSlice';

/**
 * Events API Endpoints (Public)
 * 
 * Handles fetching upcoming events
 */

export const eventsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get Upcoming Events (Global)
        getUpcomingEvents: builder.query({
            query: () => '/events/upcoming',
            providesTags: [{ type: 'Event', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetUpcomingEventsQuery,
} = eventsApi;
