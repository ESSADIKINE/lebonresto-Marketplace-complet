import React from 'react';
import { BsStarFill } from 'react-icons/bs';

/**
 * Checks if a restaurant is "New" (created within last 30 days)
 * @param {string} createdAt ISO date string
 * @returns {boolean}
 */
export const isNewRestaurant = (createdAt) => {
    if (!createdAt) return false;
    const created = new Date(createdAt);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return created > thirtyDaysAgo;
};

/**
 * Formats price range into a readable string or symbol
 * @param {number|string} min 
 * @param {number|string} max 
 * @returns {string} e.g. "100 - 300 MAD" or "€€-€€€" fallback
 */
export const formatPriceRange = (min, max) => {
    const minVal = Number(min);
    const maxVal = Number(max);

    if (minVal > 0 && maxVal > 0) {
        return `${minVal} - ${maxVal} MAD`;
    }

    // Fallback if price is not set
    return "Prix non renseigné";
};

/**
 * Returns properties for status badge
 * @param {string} status 'basic' | 'standard' | 'premium' 
 * @returns {object|null} { label, className, icon }
 */
export const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
        case 'premium':
            return {
                label: 'Premium',
                className: 'badge bg-warning text-dark shadow-sm d-flex align-items-center gap-1',
                icon: <BsStarFill size={10} />
            };
        case 'standard':
            // Optional: Standard might not have a badge, or a different one
            return null;
        default:
            return null;
    }
};

/**
 * Normalizes restaurant object for card display
 * ensures all fields are present or have defaults
 */
export const normalizeRestaurantData = (restaurant) => {
    if (!restaurant) return null;

    return {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        // Use restaurant_image as main, fallback to logo_url, then placeholder
        image: restaurant.restaurant_image || restaurant.logo_url || '/assets/img/restaurant-placeholder.jpg',
        city: restaurant.city?.name || restaurant.city || restaurant.cityName || 'Maroc',
        address: restaurant.address || restaurant.city?.name || 'Adresse non renseignée',
        category: restaurant.category?.name || restaurant.category || restaurant.categoryName || 'Cuisine',

        // Rating and reviews
        rating: Number(restaurant.rating_avg || restaurant.rating || 0).toFixed(1),
        reviewCount: Number(restaurant.rating_count || restaurant.reviewCount || 0),

        // Price
        minPrice: Number(restaurant.min_price || 0),
        maxPrice: Number(restaurant.max_price || 0),

        // Status and flags
        status: restaurant.status, // "basic", "standard", "premium"
        restaurantStatus: restaurant.resturant_status, // "Ouvert", "Fermé"
        createdAt: restaurant.created_at,
        isActive: restaurant.is_active,

        // Tags can be strings or objects {name: '...'}
        tags: Array.isArray(restaurant.tags) ? restaurant.tags : [],

        // Location
        latitude: restaurant.latitude ? parseFloat(restaurant.latitude) : 0,
        longitude: restaurant.longitude ? parseFloat(restaurant.longitude) : 0,

        discount: Number(restaurant.max_discount_percentage || 0),

        // Calculated Distance (from backend)
        distance: restaurant.distance ? Number(restaurant.distance) : null
    };
};
