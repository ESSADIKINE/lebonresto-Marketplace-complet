'use client';

import React from 'react';
import Link from 'next/link';
import { useGetSavedRestaurantsQuery, useUnsaveRestaurantMutation } from '../../../store/api';
import RestaurantCard from '../../../components/restaurant/RestaurantCard';
import { BsHeart, BsEmojiFrown } from 'react-icons/bs';

export default function SavedRestaurantsPage() {
    // curl -X GET "http://localhost:3000/me/saved-restaurants"
    const { data: savedList, isLoading, refetch } = useGetSavedRestaurantsQuery();
    const [unsaveRestaurant] = useUnsaveRestaurantMutation();

    const handleUnsave = async (restaurantId, e) => {
        e.preventDefault(); // prevent link navigation if placed insideLink
        e.stopPropagation();
        if (confirm('Voulez-vous vraiment retirer ce restaurant de vos favoris ?')) {
            try {
                // curl -X DELETE "http://localhost:3000/restaurants/{id}/save"
                await unsaveRestaurant(restaurantId).unwrap();
                // Optionally refetch or let RTK Query invalidation handle it
            } catch (error) {
                console.error("Failed to unsave", error);
            }
        }
    };

    if (isLoading) return <div className="text-center py-5"><span className="spinner-border text-primary"></span></div>;

    if (!savedList || savedList.length === 0) {
        return (
            <div className="text-center py-5">
                <div className="mb-3 text-muted display-1"><BsEmojiFrown /></div>
                <h4>Aucun favori</h4>
                <p className="text-muted">Vous n'avez pas encore sauvegardé de restaurants.</p>
                <Link href="/restaurants" className="btn btn-primary rounded-pill px-4 mt-2">Explorer</Link>
            </div>
        );
    }

    return (
        <div>
            <h4 className="fw-bold mb-4">Mes Restaurants Favoris</h4>

            <div className="row g-4">
                {savedList.map((item) => {
                    // savedList item structure: { id, customer_id, restaurant_id, restaurant: {...} }
                    const restaurant = item.restaurant || item; // Fallback if structure defers
                    return (
                        <div className="col-md-6 col-lg-6" key={item.id}>
                            <div className="position-relative h-100">
                                <RestaurantCard restaurant={restaurant} layout="grid" />

                                {/* Unsave Overlay Button */}
                                <button
                                    onClick={(e) => handleUnsave(restaurant.id, e)}
                                    className="btn btn-light text-danger position-absolute top-0 end-0 m-3 shadow-sm rounded-circle d-flex align-items-center justify-content-center border-0 z-3"
                                    style={{ width: 36, height: 36 }}
                                    title="Retirer des favoris"
                                >
                                    <BsHeart size={18} />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
