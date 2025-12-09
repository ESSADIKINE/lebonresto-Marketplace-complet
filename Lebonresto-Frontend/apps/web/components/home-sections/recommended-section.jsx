'use client';

import React from 'react';
import RestaurantCarousel from './restaurant-carousel';
import { useGetRecommendedRestaurantsQuery } from '../../store/api';

export default function RecommendedSection() {
    const { data: restaurants, isLoading, isError } = useGetRecommendedRestaurantsQuery();

    return (
        <section className="bg-light">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
                        <div className="secHeading-wrap text-center">
                            <h3 className="sectionHeading">Nos suggestions pour <span className="text-primary">vous</span></h3>
                            <p>Restaurants premium, standard et basic recommandés pour vous.</p>
                        </div>
                    </div>
                </div>
                <RestaurantCarousel
                    restaurants={restaurants}
                    isLoading={isLoading}
                    isError={isError}
                />
            </div>
        </section>
    );
}
