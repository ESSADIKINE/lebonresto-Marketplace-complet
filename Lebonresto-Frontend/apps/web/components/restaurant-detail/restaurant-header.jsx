'use client';

import React from 'react';
import Link from 'next/link';
import { BsStarFill, BsGeoAlt, BsBookmark, BsBookmarkFill, BsShare } from 'react-icons/bs';
import { useSaveRestaurantMutation, useUnsaveRestaurantMutation, useGetSavedRestaurantsQuery } from '../../store/api';

export default function RestaurantHeader({ restaurant }) {
    const { data: savedRestaurants } = useGetSavedRestaurantsQuery();
    const [saveRestaurant] = useSaveRestaurantMutation();
    const [unsaveRestaurant] = useUnsaveRestaurantMutation();

    // Check if restaurant is saved
    const isSaved = savedRestaurants?.some(r => r.restaurant_id === restaurant.id);

    const handleSaveToggle = async () => {
        try {
            if (isSaved) {
                await unsaveRestaurant(restaurant.id);
            } else {
                await saveRestaurant(restaurant.id);
            }
        } catch (error) {
            console.error('Error toggling save:', error);
        }
    };

    const priceRange = restaurant.price_range || '€€-€€€';
    const categoryName = restaurant.category?.name || 'Restaurant';

    return (
        <div className="d-block mb-4">
            <div className="row">
                <div className="col-xl-8 col-lg-8 col-md-12">
                    <div className="d-block">
                        <div className="d-flex align-items-center mb-2">
                            <span className="badge bg-primary bg-opacity-10 text-primary me-2 mb-2">{categoryName}</span>
                            {restaurant.status === 'premium' && <span className="badge bg-warning text-dark me-2 mb-2">Premium</span>}
                            {/* Promo Badge logic could go here */}
                        </div>
                        <h1 className="fw-bold mb-2">{restaurant.name}</h1>
                        <div className="d-flex align-items-center mb-3 text-muted">
                            <BsGeoAlt className="me-2 text-primary" />
                            <span className="fw-medium me-3">{restaurant.address}, {restaurant.city?.name}</span>
                            <span className="me-3">•</span>
                            <span className="fw-medium me-3">{priceRange}</span>
                        </div>

                        <div className="d-flex align-items-center gap-4">
                            <div className="d-flex align-items-center">
                                <span className="text-warning fs-4 me-2"><BsStarFill /></span>
                                <span className="fw-bold fs-4 text-dark me-1">{restaurant.rating_avg || '—'}</span>
                                <span className="text-muted text-md">/ 5 ({restaurant.rating_count || 0} avis)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-12">
                    <div className="d-flex align-items-center justify-content-lg-end justify-content-start gap-3 mt-lg-0 mt-4">
                        <div className="d-flex flex-column align-items-end">
                            <Link href={`/restaurants/${restaurant.id}/reservation`} className="btn btn-primary btn-lg rounded-pill px-5 fw-bold shadow-sm">
                                Réserver une table
                            </Link>
                            <small className="text-muted mt-2"><span className="text-success">●</span> Confirmation immédiate</small>
                        </div>
                        <button
                            className={`btn btn-md rounded-pill px-4 fw-medium ${isSaved ? 'btn-danger' : 'btn-light border'}`}
                            onClick={handleSaveToggle}
                        >
                            {isSaved ? <BsBookmarkFill className="me-2" /> : <BsBookmark className="me-2" />}
                        </button>
                        <button className="btn btn-md btn-light border rounded-pill px-4 fw-medium">
                            <BsShare />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
