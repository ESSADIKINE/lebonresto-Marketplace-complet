'use client';

import React from 'react';
import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';
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
            <CategoryTwo
                categories={categories}
                title={
                    <h2 className="display-6 fw-bold mb-2">
                        Votre envie du <span className="text-primary">moment ?</span> 😋
                    </h2>
                }
                subtitle="Explorez les types de cuisine et trouvez le restaurant idéal."
                viewAllHref="/categories"
            />

            {/* 6. Nouveautés notables */}
            <NewestSection />

            {/* 7. Autres villes au Maroc */}
            <section className="position-relative overflow-hidden py-5">
                <div className="container">
                    <div className="row align-items-end justify-content-between mb-5">
                        <div className="col-lg-8 col-md-12">
                            <div className="secHeading-wrap mb-0">
                                <h2 className="display-6 fw-bold mb-2">
                                    Autres villes au <span className="text-primary">Maroc</span> 🇲🇦
                                </h2>
                                <p className="lead text-muted fs-6 mb-0">
                                    Découvrez d’autres destinations gourmandes.
                                </p>
                            </div>
                        </div>
                        {/* Desktop Mini CTA */}
                        <div className="col-lg-4 d-none d-lg-flex justify-content-end pb-1">
                            <Link href="/cities" className="text-primary fw-bold text-decoration-none hover-underline small d-flex align-items-center">
                                Voir toutes les villes <BsArrowRight className="ms-2" />
                            </Link>
                        </div>
                    </div>
                    <ExploreCity cities={cities} />
                </div>
            </section>

            {/* 8. Avis clients */}
            <section className="position-relative overflow-hidden py-5 bg-light">
                <div className="container">
                    <div className="row align-items-end justify-content-between mb-5">
                        <div className="col-lg-8 col-md-12">
                            <div className="secHeading-wrap mb-0">
                                <h2 className="display-6 fw-bold mb-2">
                                    Avis de nos <span className="text-primary">clients</span> 💬
                                </h2>
                                <p className="lead text-muted fs-6 mb-0">
                                    Nos clients adorent nos services et partagent leurs expériences.
                                </p>
                            </div>
                        </div>
                        {/* Desktop Mini CTA */}
                        <div className="col-lg-4 d-none d-lg-flex justify-content-end pb-1">
                            {/* Link to a reviews page if it exists, otherwise simplify or omit */}
                            <span className="text-muted small">Basé sur des avis réels</span>
                        </div>
                    </div>
                    <ClientOne />
                </div>
            </section>

            {/* 9. Actualités / Blog */}
            <section className="light-top-gredient py-5">
                <div className="container">
                    <div className="row align-items-end justify-content-between mb-5">
                        <div className="col-lg-8 col-md-12">
                            <div className="secHeading-wrap mb-0">
                                <h2 className="display-6 fw-bold mb-2">
                                    Actualités & Inspirations <span className="text-primary">culinaires</span> 📰
                                </h2>
                                <p className="lead text-muted fs-6 mb-0">
                                    Découvrez les dernières tendances et conseils gastronomiques.
                                </p>
                            </div>
                        </div>
                        {/* Desktop Mini CTA */}
                        <div className="col-lg-4 d-none d-lg-flex justify-content-end pb-1">
                            <Link href="/blog" className="text-primary fw-bold text-decoration-none hover-underline small d-flex align-items-center">
                                Voir tous les articles <BsArrowRight className="ms-2" />
                            </Link>
                        </div>
                    </div>
                    <BlogOne />
                </div>
            </section>



            <FooterTop />

        </>
    );
}