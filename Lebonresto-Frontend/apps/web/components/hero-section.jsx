'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BsSearch, BsGeoAlt, BsArrowRight } from 'react-icons/bs';
import { useGetCitiesQuery } from '../store/api';
import Image from 'next/image';

const HERO_BG = '/assets/img/banner-4.jpg'; // Using a high quality food background

export default function HeroSection({ cities: initialCities }) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCityId, setSelectedCityId] = useState('');

    const { data: apiCities } = useGetCitiesQuery(undefined, { skip: !!initialCities });
    const cities = initialCities || apiCities || [];

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchQuery) params.set('q', searchQuery);
        if (selectedCityId) params.set('cityId', selectedCityId); // Changed to cityId to match client expectation
        router.push(`/restaurants?${params.toString()}`); // Changed to /restaurants
    };

    const handleQuickFilter = (type) => {
        const params = new URLSearchParams();
        switch (type) {
            case 'Ouvert maintenant':
                params.set('status', 'open');
                break;
            case 'Top notés':
                params.set('sort', 'rating');
                break;
            case 'Petit budget':
                params.set('maxPrice', '150'); // Example low price
                break;
            default:
                params.set('q', type); // Fallback to text search for tags like 'Rooftop'
        }
        router.push(`/restaurants?${params.toString()}`);
    };

    return (
        <div className="hero-section position-relative w-100 d-flex align-items-center" style={{ minHeight: '85vh' }}>
            {/* Background Image with Overlay */}
            <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
                <Image
                    src={HERO_BG}
                    alt="Hero Background"
                    fill
                    priority
                    className="object-fit-cover"
                />
                <div className="position-absolute top-0 start-0 w-100 h-100 hero-overlay"></div>
            </div>

            <div className="container position-relative z-2">
                <div className="row align-items-center">
                    <div className="col-xl-7 col-lg-8 col-md-11 mx-auto mx-lg-0 text-center text-lg-start">

                        {/* 1. Main Content */}
                        <div className="hero-content mb-5">
                            <h1 className="hero-title text-white fw-bold mb-3 display-4">
                                Découvrez les meilleurs <span className="text-primary-light">restaurants</span> près de chez vous
                            </h1>
                            <p className="hero-subtitle text-white-50 fs-5 mb-4 fw-light">
                                Trouvez, comparez et réservez des expériences culinaires inoubliables partout au Maroc.
                            </p>
                        </div>

                        {/* 2. Premium Search Bar */}
                        <div className="hero-search-box bg-white p-3 rounded-4 shadow-lg mb-4">
                            <form onSubmit={handleSearch} className="d-block d-md-flex align-items-center gap-2">
                                {/* Text Input */}
                                <div className="flex-grow-1 position-relative mb-2 mb-md-0 border-end-md">
                                    <div className="d-flex align-items-center px-2">
                                        <BsSearch className="text-muted fs-5 me-3" />
                                        <div className="w-100">
                                            <label htmlFor="search-input" className="d-block text-muted small fw-bold mb-0 text-start">Quoi ?</label>
                                            <input
                                                id="search-input"
                                                type="text"
                                                className="form-control border-0 shadow-none p-0 fw-medium text-dark"
                                                placeholder="Restaurant, cuisine, plat..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Divider for Mobile usually handled by margin/border */}

                                {/* City Select */}
                                <div className="flex-grow-1 position-relative mb-3 mb-md-0">
                                    <div className="d-flex align-items-center px-2">
                                        <BsGeoAlt className="text-muted fs-5 me-3" />
                                        <div className="w-100">
                                            <label htmlFor="city-select" className="d-block text-muted small fw-bold mb-0 text-start">Où ?</label>
                                            <select
                                                id="city-select"
                                                className="form-select border-0 shadow-none p-0 fw-medium text-dark cursor-pointer"
                                                value={selectedCityId}
                                                onChange={(e) => setSelectedCityId(e.target.value)}
                                                aria-label="Sélectionner une ville"
                                            >
                                                <option value="">Toutes les villes</option>
                                                {cities?.map((city) => (
                                                    <option key={city.id} value={city.id}>
                                                        {city.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Search Button */}
                                <button type="submit" className="btn btn-primary rounded-pill px-4 py-3 fw-bold hero-search-btn">
                                    Rechercher
                                </button>
                            </form>
                        </div>

                        {/* 3. Quick Actions / Chips */}
                        <div className="hero-quick-actions d-flex flex-wrap justify-content-center justify-content-lg-start gap-2">
                            <span className="text-white small fw-bold d-flex align-items-center me-2">
                                Suggestions :
                            </span>
                            {['Ouvert maintenant', 'Top notés', 'Petit budget', 'En famille', 'Terrasse'].map((tag, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleQuickFilter(tag)}
                                    className="btn btn-sm btn-outline-light rounded-pill backdrop-blur-sm"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>

                    </div>
                    {/* Optional Right Side Element - kept simple for now or strictly background based */}
                </div>
            </div>
        </div>
    );
}
