import React from 'react';
import { BsSearch, BsGeoAlt, BsFilter } from 'react-icons/bs';

export default function RestaurantFilters({ cities, categories, tags, onFilterChange }) {
    return (
        <div className="filter-search-box w-100 pb-4">
            <div className="row g-3">
                <div className="col-lg-4 col-md-6">
                    <div className="form-group mb-0 position-relative">
                        <input
                            type="text"
                            className="form-control fw-medium ps-5 border rounded-3"
                            placeholder="Rechercher un restaurant..."
                            onChange={(e) => onFilterChange && onFilterChange('search', e.target.value)}
                        />
                        <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
                            <BsSearch />
                        </span>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6">
                    <div className="form-group mb-0 position-relative">
                        <select
                            className="form-select fw-medium ps-5 border rounded-3"
                            onChange={(e) => onFilterChange && onFilterChange('city', e.target.value)}
                        >
                            <option value="">Toutes les villes</option>
                            {cities && cities.map(city => (
                                <option key={city.id} value={city.slug}>{city.name}</option>
                            ))}
                        </select>
                        <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
                            <BsGeoAlt />
                        </span>
                    </div>
                </div>

                <div className="col-lg-3 col-md-6">
                    <div className="form-group mb-0 position-relative">
                        <select
                            className="form-select fw-medium ps-5 border rounded-3"
                            onChange={(e) => onFilterChange && onFilterChange('category', e.target.value)}
                        >
                            <option value="">Toutes les catégories</option>
                            {categories && categories.map(cat => (
                                <option key={cat.id} value={cat.slug}>{cat.name}</option>
                            ))}
                        </select>
                        <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted">
                            <BsFilter />
                        </span>
                    </div>
                </div>

                <div className="col-lg-2 col-md-6">
                    <button className="btn btn-primary w-100 rounded-3 fw-medium">
                        Rechercher
                    </button>
                </div>
            </div>

            {/* Tags Filter */}
            <div className="row mt-3">
                <div className="col-12">
                    <div className="d-flex flex-wrap gap-2 align-items-center">
                        <span className="fw-semibold small text-muted me-2">Filtres populaires:</span>
                        {tags && tags.map(tag => (
                            <div key={tag.id} className="form-check form-check-inline m-0">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id={`tag-${tag.id}`}
                                    value={tag.slug}
                                    onChange={(e) => onFilterChange && onFilterChange('tag', tag.slug, e.target.checked)}
                                />
                                <label className="form-check-label small text-muted cursor-pointer" htmlFor={`tag-${tag.id}`}>
                                    {tag.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
