import React from 'react';
import Link from 'next/link';
import { BsGeoAlt, BsStarFill, BsBookmark, BsArrowRight } from 'react-icons/bs';

export default function RestaurantCard({ restaurant, layout = 'grid' }) {
    if (!restaurant) return null;

    // Normalize data from backend or props
    const id = restaurant.id;
    const name = restaurant.name;
    const city = restaurant.city?.name || restaurant.city || 'Maroc'; // Handle object or string
    const category = restaurant.category?.name || restaurant.category || 'Cuisine';
    const rating = restaurant.rating_avg || restaurant.rating || 0;
    const reviewCount = restaurant.rating_count || restaurant.reviewCount || 0;
    const image = restaurant.restaurant_image || restaurant.image || '/assets/img/restaurant-placeholder.jpg';
    const priceRange = restaurant.price_range || restaurant.priceRange || '€€-€€€';
    const tags = restaurant.tags || []; // Backend might send tags array
    const status = restaurant.status; // premium, standard
    // Promo/Discount Logic
    const discount = restaurant.max_discount_percentage;

    // Grid Layout
    if (layout === 'grid') {
        const href = `/restaurants/${id}`;

        return (
            <Link href={href} className="text-decoration-none text-dark h-100">
                <div className="card rounded-4 border-0 shadow-sm m-0 h-100 theme-hover-card overflow-hidden">
                    <div className="listing-thumb-wrapper p-0 position-relative">

                        {/* Badges Container */}
                        <div className="position-absolute top-0 start-0 m-3 z-2 d-flex flex-column gap-2 align-items-start">
                            {discount > 0 && (
                                <span className="badge bg-danger shadow-sm">-{discount}%</span>
                            )}
                            {status === 'premium' && (
                                <span className="badge bg-warning text-dark shadow-sm"><BsStarFill className="me-1" />Premium</span>
                            )}
                            <span className="badge bg-primary bg-opacity-90 text-white shadow-sm">{category}</span>
                        </div>

                        {/* Bookmark - Stop Propagation to prevent Nav */}
                        <div className="position-absolute top-0 end-0 m-3 z-2">
                            <button
                                className="btn btn-sm btn-icon btn-light rounded-circle text-danger shadow-sm border-0"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    // Handle save
                                }}
                            >
                                <BsBookmark />
                            </button>
                        </div>

                        <div className="listing-thumb" style={{ height: '220px' }}>
                            <img src={image} className="img-fluid w-100 h-100 object-fit-cover" alt={name} />
                        </div>
                    </div>

                    <div className="card-body p-3 d-flex flex-column">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <div className="d-flex align-items-center gap-1 text-warning">
                                <BsStarFill size={14} />
                                <span className="fw-bold text-dark">{(Number(rating)).toFixed(1)}</span>
                                <span className="text-muted small">({reviewCount})</span>
                            </div>
                            <span className="badge bg-light text-muted border border-light-subtle rounded-pill fw-normal px-2 py-1">{priceRange}</span>
                        </div>

                        <h5 className="mb-1 fw-bold text-truncate">{name}</h5>

                        <div className="d-flex align-items-center text-muted mb-3 small">
                            <BsGeoAlt size={14} className="me-1" />
                            <span className="text-truncate">{city}</span>
                        </div>

                        {tags && tags.length > 0 && (
                            <div className="d-flex flex-wrap gap-1 mt-auto">
                                {tags.slice(0, 2).map((tag, index) => (
                                    <span key={index} className="badge bg-light text-dark fw-normal border" style={{ fontSize: '10px' }}>
                                        {typeof tag === 'string' ? tag : tag.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Link>
        );
    }

    // List Layout
    return (
        <div className="card rounded-3 border-0 shadow-sm m-0">
            <div className="row g-0">
                <div className="col-md-4">
                    <div className="listing-thumb-wrapper h-100 position-relative">
                        <div className="position-absolute top-0 start-0 m-3 z-1">
                            <span className="badge bg-primary bg-opacity-75 text-white">{category}</span>
                        </div>
                        <Link href={`/restaurants/${id}`} className="h-100 d-block">
                            <img src={image} className="img-fluid rounded-start h-100 object-fit-cover" alt={name} style={{ minHeight: '200px' }} />
                        </Link>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card-body p-3 h-100 d-flex flex-column justify-content-center">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <div className="d-flex align-items-center gap-1 text-warning">
                                <BsStarFill size={14} />
                                <span className="fw-bold text-dark">{rating}</span>
                                <span className="text-muted small">({reviewCount} avis)</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <span className="text-muted small">{priceRange}</span>
                                <button className="btn btn-sm btn-icon btn-light rounded-circle text-danger shadow-sm">
                                    <BsBookmark />
                                </button>
                            </div>
                        </div>

                        <h4 className="mb-1 fw-bold">
                            <Link href={`/restaurants/${id}`} className="text-dark">{name}</Link>
                        </h4>

                        <div className="d-flex align-items-center text-muted mb-3">
                            <BsGeoAlt size={14} className="me-1" />
                            <span>{address}, {city}</span>
                        </div>

                        <p className="text-muted small mb-3 line-clamp-2">
                            {restaurant.description || "Découvrez ce restaurant exceptionnel..."}
                        </p>

                        <div className="d-flex flex-wrap gap-1 mb-4">
                            {tags && tags.slice(0, 4).map((tag, index) => (
                                <span key={index} className="badge bg-light text-muted fw-normal border">{tag}</span>
                            ))}
                        </div>

                        <div className="d-flex align-items-center justify-content-between mt-auto">
                            <Link href={`/restaurants/${id}`} className="btn btn-primary btn-sm rounded-pill px-4 fw-medium">
                                Voir le restaurant <BsArrowRight className="ms-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
