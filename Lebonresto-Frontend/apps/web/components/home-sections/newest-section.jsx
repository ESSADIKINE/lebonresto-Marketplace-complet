'use client';

import React from 'react';
import { FaBolt } from 'react-icons/fa6';
import { useGetLatestRestaurantsQuery } from '../../store/api';
import RestaurantCard from '../restaurant/RestaurantCard';
import HorizontalSlider from '../ui/HorizontalSlider';

export default function NewestSection() {
    const { data: restaurants, isLoading } = useGetLatestRestaurantsQuery({ limit: 12 });

    const title = (
        <h2 className="display-6 fw-bold mb-2">
            Nouveautés <span className="text-primary">notables</span> <FaBolt className="text-warning ms-2 fs-5 align-top opacity-75" />
        </h2>
    );

    if (isLoading) {
        return (
            <HorizontalSlider title={title} subtitle="Les derniers restaurants ajoutés sur la plateforme.">
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
            subtitle="Les derniers restaurants ajoutés sur la plateforme."
            viewAllHref="/restaurants?sort=newest"
        >
            {restaurants.map((item) => (
                <RestaurantCard key={item.id} restaurant={item} />
            ))}
        </HorizontalSlider>
    );
}
