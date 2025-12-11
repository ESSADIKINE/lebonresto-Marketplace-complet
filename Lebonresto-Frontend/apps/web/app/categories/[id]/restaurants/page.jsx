'use client';

import React from 'react';
import NavbarLight from '../../../../components/navbar/navbar-light';
import FooterTop from '../../../../components/footer-top';

import BackToTop from '../../../../components/back-to-top';
import RestaurantListingClient from '../../../../components/listing/restaurant-listing-client';
import { useGetCategoryByIdQuery } from '../../../../store/api';

export default function CategoryRestaurantsPage({ params }) {
    const { id } = params;
    // curl -X GET "http://localhost:3000/categories/{id}"
    const { data: category, isLoading } = useGetCategoryByIdQuery(id);

    return (
        <div className="bg-light min-vh-100">
            <NavbarLight />

            {category && (
                <div className="bg-white border-bottom mb-4">
                    <div className="container py-lg-5 py-4">
                        <span className="badge bg-light text-primary mb-2">Cuisine</span>
                        <h1 className="fw-bold mb-2">{category.name}</h1>
                        <p className="text-muted mb-0">{category.description || `Découvrez tous nos restaurants spécialisés en cuisine ${category.name.toLowerCase()}.`}</p>
                    </div>
                </div>
            )}

            <RestaurantListingClient
                initialFilters={{ categoryId: id }}
                title={category ? `Restaurants ${category.name}` : undefined}
            />

            <FooterTop />

            <BackToTop />
        </div>
    );
}
