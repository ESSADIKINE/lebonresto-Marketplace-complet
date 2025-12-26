// apps/web/components/restaurant-detail/RestaurantDetailClient.jsx
'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchRestaurantFullById,
    selectRestaurantDetail,
    selectRestaurantDetailLoading,
    selectRestaurantDetailError
} from '../../store/slices/restaurantDetailSlice';
import { useGetRecommendedRestaurantsQuery } from '../../store/api';

import RestaurantInfoCard from './restaurant-info-card';
import RestaurantMediaToggle from './restaurant-media-toggle';
import RestaurantGalleryGrid from './restaurant-gallery-grid';

import RestaurantSidebarRight from './restaurant-sidebar-right';
import RestaurantCarousel from '../home-sections/restaurant-carousel';
import RestaurantContentTabs from './restaurant-content-tabs'; // New Import

import styles from './restaurant-detail-page.module.css';

export default function RestaurantDetailClient({ id }) {
    const dispatch = useDispatch();

    const restaurant = useSelector((state) => selectRestaurantDetail(state, id));
    const loadingInfo = useSelector((state) => selectRestaurantDetailLoading(state, id));
    const error = useSelector((state) => selectRestaurantDetailError(state, id));

    useEffect(() => {
        if (id && !restaurant && !loadingInfo && !error) {
            dispatch(fetchRestaurantFullById(id));
        }
    }, [id, restaurant, loadingInfo, error, dispatch]);

    const { data: recommended, isLoading: loadingRecommended } = useGetRecommendedRestaurantsQuery();

    const fullRestaurant = React.useMemo(() => {
        if (!restaurant) return null;
        return {
            ...restaurant,
            tagsData: restaurant.tags_json || [],
            images: (restaurant.images_json || []).map((img) => ({ ...img, image_url: img.url })),
            menus: restaurant.menus_json || [],
            plats: restaurant.plats_json || [],
            events: restaurant.events_json || [],
            feedback: restaurant.feedback_list_json || [],
            category: {
                id: restaurant.category_id,
                name: restaurant.category_name,
                slug: restaurant.category_slug
            },
            city: {
                id: restaurant.city_id,
                name: restaurant.city_name,
                region: restaurant.city_region,
                country: restaurant.city_country
            },
            price_range:
                restaurant.min_price !== null && restaurant.max_price !== null
                    ? `${restaurant.min_price} - ${restaurant.max_price} MAD`
                    : 'Prix sur demande',
            status: restaurant.subscription_status,
            restaurant_status: restaurant.business_status
        };
    }, [restaurant]);

    const summary = restaurant?.feedback_stats || {
        rating_avg: 0,
        rating_count: 0,
        avg_cuisine: 0,
        avg_service: 0,
        avg_ambiance: 0
    };

    if (loadingInfo) {
        return (
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </div>
            </div>
        );
    }

    if (error || !restaurant) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center vh-100 gap-3">
                <h3>Restaurant introuvable</h3>
                {error && (
                    <p className="text-danger">
                        {typeof error === 'string' ? error : 'Une erreur est survenue'}
                    </p>
                )}
                <a href="/" className="btn btn-primary rounded-pill">
                    Retour à l&apos;accueil
                </a>
            </div>
        );
    }

    return (
        <div className="bg-light min-vh-100">

            <div className={`container-xxl pt-4 pb-5 ${styles.detailLayout}`}>
                {/* 1. Header & Media Section */}
                <div className={`row g-4 mb-3 ${styles.headerRow}`}>
                    <div className="col-lg-5 col-md-12">
                        <RestaurantInfoCard restaurant={fullRestaurant} summary={summary} />
                    </div>
                    <div className="col-lg-7 col-md-12">
                        <RestaurantMediaToggle
                            visit360_url={restaurant.visit360_url}
                            video_url={restaurant.video_url}
                            restaurantName={restaurant.name}
                        />
                    </div>
                </div>

                {/* 2. Gallery Section */}
                <RestaurantGalleryGrid images={fullRestaurant.images} />

                {/* 3. Reviews & Sidebar Section */}
                <div className={`row g-4 ${styles.bottomRow}`}>
                    <div className="col-lg-8 col-md-12">

                        {/* Menus, Events, Plats Tabs */}
                        <RestaurantContentTabs
                            menus={fullRestaurant.menus}
                            plats={fullRestaurant.plats}
                            events={fullRestaurant.events}
                            horaires={restaurant.horaires_json}
                            feedback={fullRestaurant.feedback}
                            summary={summary}
                        />
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <RestaurantSidebarRight restaurant={fullRestaurant} />
                    </div>
                </div>

                {/* 4. Similar Restaurants */}
                <div className={`mt-5 pt-4 ${styles.similarBlock}`}>
                    <h3 className="fw-bold mb-4">Vous aimerez aussi</h3>
                    <RestaurantCarousel restaurants={recommended?.items || []} isLoading={loadingRecommended} />
                </div>
            </div>

        </div>
    );
}
