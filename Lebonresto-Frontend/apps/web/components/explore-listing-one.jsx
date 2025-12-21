'use client';

import React, { useEffect } from 'react'
import Link from 'next/link'
import { BsEyeFill, BsGeoAlt, BsPatchCheckFill, BsShareFill, BsStar, BsSuitHeart, BsTelephone, BsCupHot } from 'react-icons/bs'
import { useGetRestaurantsQuery } from '../store/api'

export default function ExploreListingOne() {
    const { data: restaurantsData, isLoading } = useGetRestaurantsQuery({ limit: 6 });

    useEffect(() => {
        // Initialize tooltips if needed
        const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.forEach((tooltipTriggerEl) => {
            new window.bootstrap.Tooltip(tooltipTriggerEl);
        });
    }, [restaurantsData]); // Re-run when data loads

    // Handle response
    const restaurants = Array.isArray(restaurantsData)
        ? restaurantsData
        : restaurantsData?.data || [];

    if (isLoading) {
        return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;
    }

    if (!restaurants || restaurants.length === 0) {
        return null;
    }

    return (
        <div className="row align-items-center justify-content-center g-4">
            {restaurants.map((item, index) => {
                // Map backend data to UI
                const imageUrl = item.restaurant_image || item.logo_url || '/assets/img/list-1.jpg';
                const city = item.city?.name || 'Maroc';
                const category = item.category?.name || 'Restaurant';

                return (
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12" key={item.id}>
                        <div className="listingitem-container">
                            <div className="singlelisting-item">
                                <div className="listing-top-item">
                                    <Link href={`/restaurants/${item.id}`} className="topLink">
                                        <div className="position-absolute start-0 top-0 ms-3 mt-3 z-2">
                                            <div className="d-flex align-items-center justify-content-start gap-2">
                                                <span className={`badge badge-xs text-uppercase ${item.resturant_status === 'Ouvert' ? 'listOpen' : 'listClose'}`}>
                                                    {item.resturant_status || (item.is_active ? 'Open' : 'Closed')}
                                                </span>

                                                <span className="badge badge-xs badge-transparent">{item.min_price ? `${item.min_price} MAD` : '$$$'}</span>

                                                {item.status === 'premium' &&
                                                    <span className="badge badge-xs badge-transparent"><BsStar className="mb-0 me-1" />Featured</span>
                                                }
                                            </div>
                                        </div>
                                        <img
                                            src={imageUrl}
                                            onError={(e) => { e.target.onerror = null; e.target.src = "/assets/img/list-1.jpg" }}
                                            className="img-fluid"
                                            alt={item.name}
                                            style={{ height: '250px', objectFit: 'cover', width: '100%' }}
                                        />
                                    </Link>
                                    <div className="position-absolute end-0 bottom-0 me-3 mb-3 z-2">
                                        <Link href="#" className="bookmarkList" data-bs-toggle="tooltip" data-bs-title="Save Listing"><BsSuitHeart className="m-0" /></Link>
                                    </div>
                                </div>
                                <div className="listing-middle-item">
                                    <div className="listing-avatar">
                                        <Link href={`/restaurants/${item.id}`} className="avatarImg">
                                            <img src={item.logo_url || "/assets/img/avatar.png"} className="img-fluid circle" alt="Logo" />
                                        </Link>
                                    </div>
                                    <div className="listing-details">
                                        <h4 className="listingTitle">
                                            <Link href={`/restaurants/${item.id}`} className="titleLink">
                                                {item.name}
                                                <span className="verified"><BsPatchCheckFill className="bi bi-patch-check-fill m-0" /></span>
                                            </Link>
                                        </h4>
                                        <p className="text-truncate" style={{ maxWidth: '100%' }}>{item.description}</p>
                                    </div>
                                    <div className="listing-info-details">
                                        <div className="d-flex align-items-center justify-content-start gap-4">
                                            {item.phone && <div className="list-calls"><BsTelephone className="mb-0 me-2" />{item.phone}</div>}
                                            <div className="list-distance"><BsGeoAlt className="mb-0 me-2" />{city}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="listing-footer-item">
                                    <div className="d-flex align-items-center justify-content-between gap-2">
                                        <div className="catdWraps">
                                            <div className="flex-start">
                                                <Link href="#" className="d-flex align-items-center justify-content-start gap-2">
                                                    <span className="catIcon me-2 cats-1"><BsCupHot /></span>
                                                    <span className="catTitle">{category}</span>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="listing-shares">
                                            <div className="d-flex align-items-center justify-content-start gap-2">
                                                <Link href="#" className="smallLinks" data-bs-toggle="tooltip" data-bs-title="View Listing"><BsEyeFill className="m-0" /></Link>
                                                <Link href="#" className="smallLinks" data-bs-toggle="tooltip" data-bs-title="Save Listing"><BsSuitHeart className="m-0"></BsSuitHeart></Link>
                                                <Link href="#" className="smallLinks" data-bs-toggle="tooltip" data-bs-title="Share Listing"><BsShareFill className="m-0" /></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                )
            })}

        </div>
    )
}
