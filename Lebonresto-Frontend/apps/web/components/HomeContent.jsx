'use client';

import React from 'react';
import Link from 'next/link';
import HeroSection from './hero-section';
import CategoryTwo from './category-two';
import ExploreCity from './explore-city';
import ClientOne from './client-one';
import BlogOne from './blog-one';
import EventOne from './event-one';
import FooterTop from './footer-top';


// RTK Query hooks
import {
    useGetCitiesQuery,
    useGetCategoriesQuery,
    useGetLatestFeedbackQuery,
} from '../store/api';

// New Sections
import PromosSection from './home-sections/promos-section';
import RecommendedSection from './home-sections/recommended-section';
import MostReservedSection from './home-sections/most-reserved-section';
import NewestSection from './home-sections/newest-section';

export default function HomeContent() {
    // Data source:
    // GET /cities
    // curl -X GET "http://localhost:3000/cities"
    const { data: cities, isLoading: citiesLoading } = useGetCitiesQuery();

    // Data source:
    // GET /categories
    // curl -X GET "http://localhost:3000/categories"
    const { data: categories, isLoading: categoriesLoading } = useGetCategoriesQuery();

    // Data source:
    // GET /feedback
    // curl -X GET "http://localhost:3000/feedback"
    const { data: feedback, isLoading: feedbackLoading } = useGetLatestFeedbackQuery();

    return (
        <>
            {/* 1. Hero Section (Search/Filter) */}
            {/* Needs cities for dropdown */}
            <HeroSection cities={cities} />

            {/* 2. Meilleures Offres (Promos) */}
            <PromosSection />

            {/* 3. Suggestions (Recommended) */}
            <RecommendedSection />

            {/* 4. Plus Réservés (Most Reserved) */}
            <MostReservedSection />

            {/* 5. Catégories */}
            <section className="bg-light">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
                            <div className="secHeading-wrap text-center">
                                <h3 className="sectionHeading">Votre envie du <span className="text-primary">moment ?</span></h3>
                                <p>Explorez les types de cuisine et trouvez le restaurant idéal. <Link href="/categories" className="text-primary fw-bold text-decoration-none small ms-1">Voir tout &rarr;</Link></p>
                            </div>
                        </div>
                    </div>
                    {/* Pass categories */}
                    <CategoryTwo categories={categories} />
                </div>
            </section>

            {/* 6. Nouveautés notables */}
            <NewestSection />

            {/* 7. Autres villes au Maroc */}
            <section>
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
                            <div className="secHeading-wrap text-center">
                                <h3 className="sectionHeading">Autres villes au <span className="text-primary">Maroc</span></h3>
                                <p>Découvrez d’autres destinations gourmandes. <Link href="/cities" className="text-primary fw-bold text-decoration-none small ms-1">Voir tout &rarr;</Link></p>
                            </div>
                        </div>
                    </div>
                    <ExploreCity cities={cities} />
                </div>
            </section>

            {/* 8. Avis clients */}
            <section className="bg-light">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
                            <div className="secHeading-wrap text-center">
                                <h3 className="sectionHeading">Avis de nos <span className="text-primary">clients</span></h3>
                                <p>Nos clients adorent nos services et partagent leurs expériences</p>
                            </div>
                        </div>
                    </div>
                    <ClientOne reviews={feedback} />
                </div>
            </section>

            {/* 9. Actualités / Blog */}
            <section className="light-top-gredient">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
                            <div className="secHeading-wrap text-center">
                                <h3 className="sectionHeading">Actualités & <span className="text-primary">Inspirations</span> culinaires</h3>
                                <p>Découvrez les dernières tendances et conseils gastronomiques</p>
                            </div>
                        </div>
                    </div>
                    <BlogOne />
                </div>
            </section>

            {/* 10. Événements */}
            <section className="pt-0">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
                            <div className="secHeading-wrap text-center">
                                <h3 className="sectionHeading">Événements & expériences <span className="text-primary">à venir</span></h3>
                                <p>Ne manquez pas les événements culinaires près de chez vous</p>
                            </div>
                        </div>
                    </div>
                    <EventOne />
                </div>
            </section>

            <FooterTop />

        </>
    );
}
