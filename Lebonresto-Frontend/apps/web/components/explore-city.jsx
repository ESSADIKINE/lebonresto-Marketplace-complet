'use client';

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useGetCitiesQuery } from '../store/api'

export default function ExploreCity({ cities: initialCities }) {
    const { data: apiCities, isLoading, isError } = useGetCitiesQuery(undefined, { skip: !!initialCities });
    const cities = initialCities || apiCities;

    if (!cities && isLoading) {
        return (
            <div className="row align-items-center justify-content-center">
                <div className="col-12 text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !cities || cities.length === 0) {
        return (
            <div className="row align-items-center justify-content-center">
                <div className="col-12 text-center py-5">
                    <p className="text-muted">Aucune ville disponible.</p>
                </div>
            </div>
        );
    }

    // Sort by count_restaurants descending and take top 6
    const displayCities = [...cities]
        .sort((a, b) => (b.count_restaurants || 0) - (a.count_restaurants || 0))
        .slice(0, 6);

    return (
        <div className="row align-items-center justify-content-center g-4">
            {displayCities.map((city, index) => {
                // Replicate the grid pattern from data/data.js
                // Pattern seems to be: 6, 3, 3, 3, 3, 6 (based on 6 items)
                // Index 0: col-xl-6 (Large)
                // Index 1, 2, 3, 4: col-xl-3 (Small)
                // Index 5: col-xl-6 (Large)
                // Let's generalize this pattern or just use a modulo logic if the list is longer.
                // For 6 items: 0->6, 1->3, 2->3, 3->3, 4->3, 5->6

                let gridClass = 'col-xl-3 col-lg-3 col-md-4 col-sm-6'; // Default small
                if (index % 6 === 0 || index % 6 === 5) {
                    gridClass = 'col-xl-6 col-lg-6 col-md-4 col-sm-6'; // Large
                }

                // Override for specific indices to match data.js exactly if we only show 6
                // data.js: 
                // 0: xl-6
                // 1: xl-3
                // 2: xl-3
                // 3: xl-3
                // 4: xl-3
                // 5: xl-6

                return (
                    <div className={gridClass} key={city.id}>
                        <div className="card border-0 rounded-4 ht-300 position-relative">
                            <Link
                                href={{
                                    pathname: '/restaurants_grid',
                                    query: { city_id: city.id }
                                }}
                                className="h-100"
                                tabIndex="-1"
                                aria-label={`Explore restaurants in ${city.name}`}
                            >
                                <div className="abx-thumb h-100 position-relative" data-overlay="3">
                                    <Image
                                        src={city.city_image || "/assets/img/places/city-placeholder.jpg"}
                                        alt={city.name}
                                        fill
                                        className="w-100 h-100 object-fit"
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </Link>
                            <div className="position-absolute top-0 end-0 mt-3 me-3 z-1">
                                <span className="badge badge-xs bg-light text-dark rounded-pill">
                                    {city.count_restaurants || 0} Restos
                                </span>
                            </div>
                            <div className="position-absolute bottom-0 start-0 mb-3 ms-3 z-1">
                                <div className="d-block w-100 position-relative">
                                    <div className="cityTitle">
                                        <h4 className="text-light">{city.name}</h4>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start flex-wrap gap-2">
                                        {city.country && (
                                            <span className="badge badge-xs badge-transparent rounded-pill">{city.country}</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
