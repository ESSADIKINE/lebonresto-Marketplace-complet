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

        // Get reservations for current customer (if needed later)
        getMyReservations: builder.query({
            query: () => '/me/reservations',
            providesTags: ['Reservation'],
        }),
    }),
});

export const {
    useCreateReservationMutation,
    useGetRestaurantReservationsQuery,
    useGetReservationByIdQuery,
    useGetMyReservationsQuery,
} = reservationsApi;
