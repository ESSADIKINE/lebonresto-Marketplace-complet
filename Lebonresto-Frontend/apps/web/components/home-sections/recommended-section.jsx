'use client';

import React from 'react';
import { FaRegStar } from 'react-icons/fa6';
import { useGetRecommendedRestaurantsQuery } from '../../store/api';
import RestaurantCard from '../restaurant/RestaurantCard';
import HorizontalSlider from '../ui/HorizontalSlider';

export default function RecommendedSection() {
    const { data: restaurants, isLoading } = useGetRecommendedRestaurantsQuery({ limit: 12, sort: 'recommended' });

    const title = (
        <h2 className="display-6 fw-bold mb-2">
            Nos suggestions pour <span className="text-primary">vous</span> <FaRegStar className="text-warning ms-2 fs-5 align-top opacity-75" />
        </h2>
    );

    if (isLoading) {
        return (
            <HorizontalSlider title={title} subtitle="Une sélection de restaurants notés pour leur excellence et popularité.">
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
            subtitle="Une sélection de restaurants notés pour leur excellence et popularité."
            viewAllHref="/restaurants?status=premium"
        >
            {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
        </HorizontalSlider>
    );
}
