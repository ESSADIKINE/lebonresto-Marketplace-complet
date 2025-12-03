import React from 'react';
import NavbarLight from '../components/navbar/navbar-light';
import HeroSection from '../components/hero-section';
import CategoryTwo from '../components/category-two';
import FeaturedListing from '../components/featured-listing';
import ExploreCity from '../components/explore-city';
import ClientOne from '../components/client-one';
import BlogOne from '../components/blog-one';
import EventOne from '../components/event-one';
import FooterTop from '../components/footer-top';
import Footer from '../components/footer';
import BackToTop from '../components/back-to-top';

async function getData() {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

    try {
        const [restaurantsRes, citiesRes, categoriesRes, feedbackRes] = await Promise.allSettled([
            fetch(`${baseURL}/restaurants`, { next: { revalidate: 60 } }),
            fetch(`${baseURL}/cities`, { next: { revalidate: 60 } }),
            fetch(`${baseURL}/categories`, { next: { revalidate: 60 } }),
            fetch(`${baseURL}/feedback`, { next: { revalidate: 60 } })
        ]);

        const restaurants = restaurantsRes.status === 'fulfilled' && restaurantsRes.value.ok ? await restaurantsRes.value.json() : [];
        const cities = citiesRes.status === 'fulfilled' && citiesRes.value.ok ? await citiesRes.value.json() : [];
        const categories = categoriesRes.status === 'fulfilled' && categoriesRes.value.ok ? await categoriesRes.value.json() : [];
        const feedback = feedbackRes.status === 'fulfilled' && feedbackRes.value.ok ? await feedbackRes.value.json() : [];

        return { restaurants, cities, categories, feedback };
    } catch (error) {
        console.error('Error fetching data:', error);
        return { restaurants: [], cities: [], categories: [], feedback: [] };
    }
}

export default async function Home() {
    const { restaurants, cities, categories, feedback } = await getData();

    return (
        <>
            <NavbarLight />
            <HeroSection cities={cities} />

            <section className="pb-0">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
                            <div className="secHeading-wrap text-center">
                                <h3 className="sectionHeading">Catégories populaires de <span className="text-primary">restaurants</span></h3>
                                <p>Explorez tous les types de cuisines disponibles au Maroc</p>
                            </div>
                        </div>
                    </div>
                    <CategoryTwo categories={categories} />
                </div>
            </section>

            <section>
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
                            <div className="secHeading-wrap text-center">
                                <h3 className="sectionHeading">Restaurants populaires au <span className="text-primary">Maroc</span></h3>
                                <p>Découvrez les meilleurs restaurants recommandés par nos clients</p>
                            </div>
                        </div>
                    </div>
                    <FeaturedListing restaurants={restaurants} cities={cities} categories={categories} />
                </div>
            </section>

            <section className="bg-light">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-xl-7 col-lg-8 col-md-11 col-sm-12">
                            <div className="secHeading-wrap text-center">
                                <h3 className="sectionHeading">Explorer les restaurants par <span className="text-primary">ville</span></h3>
                                <p>Trouvez les meilleurs restaurants dans votre ville</p>
                            </div>
                        </div>
                    </div>
                    <ExploreCity cities={cities} />
                </div>
            </section>

            <section>
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
