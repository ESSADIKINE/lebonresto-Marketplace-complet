export class RestaurantLead {
    id: string;
    restaurant_name: string;
    city_id?: string;
    city_name?: string;
    category_id?: string;
    category_name?: string;
    seats_count?: number;
    has_terrace: boolean;
    has_delivery: boolean;
    has_takeaway: boolean;
    contact_name: string;
    contact_role?: string;
    contact_email: string;
    contact_phone?: string;
    average_price_level?: string;
    current_tools?: string;
    message?: string;
    status: string;
    source?: string;
    preferred_contact_at?: Date;
    created_at: Date;
    updated_at: Date;
}
