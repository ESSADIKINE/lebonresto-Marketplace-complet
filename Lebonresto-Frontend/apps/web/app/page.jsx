import React from 'react';
import NavbarLight from '../components/navbar/navbar-light';
import HeroSection from '../components/hero-section';
import CategoryTwo from '../components/category-two';
import ExploreCity from '../components/explore-city';
import ClientOne from '../components/client-one';
import BlogOne from '../components/blog-one';
import EventOne from '../components/event-one';
import FooterTop from '../components/footer-top';
import Footer from '../components/footer';
import BackToTop from '../components/back-to-top';

// New Sections using RTK Query
import PromosSection from '../components/home-sections/promos-section';
import RecommendedSection from '../components/home-sections/recommended-section';
import MostReservedSection from '../components/home-sections/most-reserved-section';
import NewestSection from '../components/home-sections/newest-section';

export default function Home() {
    return (
        <>
            <NavbarLight />

            {/* 1. Hero Section (Search/Filter) */}
            <HeroSection />

            {/* 2. Meilleures Offres (Promos) */}
            <PromosSection />

            {/* 3. Suggestions (Recommended: Premium > Standard > Basic) */}
            <RecommendedSection />

            {/* 4. Plus Réservés (Most Reserved) */}
            <MostReservedSection />

            {/* 5. Catégories (Votre envie du moment ?) */}
            <section className="bg-light">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
                            <div className="secHeading-wrap text-center">
                                <h3 className="sectionHeading">Votre envie du <span className="text-primary">moment ?</span></h3>
                                <p>Explorez les types de cuisine et trouvez le restaurant idéal.</p>
                            </div>
                        </div>
                    </div>
                    <CategoryTwo />
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
                                <p>Découvrez d’autres destinations gourmandes.</p>
                            </div>
                        </div>
                    </div>
                    <ExploreCity />
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
                    <ClientOne />
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
            <Footer />
            <BackToTop />
        </>
    );
}
