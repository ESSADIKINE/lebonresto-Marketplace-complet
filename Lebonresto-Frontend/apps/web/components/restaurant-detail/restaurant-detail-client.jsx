'use client';

import React from 'react';
import {
    useGetRestaurantByIdQuery,
    useGetRestaurantImagesQuery,
    useGetRestaurantMenusQuery,
    useGetRestaurantPlatsQuery,
    useGetRestaurantFeedbackQuery,
    useGetRestaurantEventsQuery,
    useGetRestaurantSummaryQuery,
    useGetRestaurantTagsQuery,
    useGetRecommendedRestaurantsQuery
} from '../../store/api';

import RestaurantHeader from './restaurant-header';
import RestaurantGallery from './restaurant-gallery';
import RestaurantInfoSidebar from './restaurant-info-sidebar';
import RestaurantTabs from './restaurant-tabs';
import RestaurantReviews from './restaurant-reviews';
import RestaurantEvents from './restaurant-events';
import RestaurantMediaSection from './restaurant-media-section';
import RestaurantCarousel from '../home-sections/restaurant-carousel';
import NavbarLight from '../navbar/navbar-light';
import FooterTop from '../footer-top';
import Footer from '../footer';
import BackToTop from '../back-to-top';

export default function RestaurantDetailClient({ id }) {
    // Parallel Fetching
    // curl -X GET "http://localhost:3000/restaurants/{id}"
    const { data: restaurant, isLoading: loadingInfo } = useGetRestaurantByIdQuery(id);
    // curl -X GET "http://localhost:3000/restaurants/{id}/images"
    const { data: images, isLoading: loadingImages } = useGetRestaurantImagesQuery(id);
    // curl -X GET "http://localhost:3000/restaurants/{id}/menus"
    const { data: menus, isLoading: loadingMenus } = useGetRestaurantMenusQuery(id);
    // curl -X GET "http://localhost:3000/restaurants/{id}/plats"
    const { data: plats, isLoading: loadingPlats } = useGetRestaurantPlatsQuery(id);
    // curl -X GET "http://localhost:3000/restaurants/{id}/feedback"
    const { data: feedback } = useGetRestaurantFeedbackQuery(id);
    // curl -X GET "http://localhost:3000/restaurants/{id}/events"
    const { data: events, isLoading: loadingEvents } = useGetRestaurantEventsQuery(id);
    const { data: summary } = useGetRestaurantSummaryQuery(id);
    const { data: tags } = useGetRestaurantTagsQuery(id);

    // Fetch similar/recommended for "Vous aimerez aussi"
    const { data: recommended, isLoading: loadingRecommended } = useGetRecommendedRestaurantsQuery();

    if (loadingInfo) {
        return (
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Chargement...</span>
                </div>
            </div>
        );
    }

    if (!restaurant) {
        return (
            <div className="d-flex flex-column align-items-center justify-content-center vh-100 gap-3">
                <h3>Restaurant introuvable</h3>
                <a href="/" className="btn btn-primary rounded-pill">Retour à l'accueil</a>
            </div>
        )
    }

    // Merge tags into restaurant object for easier passing if needed, or pass separately
    const fullRestaurant = { ...restaurant, tagsData: tags };

    return (
        <div className="bg-light min-vh-100">
            <NavbarLight />

            <div className="container pt-5 pb-5">

                {/* 1. Header Info */}
                <RestaurantHeader restaurant={fullRestaurant} />

                {/* 2. Gallery */}
                <RestaurantGallery images={images} />

                {/* 3. Media Section (Virtual Tour & Video) */}
                <RestaurantMediaSection
                    visit360_url={restaurant.visit360_url}
                    video_url={restaurant.video_url}
                    restaurantName={restaurant.name}
                />

                <div className="row">
                    {/* Main Content Column */}
                    <div className="col-lg-8 col-md-12">

                        {/* 4. Events (if any) */}
                        <RestaurantEvents events={events} />

                        {/* 5. Menus & Plats */}
                        <RestaurantTabs restaurant={restaurant} menus={menus} plats={plats} />

                        {/* 6. Reviews */}
                        <RestaurantReviews feedback={feedback} summary={summary} />

                    </div>

                    {/* Sidebar Column */}
                    <div className="col-lg-4 col-md-12">
                        <RestaurantInfoSidebar restaurant={restaurant} />

                        {/* Sticky Reserve Button for Mobile/Desktop scroll context could be added here */}
                        <div className="card border-0 rounded-4 shadow-sm bg-white p-4 text-center sticky-top" style={{ top: '100px', zIndex: 10 }}>
                            <h4 className="fw-bold mb-3">Réserver une table</h4>
                            <p className="text-muted small mb-4">Confirmation immédiate</p>
                            <button className="btn btn-primary w-100 rounded-pill fw-bold py-3 mb-2">
                                Choisir une date
                            </button>
                            <span className="text-muted text-xs">Aucun frais de réservation</span>
                        </div>
                    </div>
                </div>

                {/* 7. Similar Restaurants */}
                <div className="mt-5">
                    <h3 className="fw-bold mb-4">Vous aimerez aussi</h3>
                    <RestaurantCarousel restaurants={recommended} isLoading={loadingRecommended} />
                </div>

            </div>

            <FooterTop />
            <Footer />
            <BackToTop />
        </div>
    );
}
