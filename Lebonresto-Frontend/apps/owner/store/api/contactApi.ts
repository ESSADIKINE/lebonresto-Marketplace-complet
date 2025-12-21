import { apiSlice } from './apiSlice';

/**
 * Contact Messages API Endpoints (Public)
 * 
 * Handles contact form submissions from the "Contact Us" page
 */

export const contactApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Submit Contact Form Message
        submitContactMessage: builder.mutation({
            query: (messageData) => ({
                url: '/contact-messages',
                method: 'POST',
                body: messageData,
            }),
            // No tags needed as this is a one-way submission
        }),
    }),
});

export const {
    useSubmitContactMessageMutation,
} = contactApi;
