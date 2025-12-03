import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NavbarLight from '../../../components/navbar/navbar-light';
import Footer from '../../../components/footer';
import { BsGeoAlt, BsTelephone, BsEnvelope, BsGlobe, BsStarFill, BsClock, BsCheckCircle, BsShare, BsHeart } from 'react-icons/bs';
import { FaUtensils, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';

export async function generateMetadata({ params }) {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
    try {
        const res = await fetch(`${baseURL}/restaurants/${params.id}`, { cache: 'no-store' });
        if (!res.ok) return { title: 'Restaurant Not Found' };
        const restaurant = await res.json();
        return {
            title: `${restaurant.name} - LeBonResto`,
            description: restaurant.description || `Details for ${restaurant.name}`,
        };
    } catch (error) {
        return { title: 'Error' };
    }
}

async function getData(id) {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
    try {
        const [restaurantRes, citiesRes, categoriesRes] = await Promise.allSettled([
            fetch(`${baseURL}/restaurants/${id}`, { cache: 'no-store' }),
            fetch(`${baseURL}/cities`, { cache: 'no-store' }),
            fetch(`${baseURL}/categories`, { cache: 'no-store' })
        ]);

        const restaurant = restaurantRes.status === 'fulfilled' && restaurantRes.value.ok ? await restaurantRes.value.json() : null;
        const cities = citiesRes.status === 'fulfilled' && citiesRes.value.ok ? await citiesRes.value.json() : [];
        const categories = categoriesRes.status === 'fulfilled' && categoriesRes.value.ok ? await categoriesRes.value.json() : [];

        return { restaurant, cities, categories };
    } catch (error) {
        console.error('Error fetching data:', error);
        return { restaurant: null, cities: [], categories: [] };
    }
}

export default async function SingleListing({ params }) {
    const { restaurant, cities, categories } = await getData(params.id);

    if (!restaurant) {
        return (
            <>
                <NavbarLight />
                <div className="container py-5 mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-8 text-center">
                            <h2>Restaurant non trouvé</h2>
                            <p>Le restaurant que vous cherchez n'existe pas ou a été supprimé.</p>
                            <Link href="/" className="btn btn-primary">Retour à l'accueil</Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    // Map relations if missing
    const category = restaurant.category || (categories && categories.find(c => c.id === restaurant.category_id));
    const city = restaurant.city || (cities && cities.find(c => c.id === restaurant.city_id));
    const cityName = city?.name || restaurant.address || 'Location';
    const categoryName = category?.name || 'Category';
    const categoryImage = category?.category_image;

    const isOpen = restaurant.resturant_status === 'Ouvert';
    const ratingAvg = restaurant.rating_avg || 0;
    const ratingCount = restaurant.rating_count || 0;

    return (
        <>
            <NavbarLight />

            {/* Hero Section */}
            <section className="featured-listing-hero position-relative">
                <div className="bg-dark position-absolute top-0 start-0 w-100 h-100 opacity-50 z-1"></div>
                <Image
                    src={restaurant.restaurant_image || '/assets/img/restaurant-placeholder.jpg'}
                    alt={restaurant.name}
                    fill
                    className="object-fit-cover position-absolute top-0 start-0"
                    style={{ objectFit: 'cover' }}
                    priority
                />
                <div className="container position-relative z-2 pt-5 mt-5">
                    <div className="row justify-content-center pt-5">
                        <div className="col-xl-10 col-lg-11 col-md-12">
                            <div className="bg-white rounded-4 p-4 shadow-sm mt-5">
                                <div className="row align-items-center">
                                    <div className="col-lg-2 col-md-3 mb-3 mb-md-0 text-center">
                                        <Image
                                            src={restaurant.logo_url || '/assets/img/team-1.jpg'}
                                            alt="Logo"
                                            width={120}
                                            height={120}
                                            className="img-fluid rounded-circle border border-2 border-white shadow-sm"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="col-lg-7 col-md-9">
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <span className={`badge ${isOpen ? 'bg-success' : 'bg-danger'}`}>
                                                {restaurant.resturant_status || (isOpen ? 'Ouvert' : 'Fermé')}
                                            </span>
                                            {category && (
                                                <span className="badge bg-primary d-flex align-items-center gap-1">
                                                    {categoryImage ? (
                                                        <Image src={categoryImage} alt={categoryName} width={14} height={14} style={{ filter: 'brightness(0) invert(1)' }} />
                                                    ) : (
                                                        <FaUtensils size={12} />
                                                    )}
                                                    {categoryName}
                                                </span>
                                            )}
                                            {restaurant.is_featured && <span className="badge bg-warning text-dark"><BsStarFill size={12} className="me-1" />Featured</span>}
                                        </div>
                                        <h1 className="h2 mb-1">{restaurant.name}</h1>
                                        <div className="d-flex align-items-center text-muted gap-3 mb-2">
                                            <span className="d-flex align-items-center gap-1"><BsGeoAlt /> {cityName}</span>
                                            {restaurant.phone && <span className="d-flex align-items-center gap-1"><BsTelephone /> {restaurant.phone}</span>}
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <div className="d-flex text-warning">
                                                {[...Array(5)].map((_, i) => (
                                                    <BsStarFill key={i} className={i < Math.round(ratingAvg) ? 'text-warning' : 'text-muted'} size={14} />
                                                ))}
                                            </div>
                                            <span className="fw-bold">{ratingAvg}</span>
                                            <span className="text-muted">({ratingCount} Avis)</span>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-12 text-lg-end mt-3 mt-lg-0">
                                        <div className="d-flex gap-2 justify-content-lg-end">
                                            <button className="btn btn-outline-primary btn-sm rounded-circle p-2"><BsShare /></button>
                                            <button className="btn btn-outline-danger btn-sm rounded-circle p-2"><BsHeart /></button>
                                        </div>
                                        <div className="mt-3">
                                            <button className="btn btn-primary w-100">Réserver une table</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-11">
                            <div className="row">
                                {/* Left Column */}
                                <div className="col-lg-8">
                                    <div className="mb-5">
                                        <h3 className="mb-3">À propos</h3>
                                        <p className="text-muted leading-relaxed">
                                            {restaurant.description || "Aucune description disponible pour ce restaurant."}
                                        </p>
                                    </div>

                                    <div className="mb-5">
                                        <h3 className="mb-3">Menu</h3>
                                        <div className="bg-light rounded-3 p-4 text-center">
                                            <p className="text-muted mb-0">Le menu sera bientôt disponible en ligne.</p>
                                        </div>
                                    </div>

                                    <div className="mb-5">
                                        <h3 className="mb-3">Avis ({ratingCount})</h3>
                                        <div className="bg-light rounded-3 p-4 text-center">
                                            <p className="text-muted mb-0">Les avis seront bientôt disponibles.</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="col-lg-4">
                                    <div className="card border-0 shadow-sm mb-4">
                                        <div className="card-body">
                                            <h5 className="card-title mb-3">Horaires d'ouverture</h5>
                                            <ul className="list-unstyled mb-0">
                                                <li className="d-flex justify-content-between mb-2">
                                                    <span>Lundi - Vendredi</span>
                                                    <span className="fw-medium">09:00 - 22:00</span>
                                                </li>
                                                <li className="d-flex justify-content-between mb-2">
                                                    <span>Samedi</span>
                                                    <span className="fw-medium">10:00 - 23:00</span>
                                                </li>
                                                <li className="d-flex justify-content-between">
                                                    <span>Dimanche</span>
                                                    <span className="text-danger">Fermé</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="card border-0 shadow-sm mb-4">
                                        <div className="card-body">
                                            <h5 className="card-title mb-3">Contact</h5>
                                            <ul className="list-unstyled mb-0">
                                                {restaurant.address && (
                                                    <li className="d-flex align-items-start gap-2 mb-3">
                                                        <BsGeoAlt className="mt-1 text-primary" />
                                                        <span>{restaurant.address}</span>
                                                    </li>
                                                )}
                                                {restaurant.phone && (
                                                    <li className="d-flex align-items-center gap-2 mb-3">
                                                        <BsTelephone className="text-primary" />
                                                        <a href={`tel:${restaurant.phone}`} className="text-dark text-decoration-none">{restaurant.phone}</a>
                                                    </li>
                                                )}
                                                {restaurant.email && (
                                                    <li className="d-flex align-items-center gap-2 mb-3">
                                                        <BsEnvelope className="text-primary" />
                                                        <a href={`mailto:${restaurant.email}`} className="text-dark text-decoration-none">{restaurant.email}</a>
                                                    </li>
                                                )}
                                                {restaurant.website && (
                                                    <li className="d-flex align-items-center gap-2">
                                                        <BsGlobe className="text-primary" />
                                                        <a href={restaurant.website} target="_blank" rel="noopener noreferrer" className="text-dark text-decoration-none">Site Web</a>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
