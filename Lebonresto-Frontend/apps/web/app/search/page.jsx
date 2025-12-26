'use client';

import React from 'react';

import RestaurantListingClient from '../../components/listing/restaurant-listing-client';
import { useSearchParams } from 'next/navigation';

function SearchPageContent() {
    const searchParams = useSearchParams();
    const query = searchParams.get('q') || searchParams.get('query') || '';

    return (
        <div className="bg-light min-vh-100">
            {/* Header is in RootLayout now */}
            <div style={{ paddingTop: '20px' }}></div>

            <RestaurantListingClient
                title={query ? `Résultats pour "${query}"` : 'Résultats de recherche'}
            />


        </div>
    );
}

export default function SearchPage() {
    return (
        <React.Suspense fallback={<div className="text-center py-5"><span className="spinner-border text-primary"></span></div>}>
            <SearchPageContent />
        </React.Suspense>
    );
}
