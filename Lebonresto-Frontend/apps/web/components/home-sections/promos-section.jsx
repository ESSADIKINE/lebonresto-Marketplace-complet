'use client';

import React from 'react';
import CustomTitleIcon from '../ui/CustomTitleIcon';
import { useGetPromoRestaurantsQuery } from '../../store/api';
import RestaurantCard from '../restaurant/RestaurantCard';
import HorizontalSlider from '../ui/HorizontalSlider';

export default function PromosSection() {
    const { data: restaurants, isLoading } = useGetPromoRestaurantsQuery({ limit: 12 });

    const title = (
        <h2 className="display-6 fw-bold mb-2">
            Nos meilleures <span className="text-primary">offres</span> <CustomTitleIcon className="text-success ms-2 fs-5 align-top opacity-75" />
        </h2>
    );

    if (isLoading) {
        return (
            <HorizontalSlider title={title} subtitle="Profitez des meilleures réductions dans les restaurants partenaires.">
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
            subtitle="Profitez des meilleures réductions dans les restaurants partenaires."
            viewAllHref="/restaurants?promoOnly=true"
            className="bg-light" // Slight variation for promos
        >
            {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
        </HorizontalSlider>
    );
}
