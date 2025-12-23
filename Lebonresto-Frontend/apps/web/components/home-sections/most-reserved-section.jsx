'use client';

import React from 'react';
import { FaFire } from 'react-icons/fa6';
import { useGetMostReservedRestaurantsQuery } from '../../store/api';
import RestaurantCard from '../restaurant/RestaurantCard';
import HorizontalSlider from '../ui/HorizontalSlider';

export default function MostReservedSection() {
    const { data: restaurants, isLoading } = useGetMostReservedRestaurantsQuery({ limit: 12, period: 'month' });

    const title = (
        <h2 className="display-6 fw-bold mb-2">
            Établissements les plus <span className="text-primary">réservés</span> <FaFire className="text-danger ms-2 fs-5 align-top opacity-75" />
        </h2>
    );

    if (isLoading) {
        return (
            <HorizontalSlider title={title} subtitle="Les restaurants les plus populaires auprès de nos utilisateurs ce mois-ci.">
                {[1, 2, 3, 4].map((i) => (
                    <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden" aria-hidden="true" key={i}>
                        <div className="bg-light ratio ratio-16x9 placeholder-glow"></div>
                        <div className="card-body">
                            <h5 className="card-title placeholder-glow"><span className="placeholder col-6"></span></h5>
                            <p className="card-text placeholder-glow">
                                <span className="placeholder col-7"></span>
                                <span className="placeholder col-4"></span>
                            </p>
                        </div>
                    </div>
                ))}
            </HorizontalSlider>
        );
    }

    if (!restaurants || restaurants.length === 0) return null;

    return (
        <HorizontalSlider
            title={title}
            subtitle="Les restaurants les plus populaires auprès de nos utilisateurs ce mois-ci."
            viewAllHref="/restaurants?sort=most_reserved"
        >
            {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
        </HorizontalSlider>
    );
}
