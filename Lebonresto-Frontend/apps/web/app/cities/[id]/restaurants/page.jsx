'use client';

import React from 'react';

import BackToTop from '../../../../components/back-to-top';
import RestaurantListingClient from '../../../../components/listing/restaurant-listing-client';
import { useGetCityByIdQuery } from '../../../../store/api';

export default function CityRestaurantsPage({ params }) {
    const { id } = params;
    // curl -X GET "http://localhost:3000/cities/{id}"
    const { data: city, isLoading } = useGetCityByIdQuery(id);

    return (
        <div className="bg-light min-vh-100">

            {city ? (
                <div className="bg-white border-bottom mb-4">
                    <div className="container py-lg-5 py-4">
                        <div className="row align-items-center">
                            <div className="col-lg-8">
                                <span className="badge bg-light text-primary mb-2">{city.region}</span>
                                <h1 className="fw-bold mb-2">Restaurants à {city.name}</h1>
                                <p className="text-muted mb-0">Explorez et réservez les meilleures tables de {city.name}, {city.country}.</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="container pt-5"></div>
            )}

            <RestaurantListingClient
                initialFilters={{ cityId: id }}
                title={city ? `Restaurants à ${city.name}` : 'Restaurants'}
            />


            <BackToTop />
        </div>
    );
}
