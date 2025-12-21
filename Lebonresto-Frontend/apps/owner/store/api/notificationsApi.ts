import { apiSlice } from './apiSlice';

/**
 * Notification API Endpoints (Customer)
 * 
 * Handles customer notifications for reservations, updates, etc.
 */

export const notificationsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // Get Current Customer's Notifications
        getMyNotifications: builder.query({
            query: () => '/notifications/me',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Notification' as const, id })),
                        { type: 'Notification' as const, id: 'LIST' },
                    ]
                    : [{ type: 'Notification' as const, id: 'LIST' }],
        }),

        // Mark Notification as Seen/Read
        markNotificationAsSeen: builder.mutation({
            query: (id) => ({
                url: `/notifications/${id}/seen`,
                method: 'PATCH',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Notification', id },
                { type: 'Notification', id: 'LIST' },
            ],
            // Optimistic update for better UX
            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    notificationsApi.util.updateQueryData('getMyNotifications', undefined, (draft) => {
                        const notification = draft.find((n) => n.id === id);
                        if (notification) {
                            notification.is_seen = true;
                        }
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),

        // Mark All Notifications as Seen
        markAllNotificationsAsSeen: builder.mutation({
            query: () => ({
                url: '/notifications/seen-all',
                method: 'PATCH',
            }),
            invalidatesTags: [{ type: 'Notification', id: 'LIST' }],
        }),

        // Delete Notification
        deleteNotification: builder.mutation({
            query: (id) => ({
                url: `/notifications/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Notification', id },
                { type: 'Notification', id: 'LIST' },
            ],
        }),
    }),
});

export const {
    useGetMyNotificationsQuery,
    useMarkNotificationAsSeenMutation,
    useMarkAllNotificationsAsSeenMutation,
    useDeleteNotificationMutation,
} = notificationsApi;
