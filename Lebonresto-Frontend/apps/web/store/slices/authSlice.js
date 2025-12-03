import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../lib/apiClient';

// Async thunks
export const loginCustomer = createAsyncThunk(
    'auth/loginCustomer',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/auth/login', {
                ...credentials,
                role: 'customer',
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Login failed'
            );
        }
    }
);

export const registerCustomer = createAsyncThunk(
    'auth/registerCustomer',
    async (customerData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post('/auth/register/customer', customerData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Registration failed'
            );
        }
    }
);

export const fetchCurrentCustomer = createAsyncThunk(
    'auth/fetchCurrentCustomer',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('/customers/me');
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || 'Failed to fetch customer'
            );
        }
    }
);

// Initial state
const initialState = {
    user: null,
    token: typeof window !== 'undefined' ? localStorage.getItem('lb_customer_token') : null,
    loading: false,
    error: null,
    isAuthenticated: false,
};

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('lb_customer_token');
            }
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.access_token;
                state.isAuthenticated = true;
                state.error = null;
                if (typeof window !== 'undefined') {
                    localStorage.setItem('lb_customer_token', action.payload.access_token);
                }
            })
            .addCase(loginCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })

            // Register
            .addCase(registerCustomer.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.access_token;
                state.isAuthenticated = true;
                state.error = null;
                if (typeof window !== 'undefined') {
                    localStorage.setItem('lb_customer_token', action.payload.access_token);
                }
            })
            .addCase(registerCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })

            // Fetch current customer
            .addCase(fetchCurrentCustomer.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCurrentCustomer.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(fetchCurrentCustomer.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
                state.token = null;
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('lb_customer_token');
                }
            });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
