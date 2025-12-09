'use client';

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { BsPersonCircle, BsSearch } from "react-icons/bs";

export default function NavbarLight() {
    const [scroll, setScroll] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    // Search state
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCityId, setSelectedCityId] = useState('');
    const [cities, setCities] = useState([]);

    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (typeof window === 'undefined') return;

        window.scrollTo(0, 0)

        // Fetch cities
        const fetchCities = async () => {
            try {
                const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
                const res = await fetch(`${baseURL}/cities`);
                if (res.ok) {
                    const data = await res.json();
                    setCities(data);
                }
            } catch (error) {
                console.error("Failed to fetch cities:", error);
            }
        };
        fetchCities();

        const handlerScroll = () => {
            if (window.scrollY > 50) {
                setScroll(true)
            } else { setScroll(false) }

            // Show search bar after 100vh (approx 800px or window.innerHeight)
            if (window.scrollY > window.innerHeight) {
                setShowSearch(true);
            } else {
                setShowSearch(false);
            }
        }

        window.addEventListener('scroll', handlerScroll)

        return () => {
            window.removeEventListener('scroll', handlerScroll)
        };
    }, [pathname])

    const handleSearch = (e) => {
        e.preventDefault();

        const params = new URLSearchParams();
        if (searchQuery) params.set('q', searchQuery);
        if (selectedCityId) params.set('city_id', selectedCityId);

        router.push(`/restaurants_grid?${params.toString()}`);
    };

    return (
        <>
            <div className={`header header-transparent dark navdark ${scroll ? 'header-fixed' : ''}`} data-sticky-element="">
                <div className="container-fluid d-flex align-items-center justify-content-between py-2">
                    {/* 1. Logo */}
                    <Link className="nav-brand" href="/">
                        <span className="fw-bold fs-3 text-primary">LeBonResto</span>
                    </Link>

                    {/* 2. Centered Search Bar - Visible on Scroll */}
                    <div className={`d-none d-lg-flex align-items-center justify-content-center flex-grow-1 ${showSearch ? 'opacity-100 visible' : 'opacity-0 invisible'}`} style={{ transition: 'all 0.3s ease', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                        <form onSubmit={handleSearch} className="d-flex align-items-center gap-2 bg-white rounded-pill border px-2 py-1 shadow-sm" style={{ width: '500px' }}>
                            <div className="d-flex align-items-center flex-grow-1 border-end pe-2">
                                <BsSearch className="text-muted ms-2 me-2" />
                                <input
                                    type="text"
                                    className="form-control border-0 shadow-none py-1"
                                    placeholder="Restaurant, cuisine..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="d-flex align-items-center flex-grow-1" style={{ maxWidth: '180px' }}>
                                <select
                                    className="form-select border-0 shadow-none py-1"
                                    value={selectedCityId}
                                    onChange={(e) => setSelectedCityId(e.target.value)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <option value="">Toutes les villes</option>
                                    {cities.map((city) => (
                                        <option key={city.id} value={city.id}>{city.name}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary btn-sm rounded-pill px-3">
                                <BsSearch />
                            </button>
                        </form>
                    </div>

                    {/* 3. Connection Button */}
                    <div>
                        <Link href="/login" className="d-flex align-items-center text-dark fw-medium btn btn-light-primary rounded-pill px-4">
                            <BsPersonCircle className="fs-6 me-2" />
                            <span className="navCl">Connexion</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="clearfix"></div>
        </>
    )
}
