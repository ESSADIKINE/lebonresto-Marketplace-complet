'use client';

import React from 'react';
import RestaurantCarousel from './restaurant-carousel';
import { useGetLatestRestaurantsQuery } from '../../store/api';

export default function NewestSection() {
    const { data: restaurants, isLoading, isError } = useGetLatestRestaurantsQuery();

    return (
        <section className="bg-light">
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
                        <div className="secHeading-wrap text-center">
                            <h3 className="sectionHeading">Nouveautés <span className="text-primary">notables</span></h3>
                            <p>Les derniers restaurants ajoutés sur la plateforme.</p>
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
