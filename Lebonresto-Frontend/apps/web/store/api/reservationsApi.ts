import { apiSlice } from './apiSlice';

/**
 * Reservation API Endpoints (Customer)
 * 
 * Handles customer reservations - viewing and creating
 */

export const reservationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get Current Customer's Reservations
        getMyReservations: builder.query({
            query: () => '/reservations/me',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Reservation' as const, id })),
                        { type: 'Reservation' as const, id: 'LIST' },
                    ]
                    : [{ type: 'Reservation' as const, id: 'LIST' }],
        }),

        // Create a New Reservation
        createReservation: builder.mutation({
            query: (reservationData) => ({
                url: '/reservations',
                method: 'POST',
                body: reservationData,
            }),
            invalidatesTags: [{ type: 'Reservation', id: 'LIST' }],
        }),

        // Get Single Reservation Details (if needed)
        getReservationById: builder.query({
            query: (id) => `/reservations/${id}`,
            providesTags: (result, error, id) => [{ type: 'Reservation', id }],
        }),

        // Update Reservation (e.g., cancel)
        updateReservation: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/reservations/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Reservation', id },
                { type: 'Reservation', id: 'LIST' },
            ],
        }),
    }),
});

export const {
    useGetMyReservationsQuery,
    useCreateReservationMutation,
    useGetReservationByIdQuery,
    useUpdateReservationMutation,
} = reservationsApi;
