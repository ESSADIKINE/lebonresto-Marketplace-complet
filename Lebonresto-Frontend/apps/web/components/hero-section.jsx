'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BsSearch } from 'react-icons/bs';
import Image from 'next/image';

const bg = '/assets/img/banner-1.jpg';
const bg1 = '/assets/img/banner-4.jpg';
const bg2 = '/assets/img/banner-5.jpg';
const bg3 = '/assets/img/banner-6.jpg';
const bg4 = '/assets/img/banner-7.jpg';
const hero1 = '/assets/img/side-img.png';

export default function HeroSection({ cities }) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCityId, setSelectedCityId] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [bg1, bg2, bg3, bg4];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    const handleSearch = (e) => {
        e.preventDefault();

        const params = new URLSearchParams();
        if (searchQuery) params.set('q', searchQuery);
        if (selectedCityId) params.set('city_id', selectedCityId);

        router.push(`/restaurants_grid?${params.toString()}`);
    };

    return (
        <div className="image-cover hero-header bg-slicefull-height position-relative" style={{ backgroundColor: '#fff3f3' }}>
            <Image
                src={bg}
                alt="Hero Background"
                fill
                priority
                className="object-fit-cover position-absolute top-0 start-0 w-100 h-100 z-0"
            />
            <div className="container position-relative z-1">
                <div className="row justify-content-between align-items-center">
                    <div className="col-xl-7 col-lg-5 col-md-12 col-sm-12">
                        <div className="position-relative d-block py-5 pt-lg-0 pt-5">
                            <div className="position-relative">
                                <h1 className="fw-medium">Découvrez les meilleurs <span className="text-primary">restaurants</span> près de chez vous</h1>
                                <p className="fs-5 fw-light text-muted-2">Trouvez, comparez et réservez des expériences culinaires partout au Maroc.</p>
                            </div>
                        </div>
                        <form onSubmit={handleSearch} className="heroSearch rounded-search style-01">
                            <div className="row gx-lg-2 gx-md-2 gx-3 gy-sm-2 gy-2">
                                <div className="col-xl-10 col-lg-9 col-md-12">
                                    <div className="row gx-lg-2 gx-md-2 gx-3 gy-sm-2 gy-2">
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                            <div className="form-group">
                                                <div className="mobSearch d-flex align-items-center justify-content-start">
                                                    <div className="flexStart ps-2"><span className="fw-semibold text-dark">Rechercher</span></div>
                                                    <input
                                                        type="text"
                                                        className="form-control fs-6 fw-medium border-0"
                                                        placeholder="Restaurant, cuisine, plat..."
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 single-border">
                                            <div className="form-group">
                                                <div className="mobSearch d-flex align-items-center justify-content-start">
                                                    <div className="flexStart ps-2"><span className="fw-semibold text-dark">Où</span></div>
                                                    <select
                                                        className="form-control fs-6 fw-medium border-0"
                                                        value={selectedCityId}
                                                        onChange={(e) => setSelectedCityId(e.target.value)}
                                                        style={{ appearance: 'none' }}
                                                        aria-label="Select City"
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
                                    </div>
                                </div>
                                <div className="col-xl-2 col-lg-3 col-md-12 col-sm-12">
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary rounded-pill full-width fw-medium">
                                            <BsSearch className="me-2" />Rechercher
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="imgSidefull d-none d-lg-block z-1">
                <Image src={hero1} className="img-fluid" alt="Delicious Food Side Image" width={600} height={600} />
            </div>
        </div>
    );
}
