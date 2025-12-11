import React from 'react';
import Link from 'next/link';
import { BsGeoAlt, BsStarFill, BsArrowRight, BsHeart } from 'react-icons/bs';
import {
    normalizeRestaurantData,
    isNewRestaurant,
    formatPriceRange,
    getStatusBadge
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
    const isPremium = status?.toLowerCase() === 'premium';
    const isOpen = restaurantStatus === 'Ouvert';

    // Tag limits
    const maxTags = layout === 'grid' ? 2 : 4;
    const displayTags = tags && tags.length > 0 ? tags.slice(0, maxTags) : [];

    // --- Image Overlays Helper ---
    const renderImageOverlays = () => (
        <>
            {/* 1. Premium Ribbon (Top Left) */}
            {isPremium && (
                <div className="premium-ribbon-wrapper">
                    <div className="premium-ribbon">PREMIUM</div>
                </div>
            )}

            {/* 2. Save Icon (Top Right) */}
            <div className="card-save-icon" title="Sauvegarder">
                <BsHeart size={16} />
            </div>

            {/* 3. Discount Badge (Top Left, below ribbon area if needed, distinct) */}
            {discount > 0 && (
                <div className="position-absolute top-0 start-0 m-3 z-2 mt-5 pointer-events-none">
                    <span className="badge bg-danger shadow-sm">-{discount}%</span>
                </div>
            )}

            {/* 4. Bottom Left: Category Pill + Status Dot */}
            <div className="position-absolute bottom-0 start-0 m-3 z-2 d-flex align-items-center gap-2">
                <span className="category-overlay-pill">
                    {category}
                </span>
                <div className="d-flex align-items-center gap-1 bg-white px-2 py-1 rounded-pill shadow-sm" style={{ fontSize: '0.7rem', fontWeight: '600' }}>
                    <span className={`status-dot ${isOpen ? 'open' : 'closed'}`}></span>
                    <span className={isOpen ? 'text-success' : 'text-danger'}>
                        {restaurantStatus || (isOpen ? 'Ouvert' : 'Fermé')}
                    </span>
                </div>
            </div>
        </>
    );

    // --- Nouveau Badge Content Helper ---
    const renderNouveauBadge = () => {
        if (!isNew) return null;
        return (
            <span className="nouveau-badge me-2">
                Nouveau
            </span>
        );
    };


    // --- GRID LAYOUT ---
    if (layout === 'grid') {
        return (
            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden theme-hover-card" data-testid="restaurant-card-grid">
                <div className="position-relative">
                    {/* Image Container */}
                    <div className="ratio ratio-4x3 bg-light">
                        <Link href={detailLink}>
                            <img
                                src={image}
                                className="img-fluid object-fit-cover w-100 h-100"
                                alt={name}
                                loading="lazy"
                            />
                        </Link>
                    </div>
                    {/* Overlays */}
                    {renderImageOverlays()}
                </div>

                <div className="card-body p-3 d-flex flex-column">
                    {/* Row 1: Rating & Price */}
                    <div className="d-flex align-items-center justify-content-between mb-2 small">
                        <div className="d-flex align-items-center gap-1 text-warning">
                            <BsStarFill size={12} />
                            <span className="fw-bold text-dark">{rating}</span>
                            <span className="text-muted">({reviewCount})</span>
                        </div>
                        <span className="fw-medium text-dark bg-light px-2 py-1 rounded small text-nowrap">{priceDisplay}</span>
                    </div>

                    {/* Row 2: Title */}
                    <h5 className="card-title fw-bold mb-1 text-truncate">
                        <Link href={detailLink} className="text-dark text-decoration-none hover-primary">
                            {name}
                        </Link>
                    </h5>

                    {/* Row 3: Location */}
                    <div className="d-flex align-items-center text-muted small mb-2">
                        <BsGeoAlt className="me-1 flex-shrink-0" size={12} />
                        <span className="text-truncate me-2">{address || city}</span>
                        {restaurant.distance != null && (
                            <span className="badge bg-light text-primary border border-primary border-opacity-10 rounded-pill ms-auto">
                                {restaurant.distance.toFixed(1)} km
                            </span>
                        )}
                    </div>

                    {/* Row 4: Tags + Nouveau */}
                    <div className="d-flex flex-wrap align-items-center gap-1 mb-3">
                        {renderNouveauBadge()}
                        {displayTags.length > 0 && displayTags.map((tag, idx) => (
                            <span key={idx} className="badge border fw-normal text-muted bg-light" style={{ fontSize: '10px' }}>
                                {typeof tag === 'string' ? tag : tag.name}
                            </span>
                        ))}
                    </div>

                    {/* Button */}
                    <div className="mt-auto pt-2 border-top">
                        <Link href={reservationLink} className="btn btn-primary w-100 rounded-pill btn-sm fw-medium py-2">
                            Réserver
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // --- LIST LAYOUT ---
    return (
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-3 theme-hover-card" data-testid="restaurant-card-list">
            <div className="row g-0 h-100">
                {/* Image Section (Left) */}
                <div className="col-4 col-md-4 position-relative">
                    <div className="h-100 bg-light position-relative">
                        <Link href={detailLink} className="d-block h-100">
                            <img
                                src={image}
                                className="img-fluid object-fit-cover w-100 h-100 position-absolute text-transparent"
                                alt={name}
                                loading="lazy"
                            />
                        </Link>
                    </div>
                    {/* Overlays */}
                    {renderImageOverlays()}
                </div>

                {/* Content Section (Right) */}
                <div className="col-8 col-md-8">
                    <div className="card-body p-3 p-md-4 h-100 d-flex flex-column">

                        {/* Header Row */}
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
                                    {restaurant.distance != null && (
                                        <span className="text-primary fw-medium small">
                                            • {restaurant.distance.toFixed(1)} km
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Desktop Price/Rating Block */}
                            <div className="text-end d-none d-md-block flex-shrink-0">
                                <span className="fw-bold text-dark d-block fs-5">{priceDisplay}</span>
                                <div className="d-flex align-items-center justify-content-end gap-1 small mt-1 text-warning">
                                    <BsStarFill size={12} />
                                    <span className="fw-bold text-dark">{rating}</span>
                                    <span className="text-muted">({reviewCount})</span>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Price/Rating Row */}
                        <div className="d-flex d-md-none align-items-center justify-content-between mb-2 small">
                            <div className="d-flex align-items-center gap-1 text-warning">
                                <BsStarFill size={12} />
                                <span className="fw-bold text-dark">{rating}</span>
                                <span className="text-muted">({reviewCount})</span>
                            </div>
                            <span className="fw-medium text-dark">{priceDisplay}</span>
                        </div>

                        {/* Description */}
                        <p className="card-text text-muted small line-clamp-2 my-2 flex-grow-1 d-none d-sm-block">
                            {description || 'Découvrez ce lieu unique et profitez d\'une expérience culinaire inoubliable.'}
                        </p>

                        {/* Tags + Nouveau */}
                        <div className="d-flex flex-wrap align-items-center gap-2 mb-3 d-none d-md-flex">
                            {renderNouveauBadge()}
                            {displayTags.length > 0 && displayTags.map((tag, idx) => (
                                <span key={idx} className="badge bg-white text-secondary border fw-normal px-2 py-1">
                                    {typeof tag === 'string' ? tag : tag.name}
                                </span>
                            ))}
                        </div>

                        {/* Actions Footer */}
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
