import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import { lebonrestoApi } from './api/lebonrestoApi';
import authReducer from './slices/authSlice';
import restaurantsReducer from './slices/restaurantsSlice';
import lookupsReducer from './slices/lookupsSlice';

export const store = configureStore({
    reducer: {
        // RTK Query API Slices
        [apiSlice.reducerPath]: apiSlice.reducer,
        [lebonrestoApi.reducerPath]: lebonrestoApi.reducer,

        // Legacy slices (can be removed if fully migrated to RTK Query)
        auth: authReducer,
        restaurants: restaurantsReducer,
        lookups: lookupsReducer,
    },
    // Add RTK Query middleware for caching, invalidation, polling, etc.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(apiSlice.middleware)
            .concat(lebonrestoApi.middleware),
});

export default store;

