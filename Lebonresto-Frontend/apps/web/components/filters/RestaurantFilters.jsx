'use client';

import React, { useState, useEffect } from 'react';
import { BsSearch, BsFilter, BsStarFill, BsGeoAlt, BsGeoAltFill } from 'react-icons/bs';

export default function RestaurantFilters({ initialFilters, categories, cities, onApply }) {
    // Internal state
    const [query, setQuery] = useState(initialFilters.q || '');
    const [minRating, setMinRating] = useState(initialFilters.minRating ? Number(initialFilters.minRating) : null);

    // Category State (Array of IDs)
    const [selectedCategoryIds, setSelectedCategoryIds] = useState(() => {
        if (initialFilters.categoryId) {
            return String(initialFilters.categoryId).split(',');
        }
        // Default: Select ALL categories
        return categories && categories.length > 0 ? categories.map(c => c.id) : [];
    });

    // City State (Array of IDs)
    const [selectedCityIds, setSelectedCityIds] = useState(() => {
        if (initialFilters.cityId) {
            return String(initialFilters.cityId).split(',');
        }
        // Default: Select ALL cities
        return cities && cities.length > 0 ? cities.map(c => c.id) : [];
    });

    // Price State
    // Price State
    const [minPrice, setMinPrice] = useState(initialFilters.minPrice && initialFilters.minPrice !== '' ? Number(initialFilters.minPrice) : 50);
    const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice && initialFilters.maxPrice !== '' ? Number(initialFilters.maxPrice) : 500); // Default 50-500
    const PRICE_CEILING = 1000;

    // Distance State
    const [distance, setDistance] = useState(initialFilters.distance ? Number(initialFilters.distance) : 10); // Default 10km
    const [isLocating, setIsLocating] = useState(false);

    // Sync from props if strict URL sync is needed
    useEffect(() => {
        setQuery(initialFilters.q || '');
        setMinRating(initialFilters.minRating ? Number(initialFilters.minRating) : null);

        // Sync Categories
        if (initialFilters.categoryId) {
            setSelectedCategoryIds(String(initialFilters.categoryId).split(','));
        } else if (categories && categories.length > 0) {
            setSelectedCategoryIds(categories.map(c => c.id));
        }

        // Sync Cities
        if (initialFilters.cityId) {
            setSelectedCityIds(String(initialFilters.cityId).split(','));
        } else if (cities && cities.length > 0) {
            setSelectedCityIds(cities.map(c => c.id));
        }

        // Sync Price
        setMinPrice(initialFilters.minPrice !== undefined && initialFilters.minPrice !== '' ? Number(initialFilters.minPrice) : 50);
        setMaxPrice(initialFilters.maxPrice !== undefined && initialFilters.maxPrice !== '' ? Number(initialFilters.maxPrice) : 500);

        // Sync Distance
        if (initialFilters.distance) {
            setDistance(Number(initialFilters.distance));
        } else {
            setDistance(10);
        }

    }, [initialFilters, categories, cities]);

    const handleApply = () => {
        const isAllCategoriesSelected = categories && categories.length > 0 && selectedCategoryIds.length === categories.length;
        const isAllCitiesSelected = cities && cities.length > 0 && selectedCityIds.length === cities.length;

        onApply({
            q: query,
            minRating: minRating,
            categoryId: isAllCategoriesSelected ? undefined : selectedCategoryIds.join(','),
            cityId: isAllCitiesSelected ? undefined : selectedCityIds.join(','),

            // Explicitly send price defaults if desired/requested
            minPrice: minPrice,
            maxPrice: maxPrice,

            // Send Distance
            distance: distance
        });
    };

    // Double Slider Logic
    const handleMinPriceChange = (e) => {
        const val = Math.min(Number(e.target.value), maxPrice - 10);
        setMinPrice(val);
    };

    const handleMaxPriceChange = (e) => {
        const val = Math.max(Number(e.target.value), minPrice + 10);
        setMaxPrice(val);
    };

    // Calculate percentage for slider track background
    const minPos = (minPrice / PRICE_CEILING) * 100;
    const maxPos = (maxPrice / PRICE_CEILING) * 100;

    // Category Logic
    const toggleCategory = (id) => {
        const idStr = String(id);
        setSelectedCategoryIds(prev => {
            if (prev.includes(idStr)) {
                return prev.filter(c => c !== idStr);
            } else {
                return [...prev, idStr];
            }
        });
    };

    const toggleAllCategories = () => {
        if (selectedCategoryIds.length === categories.length) {
            setSelectedCategoryIds([]);
        } else {
            setSelectedCategoryIds(categories.map(c => String(c.id)));
        }
    };

    // City Logic
    const toggleCity = (id) => {
        const idStr = String(id);
        setSelectedCityIds(prev => {
            if (prev.includes(idStr)) {
                return prev.filter(c => c !== idStr);
            } else {
                return [...prev, idStr];
            }
        });
    };

    const toggleAllCities = () => {
        if (selectedCityIds.length === cities.length) {
            setSelectedCityIds([]);
        } else {
            setSelectedCityIds(cities.map(c => String(c.id)));
        }
    };

    const handleUseMyLocation = () => {
        if (!navigator.geolocation) {
            alert("La géolocalisation n'est pas supportée par votre navigateur.");
            return;
        }

        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setIsLocating(false);
                const { latitude, longitude } = position.coords;
                // Force apply with location
                onApply({
                    q: query,
                    minRating: minRating,
                    categoryId: selectedCategoryIds.join(','), // Assuming simple join for logic sake, or use helper
                    cityId: selectedCityIds.join(','),
                    minPrice,
                    maxPrice,
                    radius: distance || 10,
                    distance: distance || 10, // sending both to be safe
                    latitude,
                    longitude
                });
            },
            (error) => {
                setIsLocating(false);
                console.error("Error getting location:", error);
                let msg = "Impossible de récupérer votre position.";
                if (error.code === 1) msg = "Vous avez refusé la géolocalisation.";
                alert(msg);
            }
        );
    };

    return (
        <div className="card border-0 shadow-sm rounded-4 h-100" style={{ minHeight: '100vh', zIndex: 10 }}>
            <style jsx>{`
                .unique-dropdown-toggle {
                    background-color: #f8f9fa;
                    border: 1px solid #e9ecef;
                    transition: all 0.2s ease;
                }
                .unique-dropdown-toggle:hover, .unique-dropdown-toggle:focus {
                    background-color: #fff;
                    border-color: var(--bs-primary);
                    box-shadow: 0 0 0 4px rgba(var(--bs-primary-rgb), 0.1);
                }
                .unique-checkbox {
                    width: 1.25em;
                    height: 1.25em;
                    border-radius: 6px;
                    border: 2px solid #dee2e6;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .unique-checkbox:checked {
                    background-color: var(--bs-primary);
                    border-color: var(--bs-primary);
                }
                .unique-checkbox:focus {
                    box-shadow: 0 0 0 4px rgba(var(--bs-primary-rgb), 0.15);
                    border-color: var(--bs-primary);
                }
                .list-item-hover {
                    border-radius: 8px;
                    transition: all 0.2s ease;
                }
                .list-item-hover:hover {
                    background-color: #f8f9fa;
                }
                /* Custom Scrollbar */
                .custom-scroll::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scroll::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 4px;
                }
                .custom-scroll::-webkit-scrollbar-thumb {
                    background: #d1d5db;
                    border-radius: 4px;
                }
                .custom-scroll::-webkit-scrollbar-thumb:hover {
                    background: #9ca3af;
                }

                /* --- RANGE SLIDER STYLES --- */
                .range-wrapper {
                    position: relative;
                    height: 40px;
                    display: flex;
                    align-items: center;
                }
                .range-track-base {
                    position: absolute;
                    width: 100%;
                    height: 6px;
                    background-color: #e9ecef;
                    border-radius: 3px;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 1;
                }
                .range-track-active {
                    position: absolute;
                    height: 6px;
                    border-radius: 3px;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 2;
                }
                .range-input {
                    -webkit-appearance: none;
                    appearance: none;
                    background: transparent;
                    width: 100%;
                    position: absolute;
                    top: 56%;
                    transform: translateY(-50%);
                    margin: 0;
                    pointer-events: none; /* Allow clicking through to track */
                    z-index: 3;
                }
                /* WebKit Thumb */
                .range-input::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    pointer-events: auto; /* Enable thumb interaction */
                    height: 18px;
                    width: 18px;
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    border: 2px solid white;
                    margin-top: -6px; /* (ThumbHeight - TrackHeight) / 2 isn't exact in webkit sometimes, usually just 0 if aligned? Webkit track is non-existent here, so margin might be needed relative to border-box */
                    position: relative;
                    z-index: 10;
                }
                /* Firefox Thumb */
                .range-input::-moz-range-thumb {
                    pointer-events: auto; 
                    height: 18px;
                    width: 18px;
                    border-radius: 50%;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    border: 2px solid white;
                    z-index: 10;
                }
                
                /* Green Variant (Budget) */
                .range-input-green::-webkit-slider-thumb { background-color: #006B61; }
                .range-input-green::-moz-range-thumb { background-color: #006B61; }
                .track-green { background-color: #006B61; }

                /* Blue Variant (Distance) */
                .range-input-blue::-webkit-slider-thumb { background-color: var(--bs-primary); }
                .range-input-blue::-moz-range-thumb { background-color: var(--bs-primary); }
                .track-blue { background-color: var(--bs-primary); }

                /* Focus Styles */
                .range-input:focus::-webkit-slider-thumb {
                    box-shadow: 0 0 0 4px rgba(0, 107, 97, 0.15);
                }
                .range-input-blue:focus::-webkit-slider-thumb {
                    box-shadow: 0 0 0 4px rgba(var(--bs-primary-rgb), 0.2);
                }
                .range-input-single {
                    pointer-events: auto;
                }
            `}</style>
            {/* Header / Search */}
            <div className="p-3 border-bottom bg-white">
                <div className="position-relative">
                    <input
                        type="text"
                        className="form-control rounded-pill border ps-4 pe-5"
                        placeholder="Rechercher..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        style={{ height: '48px', backgroundColor: '#F9F9F9' }}
                    />
                    <BsSearch className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
                </div>
            </div>

            <div className="p-2 bg-white">

                {/* Cities Filter (Multi-Select Dropdown) */}
                <div className="mb-4">
                    <h6 className="fw-bold mb-3 small text-uppercase ls-1 text-muted ps-1">Villes</h6>
                    <div className="dropdown">
                        <button
                            className="btn w-100 d-flex align-items-center justify-content-between rounded-3 py-2 px-3 text-start unique-dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="outside"
                            aria-expanded="false"
                        >
                            <span className="text-truncate fw-medium small">
                                {selectedCityIds.length === cities.length
                                    ? 'Tout sélectionner'
                                    : selectedCityIds.length === 0
                                        ? 'Selectionner une ville'
                                        : `${selectedCityIds.length} ville(s) sélectionnée(s)`}
                            </span>
                            <span className="small text-muted">▼</span>
                        </button>
                        <ul className="dropdown-menu w-100 border-0 shadow-lg p-2 mt-2 custom-scroll" style={{ maxHeight: '300px', overflowY: 'auto', borderRadius: '12px' }}>
                            {/* Select All Option */}
                            <li className="px-2 py-1 list-item-hover">
                                <div className="form-check d-flex align-items-center gap-2">
                                    <input
                                        className="form-check-input unique-checkbox shadow-none mt-0"
                                        type="checkbox"
                                        id="city-all"
                                        checked={selectedCityIds.length === cities.length && cities.length > 0}
                                        onChange={toggleAllCities}
                                    />
                                    <label className="form-check-label w-100 fw-bold cursor-pointer small pt-1" htmlFor="city-all">
                                        Tout sélectionner
                                    </label>
                                </div>
                            </li>
                            <li><hr className="dropdown-divider my-1 opacity-50" /></li>

                            {/* City List */}
                            {cities.map(city => {
                                const isChecked = selectedCityIds.includes(String(city.id));
                                return (
                                    <li key={city.id} className="px-2 py-1 list-item-hover">
                                        <div className="form-check d-flex align-items-center gap-2">
                                            <input
                                                className="form-check-input unique-checkbox shadow-none mt-0"
                                                type="checkbox"
                                                id={`city-${city.id}`}
                                                checked={isChecked}
                                                onChange={() => toggleCity(city.id)}
                                            />
                                            <label className={`form-check-label w-100 cursor-pointer small pt-1 ${isChecked ? 'fw-bold text-primary' : 'text-dark'}`} htmlFor={`city-${city.id}`}>
                                                {city.name}
                                            </label>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                {/* 1. Rating Filter */}
                <div className="mb-4">
                    <h6 className="fw-bold mb-3 small text-uppercase ls-1 text-muted">Note Minimale</h6>
                    <div className="d-flex flex-wrap gap-2">
                        <button
                            className={`btn btn-sm rounded-pill px-3 d-flex align-items-center gap-1 ${!minRating ? 'btn-primary text-white' : 'btn-light text-dark bg-light-subtle border'}`}
                            onClick={() => setMinRating(null)}
                        >
                            <BsStarFill className="small" /> All
                        </button>
                        {[3, 4, 5].map(rating => (
                            <button
                                key={rating}
                                className={`btn btn-sm rounded-pill px-3 d-flex align-items-center gap-1 ${minRating === rating ? 'btn-primary text-white' : 'btn-light text-dark bg-light-subtle border'}`}
                                onClick={() => setMinRating(minRating === rating ? null : rating)}
                            >
                                <BsStarFill className="small" /> {rating}.0+
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. Categories Filter (Multi-Select Dropdown) */}
                <div className="mb-4">
                    <h6 className="fw-bold mb-3 small text-uppercase ls-1 text-muted ps-1">Catégories</h6>
                    <div className="dropdown">
                        <button
                            className="btn w-100 d-flex align-items-center justify-content-between rounded-3 py-2 px-3 text-start unique-dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            data-bs-auto-close="outside"
                            aria-expanded="false"
                        >
                            <span className="text-truncate fw-medium small">
                                {selectedCategoryIds.length === categories.length
                                    ? 'Tout sélectionner'
                                    : selectedCategoryIds.length === 0
                                        ? 'Selectionner une catégorie'
                                        : `${selectedCategoryIds.length} catégorie(s)`}
                            </span>
                            <span className="small text-muted">▼</span>
                        </button>
                        <ul className="dropdown-menu w-100 border-0 shadow-lg p-2 mt-2 custom-scroll" style={{ maxHeight: '300px', overflowY: 'auto', borderRadius: '12px' }}>
                            {/* Select All Option */}
                            <li className="px-2 py-1 list-item-hover">
                                <div className="form-check d-flex align-items-center gap-2">
                                    <input
                                        className="form-check-input unique-checkbox shadow-none mt-0"
                                        type="checkbox"
                                        id="cat-all"
                                        checked={selectedCategoryIds.length === categories.length && categories.length > 0}
                                        onChange={toggleAllCategories}
                                    />
                                    <label className="form-check-label w-100 fw-bold cursor-pointer small pt-1" htmlFor="cat-all">
                                        Tout sélectionner
                                    </label>
                                </div>
                            </li>
                            <li><hr className="dropdown-divider my-1 opacity-50" /></li>

                            {/* Category List */}
                            {categories.map(cat => {
                                const isChecked = selectedCategoryIds.includes(String(cat.id));
                                return (
                                    <li key={cat.id} className="px-2 py-1 list-item-hover">
                                        <div className="form-check d-flex align-items-center gap-2">
                                            <input
                                                className="form-check-input unique-checkbox shadow-none mt-0"
                                                type="checkbox"
                                                id={`cat-${cat.id}`}
                                                checked={isChecked}
                                                onChange={() => toggleCategory(cat.id)}
                                            />
                                            <label className={`form-check-label w-100 cursor-pointer small pt-1 ${isChecked ? 'fw-bold text-primary' : 'text-dark'}`} htmlFor={`cat-${cat.id}`}>
                                                {cat.name}
                                            </label>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                {/* 3. Price Range (Double Slider) */}
                <div className="mb-4">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <h6 className="fw-bold mb-0 small text-uppercase ls-1 text-muted">Budget (MAD)</h6>
                        <span className="small text-primary fw-bold">{minPrice} - {maxPrice} MAD</span>
                    </div>

                    <div className="range-wrapper">
                        {/* Background Track */}
                        <div className="range-track-base"></div>

                        {/* Active Segment */}
                        <div
                            className="range-track-active track-green"
                            style={{
                                left: `${minPos}%`,
                                width: `${maxPos - minPos}%`
                            }}
                        ></div>

                        {/* Thumbs (Inputs) */}
                        <input
                            type="range"
                            min="0"
                            max={PRICE_CEILING}
                            step="10"
                            value={minPrice}
                            onChange={handleMinPriceChange}
                            className="range-input range-input-green"
                            style={{ zIndex: 3 }}
                        />
                        <input
                            type="range"
                            min="0"
                            max={PRICE_CEILING}
                            step="10"
                            value={maxPrice}
                            onChange={handleMaxPriceChange}
                            className="range-input range-input-green"
                            style={{ zIndex: 4 }}
                        />
                    </div>
                </div>

                {/* 4. Distance Filter (Single Slider, UI Only) */}
                <div className="mb-4">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <h6 className="fw-bold mb-0 small text-uppercase ls-1 text-muted">Distance</h6>
                        <span className="small text-primary fw-bold">{distance} km</span>
                    </div>

                    {/* Geolocation Button */}
                    <button
                        className={`btn btn-sm w-100 mb-3 d-flex align-items-center justify-content-center gap-2 rounded-pill border ${isLocating ? 'bg-light text-muted' : 'btn-outline-primary'}`}
                        onClick={handleUseMyLocation}
                        disabled={isLocating}
                    >
                        {isLocating ? (
                            <>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Localisation...
                            </>
                        ) : (
                            <>
                                <BsGeoAltFill size={14} />
                                Utiliser ma position
                            </>
                        )}
                    </button>

                    <div className="range-wrapper">
                        {/* Background Track */}
                        <div className="range-track-base"></div>

                        {/* Active Segment (from 0 to value) */}
                        <div
                            className="range-track-active track-blue"
                            style={{
                                left: '0%',
                                width: `${(distance / 50) * 100}%`
                            }}
                        ></div>

                        <input
                            type="range"
                            className="range-input range-input-blue range-input-single"
                            min="1"
                            max="50"
                            step="1"
                            value={distance}
                            onChange={(e) => setDistance(Number(e.target.value))}
                        />
                    </div>
                </div>



                {/* 7. Save & Update Button */}
                {/* 7. Save & Update Button */}
                <div className="d-flex flex-column gap-2">
                    <button
                        className="btn btn-primary w-100 rounded-pill py-3 fw-bold shadow-sm text-uppercase ls-1"
                        onClick={handleApply}
                    >
                        Mettre à jour
                    </button>
                    <button
                        className="btn btn-outline-secondary w-100 rounded-pill py-2 fw-medium small"
                        onClick={() => {
                            // Reset local state
                            setQuery('');
                            setMinRating(null);
                            setSelectedCategoryIds(categories.map(c => String(c.id)));
                            setSelectedCityIds(cities.map(c => String(c.id)));
                            setSelectedCityIds(cities.map(c => String(c.id)));
                            setMinPrice(50);
                            setMaxPrice(500);
                            setDistance(10);

                            // Trigger parent reset
                            if (onReset) onReset();
                        }}
                    >
                        Réinitialiser
                    </button>
                </div>
            </div>
        </div>
    );
}
