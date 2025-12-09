'use client';

import React from 'react';
import RestaurantCarousel from './restaurant-carousel';
import { useGetPromoRestaurantsQuery } from '../../store/api';

export default function PromosSection() {
    const { data: restaurants, isLoading, isError } = useGetPromoRestaurantsQuery();

    // If no promos, don't show section or show empty? 
    // Usually if empty we might hide it, but requirement implies showing it.

    return (
        <section>
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
                        <div className="secHeading-wrap text-center">
                            <h3 className="sectionHeading">Nos meilleures <span className="text-primary">offres</span></h3>
                            <p>Profitez des meilleures réductions dans les restaurants partenaires.</p>
                        </div>
                    </div>
                </div>
                <RestaurantCarousel
                    restaurants={restaurants}
                    isLoading={isLoading}
                    isError={isError}
                    emptyMessage="Aucune offre promotionnelle pour le moment."
                />
            </div>
        </section>
    );
}
