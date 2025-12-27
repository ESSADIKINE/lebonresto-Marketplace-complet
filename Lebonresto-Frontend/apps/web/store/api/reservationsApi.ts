import { apiSlice } from './apiSlice';

export const reservationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Create new reservation
        createReservation: builder.mutation({
            query: (reservationData) => ({
                url: '/reservations',
                method: 'POST',
                body: reservationData,
            }),
            invalidatesTags: ['Reservation', 'Restaurant'], // Invalidate restaurant to update most-reserved stats if needed
        }),

        // Get reservations by restaurant (for admin or checking availability)
        getRestaurantReservations: builder.query({
            query: (restaurantId) => `/restaurants/${restaurantId}/reservations`,
            providesTags: (result, error, id) => [{ type: 'Reservation', id: `LIST_RESTAURANT_${id}` }],
        }),

        // Get single reservation
        getReservationById: builder.query({
            query: (id) => `/reservations/${id}`,
            providesTags: (result, error, id) => [{ type: 'Reservation', id }],
        }),

        // Update reservation
        updateReservation: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/reservations/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Reservation', id }],
        }),

        // Get reservations for a specific customer
        getCustomerReservations: builder.query({
            query: (customerId) => `/customers/${customerId}/reservations`,
            providesTags: (result, error, customerId) => [
                { type: 'Reservation', id: `CUSTOMER_${customerId}` }
            ],
        }),
    }),
});

export const {
    useCreateReservationMutation,
    useGetRestaurantReservationsQuery,
    useGetReservationByIdQuery,
    useUpdateReservationMutation,
    useGetCustomerReservationsQuery,
} = reservationsApi;
