import React from 'react';
import Link from 'next/link';
import { BsGeoAlt, BsStarFill, BsBookmark, BsArrowRight } from 'react-icons/bs';

export default function RestaurantCard({ restaurant, layout = 'grid' }) {
    if (!restaurant) return null;

    const { id, name, city, category, rating, reviewCount, image, tags, address, priceRange } = restaurant;

    // Grid Layout
    if (layout === 'grid') {
        return (
            <div className="card rounded-3 border-0 shadow-sm m-0">
                <div className="listing-thumb-wrapper p-0 position-relative">
                    <div className="position-absolute top-0 start-0 m-3 z-1">
                        <span className="badge bg-primary bg-opacity-75 text-white">{category}</span>
                    </div>
                    <div className="position-absolute top-0 end-0 m-3 z-1">
                        <button className="btn btn-sm btn-icon btn-light rounded-circle text-danger shadow-sm">
                            <BsBookmark />
                        </button>
                    </div>
                    <div className="listing-thumb">
                        <Link href={`/single-listing?id=${id}`} className="d-block position-relative">
                            <img src={image} className="img-fluid rounded-top" alt={name} style={{ height: '220px', width: '100%', objectFit: 'cover' }} />
                        </Link>
                    </div>
                </div>
                <div className="card-body p-3">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <div className="d-flex align-items-center gap-1 text-warning">
                            <BsStarFill size={14} />
                            <span className="fw-bold text-dark">{rating}</span>
                            <span className="text-muted small">({reviewCount} avis)</span>
                        </div>
                        <span className="text-muted small">{priceRange}</span>
                    </div>
                    <h5 className="mb-1 fw-bold">
                        <Link href={`/single-listing?id=${id}`} className="text-dark">{name}</Link>
                    </h5>
                    <div className="d-flex align-items-center text-muted mb-3">
                        <BsGeoAlt size={14} className="me-1" />
                        <span className="small">{city}</span>
                    </div>

                    <div className="d-flex flex-wrap gap-1 mb-3">
                        {tags && tags.slice(0, 3).map((tag, index) => (
                            <span key={index} className="badge bg-light text-muted fw-normal border">{tag}</span>
                        ))}
                    </div>

                    <div className="d-grid">
                        <Link href={`/single-listing?id=${id}`} className="btn btn-outline-primary btn-sm rounded-pill fw-medium">
                            Voir le restaurant
                        </Link>
                    </div>
                </div>
            </div>
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
                        <Link href={`/single-listing?id=${id}`} className="h-100 d-block">
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
                            <Link href={`/single-listing?id=${id}`} className="text-dark">{name}</Link>
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
                            <Link href={`/single-listing?id=${id}`} className="btn btn-primary btn-sm rounded-pill px-4 fw-medium">
                                Voir le restaurant <BsArrowRight className="ms-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
