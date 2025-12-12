-- Run this script in your Supabase SQL Editor to update the View

CREATE OR REPLACE VIEW restaurant_full_view AS
SELECT
    r.id,
    r.name,
    r.description,
    r.logo_url,
    r.address,
    r.latitude,
    r.longitude,
    r.phone,
    r.email,
    r.subscription_status,
    r.business_status,
    r.is_active,
    r.rating_count,
    r.rating_avg,
    r.min_price,
    r.max_price,
    r.visit360_url,
    r.video_url,
    r.hero_image,
    r.created_at,
    r.updated_at,
    
    -- City Details
    r.city_id,
    c.name AS city_name,
    c.region AS city_region,
    c.country AS city_country,
    
    -- Category Details
    r.category_id,
    cat.name AS category_name,
    cat.slug AS category_slug,
    
    -- JSON Aggregations
    
    -- Menus
    COALESCE(
        (SELECT json_agg(m.* ORDER BY m.created_at DESC) 
         FROM menus m 
         WHERE m.restaurant_id = r.id), 
        '[]'::json
    ) AS menus_json,
    
    -- Plats
    COALESCE(
        (SELECT json_agg(p.* ORDER BY p.is_premium DESC, p.created_at DESC) 
         FROM plats p 
         WHERE p.restaurant_id = r.id AND p.is_published = true), 
        '[]'::json
    ) AS plats_json,
    
    -- Events (Includes is_promo, discount_percentage etc.)
    COALESCE(
        (SELECT json_agg(e.* ORDER BY e.event_date ASC) 
         FROM events e 
         WHERE e.restaurant_id = r.id AND e.event_date >= NOW()), 
        '[]'::json
    ) AS events_json,
    
    -- Horaires
    COALESCE(
        (SELECT json_agg(h.* ORDER BY h.day_of_week ASC) 
         FROM horaires h 
         WHERE h.restaurant_id = r.id), 
        '[]'::json
    ) AS horaires_json,
    
    -- Images
    COALESCE(
        (SELECT json_agg(i.* ORDER BY i.created_at DESC) 
         FROM restaurant_images i 
         WHERE i.restaurant_id = r.id), 
        '[]'::json
    ) AS images_json,
    
    -- Tags
    COALESCE(
        (SELECT json_agg(json_build_object('id', t.id, 'name', t.name)) 
         FROM restaurant_tags rt 
         JOIN tags t ON rt.tag_id = t.id 
         WHERE rt.restaurant_id = r.id), 
        '[]'::json
    ) AS tags_json,
    
    -- Feedback Statistics
    (
        SELECT json_build_object(
            'feedback_count', COUNT(f.id),
            'avg_rating', COALESCE(ROUND(AVG(f.rating), 1), 0),
            'avg_cuisine', COALESCE(ROUND(AVG(f.rating_cuisine), 1), 0),
            'avg_service', COALESCE(ROUND(AVG(f.rating_service), 1), 0),
            'avg_ambiance', COALESCE(ROUND(AVG(f.rating_ambiance), 1), 0)
        )
        FROM feedback f 
        WHERE f.restaurant_id = r.id
    ) AS feedback_stats,
    
    -- Feedback List
    COALESCE(
        (SELECT json_agg(f.* ORDER BY f.created_at DESC) 
         FROM feedback f 
         WHERE f.restaurant_id = r.id), 
        '[]'::json
    ) AS feedback_list_json

FROM restaurants r
LEFT JOIN cities c ON r.city_id = c.id
LEFT JOIN categories cat ON r.category_id = cat.id;
