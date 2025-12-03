/**
 * TypeScript Type Definitions for LeBonResto API
 * 
 * These types match the backend API response structures
 */

// ============================================
// AUTH & USER TYPES
// ============================================

export interface Customer {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone?: string;
    avatar_url?: string;
    created_at: string;
    updated_at?: string;
}

export interface LoginResponse {
    access_token: string;
    refresh_token?: string;
    user: Customer;
}

export interface RegisterResponse {
    access_token: string;
    refresh_token?: string;
    user: Customer;
}

// ============================================
// REFERENCE DATA TYPES
// ============================================

export interface City {
    id: string;
    name: string;
    created_at: string;
}

export interface Category {
    id: string;
    name: string;
    description?: string;
    created_at: string;
}

export interface Tag {
    id: string;
    name: string;
    created_at: string;
}

// ============================================
// RESTAURANT TYPES
// ============================================

export type RestaurantStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';

export interface Restaurant {
    id: string;
    name: string;
    description?: string;
    address: string;
    phone?: string;
    email?: string;
    website?: string;
    city_id: string;
    category_id: string;
    owner_id: string;
    status: RestaurantStatus;
    created_at: string;
    updated_at?: string;

    // Populated relations
    city?: City;
    category?: Category;
    tags?: Tag[];
}

export interface RestaurantsResponse {
    data: Restaurant[];
    total: number;
    page: number;
    limit: number;
}

export interface RestaurantImage {
    id: string;
    url: string;
    restaurant_id: string;
    is_primary: boolean;
    created_at: string;
}

export interface Menu {
    id: string;
    name: string;
    description?: string;
    restaurant_id: string;
    pdf_url?: string;
    created_at: string;
}

export interface Plat {
    id: string;
    name: string;
    description?: string;
    price: number;
    restaurant_id: string;
    menu_id?: string;
    image_url?: string;
    created_at: string;
}

export type EventType = 'MUSIC' | 'SPECIAL_MENU' | 'HOLIDAY' | 'PROMOTION' | 'OTHER';

export interface Event {
    id: string;
    title: string;
    description?: string;
    restaurant_id: string;
    event_date: string;
    event_type: EventType;
    created_at: string;
}

export interface Feedback {
    id: string;
    customer_id: string;
    restaurant_id: string;
    rating: number; // 1-5
    comment?: string;
    created_at: string;

    // Populated customer info
    customer?: {
        id: string;
        first_name: string;
        last_name: string;
    };
}

// ============================================
// RESERVATION TYPES
// ============================================

export type ReservationStatus =
    | 'PENDING'
    | 'CONFIRMED'
    | 'CANCELLED'
    | 'COMPLETED'
    | 'NO_SHOW';

export interface Reservation {
    id: string;
    customer_id: string;
    restaurant_id: string;
    reservation_date: string;
    party_size: number;
    status: ReservationStatus;
    special_requests?: string;
    created_at: string;
    updated_at?: string;

    // Populated relations
    restaurant?: {
        id: string;
        name: string;
        address: string;
        phone?: string;
    };
}

export interface CreateReservationInput {
    customer_id?: string; // Optional if derived from auth token
    restaurant_id: string;
    reservation_date: string;
    party_size: number;
    special_requests?: string;
}

// ============================================
// FEEDBACK TYPES
// ============================================

export interface CreateFeedbackInput {
    restaurant_id: string;
    rating: number; // 1-5
    comment?: string;
    reservation_id?: string; // Optional link to reservation
}

export interface UpdateFeedbackInput {
    rating?: number;
    comment?: string;
}

// ============================================
// NOTIFICATION TYPES
// ============================================

export interface Notification {
    id: string;
    user_id: string;
    message: string;
    is_seen: boolean;
    created_at: string;
    updated_at?: string;
}

// ============================================
// CONTACT TYPES
// ============================================

export interface ContactMessageInput {
    name: string;
    email: string;
    subject?: string;
    message: string;
}

// ============================================
// FILTER TYPES
// ============================================

export interface RestaurantFilters {
    city_id?: string;
    category_id?: string;
    tags?: string; // comma-separated tag IDs
    q?: string; // search query
    page?: number;
    limit?: number;
}

// ============================================
// AUTH INPUT TYPES
// ============================================

export interface LoginInput {
    email: string;
    password: string;
}

export interface RegisterInput {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    phone?: string;
}

export interface UpdateCustomerProfileInput {
    first_name?: string;
    last_name?: string;
    phone?: string;
    avatar_url?: string;
}
