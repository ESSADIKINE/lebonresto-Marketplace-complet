
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * @typedef {Object} RestaurantFull
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string|null} logo_url
 * @property {string} address
 * @property {number|null} latitude
 * @property {number|null} longitude
 * @property {string} phone
 * @property {string} email
 * @property {string} subscription_status
 * @property {string} business_status
 * @property {boolean} is_active
 * @property {number|null} rating_count
 * @property {number|null} rating_avg
 * @property {number|null} min_price
 * @property {number|null} max_price
 * @property {string|null} visit360_url
 * @property {string|null} video_url
 * @property {string|null} hero_image
 * @property {string} created_at
 * @property {string} updated_at
 * @property {string|null} city_id
 * @property {string|null} city_name
 * @property {string|null} city_region
 * @property {string|null} city_country
 * @property {string|null} category_id
 * @property {string|null} category_name
 * @property {string|null} category_slug
 * @property {Array<{id: string, day_of_week: number, is_closed: boolean, open_time: string, close_time: string, break_start: string, break_end: string, notes: string}>|null} horaires_json
 * @property {Array<{id: string, url: string, label: string|null, created_at: string, uploaded_by: string|null}>|null} images_json
 * @property {Array<{id: string, title: string, description: string|null, pdf_url: string, created_at: string}>|null} menus_json
 * @property {Array<{id: string, name: string, description: string|null, price: number, image_url: string|null, is_published: boolean, is_premium: boolean, created_at: string, updated_at: string}>|null} plats_json
 * @property {Array<{id: string, title: string, description: string|null, event_date: string, image_url: string|null, is_paid: boolean, price: number|null, requires_reservation: boolean, is_promo: boolean, discount_percentage: number|null, promo_start_at: string|null, promo_end_at: string|null}>|null} events_json
 * @property {Array<{id: string, name: string}>|null} tags_json
 * @property {{feedback_count: number, avg_rating: number|null, avg_cuisine: number|null, avg_service: number|null, avg_ambiance: number|null}|null} feedback_stats
 * @property {Array<{id: string, customer_id: string, reservation_id: string|null, rating: number, rating_cuisine: number, rating_service: number, rating_ambiance: number, comment: string|null, sentiment_score: number|null, created_at: string}>|null} feedback_list_json
 */

// Async thunk to fetch restaurant full details
export const fetchRestaurantFullById = createAsyncThunk(
    'restaurantDetail/fetchById',
    async (id, { rejectWithValue }) => {
        try {
            // Using direct fetch as requested in the task description, 
            // but ideally we should use apiClient if available.
            // Since manual instructions said fetch(`http://localhost:4000...`), 
            // I will use apiClient to be consistent with the project if possible, 
            // but the prompt explicitly gave an example with fetch. 
            // To be safe and cleaner, I'll use the relative path /restaurants/:id/full 
            // which usually goes through a proxy or base URL configuration in the app.
            // Let's check how apiClient is used in other slices. 
            // In restaurantsSlice.js: apiClient.get(...)

            // I'll stick to the user's example structure but use apiClient if I can import it, 
            // effectively replacing `fetch` with `apiClient.get`.
            // Wait, the user specifically wrote `fetch('http://localhost:4000/...')`.
            // I will use `fetch` to strictly follow instructions but point to the correct URL.
            // Actually, hardcoding localhost:4000 is bad. I'll try to use the environment or just a relative path 
            // if next.config.js proxies it.
            // Given the prompt "Create an async thunk... export const fetchRestaurantFullById...", 
            // I'll implementation it exactly as requested but maybe add a base URL variable.

            const response = await fetch(`http://localhost:4000/restaurants/${id}/full`);
            if (!response.ok) {
                throw new Error(`Failed to fetch restaurant detail: ${response.status}`);
            }
            const data = await response.json();
            return { id, data };
        } catch (err) {
            return rejectWithValue(err.message || 'Unknown error');
        }
    }
);

const initialState = {
    dataById: {},
    loadingById: {},
    errorById: {},
};

const restaurantDetailSlice = createSlice({
    name: 'restaurantDetail',
    initialState,
    reducers: {
        clearRestaurantDetail: (state, action) => {
            const id = action.payload;
            if (id) {
                delete state.dataById[id];
                delete state.loadingById[id];
                delete state.errorById[id];
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRestaurantFullById.pending, (state, action) => {
                const id = action.meta.arg;
                state.loadingById[id] = true;
                state.errorById[id] = null;
            })
            .addCase(fetchRestaurantFullById.fulfilled, (state, action) => {
                const { id, data } = action.payload;
                state.dataById[id] = data;
                state.loadingById[id] = false;
            })
            .addCase(fetchRestaurantFullById.rejected, (state, action) => {
                const id = action.meta.arg;
                state.loadingById[id] = false;
                state.errorById[id] = action.payload;
            });
    },
});

export const { clearRestaurantDetail } = restaurantDetailSlice.actions;

// Selectors
export const selectRestaurantDetail = (state, id) => state.restaurantDetail?.dataById[id] || null;
export const selectRestaurantDetailLoading = (state, id) => !!state.restaurantDetail?.loadingById[id];
export const selectRestaurantDetailError = (state, id) => state.restaurantDetail?.errorById[id] || null;

export default restaurantDetailSlice.reducer;
