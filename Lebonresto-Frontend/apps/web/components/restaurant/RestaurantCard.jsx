import React from 'react';
import Link from 'next/link';
import { BsGeoAlt, BsStarFill, BsArrowRight, BsHeart, BsTagFill } from 'react-icons/bs';
import {
    normalizeRestaurantData,
    isNewRestaurant,
    formatPriceRange
} from '../../lib/restaurantUtils';

export default function RestaurantCard({ restaurant: rawData, layout = 'grid' }) {
    const restaurant = normalizeRestaurantData(rawData);
    if (!restaurant) return null;

    const {
        id, name, description, image, city, address, category,
        rating, reviewCount, minPrice, maxPrice,
        status, restaurantStatus, createdAt, tags, discount
    } = restaurant;

    const isNew = isNewRestaurant(createdAt);
    const priceDisplay = formatPriceRange(minPrice, maxPrice);
    const detailLink = `/restaurants/${id}`;
    const reservationLink = `/restaurants/${id}/reservation`;
    // Condition logic per user request
    const isPremium = status?.toLowerCase() === 'premium'; // 1) Premium check
    const isOpen = restaurantStatus === 'Ouvert' || status === 'APPROVED'; // Fallback logic

    // Tag limits
    const maxTags = layout === 'grid' ? 2 : 4;
    const displayTags = tags && tags.length > 0 ? tags.slice(0, maxTags) : [];

    // --- Image Zone (Shared) ---
    const renderImageZone = (bgClass = 'bg-light') => (
        <div className={`position-relative w-100 h-100 ${bgClass}`}>
            <Link href={detailLink} className="d-block w-100 h-100">
                <img
                    src={image}
                    className="img-fluid object-fit-cover w-100 h-100 promo-card-img"
                    alt={name}
                    loading="lazy"
                />
            </Link>

            {/* 1) Premium Ribbon */}
            {isPremium && (
                <div className="premium-ribbon-wrapper">
                    <div className="premium-ribbon">PREMIUM</div>
                </div>
            )}

            {/* Favorite Icon */}
            <div className="promo-fav-icon d-flex align-items-center justify-content-center" title="Ajouter aux favoris">
                <BsHeart size={16} />
            </div>

            {/* Gradient Overlay */}
            <div className="position-absolute bottom-0 start-0 w-100"
                style={{ height: '60%', background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0,0,0,0) 100%)', pointerEvents: 'none', zIndex: 1 }}>
            </div>

            {/* 3) Status & Category & Promo (Conditional) */}
            <div className="position-absolute bottom-0 start-0 w-100 p-3 d-flex align-items-end justify-content-between z-2">
                <div className="d-flex align-items-center gap-2 flex-wrap">
                    {/* Category */}
                    {category && (
                        <span className="chip-compact chip-cat">
                            {category}
                        </span>
                    )}

                    {/* Status */}
                    <span className={`chip-compact ${isOpen ? 'status-open' : 'status-closed'}`}>
                        <span className={`status-dot ${isOpen ? 'open' : 'closed'}`}></span>
                        {isOpen ? 'Ouvert' : 'Fermé'}
                    </span>

                    {/* 2) Promo Chip - "Next to 'Ouvert/Fermé'" requested if space allows, or flow naturally */}
                    {discount > 0 && (
                        <span className="chip-compact chip-promo-tag">
                            <BsTagFill className="text-warning" />
                            -{discount}%
                        </span>
                    )}
                </div>
            </div>
        </div>
    );

    // --- GRID LAYOUT (Unified "Promo" Style) ---
    if (layout === 'grid') {
        return (
            <div className="card promo-card h-100 border-0 overflow-hidden position-relative">
                {/* Image Section */}
                <div className="promo-card-img-wrapper">
                    {renderImageZone()}
                </div>

                {/* Content Section */}
                <div className="card-body p-3 d-flex flex-column">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="d-flex align-items-center gap-1">
                            <BsStarFill className="text-warning" size={12} />
                            <span className="fw-bold text-dark small">{rating}</span>
                            <span className="text-muted small">({reviewCount})</span>
                        </div>
                        <span className="badge bg-light text-secondary rounded-pill fw-normal px-2 py-1 small">
                            {priceDisplay}
                        </span>
                    </div>

                    <h5 className="card-title fw-bold mb-1 text-truncate">
                        <Link href={detailLink} className="text-dark text-decoration-none stretched-link">
                            {name}
                        </Link>
                    </h5>

                    <div className="d-flex align-items-center text-muted small mb-3">
                        <BsGeoAlt className="me-1" size={12} />
                        <span className="text-truncate">{address || city}</span>
                    </div>

                    {/* Optional: Simple tags if needed, otherwise skip to match Promo card simplicity 
                        The Promo Card didn't show tags list, just category.
                        Let's render 'Nouveau' if pertinent.
                    */}
                    <div className="mb-2">
                        {isNew && (
                            <span className="badge bg-light text-primary border border-primary border-opacity-10 rounded-pill small">
                                Nouveau
                            </span>
                        )}
                    </div>

                    <div className="mt-auto pt-2 d-flex gap-2">
                        <Link href={reservationLink} className="btn btn-primary w-100 rounded-pill py-2 fw-medium d-flex align-items-center justify-content-center position-relative z-2 shadow-sm">
                            Réserver <BsArrowRight className="ms-2" />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // --- LIST LAYOUT (Refactored to match visual density) ---
    return (
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-3 theme-hover-card" data-testid="restaurant-card-list">
            <div className="row g-0 h-100">
                <div className="col-4 col-md-4 position-relative">
                    {renderImageZone('h-100')}
                </div>
                <div className="col-8 col-md-8">
                    <div className="card-body p-3 p-md-4 h-100 d-flex flex-column">
                        {/* Header */}
                        <div className="d-flex justify-content-between align-items-start mb-1">
                            <div className="overflow-hidden me-2">
                                <h4 className="card-title fw-bold mb-1 text-truncate fs-5 fs-md-4">
                                    <Link href={detailLink} className="text-dark text-decoration-none hover-primary">
                                        {name}
                                    </Link>
                                </h4>
                                <div className="d-flex align-items-center text-muted small">
                                    <BsGeoAlt className="me-1" size={13} />
                                    <span className="text-truncate me-2">{address || city}</span>
                                </div>
                            </div>
                            {/* Desktop Price */}
                            <div className="text-end d-none d-md-block flex-shrink-0">
                                <span className="fw-bold text-dark d-block fs-5">{priceDisplay}</span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="card-text text-muted small line-clamp-2 my-2 flex-grow-1 d-none d-sm-block">
                            {description || 'Découvrez ce lieu unique et profitez d\'une expérience culinaire inoubliable.'}
                        </p>

                        {/* Actions */}
                        <div className="d-flex gap-2 mt-auto pt-2 border-top">
                            <Link href={detailLink} className="btn btn-outline-light text-dark border fw-medium rounded-pill px-3 px-md-4 flex-grow-1 flex-md-grow-0 d-flex align-items-center justify-content-center text-nowrap btn-sm btn-md-regular">
                                Voir détails
                            </Link>
                            <Link href={reservationLink} className="btn btn-primary fw-medium rounded-pill px-3 px-md-4 flex-grow-1 flex-md-grow-0 d-flex align-items-center justify-content-center shadow-sm text-nowrap btn-sm btn-md-regular">
                                Réserver <BsArrowRight className="ms-2 d-none d-md-inline" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
