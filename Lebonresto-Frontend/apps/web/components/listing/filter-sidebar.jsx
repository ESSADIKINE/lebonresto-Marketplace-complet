'use client';

import React from 'react';
import { BsFilter, BsCheck, BsStarFill } from 'react-icons/bs';

export default function FilterSidebar({
    filters,
    onFilterChange,
    cities = [],
    categories = [],
    lockedFilters = {}
}) {
    const isLocked = (key) => Object.prototype.hasOwnProperty.call(lockedFilters, key);

    const handleCheckboxChange = (key, value, checked) => {
        // For boolean toggles or multi-select arrays if implemented
        onFilterChange(key, checked);
    };

    return (
        <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '100px' }}>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h5 className="fw-bold m-0"><BsFilter className="me-2" />Filtres</h5>
                {/* Optional: Clear All button */}
            </div>

            {/* STATUS */}
            <div className="mb-4">
                <h6 className="fw-bold mb-3 small text-uppercase text-muted ls-1">Offres</h6>
                <div className="form-check mb-2">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="promoOnly"
                        checked={filters.promoOnly === true}
                        onChange={(e) => handleCheckboxChange('promoOnly', true, e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor="promoOnly">
                        Promotions uniquement
                    </label>
                </div>
            </div>

            {/* CITIES */}
            {!isLocked('cityId') && (
                <div className="mb-4">
                    <h6 className="fw-bold mb-3 small text-uppercase text-muted ls-1">Ville</h6>
                    <select
                        className="form-select bg-light border-0 rounded-pill"
                        value={filters.cityId || ''}
                        onChange={(e) => onFilterChange('cityId', e.target.value)}
                    >
                        <option value="">Toutes les villes</option>
                        {cities.map(city => (
                            <option key={city.id} value={city.id}>{city.name}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* CATEGORIES */}
            {!isLocked('categoryId') && (
                <div className="mb-4">
                    <h6 className="fw-bold mb-3 small text-uppercase text-muted ls-1">Cuisine</h6>
                    <select
                        className="form-select bg-light border-0 rounded-pill"
                        value={filters.categoryId || ''}
                        onChange={(e) => onFilterChange('categoryId', e.target.value)}
                    >
                        <option value="">Toutes les cuisines</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* PRICE RANGE */}
            <div className="mb-4">
                <h6 className="fw-bold mb-3 small text-uppercase text-muted ls-1">Budget Moyen</h6>
                <div className="d-flex align-items-center gap-2">
                    <input
                        type="number"
                        className="form-control bg-light border-0 rounded-pill text-center"
                        placeholder="Min"
                        value={filters.minPrice || ''}
                        onChange={(e) => onFilterChange('minPrice', e.target.value)}
                    />
                    <span className="text-muted">-</span>
                    <input
                        type="number"
                        className="form-control bg-light border-0 rounded-pill text-center"
                        placeholder="Max"
                        value={filters.maxPrice || ''}
                        onChange={(e) => onFilterChange('maxPrice', e.target.value)}
                    />
                </div>
            </div>

            {/* RATINGS */}
            <div className="mb-4">
                <h6 className="fw-bold mb-3 small text-uppercase text-muted ls-1">Note minimale</h6>
                <div className="d-flex flex-column gap-2">
                    {[4.5, 4, 3].map(rating => (
                        <div key={rating} className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="minRating"
                                id={`rating-${rating}`}
                                checked={Number(filters.minRating) === rating}
                                onChange={() => onFilterChange('minRating', rating)}
                            />
                            <label className="form-check-label d-flex align-items-center" htmlFor={`rating-${rating}`}>
                                <span className="me-2">{rating}+</span>
                                <BsStarFill className="text-warning text-xs" />
                            </label>
                        </div>
                    ))}
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="minRating"
                            id="rating-all"
                            checked={!filters.minRating}
                            onChange={() => onFilterChange('minRating', '')}
                        />
                        <label className="form-check-label" htmlFor="rating-all">
                            Peu importe
                        </label>
                    </div>
                </div>
            </div>

            {/* STATUS / STANDING */}
            <div className="mb-4">
                <h6 className="fw-bold mb-3 small text-uppercase text-muted ls-1">Standing</h6>
                <div className="d-flex flex-wrap gap-2">
                    {['premium', 'standard', 'basic'].map(status => (
                        <button
                            key={status}
                            className={`btn btn-sm rounded-pill px-3 ${filters.status === status ? 'btn-primary' : 'btn-light text-muted'}`}
                            onClick={() => onFilterChange('status', filters.status === status ? '' : status)}
                        >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
