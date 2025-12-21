import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../lib/apiClient';

// Async thunks
export const fetchRestaurants = createAsyncThunk(
    'restaurants/fetchRestaurants',
    async (filters = {}, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams();
            if (filters.cityId) params.append('cityId', filters.cityId);
            if (filters.categoryId) params.append('categoryId', filters.categoryId);
            if (filters.tagId) params.append('tagId', filters.tagId);
            if (filters.q) params.append('q', filters.q);
            if (filters.page) params.append('page', filters.page);
            if (filters.limit) params.append('limit', filters.limit);

            const response = await apiClient.get(`/restaurants?${params.toString()}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch restaurants'
            );
        }
    }
);

export const fetchRestaurantById = createAsyncThunk(
    'restaurants/fetchRestaurantById',
    async (restaurantId, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/restaurants/${restaurantId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch restaurant'
            );
        }
    }
);

export const fetchRestaurantImages = createAsyncThunk(
    'restaurants/fetchRestaurantImages',
    async (restaurantId, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/restaurants/${restaurantId}/images`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch images'
            );
        }
    }
);

export const fetchRestaurantMenus = createAsyncThunk(
    'restaurants/fetchRestaurantMenus',
    async (restaurantId, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/restaurants/${restaurantId}/menus`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch menus'
            );
        }
    }
);

export const fetchRestaurantPlats = createAsyncThunk(
    'restaurants/fetchRestaurantPlats',
    async (restaurantId, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/restaurants/${restaurantId}/plats`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch plats'
            );
        }
    }
);

export const fetchRestaurantEvents = createAsyncThunk(
    'restaurants/fetchRestaurantEvents',
    async (restaurantId, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/restaurants/${restaurantId}/events`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch events'
            );
        }
    }
);

export const fetchRestaurantFeedback = createAsyncThunk(
    'restaurants/fetchRestaurantFeedback',
    async (restaurantId, { rejectWithValue }) => {
        try {
            const response = await apiClient.get(`/restaurants/${restaurantId}/feedback`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch feedback'
            );
        }
    }
);

// Initial state
const initialState = {
    restaurants: [],
    selectedRestaurant: null,
    restaurantImages: [],
    restaurantMenus: [],
    restaurantPlats: [],
    restaurantEvents: [],
    restaurantFeedback: [],
    filters: {
        cityId: null,
        categoryId: null,
        tagId: null,
        q: '',
        page: 1,
        limit: 10,
    },
    totalCount: 0,
    loading: false,
    error: null,
};

// Slice
const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = initialState.filters;
        },
        clearSelectedRestaurant: (state) => {
            state.selectedRestaurant = null;
            state.restaurantImages = [];
            state.restaurantMenus = [];
            state.restaurantPlats = [];
            state.restaurantEvents = [];
            state.restaurantFeedback = [];
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch restaurants
            .addCase(fetchRestaurants.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRestaurants.fulfilled, (state, action) => {
                state.loading = false;
                state.restaurants = action.payload.data || action.payload;
                state.totalCount = action.payload.total || action.payload.length;
            })
            .addCase(fetchRestaurants.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch restaurant by ID
            .addCase(fetchRestaurantById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRestaurantById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedRestaurant = action.payload;
            })
            .addCase(fetchRestaurantById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch restaurant images
            .addCase(fetchRestaurantImages.fulfilled, (state, action) => {
                state.restaurantImages = action.payload;
            })

            // Fetch restaurant menus
            .addCase(fetchRestaurantMenus.fulfilled, (state, action) => {
                state.restaurantMenus = action.payload;
            })

            // Fetch restaurant plats
            .addCase(fetchRestaurantPlats.fulfilled, (state, action) => {
                state.restaurantPlats = action.payload;
            })

            // Fetch restaurant events
            .addCase(fetchRestaurantEvents.fulfilled, (state, action) => {
                state.restaurantEvents = action.payload;
            })

            // Fetch restaurant feedback
            .addCase(fetchRestaurantFeedback.fulfilled, (state, action) => {
                state.restaurantFeedback = action.payload;
            });
    },
});

export const { setFilters, clearFilters, clearSelectedRestaurant, clearError } = restaurantsSlice.actions;
export default restaurantsSlice.reducer;
