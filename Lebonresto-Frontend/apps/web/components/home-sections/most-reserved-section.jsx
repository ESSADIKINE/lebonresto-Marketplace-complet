'use client';

import React from 'react';
import RestaurantCarousel from './restaurant-carousel';
import { useGetMostReservedRestaurantsQuery } from '../../store/api';

export default function MostReservedSection() {
    const { data: restaurants, isLoading, isError } = useGetMostReservedRestaurantsQuery({ limit: 12 });

    return (
        <section>
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
                        <div className="secHeading-wrap text-center">
                            <h3 className="sectionHeading">Établissements les plus <span className="text-primary">réservés</span></h3>
                            <p>Les restaurants les plus populaires auprès de nos utilisateurs ce mois-ci.</p>
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
