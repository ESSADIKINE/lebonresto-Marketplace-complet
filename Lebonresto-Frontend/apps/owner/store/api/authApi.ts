import { apiSlice } from './apiSlice';

/**
 * Auth API Endpoints (Customer Only)
 * 
 * Handles customer authentication: login, register, profile management
 */

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Customer Login
        loginCustomer: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: {
                    ...credentials,
                    type: 'customer',
                },
            }),
            invalidatesTags: ['Customer'],
            // Transform response to store token
            transformResponse: (response) => {
                if (typeof window !== 'undefined' && response.access_token) {
                    localStorage.setItem('lb_customer_token', response.access_token);
                }
                return response;
            },
        }),

        // Customer Registration
        registerCustomer: builder.mutation({
            query: (customerData) => ({
                url: '/auth/register/customer',
                method: 'POST',
                body: {
                    ...customerData,
                    type: 'customer',
                },
            }),
            invalidatesTags: ['Customer'],
            // Transform response to store token
            transformResponse: (response) => {
                if (typeof window !== 'undefined' && response.access_token) {
                    localStorage.setItem('lb_customer_token', response.access_token);
                }
                return response;
            },
        }),

        // Get Current Customer Profile
        getCurrentCustomer: builder.query({
            query: () => '/customers/me',
            providesTags: ['Customer'],
        }),

        // Update Customer Profile
        updateCustomerProfile: builder.mutation({
            query: (profileData) => ({
                url: '/customers/me',
                method: 'PUT',
                body: profileData,
            }),
            invalidatesTags: ['Customer'],
        }),

        // Logout (client-side only - clears token)
        // Note: This is not an API call, just a helper
    }),
});

export const {
    useLoginCustomerMutation,
    useRegisterCustomerMutation,
    useGetCurrentCustomerQuery,
    useUpdateCustomerProfileMutation,
} = authApi;

// Helper function for logout (not an API call)
export const logout = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('lb_customer_token');
    }
    // Optionally dispatch an action to reset the API state
    return { type: 'auth/logout' };
};
