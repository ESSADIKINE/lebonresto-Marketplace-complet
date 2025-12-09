import React from 'react';
import RestaurantDetailClient from '../../../components/restaurant-detail/restaurant-detail-client';

// Generate metadata if needed for SEO, fetching simple data server side
export async function generateMetadata({ params }) {
    // In a real app we might fetch the restaurant name here
    return {
        title: `Restaurant Détails - LeBonResto`,
    }
}

export default function RestaurantDetailPage({ params }) {
    return <RestaurantDetailClient id={params.id} />;
}
