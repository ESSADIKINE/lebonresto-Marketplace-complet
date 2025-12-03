import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../lib/apiClient';

// Async thunks
export const fetchCities = createAsyncThunk(
    'lookups/fetchCities',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('/cities');
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch cities'
            );
        }
    }
);

export const fetchCategories = createAsyncThunk(
    'lookups/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('/categories');
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch categories'
            );
        }
    }
);

export const fetchTags = createAsyncThunk(
    'lookups/fetchTags',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('/tags');
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch tags'
            );
        }
    }
);

// Initial state
const initialState = {
    cities: [],
    categories: [],
    tags: [],
    loading: false,
    error: null,
};

// Slice
const lookupsSlice = createSlice({
    name: 'lookups',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch cities
            .addCase(fetchCities.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCities.fulfilled, (state, action) => {
                state.loading = false;
                state.cities = action.payload;
            })
            .addCase(fetchCities.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch categories
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Fetch tags
            .addCase(fetchTags.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTags.fulfilled, (state, action) => {
                state.loading = false;
                state.tags = action.payload;
            })
            .addCase(fetchTags.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearError } = lookupsSlice.actions;
export default lookupsSlice.reducer;
