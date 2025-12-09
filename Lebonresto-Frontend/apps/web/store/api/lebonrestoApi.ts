import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
    Restaurant,
    Category,
    City,
    Customer,
    Owner,
    Admin,
    Menu,
    Plat,
    Reservation,
    Feedback,
    Event,
    Notification,
    Tag,
    RestaurantImage,
    SavedRestaurant,
    RestaurantSummary,
    ContactMessage,
    LoginRequest,
    LoginResponse,
    RegisterCustomerRequest,
    RegisterCustomerResponse,
    CreateReservationRequest,
    CreateFeedbackRequest,
    CreateRestaurantRequest,
    UpdateCustomerRequest,
    GetRestaurantsParams,
    SearchRestaurantsParams,
    GetMostReservedParams,
    PaginatedResponse,
} from './types';

/**
 * LeBonResto API - Comprehensive RTK Query Slice
 * 
 * Base URL: http://localhost:3000
 * All endpoints for the LeBonResto restaurant marketplace
 */

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
    prepareHeaders: (headers) => {
        // Attach auth token if available
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('lb_customer_token') ||
                localStorage.getItem('lb_owner_token') ||
                localStorage.getItem('lb_admin_token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
        }
        return headers;
    },
});

export const lebonrestoApi = createApi({
    reducerPath: 'lebonrestoApi',
    baseQuery,
    tagTypes: [
        'Restaurant',
        'Category',
        'City',
        'Reservation',
        'Feedback',
        'Event',
        'Customer',
        'Owner',
        'Admin',
        'Tag',
        'SavedRestaurant',
        'Notification',
        'Menu',
        'Plat',
    ],
    endpoints: (builder) => ({
        // ========================
        // AUTH ENDPOINTS
        // ========================

        // curl -X POST "http://localhost:3000/auth/login" -H "Content-Type: application/json" -d '{"email":"customer@test.com","password":"password123"}'
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        // curl -X POST "http://localhost:3000/auth/register/customer" -H "Content-Type: application/json" -d '{"email":"new@test.com","password":"pass123","name":"John Doe","phone":"0612345678"}'
        registerCustomer: builder.mutation<RegisterCustomerResponse, RegisterCustomerRequest>({
            query: (data) => ({
                url: '/auth/register/customer',
                method: 'POST',
                body: data,
            }),
        }),

        // ========================
        // CUSTOMERS ENDPOINTS
        // ========================

        // curl -X POST "http://localhost:3000/customers" -H "Content-Type: application/json" -d '{...}'
        createCustomer: builder.mutation<Customer, Partial<Customer>>({
            query: (body) => ({
                url: '/customers',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Customer', id: 'LIST' }],
        }),

        // curl -X GET "http://localhost:3000/customers"
        getCustomers: builder.query<Customer[], void>({
            query: () => '/customers',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Customer' as const, id })),
                        { type: 'Customer', id: 'LIST' },
                    ]
                    : [{ type: 'Customer', id: 'LIST' }],
        }),

        // curl -X GET "http://localhost:3000/customers/1"
        getCustomerById: builder.query<Customer, number>({
            query: (id) => `/customers/${id}`,
            providesTags: (result, error, id) => [{ type: 'Customer', id }],
        }),

        // curl -X PATCH "http://localhost:3000/customers/1" -H "Content-Type: application/json" -d '{"name":"Updated Name"}'
        updateCustomer: builder.mutation<Customer, { id: number; data: UpdateCustomerRequest }>({
            query: ({ id, data }) => ({
                url: `/customers/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Customer', id }],
        }),

        // curl -X DELETE "http://localhost:3000/customers/1"
        deleteCustomer: builder.mutation<void, number>({
            query: (id) => ({
                url: `/customers/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Customer', id },
                { type: 'Customer', id: 'LIST' },
            ],
        }),

        // curl -X GET "http://localhost:3000/customers/1/reservations"
        getCustomerReservations: builder.query<Reservation[], number>({
            query: (customerId) => `/customers/${customerId}/reservations`,
            providesTags: (result, error, customerId) => [
                { type: 'Reservation', id: `CUSTOMER_${customerId}` },
            ],
        }),

        // curl -X GET "http://localhost:3000/customers/1/notifications"
        getCustomerNotifications: builder.query<Notification[], number>({
            query: (customerId) => `/customers/${customerId}/notifications`,
            providesTags: (result, error, customerId) => [
                { type: 'Notification', id: `CUSTOMER_${customerId}` },
            ],
        }),

        // curl -X GET "http://localhost:3000/customers/1/feedback"
        getCustomerFeedback: builder.query<Feedback[], number>({
            query: (customerId) => `/customers/${customerId}/feedback`,
            providesTags: (result, error, customerId) => [
                { type: 'Feedback', id: `CUSTOMER_${customerId}` },
            ],
        }),

        // ========================
        // OWNERS ENDPOINTS
        // ========================

        // curl -X POST "http://localhost:3000/owners" -H "Content-Type: application/json" -d '{...}'
        createOwner: builder.mutation<Owner, Partial<Owner>>({
            query: (body) => ({
                url: '/owners',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Owner', id: 'LIST' }],
        }),

        // curl -X GET "http://localhost:3000/owners"
        getOwners: builder.query<Owner[], void>({
            query: () => '/owners',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Owner' as const, id })),
                        { type: 'Owner', id: 'LIST' },
                    ]
                    : [{ type: 'Owner', id: 'LIST' }],
        }),

        // curl -X GET "http://localhost:3000/owners/1"
        getOwnerById: builder.query<Owner, number>({
            query: (id) => `/owners/${id}`,
            providesTags: (result, error, id) => [{ type: 'Owner', id }],
        }),

        // curl -X PATCH "http://localhost:3000/owners/1" -H "Content-Type: application/json" -d '{...}'
        updateOwner: builder.mutation<Owner, { id: number; data: Partial<Owner> }>({
            query: ({ id, data }) => ({
                url: `/owners/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Owner', id }],
        }),

        // curl -X DELETE "http://localhost:3000/owners/1"
        deleteOwner: builder.mutation<void, number>({
            query: (id) => ({
                url: `/owners/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Owner', id },
                { type: 'Owner', id: 'LIST' },
            ],
        }),

        // ========================
        // ADMINS ENDPOINTS
        // ========================

        // curl -X POST "http://localhost:3000/admins" -H "Content-Type: application/json" -d '{...}'
        createAdmin: builder.mutation<Admin, Partial<Admin>>({
            query: (body) => ({
                url: '/admins',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Admin', id: 'LIST' }],
        }),

        // curl -X GET "http://localhost:3000/admins"
        getAdmins: builder.query<Admin[], void>({
            query: () => '/admins',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Admin' as const, id })),
                        { type: 'Admin', id: 'LIST' },
                    ]
                    : [{ type: 'Admin', id: 'LIST' }],
        }),

        // curl -X GET "http://localhost:3000/admins/1"
        getAdminById: builder.query<Admin, number>({
            query: (id) => `/admins/${id}`,
            providesTags: (result, error, id) => [{ type: 'Admin', id }],
        }),

        // curl -X PATCH "http://localhost:3000/admins/1" -H "Content-Type: application/json" -d '{...}'
        updateAdmin: builder.mutation<Admin, { id: number; data: Partial<Admin> }>({
            query: ({ id, data }) => ({
                url: `/admins/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Admin', id }],
        }),

        // curl -X DELETE "http://localhost:3000/admins/1"
        deleteAdmin: builder.mutation<void, number>({
            query: (id) => ({
                url: `/admins/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Admin', id },
                { type: 'Admin', id: 'LIST' },
            ],
        }),

        // ========================
        // RESTAURANTS ENDPOINTS
        // ========================

        // curl -X POST "http://localhost:3000/restaurants" -H "Content-Type: application/json" -d '{...}'
        createRestaurant: builder.mutation<Restaurant, CreateRestaurantRequest>({
            query: (body) => ({
                url: '/restaurants',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Restaurant', id: 'LIST' }],
        }),

        // curl -X GET "http://localhost:3000/restaurants?cityId=1&categoryId=2&limit=10"
        getRestaurants: builder.query<PaginatedResponse<Restaurant> | Restaurant[], GetRestaurantsParams | void>({
            query: (params) => {
                const filters = params || {};
                const searchParams = new URLSearchParams();
                if (filters.cityId) searchParams.append('cityId', filters.cityId.toString());
                if (filters.categoryId) searchParams.append('categoryId', filters.categoryId.toString());
                if (filters.tags) searchParams.append('tags', filters.tags);
                if (filters.q) searchParams.append('q', filters.q);
                if (filters.page) searchParams.append('page', filters.page.toString());
                if (filters.limit) searchParams.append('limit', filters.limit.toString());
                if (filters.status) searchParams.append('status', filters.status);
                if (filters.sort) searchParams.append('sort', filters.sort);
                const queryString = searchParams.toString();
                return `/restaurants${queryString ? `?${queryString}` : ''}`;
            },
            providesTags: (result) => {
                const data = Array.isArray(result) ? result : result?.data || [];
                return [
                    ...data.map(({ id }) => ({ type: 'Restaurant' as const, id })),
                    { type: 'Restaurant', id: 'LIST' },
                ];
            },
        }),

        // curl -X GET "http://localhost:3000/restaurants/promos"
        getRestaurantsPromos: builder.query<Restaurant[], void>({
            query: () => '/restaurants/promos',
            providesTags: [{ type: 'Restaurant', id: 'PROMOS' }],
        }),

        // curl -X GET "http://localhost:3000/restaurants/most-reserved?limit=10"
        getRestaurantsMostReserved: builder.query<Restaurant[], GetMostReservedParams | void>({
            query: (params) => {
                const filters = params || {};
                const searchParams = new URLSearchParams();
                if (filters.limit) searchParams.append('limit', filters.limit.toString());
                if (filters.month) searchParams.append('month', filters.month);
                return `/restaurants/most-reserved?${searchParams.toString()}`;
            },
            providesTags: [{ type: 'Restaurant', id: 'MOST_RESERVED' }],
        }),

        // curl -X GET "http://localhost:3000/restaurants/search?query=pizza&limit=20"
        searchRestaurants: builder.query<Restaurant[], SearchRestaurantsParams>({
            query: (params) => {
                const searchParams = new URLSearchParams();
                searchParams.append('query', params.query);
                if (params.cityId) searchParams.append('cityId', params.cityId.toString());
                if (params.categoryId) searchParams.append('categoryId', params.categoryId.toString());
                if (params.limit) searchParams.append('limit', params.limit.toString());
                return `/restaurants/search?${searchParams.toString()}`;
            },
            providesTags: [{ type: 'Restaurant', id: 'SEARCH' }],
        }),

        // curl -X GET "http://localhost:3000/restaurants/1"
        getRestaurantById: builder.query<Restaurant, number | string>({
            query: (id) => `/restaurants/${id}`,
            providesTags: (result, error, id) => [{ type: 'Restaurant', id: Number(id) }],
        }),

        // curl -X PATCH "http://localhost:3000/restaurants/1" -H "Content-Type: application/json" -d '{...}'
        updateRestaurant: builder.mutation<Restaurant, { id: number; data: Partial<Restaurant> }>({
            query: ({ id, data }) => ({
                url: `/restaurants/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Restaurant', id },
                { type: 'Restaurant', id: 'LIST' },
            ],
        }),

        // curl -X DELETE "http://localhost:3000/restaurants/1"
        deleteRestaurant: builder.mutation<void, number>({
            query: (id) => ({
                url: `/restaurants/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Restaurant', id },
                { type: 'Restaurant', id: 'LIST' },
            ],
        }),

        // curl -X GET "http://localhost:3000/restaurants/1/menus"
        getRestaurantMenus: builder.query<Menu[], number | string>({
            query: (restaurantId) => `/restaurants/${restaurantId}/menus`,
            providesTags: (result, error, restaurantId) => [
                { type: 'Menu', id: `RESTAURANT_${restaurantId}` },
            ],
        }),

        // curl -X GET "http://localhost:3000/restaurants/1/plats"
        getRestaurantPlats: builder.query<Plat[], number | string>({
            query: (restaurantId) => `/restaurants/${restaurantId}/plats`,
            providesTags: (result, error, restaurantId) => [
                { type: 'Plat', id: `RESTAURANT_${restaurantId}` },
            ],
        }),

        // curl -X GET "http://localhost:3000/restaurants/1/images"
        getRestaurantImages: builder.query<RestaurantImage[], number | string>({
            query: (restaurantId) => `/restaurants/${restaurantId}/images`,
            providesTags: (result, error, restaurantId) => [
                { type: 'Restaurant', id: `IMAGES_${restaurantId}` },
            ],
        }),

        // curl -X POST "http://localhost:3000/restaurants/1/images" -H "Content-Type: application/json" -d '{"url":"https://..."}'
        addRestaurantImage: builder.mutation<RestaurantImage, { restaurantId: number; url: string }>({
            query: ({ restaurantId, url }) => ({
                url: `/restaurants/${restaurantId}/images`,
                method: 'POST',
                body: { url },
            }),
            invalidatesTags: (result, error, { restaurantId }) => [
                { type: 'Restaurant', id: `IMAGES_${restaurantId}` },
            ],
        }),

        // curl -X POST "http://localhost:3000/restaurants/1/upload-image" -H "Content-Type: multipart/form-data" -F "file=@image.jpg"
        uploadRestaurantImage: builder.mutation<RestaurantImage, { restaurantId: number; file: File }>({
            query: ({ restaurantId, file }) => {
                const formData = new FormData();
                formData.append('file', file);
                return {
                    url: `/restaurants/${restaurantId}/upload-image`,
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: (result, error, { restaurantId }) => [
                { type: 'Restaurant', id: `IMAGES_${restaurantId}` },
            ],
        }),

        // curl -X GET "http://localhost:3000/restaurants/1/tags"
        getRestaurantTags: builder.query<Tag[], number | string>({
            query: (restaurantId) => `/restaurants/${restaurantId}/tags`,
            providesTags: (result, error, restaurantId) => [
                { type: 'Tag', id: `RESTAURANT_${restaurantId}` },
            ],
        }),

        // curl -X POST "http://localhost:3000/restaurants/1/tags" -H "Content-Type: application/json" -d '{"tagIds":[1,2,3]}'
        linkRestaurantTags: builder.mutation<void, { restaurantId: number; tagIds: number[] }>({
            query: ({ restaurantId, tagIds }) => ({
                url: `/restaurants/${restaurantId}/tags`,
                method: 'POST',
                body: { tagIds },
            }),
            invalidatesTags: (result, error, { restaurantId }) => [
                { type: 'Tag', id: `RESTAURANT_${restaurantId}` },
            ],
        }),

        // curl -X POST "http://localhost:3000/restaurants/1/tags/5"
        linkRestaurantTag: builder.mutation<void, { restaurantId: number; tagId: number }>({
            query: ({ restaurantId, tagId }) => ({
                url: `/restaurants/${restaurantId}/tags/${tagId}`,
                method: 'POST',
            }),
            invalidatesTags: (result, error, { restaurantId }) => [
                { type: 'Tag', id: `RESTAURANT_${restaurantId}` },
            ],
        }),

        // curl -X GET "http://localhost:3000/restaurants/1/events"
        getRestaurantEvents: builder.query<Event[], number | string>({
            query: (restaurantId) => `/restaurants/${restaurantId}/events`,
            providesTags: (result, error, restaurantId) => [
                { type: 'Event', id: `RESTAURANT_${restaurantId}` },
            ],
        }),

        // curl -X GET "http://localhost:3000/restaurants/1/reservations"
        getRestaurantReservations: builder.query<Reservation[], number | string>({
            query: (restaurantId) => `/restaurants/${restaurantId}/reservations`,
            providesTags: (result, error, restaurantId) => [
                { type: 'Reservation', id: `RESTAURANT_${restaurantId}` },
            ],
        }),

        // curl -X GET "http://localhost:3000/restaurants/1/feedback"
        getRestaurantFeedback: builder.query<Feedback[], number | string>({
            query: (restaurantId) => `/restaurants/${restaurantId}/feedback`,
            providesTags: (result, error, restaurantId) => [
                { type: 'Feedback', id: `RESTAURANT_${restaurantId}` },
            ],
        }),

        // curl -X GET "http://localhost:3000/restaurants/1/summary"
        getRestaurantSummary: builder.query<RestaurantSummary, number | string>({
            query: (restaurantId) => `/restaurants/${restaurantId}/summary`,
            providesTags: (result, error, restaurantId) => [
                { type: 'Restaurant', id: `SUMMARY_${restaurantId}` },
            ],
        }),

        // ========================
        // CITIES ENDPOINTS
        // ========================

        // curl -X POST "http://localhost:3000/cities" -H "Content-Type: application/json" -d '{...}'
        createCity: builder.mutation<City, Partial<City>>({
            query: (body) => ({
                url: '/cities',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'City', id: 'LIST' }],
        }),

        // curl -X GET "http://localhost:3000/cities"
        getCities: builder.query<City[], void>({
            query: () => '/cities',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'City' as const, id })),
                        { type: 'City', id: 'LIST' },
                    ]
                    : [{ type: 'City', id: 'LIST' }],
        }),

        // curl -X GET "http://localhost:3000/cities/1"
        getCityById: builder.query<City, number>({
            query: (id) => `/cities/${id}`,
            providesTags: (result, error, id) => [{ type: 'City', id }],
        }),

        // curl -X PATCH "http://localhost:3000/cities/1" -H "Content-Type: application/json" -d '{...}'
        updateCity: builder.mutation<City, { id: number; data: Partial<City> }>({
            query: ({ id, data }) => ({
                url: `/cities/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'City', id },
                { type: 'City', id: 'LIST' },
            ],
        }),

        // curl -X DELETE "http://localhost:3000/cities/1"
        deleteCity: builder.mutation<void, number>({
            query: (id) => ({
                url: `/cities/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'City', id },
                { type: 'City', id: 'LIST' },
            ],
        }),

        // ========================
        // CATEGORIES ENDPOINTS
        // ========================

        // curl -X POST "http://localhost:3000/categories" -H "Content-Type: application/json" -d '{...}'
        createCategory: builder.mutation<Category, Partial<Category>>({
            query: (body) => ({
                url: '/categories',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Category', id: 'LIST' }],
        }),

        // curl -X GET "http://localhost:3000/categories"
        getCategories: builder.query<Category[], void>({
            query: () => '/categories',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Category' as const, id })),
                        { type: 'Category', id: 'LIST' },
                    ]
                    : [{ type: 'Category', id: 'LIST' }],
        }),

        // curl -X GET "http://localhost:3000/categories/1"
        getCategoryById: builder.query<Category, number>({
            query: (id) => `/categories/${id}`,
            providesTags: (result, error, id) => [{ type: 'Category', id }],
        }),

        // curl -X PATCH "http://localhost:3000/categories/1" -H "Content-Type: application/json" -d '{...}'
        updateCategory: builder.mutation<Category, { id: number; data: Partial<Category> }>({
            query: ({ id, data }) => ({
                url: `/categories/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Category', id },
                { type: 'Category', id: 'LIST' },
            ],
        }),

        // curl -X DELETE "http://localhost:3000/categories/1"
        deleteCategory: builder.mutation<void, number>({
            query: (id) => ({
                url: `/categories/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Category', id },
                { type: 'Category', id: 'LIST' },
            ],
        }),

        // ========================
        // MENUS ENDPOINTS
        // ========================

        // curl -X POST "http://localhost:3000/menus" -H "Content-Type: application/json" -d '{...}'
        createMenu: builder.mutation<Menu, Partial<Menu>>({
            query: (body) => ({
                url: '/menus',
                method: 'POST',
                body,
            }),
            invalidatesTags: (result) =>
                result
                    ? [
                        { type: 'Menu', id: `RESTAURANT_${result.restaurant_id}` },
                        { type: 'Menu', id: 'LIST' },
                    ]
                    : [{ type: 'Menu', id: 'LIST' }],
        }),

        // curl -X GET "http://localhost:3000/menus"
        getMenus: builder.query<Menu[], void>({
            query: () => '/menus',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Menu' as const, id })),
                        { type: 'Menu', id: 'LIST' },
                    ]
                    : [{ type: 'Menu', id: 'LIST' }],
        }),

        // curl -X GET "http://localhost:3000/menus/1"
        getMenuById: builder.query<Menu, number>({
            query: (id) => `/menus/${id}`,
            providesTags: (result, error, id) => [{ type: 'Menu', id }],
        }),

        // curl -X PATCH "http://localhost:3000/menus/1" -H "Content-Type: application/json" -d '{...}'
        updateMenu: builder.mutation<Menu, { id: number; data: Partial<Menu> }>({
            query: ({ id, data }) => ({
                url: `/menus/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Menu', id },
                { type: 'Menu', id: 'LIST' },
            ],
        }),

        // curl -X DELETE "http://localhost:3000/menus/1"
        deleteMenu: builder.mutation<void, number>({
            query: (id) => ({
                url: `/menus/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Menu', id },
                { type: 'Menu', id: 'LIST' },
            ],
        }),

        // curl -X POST "http://localhost:3000/menus/upload" -H "Content-Type: multipart/form-data" -F "file=@menu.pdf"
        uploadMenuPdf: builder.mutation<{ url: string }, File>({
            query: (file) => {
                const formData = new FormData();
                formData.append('file', file);
                return {
                    url: `/menus/upload`,
                    method: 'POST',
                    body: formData,
                };
            },
        }),

        // ========================
        // PLATS ENDPOINTS
        // ========================

        // curl -X POST "http://localhost:3000/plats" -H "Content-Type: application/json" -d '{...}'
        createPlat: builder.mutation<Plat, Partial<Plat>>({
            query: (body) => ({
                url: '/plats',
                method: 'POST',
                body,
            }),
            invalidatesTags: (result) =>
                result
                    ? [
                        { type: 'Plat', id: `RESTAURANT_${result.restaurant_id}` },
                        { type: 'Plat', id: 'LIST' },
                    ]
                    : [{ type: 'Plat', id: 'LIST' }],
        }),

        // curl -X GET "http://localhost:3000/plats"
        getPlats: builder.query<Plat[], void>({
            query: () => '/plats',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Plat' as const, id })),
                        { type: 'Plat', id: 'LIST' },
                    ]
                    : [{ type: 'Plat', id: 'LIST' }],
        }),

        // curl -X GET "http://localhost:3000/plats/1"
        getPlatById: builder.query<Plat, number>({
            query: (id) => `/plats/${id}`,
            providesTags: (result, error, id) => [{ type: 'Plat', id }],
        }),

        // curl -X PATCH "http://localhost:3000/plats/1" -H "Content-Type: application/json" -d '{...}'
        updatePlat: builder.mutation<Plat, { id: number; data: Partial<Plat> }>({
            query: ({ id, data }) => ({
                url: `/plats/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Plat', id },
                { type: 'Plat', id: 'LIST' },
            ],
        }),

        // curl -X DELETE "http://localhost:3000/plats/1"
        deletePlat: builder.mutation<void, number>({
            query: (id) => ({
                url: `/plats/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Plat', id },
                { type: 'Plat', id: 'LIST' },
            ],
        }),

        // ========================
        // RESERVATIONS ENDPOINTS
        // ========================

        // curl -X POST "http://localhost:3000/reservations" -H "Content-Type: application/json" -d '{"restaurant_id":1,"reservation_time":"2024-12-20T19:00:00Z","guest_count":4}'
        createReservation: builder.mutation<Reservation, CreateReservationRequest>({
            query: (body) => ({
                url: '/reservations',
                method: 'POST',
                body,
            }),
            invalidatesTags: (result) =>
                result
                    ? [
                        { type: 'Reservation', id: `CUSTOMER_${result.customer_id}` },
                        { type: 'Reservation', id: `RESTAURANT_${result.restaurant_id}` },
                        { type: 'Reservation', id: 'LIST' },
                    ]
                    : [{ type: 'Reservation', id: 'LIST' }],
        }),

        // curl -X GET "http://localhost:3000/reservations"
        getReservations: builder.query<Reservation[], void>({
            query: () => '/reservations',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Reservation' as const, id })),
                        { type: 'Reservation', id: 'LIST' },
                    ]
                    : [{ type: 'Reservation', id: 'LIST' }],
        }),

        // curl -X GET "http://localhost:3000/reservations/1"
        getReservationById: builder.query<Reservation, number>({
            query: (id) => `/reservations/${id}`,
            providesTags: (result, error, id) => [{ type: 'Reservation', id }],
        }),

        // curl -X PATCH "http://localhost:3000/reservations/1" -H "Content-Type: application/json" -d '{"status":"confirmed"}'
        updateReservation: builder.mutation<Reservation, { id: number; data: Partial<Reservation> }>({
            query: ({ id, data }) => ({
                url: `/reservations/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Reservation', id },
                { type: 'Reservation', id: 'LIST' },
            ],
        }),

        // curl -X DELETE "http://localhost:3000/reservations/1"
        deleteReservation: builder.mutation<void, number>({
            query: (id) => ({
                url: `/reservations/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Reservation', id },
                { type: 'Reservation', id: 'LIST' },
            ],
        }),

        // ========================
        // FEEDBACK ENDPOINTS
        // ========================

        // curl -X POST "http://localhost:3000/feedback" -H "Content-Type: application/json" -d '{"restaurant_id":1,"rating":5,"comment":"Excellent!"}'
        createFeedback: builder.mutation<Feedback, CreateFeedbackRequest>({
            query: (body) => ({
                url: '/feedback',
                method: 'POST',
                body,
            }),
            invalidatesTags: (result) =>
                result
                    ? [
                        { type: 'Feedback', id: `CUSTOMER_${result.customer_id}` },
                        { type: 'Feedback', id: `RESTAURANT_${result.restaurant_id}` },
                        { type: 'Feedback', id: 'LIST' },
                        { type: 'Restaurant', id: result.restaurant_id },
                    ]
                    : [{ type: 'Feedback', id: 'LIST' }],
        }),

        // curl -X GET "http://localhost:3000/feedback"
        getFeedbackList: builder.query<Feedback[], void>({
            query: () => '/feedback',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Feedback' as const, id })),
                        { type: 'Feedback', id: 'LIST' },
                    ]
                    : [{ type: 'Feedback', id: 'LIST' }],
        }),

        // curl -X GET "http://localhost:3000/feedback/1"
        getFeedbackById: builder.query<Feedback, number>({
            query: (id) => `/feedback/${id}`,
            providesTags: (result, error, id) => [{ type: 'Feedback', id }],
        }),

        // curl -X PATCH "http://localhost:3000/feedback/1" -H "Content-Type: application/json" -d '{"rating":4}'
        updateFeedback: builder.mutation<Feedback, { id: number; data: Partial<Feedback> }>({
            query: ({ id, data }) => ({
                url: `/feedback/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Feedback', id },
                { type: 'Feedback', id: 'LIST' },
            ],
        }),

        // curl -X DELETE "http://localhost:3000/feedback/1"
        deleteFeedback: builder.mutation<void, number>({
            query: (id) => ({
                url: `/feedback/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Feedback', id },
                { type: 'Feedback', id: 'LIST' },
            ],
        }),

        // ========================
        // EVENTS ENDPOINTS
        // ========================

        // curl -X POST "http://localhost:3000/events" -H "Content-Type: application/json" -d '{...}'
        createEvent: builder.mutation<Event, Partial<Event>>({
            query: (body) => ({
                url: '/events',
                method: 'POST',
                body,
            }),
            invalidatesTags: (result) =>
                result
                    ? [
                        { type: 'Event', id: `RESTAURANT_${result.restaurant_id}` },
                        { type: 'Event', id: 'LIST' },
                    ]
                    : [{ type: 'Event', id: 'LIST' }],
        }),

        // curl -X GET "http://localhost:3000/events/upcoming"
        getUpcomingEvents: builder.query<Event[], void>({
            query: () => '/events/upcoming',
            providesTags: [{ type: 'Event', id: 'UPCOMING' }],
        }),

        // curl -X GET "http://localhost:3000/events/restaurant/1"
        getEventsByRestaurant: builder.query<Event[], number>({
            query: (restaurantId) => `/events/restaurant/${restaurantId}`,
            providesTags: (result, error, restaurantId) => [
                { type: 'Event', id: `RESTAURANT_${restaurantId}` },
            ],
        }),

        // ========================
        // NOTIFICATIONS ENDPOINTS
        // ========================

        // curl -X GET "http://localhost:3000/notifications"
        getNotifications: builder.query<Notification[], void>({
            query: () => '/notifications',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Notification' as const, id })),
                        { type: 'Notification', id: 'LIST' },
                    ]
                    : [{ type: 'Notification', id: 'LIST' }],
        }),

        // curl -X PATCH "http://localhost:3000/notifications/1/seen"
        markNotificationSeen: builder.mutation<Notification, number>({
            query: (id) => ({
                url: `/notifications/${id}/seen`,
                method: 'PATCH',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Notification', id },
                { type: 'Notification', id: 'LIST' },
            ],
        }),

        // ========================
        // TAGS ENDPOINTS
        // ========================

        // curl -X POST "http://localhost:3000/tags" -H "Content-Type: application/json" -d '{"name":"Végétarien"}'
        createTag: builder.mutation<Tag, Partial<Tag>>({
            query: (body) => ({
                url: '/tags',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Tag', id: 'LIST' }],
        }),

        // curl -X GET "http://localhost:3000/tags"
        getTags: builder.query<Tag[], void>({
            query: () => '/tags',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Tag' as const, id })),
                        { type: 'Tag', id: 'LIST' },
                    ]
                    : [{ type: 'Tag', id: 'LIST' }],
        }),

        // curl -X GET "http://localhost:3000/tags/1"
        getTagById: builder.query<Tag, number>({
            query: (id) => `/tags/${id}`,
            providesTags: (result, error, id) => [{ type: 'Tag', id }],
        }),

        // curl -X PATCH "http://localhost:3000/tags/1" -H "Content-Type: application/json" -d '{"name":"Vegan"}'
        updateTag: builder.mutation<Tag, { id: number; data: Partial<Tag> }>({
            query: ({ id, data }) => ({
                url: `/tags/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Tag', id },
                { type: 'Tag', id: 'LIST' },
            ],
        }),

        // curl -X DELETE "http://localhost:3000/tags/1"
        deleteTag: builder.mutation<void, number>({
            query: (id) => ({
                url: `/tags/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Tag', id },
                { type: 'Tag', id: 'LIST' },
            ],
        }),

        // ========================
        // SAVED RESTAURANTS ENDPOINTS
        // ========================

        // curl -X POST "http://localhost:3000/restaurants/1/save" -H "Authorization: Bearer TOKEN"
        saveRestaurant: builder.mutation<SavedRestaurant, number>({
            query: (restaurantId) => ({
                url: `/restaurants/${restaurantId}/save`,
                method: 'POST',
            }),
            invalidatesTags: [{ type: 'SavedRestaurant', id: 'LIST' }],
        }),

        // curl -X DELETE "http://localhost:3000/restaurants/1/save" -H "Authorization: Bearer TOKEN"
        unsaveRestaurant: builder.mutation<void, number>({
            query: (restaurantId) => ({
                url: `/restaurants/${restaurantId}/save`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'SavedRestaurant', id: 'LIST' }],
        }),

        // curl -X GET "http://localhost:3000/me/saved-restaurants" -H "Authorization: Bearer TOKEN"
        getMySavedRestaurants: builder.query<SavedRestaurant[], void>({
            query: () => '/me/saved-restaurants',
            providesTags: [{ type: 'SavedRestaurant', id: 'LIST' }],
        }),
    }),
});

// Export hooks for all endpoints
export const {
    // Auth
    useLoginMutation,
    useRegisterCustomerMutation,

    // Customers
    useCreateCustomerMutation,
    useGetCustomersQuery,
    useGetCustomerByIdQuery,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
    useGetCustomerReservationsQuery,
    useGetCustomerNotificationsQuery,
    useGetCustomerFeedbackQuery,

    // Owners
    useCreateOwnerMutation,
    useGetOwnersQuery,
    useGetOwnerByIdQuery,
    useUpdateOwnerMutation,
    useDeleteOwnerMutation,

    // Admins
    useCreateAdminMutation,
    useGetAdminsQuery,
    useGetAdminByIdQuery,
    useUpdateAdminMutation,
    useDeleteAdminMutation,

    // Restaurants
    useCreateRestaurantMutation,
    useGetRestaurantsQuery,
    useGetRestaurantsPromosQuery,
    useGetRestaurantsMostReservedQuery,
    useSearchRestaurantsQuery,
    useGetRestaurantByIdQuery,
    useUpdateRestaurantMutation,
    useDeleteRestaurantMutation,
    useGetRestaurantMenusQuery,
    useGetRestaurantPlatsQuery,
    useGetRestaurantImagesQuery,
    useAddRestaurantImageMutation,
    useUploadRestaurantImageMutation,
    useGetRestaurantTagsQuery,
    useLinkRestaurantTagsMutation,
    useLinkRestaurantTagMutation,
    useGetRestaurantEventsQuery,
    useGetRestaurantReservationsQuery,
    useGetRestaurantFeedbackQuery,
    useGetRestaurantSummaryQuery,

    // Cities
    useCreateCityMutation,
    useGetCitiesQuery,
    useGetCityByIdQuery,
    useUpdateCityMutation,
    useDeleteCityMutation,

    // Categories
    useCreateCategoryMutation,
    useGetCategoriesQuery,
    useGetCategoryByIdQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,

    // Menus
    useCreateMenuMutation,
    useGetMenusQuery,
    useGetMenuByIdQuery,
    useUpdateMenuMutation,
    useDeleteMenuMutation,
    useUploadMenuPdfMutation,

    // Plats
    useCreatePlatMutation,
    useGetPlatsQuery,
    useGetPlatByIdQuery,
    useUpdatePlatMutation,
    useDeletePlatMutation,

    // Reservations
    useCreateReservationMutation,
    useGetReservationsQuery,
    useGetReservationByIdQuery,
    useUpdateReservationMutation,
    useDeleteReservationMutation,

    // Feedback
    useCreateFeedbackMutation,
    useGetFeedbackListQuery,
    useGetFeedbackByIdQuery,
    useUpdateFeedbackMutation,
    useDeleteFeedbackMutation,

    // Events
    useCreateEventMutation,
    useGetUpcomingEventsQuery,
    useGetEventsByRestaurantQuery,

    // Notifications
    useGetNotificationsQuery,
    useMarkNotificationSeenMutation,

    // Tags
    useCreateTagMutation,
    useGetTagsQuery,
    useGetTagByIdQuery,
    useUpdateTagMutation,
    useDeleteTagMutation,

    // Saved Restaurants
    useSaveRestaurantMutation,
    useUnsaveRestaurantMutation,
    useGetMySavedRestaurantsQuery,
} = lebonrestoApi;

export default lebonrestoApi;
