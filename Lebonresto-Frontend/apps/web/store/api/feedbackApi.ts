import { apiSlice } from './apiSlice';

/**
 * Feedback API Endpoints (Customer)
 * 
 * Handles customer reviews and ratings for restaurants
 */

export const feedbackApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Create Feedback/Review
        createFeedback: builder.mutation({
            query: (feedbackData) => ({
                url: '/feedback',
                method: 'POST',
                body: feedbackData,
            }),
            // Invalidate restaurant feedback cache to show new review
            invalidatesTags: (result, error, { restaurant_id }) => [
                { type: 'Feedback', id: `RESTAURANT_${restaurant_id}` },
                { type: 'Restaurant', id: restaurant_id },
            ],
        }),

        // Get Customer's Own Feedback (if backend supports this)
        getMyFeedback: builder.query({
            query: () => '/feedback/me',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Feedback' as const, id })),
                        { type: 'Feedback' as const, id: 'MY_LIST' },
                    ]
                    : [{ type: 'Feedback' as const, id: 'MY_LIST' }],
        }),

        // Update Feedback (edit review)
        updateFeedback: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/feedback/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id, restaurant_id }) => [
                { type: 'Feedback', id },
                { type: 'Feedback', id: `RESTAURANT_${restaurant_id}` },
                { type: 'Feedback', id: 'MY_LIST' },
                { type: 'Restaurant', id: restaurant_id },
            ],
        }),

        // Delete Feedback
        deleteFeedback: builder.mutation({
            query: (id) => ({
                url: `/feedback/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Feedback', id },
                { type: 'Feedback', id: 'MY_LIST' },
            ],
        }),

        // Get Latest Feedback (Global)
        getLatestFeedback: builder.query({
            query: () => '/feedback',
            providesTags: [{ type: 'Feedback', id: 'LIST' }],
        }),

        // Get Customer Feedback
        getCustomerFeedback: builder.query({
            query: (customerId) => `/customers/${customerId}/feedback`,
            providesTags: (result, error, customerId) => [
                { type: 'Feedback', id: `CUSTOMER_${customerId}` },
            ],
        }),
    }),
});

export const {
    useCreateFeedbackMutation,
    useGetMyFeedbackQuery,
    useUpdateFeedbackMutation,
    useDeleteFeedbackMutation,
    useGetLatestFeedbackQuery,
    useGetCustomerFeedbackQuery,
} = feedbackApi;
