
export class RestaurantFullViewDto {
    id: string;
    name: string;
    description: string | null;
    logo_url: string | null;
    address: string | null;
    latitude: number | null;
    longitude: number | null;
    phone: string | null;
    email: string | null;

    // Status
    subscription_status: string | null;
    business_status: string | null; // e.g. open/closed in general
    is_active: boolean;

    // Ratings & Prices
    rating_count: number | null;
    rating_avg: number | null;
    min_price: number | null;
    max_price: number | null;

    // Media
    visit360_url: string | null;
    video_url: string | null;
    hero_image: string | null;

    created_at: string;
    updated_at: string;

    // City
    city_id: string | null;
    city_name: string | null;
    city_region: string | null;
    city_country: string | null;

    // Category
    category_id: string | null;
    category_name: string | null;
    category_slug: string | null;

    // JSONB Fields (Arrays or Objects)

    horaires_json: Array<{
        id: number;
        day_of_week: number;
        is_closed: boolean;
        open_time: string | null;
        close_time: string | null;
        break_start: string | null;
        break_end: string | null;
        notes: string | null;
    }> | null;

    images_json: Array<{
        id: string;
        url: string;
        label: string | null;
        uploaded_by: string | null;
        created_at: string;
    }> | null;

    menus_json: Array<{
        id: string;
        title: string;
        description: string | null;
        pdf_url: string | null;
        created_at: string;
    }> | null;

    plats_json: Array<{
        id: string;
        name: string;
        description: string | null;
        price: number;
        image_url: string | null;
        is_published: boolean;
        is_premium: boolean;
        created_at: string;
        updated_at: string;
    }> | null;

    events_json: Array<{
        id: string;
        title: string;
        description: string | null;
        event_date: string;
        image_url: string | null;
        is_paid: boolean;
        price: number | null;
        requires_reservation: boolean;
        is_promo: boolean;
        discount_percentage: number | null;
        promo_start_at: string | null;
        promo_end_at: string | null;
    }> | null;

    tags_json: Array<{
        id: string;
        name: string;
    }> | null;

    feedback_stats: {
        feedback_count: number;
        avg_rating: number | null;
        avg_cuisine: number | null;
        avg_service: number | null;
        avg_ambiance: number | null;
    } | null;

    feedback_list_json: Array<{
        id: string;
        customer_id: string | null;
        reservation_id: string | null;
        rating: number;
        rating_cuisine: number | null;
        rating_service: number | null;
        rating_ambiance: number | null;
        comment: string | null;
        sentiment_score: number | null;
        created_at: string;
    }> | null;
}
