import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * Base API Slice for LeBonResto Customer-Facing Endpoints
 * 
 * This slice uses RTK Query to handle all API calls for the customer marketplace.
 * It does NOT include owner/admin endpoints - only what public users and customers need.
 */

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000',
    prepareHeaders: (headers) => {
        // Attach customer auth token if available
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('lb_customer_token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
        }
        return headers;
    },
});

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery,
    tagTypes: [
        'Customer',      // Current logged-in customer
        'Restaurant',    // Restaurant listings and details
        'City',          // City reference data
        'Category',      // Category reference data
        'Tag',           // Tag reference data
        'Menu',          // Restaurant menus
        'Plat',          // Restaurant dishes
        'Reservation',   // Customer reservations
        'Feedback',      // Customer reviews/feedback
        'Event',         // Restaurant events
        'Notification',  // Customer notifications
        'SavedRestaurant', // Saved restaurants
    ],
    endpoints: () => ({}), // Endpoints will be injected from other files
});

export default apiSlice;
