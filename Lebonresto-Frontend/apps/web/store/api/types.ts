/**
 * LeBonResto API Types
 * 
 * TypeScript interfaces for all entities in the LeBonResto marketplace
 */

// ========================
// Core Entities
// ========================

export interface Restaurant {
    id: number;
    owner_id: number;
    name: string;
    description?: string;
    logo_url?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
    email?: string;
    status: 'premium' | 'standard' | 'basic';
    city_id?: number;
    category_id?: number;
    visit360_url?: string;
    video_url?: string;
    is_active: boolean;
    rating_count: number;
    rating_avg: number;
    created_at: string;
    updated_at: string;
    resturant_status?: string;
    restaurant_image?: string;
    min_price?: number;
    max_price?: number;
    city?: City;
    category?: Category;
    owner?: Owner;
    tags?: Tag[];
    max_discount_percentage?: number;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    count_restaurants?: number;
    category_image?: string;
}

export interface City {
    id: number;
    name: string;
    region?: string;
    country?: string;
    created_at: string;
    count_restaurants?: number;
    city_image?: string;
}

export interface Customer {
    id: number;
    email: string;
    password_hash?: string;
    name: string;
    phone?: string;
    avatar_url?: string;
    is_verified: boolean;
    last_login?: string;
    created_at: string;
    updated_at: string;
}

export interface Owner {
    id: number;
    email: string;
    password_hash?: string;
    name: string;
    phone?: string;
    avatar_url?: string;
    company_name?: string;
    vat_number?: string;
    created_at: string;
    updated_at: string;
}

export interface Admin {
    id: number;
    email: string;
    password_hash?: string;
    name: string;
    avatar_url?: string;
    role: string;
    created_at: string;
    updated_at: string;
}

export interface Menu {
    id: number;
    restaurant_id: number;
    title: string;
    description?: string;
    created_at: string;
    pdf_url?: string;
    restaurant?: Restaurant;
}

export interface Plat {
    id: number;
    restaurant_id: number;
    name: string;
    description?: string;
    price: number;
    image_url?: string;
    is_published: boolean;
    is_premium: boolean;
    created_at: string;
    updated_at: string;
    restaurant?: Restaurant;
}

export interface Reservation {
    id: number;
    customer_id: number;
    restaurant_id: number;
    reservation_time: string;
    guest_count: number;
    notes?: string;
    automation_method?: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    created_at: string;
    updated_at: string;
    customer?: Customer;
    restaurant?: Restaurant;
}

export interface Feedback {
    id: number;
    customer_id: number;
    restaurant_id: number;
    reservation_id?: number;
    rating: number;
    comment?: string;
    sentiment_score?: number;
    created_at: string;
    customer?: Customer;
    restaurant?: Restaurant;
}

export interface Event {
    id: number;
    restaurant_id: number;
    title: string;
    description?: string;
    event_date: string;
    image_url?: string;
    is_paid: boolean;
    price?: number;
    requires_reservation: boolean;
    created_at: string;
    is_promo: boolean;
    discount_percentage?: number;
    promo_start_at?: string;
    promo_end_at?: string;
    restaurant?: Restaurant;
}

export interface Notification {
    id: number;
    user_id: number;
    message: string;
    type: string;
    seen: boolean;
    created_at: string;
}

export interface Tag {
    id: number;
    name: string;
    created_at: string;
}

export interface RestaurantImage {
    id: number;
    restaurant_id: number;
    url: string;
    label?: string;
    uploaded_by?: string;
    created_at: string;
}

export interface SavedRestaurant {
    id: number;
    customer_id: number;
    restaurant_id: number;
    created_at: string;
    restaurant?: Restaurant;
}

export interface RestaurantSummary {
    restaurant_id: number;
    total_reservations: number;
    total_feedback: number;
    average_rating: number;
    total_events: number;
}

export interface ContactMessage {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    type?: string;
    created_at: string;
}

// ========================
// Request/Response Types
// ========================

export interface LoginRequest {
    email: string;
    password: string;
    role?: 'customer' | 'owner' | 'admin';
}

export interface LoginResponse {
    access_token: string;
    user: Customer | Owner | Admin;
}

export interface RegisterCustomerRequest {
    email: string;
    password: string;
    name: string;
    phone?: string;
}

export interface RegisterCustomerResponse {
    access_token: string;
    user: Customer;
}

export interface CreateReservationRequest {
    customer_id?: number;
    restaurant_id: number;
    reservation_time: string;
    guest_count: number;
    notes?: string;
}

export interface CreateFeedbackRequest {
    customer_id?: number;
    restaurant_id: number;
    reservation_id?: number;
    rating: number;
    comment?: string;
}

export interface CreateRestaurantRequest {
    owner_id: number;
    name: string;
    description?: string;
    address?: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
    email?: string;
    city_id?: number;
    category_id?: number;
    status?: 'premium' | 'standard' | 'basic';
}

export interface UpdateCustomerRequest {
    name?: string;
    phone?: string;
    avatar_url?: string;
}

// ========================
// Query Params
// ========================

export interface GetRestaurantsParams {
    cityId?: number | string;
    categoryId?: number | string;
    tags?: string;
    q?: string;
    page?: number;
    limit?: number;
    status?: string;
    sort?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    latitude?: number;
    longitude?: number;
    radius?: number;
}

export interface SearchRestaurantsParams {
    query: string;
    cityId?: number | string;
    categoryId?: number | string;
    limit?: number;
}

export interface GetMostReservedParams {
    limit?: number;
    month?: string;
    period?: string;
    cityId?: number | string;
}

export interface GetPromoRestaurantsParams {
    limit?: number;
    cityId?: number | string;
}

// ========================
// Paginated Response
// ========================

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
