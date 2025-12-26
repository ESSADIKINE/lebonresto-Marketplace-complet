import React from 'react';
import RestaurantListingClient from '../../components/listing/restaurant-listing-client';

export const metadata = {
    title: 'Tous les restaurants | LeBonResto',
    description: 'Découvrez tous les restaurants disponibles sur LeBonResto. Filtrez par ville, cuisine, prix et réservez votre table gratuitement.',
};

export default function RestaurantsPage() {
    return (
        <div className="bg-light min-vh-100">
            {/* Breadcrumb or Top Banner could go here */}

            <div>
                <RestaurantListingClient />
            </div>


        </div>
    );
}
