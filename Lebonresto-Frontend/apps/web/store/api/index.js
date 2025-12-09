/**
 * API Index - Central Export for all RTK Query APIs
 * 
 * This file exports all customer-facing API endpoints for easy imports.
 * Use this file to import hooks from any API slice.
 */

// Base API Slice
export { apiSlice } from './apiSlice';

// Auth API
export {
    authApi,
    useLoginCustomerMutation,
    useRegisterCustomerMutation,
    useGetCurrentCustomerQuery,
    useUpdateCustomerProfileMutation,
    logout,
} from './authApi';

// Lookups API (Reference Data)
export {
    lookupsApi,
    useGetCitiesQuery,
    useGetCategoriesQuery,
    useGetTagsQuery,
} from './lookupsApi';

// Restaurants API
export {
    restaurantsApi,
    useGetRestaurantsQuery,
    useGetRestaurantByIdQuery,
    useGetRestaurantImagesQuery,
    useGetRestaurantMenusQuery,
    useGetRestaurantPlatsQuery,
    useGetRestaurantEventsQuery,
    useGetRestaurantFeedbackQuery,
    useGetPromoRestaurantsQuery,
    useGetMostReservedRestaurantsQuery,
    useGetRecommendedRestaurantsQuery,
    useGetLatestRestaurantsQuery,
    useGetRestaurantTagsQuery,
    useGetRestaurantSummaryQuery,
    useSaveRestaurantMutation,
    useUnsaveRestaurantMutation,
    useGetSavedRestaurantsQuery,
} from './restaurantsApi';

// Reservations API
export {
    reservationsApi,
    useGetMyReservationsQuery,
    useCreateReservationMutation,
    useGetReservationByIdQuery,
    useUpdateReservationMutation,
    useGetRestaurantReservationsQuery,
} from './reservationsApi';

// Feedback API
export {
    feedbackApi,
    useCreateFeedbackMutation,
    useGetMyFeedbackQuery,
    useUpdateFeedbackMutation,
    useDeleteFeedbackMutation,
    useGetLatestFeedbackQuery,
} from './feedbackApi';

// Events API
export {
    eventsApi,
    useGetUpcomingEventsQuery,
} from './eventsApi';

// Notifications API
export {
    notificationsApi,
    useGetMyNotificationsQuery,
    useMarkNotificationAsSeenMutation,
    useMarkAllNotificationsAsSeenMutation,
    useDeleteNotificationMutation,
} from './notificationsApi';

// Contact API
export {
    contactApi,
    useSubmitContactMessageMutation,
} from './contactApi';
