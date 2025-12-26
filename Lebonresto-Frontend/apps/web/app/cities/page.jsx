'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGetCitiesQuery } from '../../store/api';


export default function CitiesPage() {
    // curl -X GET "http://localhost:3000/cities"
    const { data: cities, isLoading } = useGetCitiesQuery();

    return (
        <div className="bg-light min-vh-100">
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h1 className="fw-bold">Toutes les villes</h1>
                    <p className="text-muted">Découvrez les meilleures tables par destination</p>
                </div>

                {isLoading ? (
                    <div className="text-center py-5"><span className="spinner-border text-primary"></span></div>
                ) : (
                    <div className="row g-4 justify-content-center">
                        {cities?.map((city) => (
                            <div className="col-xl-3 col-lg-4 col-md-6" key={city.id}>
                                <Link href={`/cities/${city.id}/restaurants`} className="card border-0 rounded-4 shadow-sm h-100 text-decoration-none overflow-hidden hover-scale">
                                    <div className="position-relative" style={{ height: 200 }}>
                                        <Image
                                            src={city.city_image || "/assets/img/places/city-placeholder.jpg"}
                                            alt={city.name}
                                            fill
                                            className="object-fit-cover transition-transform"
                                        />
                                        <div className="position-absolute top-0 end-0 m-3 badge bg-white text-dark shadow-sm rounded-pill py-2 px-3">
                                            {city.count_restaurants || 0} Restos
                                        </div>
                                    </div>
                                    <div className="card-body text-center p-4">
                                        <h4 className="fw-bold text-dark mb-1">{city.name}</h4>
                                        <p className="text-muted small mb-0">{city.region} {city.country ? `• ${city.country}` : ''}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
}
