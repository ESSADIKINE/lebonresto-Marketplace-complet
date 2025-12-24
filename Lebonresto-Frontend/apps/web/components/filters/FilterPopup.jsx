'use client';

import React, { useState, useEffect } from 'react';
import { BsX, BsStarFill } from 'react-icons/bs';

export default function FilterPopup({ isOpen, onClose, initialFilters, categories, cities, onApply, resultCount }) {
    // Check if open to prevent hydration issues or render if minimal
    if (!isOpen) return null;

    // --- State Management (Similar to RestaurantFilters) ---
    const [minRating, setMinRating] = useState(initialFilters.minRating ? Number(initialFilters.minRating) : null);

    // Category State
    const [selectedCategoryIds, setSelectedCategoryIds] = useState(() => {
        if (initialFilters.categoryId) return String(initialFilters.categoryId).split(',');
        return categories && categories.length > 0 ? categories.map(c => c.id) : [];
    });

    // City State
    const [selectedCityIds, setSelectedCityIds] = useState(() => {
        if (initialFilters.cityId) return String(initialFilters.cityId).split(',');
        return cities && cities.length > 0 ? cities.map(c => c.id) : [];
    });

    // Price State
    const PRICE_CEILING = 1000;
    const [minPrice, setMinPrice] = useState(initialFilters.minPrice && initialFilters.minPrice !== '' ? Number(initialFilters.minPrice) : 0);
    const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice && initialFilters.maxPrice !== '' ? Number(initialFilters.maxPrice) : 1000);

    // Distance State
    const [distance, setDistance] = useState(initialFilters.distance ? Number(initialFilters.distance) : 10);

    // Sync from props when opening (optional, but good practice if props change while open, though distinct from mounting)
    useEffect(() => {
        if (isOpen) {
            setMinRating(initialFilters.minRating ? Number(initialFilters.minRating) : null);

            if (initialFilters.categoryId) setSelectedCategoryIds(String(initialFilters.categoryId).split(','));
            else if (categories) setSelectedCategoryIds(categories.map(c => c.id));

            if (initialFilters.cityId) setSelectedCityIds(String(initialFilters.cityId).split(','));
            else if (cities) setSelectedCityIds(cities.map(c => c.id));

            setMinPrice(initialFilters.minPrice !== undefined && initialFilters.minPrice !== '' ? Number(initialFilters.minPrice) : 0);
            setMaxPrice(initialFilters.maxPrice !== undefined && initialFilters.maxPrice !== '' ? Number(initialFilters.maxPrice) : 1000);
            setDistance(initialFilters.distance ? Number(initialFilters.distance) : 10);
        }
    }, [isOpen, initialFilters, categories, cities]);


    // Handlers
    const handleApplyClick = () => {
        const isAllCategoriesSelected = categories && categories.length > 0 && selectedCategoryIds.length === categories.length;
        const isAllCitiesSelected = cities && cities.length > 0 && selectedCityIds.length === cities.length;

        onApply({
            minRating,
            categoryId: isAllCategoriesSelected ? undefined : selectedCategoryIds.join(','),
            cityId: isAllCitiesSelected ? undefined : selectedCityIds.join(','),
            minPrice,
            maxPrice,
            distance
        });
        onClose();
    };

    const handleResetClick = () => {
        setMinRating(null);
        setSelectedCategoryIds(categories.map(c => String(c.id)));
        setSelectedCityIds(cities.map(c => String(c.id)));
        setMinPrice(0);
        setMaxPrice(1000);
        setDistance(10);
    };

    // Toggle Logic
    const toggleCategory = (id) => {
        const idStr = String(id);
        setSelectedCategoryIds(prev => prev.includes(idStr) ? prev.filter(c => c !== idStr) : [...prev, idStr]);
    };
    const toggleCity = (id) => {
        const idStr = String(id);
        setSelectedCityIds(prev => prev.includes(idStr) ? prev.filter(c => c !== idStr) : [...prev, idStr]);
    };

    // Slider percentages
    const minPos = (minPrice / PRICE_CEILING) * 100;
    const maxPos = (maxPrice / PRICE_CEILING) * 100;

    return (
        <div className="fixed-inset-0 z-[1055] d-flex justify-content-end" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1055, backgroundColor: 'rgba(0,0,0,0.5)'
        }}>
            <style jsx>{`
                /* Reuse Slider CSS */
                .range-wrapper { position: relative; height: 40px; display: flex; align-items: center; }
                .range-track-base { position: absolute; width: 100%; height: 6px; background-color: #e9ecef; border-radius: 3px; top: 50%; transform: translateY(-50%); }
                .range-track-active { position: absolute; height: 6px; border-radius: 3px; top: 50%; transform: translateY(-50%); z-index: 2; }
                .range-input { -webkit-appearance: none; background: transparent; width: 100%; position: absolute; top: 56%; transform: translateY(-50%); margin: 0; pointer-events: none; z-index: 3; }
                .range-input::-webkit-slider-thumb { -webkit-appearance: none; pointer-events: auto; height: 24px; width: 24px; border-radius: 50%; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2); border: 2px solid white; margin-top: -9px; position: relative; z-index: 10; }
                .range-input::-moz-range-thumb { pointer-events: auto; height: 24px; width: 24px; border-radius: 50%; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.2); border: 2px solid white; z-index: 10; }
                
                .track-green { background-color: #006B61; }
                .range-input-green::-webkit-slider-thumb { background-color: #006B61; }
                .range-input-green::-moz-range-thumb { background-color: #006B61; }

                .track-blue { background-color: var(--bs-primary); }
                .range-input-blue::-webkit-slider-thumb { background-color: var(--bs-primary); }
                .range-input-blue::-moz-range-thumb { background-color: var(--bs-primary); }

                /* Filter Chips */
                .filter-chip {
                    border: 1px solid #dee2e6;
                    border-radius: 8px;
                    padding: 8px 12px;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    background: white;
                }
                .filter-chip.active {
                    background-color: #e6f7f5; /* Light Teal/Green tint */
                    border-color: #006B61;
                    color: #006B61;
                    font-weight: 600;
                }
                .filter-chip:hover:not(.active) {
                    background-color: #f8f9fa;
                }

                /* Animation for Drawer */
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .filter-drawer {
                    animation: slideIn 0.3s ease-out forwards;
                }
            `}</style>

            <div
                className="filter-drawer bg-white h-100 d-flex flex-column shadow-lg"
                style={{ width: '100%', maxWidth: '500px' }}
            >
                {/* Header */}
                <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
                    <h5 className="mb-0 fw-bold">Filtres</h5>
                    <button onClick={onClose} className="btn btn-light rounded-circle p-2 d-flex">
                        <BsX size={24} />
                    </button>
                </div>

                {/* Body (Scrollable) */}
                <div className="flex-grow-1 overflow-y-auto p-4 custom-scroll">

                    {/* Cities */}
                    <div className="mb-5">
                        <h6 className="fw-bold mb-3">Villes</h6>
                        <div className="d-flex flex-wrap gap-2">
                            <div
                                className={`filter-chip ${selectedCityIds.length === cities.length ? 'active' : ''}`}
                                onClick={() => {
                                    if (selectedCityIds.length === cities.length) setSelectedCityIds([]);
                                    else setSelectedCityIds(cities.map(c => String(c.id)));
                                }}
                            >
                                Tout
                            </div>
                            {cities.map(city => (
                                <div
                                    key={city.id}
                                    className={`filter-chip ${selectedCityIds.includes(String(city.id)) ? 'active' : ''}`}
                                    onClick={() => toggleCity(city.id)}
                                >
                                    {city.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr className="my-4 border-light-subtle" />

                    {/* Price Range */}
                    <div className="mb-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="fw-bold mb-0">Budget</h6>
                            <span className="text-primary fw-bold small">{minPrice} - {maxPrice} MAD</span>
                        </div>
                        <div className="range-wrapper mx-2">
                            <div className="range-track-base"></div>
                            <div className="range-track-active track-green" style={{ left: `${minPos}%`, width: `${maxPos - minPos}%` }}></div>
                            <input
                                type="range" min="0" max={PRICE_CEILING} step="10"
                                value={minPrice}
                                onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 10))}
                                className="range-input range-input-green"
                                style={{ zIndex: 3 }}
                            />
                            <input
                                type="range" min="0" max={PRICE_CEILING} step="10"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 10))}
                                className="range-input range-input-green"
                                style={{ zIndex: 4 }}
                            />
                        </div>
                    </div>

                    <hr className="my-4 border-light-subtle" />

                    {/* Rating */}
                    <div className="mb-5">
                        <h6 className="fw-bold mb-3">Note</h6>
                        <div className="d-flex gap-2">
                            {[3, 4, 5].map(rating => (
                                <button
                                    key={rating}
                                    className={`btn rounded-pill px-4 py-2 d-flex align-items-center gap-2 ${minRating === rating ? 'btn-primary' : 'btn-light border'}`}
                                    onClick={() => setMinRating(minRating === rating ? null : rating)}
                                >
                                    <BsStarFill size={14} className={minRating === rating ? 'text-white' : 'text-warning'} />
                                    <span className="fw-bold">{rating}+</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <hr className="my-4 border-light-subtle" />

                    {/* Categories */}
                    <div className="mb-5">
                        <h6 className="fw-bold mb-3">Cuisines & Catégories</h6>
                        <div className="d-flex flex-wrap gap-2">
                            <div
                                className={`filter-chip ${selectedCategoryIds.length === categories.length ? 'active' : ''}`}
                                onClick={() => {
                                    if (selectedCategoryIds.length === categories.length) setSelectedCategoryIds([]);
                                    else setSelectedCategoryIds(categories.map(c => String(c.id)));
                                }}
                            >
                                Tout
                            </div>
                            {categories.map(cat => (
                                <div
                                    key={cat.id}
                                    className={`filter-chip ${selectedCategoryIds.includes(String(cat.id)) ? 'active' : ''}`}
                                    onClick={() => toggleCategory(cat.id)}
                                >
                                    {cat.name}
                                </div>
                            ))}
                        </div>
                    </div>

                    <hr className="my-4 border-light-subtle" />

                    {/* Distance */}
                    <div className="mb-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="fw-bold mb-0">Distance</h6>
                            <span className="text-primary fw-bold small">{distance} km</span>
                        </div>
                        <div className="range-wrapper mx-2">
                            <div className="range-track-base"></div>
                            <div className="range-track-active track-blue" style={{ width: `${(distance / 50) * 100}%` }}></div>
                            <input
                                type="range" min="1" max="50" step="1"
                                value={distance}
                                onChange={(e) => setDistance(Number(e.target.value))}
                                className="range-input range-input-blue"
                                style={{ pointerEvents: 'auto' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-3 border-top bg-white d-flex gap-3">
                    <button
                        onClick={handleResetClick}
                        className="btn btn-white border rounded-3 fw-bold px-4"
                        style={{ minWidth: '120px' }}
                    >
                        Effacer
                    </button>
                    <button
                        onClick={handleApplyClick}
                        className="btn btn-primary flex-grow-1 rounded-3 fw-bold text-uppercase"
                    >
                        Afficher les résultats
                    </button>
                </div>
            </div>
        </div>
    );
}
