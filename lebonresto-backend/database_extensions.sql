-- Execute this in your Supabase SQL Editor to enable advanced features

-- 1. View for Restaurants with Promos
CREATE OR REPLACE VIEW view_restaurants_with_promos AS
SELECT
  r.*,
  MAX(e.discount_percentage) AS max_discount_percentage,
  MIN(e.promo_start_at) AS nearest_promo_start_at
FROM restaurants r
JOIN events e ON e.restaurant_id = r.id
WHERE
  e.is_promo = TRUE
  AND e.discount_percentage IS NOT NULL
  AND (e.promo_start_at IS NULL OR e.promo_start_at <= now())
  AND (e.promo_end_at IS NULL OR e.promo_end_at >= now())
GROUP BY r.id;

-- 2. Function for Most Reserved (since parameterized views aren't standard)
-- Note: This returns restaurant rows plus the count.
CREATE OR REPLACE FUNCTION get_most_reserved_restaurants(start_date timestamp, end_date timestamp, limit_count int)
RETURNS TABLE (
  id uuid,
  owner_id uuid, -- include all vital columns you need
  name text,
  description text,
  logo_url text,
  city_id uuid,
  category_id uuid,
  rating_avg numeric,
  created_at timestamp with time zone,
  reservation_count bigint
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    r.id,
    r.owner_id,
    r.name,
    r.description,
    r.logo_url,
    r.city_id,
    r.category_id,
    r.rating_avg,
    r.created_at,
    COUNT(res.id) as reservation_count
  FROM restaurants r
  JOIN reservations res ON res.restaurant_id = r.id
  WHERE res.reservation_time >= start_date AND res.reservation_time < end_date
  GROUP BY r.id
  ORDER BY reservation_count DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;
