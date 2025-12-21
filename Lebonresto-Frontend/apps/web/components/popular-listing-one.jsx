'use client';

import React from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import { BsGeoAlt, BsPatchCheckFill, BsStar, BsSuitHeart, BsTelephone } from 'react-icons/bs';
import { useGetRestaurantsQuery } from '../store/api';

export default function PopularListingOne() {
    // Fetch real restaurants (limit 8 for popular section)
    const { data: restaurantsData, isLoading } = useGetRestaurantsQuery({ limit: 8 });

    // Handle both paginated and array responses
    const restaurants = Array.isArray(restaurantsData)
        ? restaurantsData
        : restaurantsData?.data || [];

    if (isLoading) {
        return <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>;
    }

    if (!restaurants || restaurants.length === 0) {
        return null; // Or show empty state
    }

    return (
        <div className="row align-items-center justify-content-center">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={15}
                    modules={[Autoplay, Pagination]}
                    pagination={true}
                    loop={restaurants.length > 4}
                    autoplay={{ delay: 2000, disableOnInteraction: false, }}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1440: { slidesPerView: 4 },
                    }}
                >
                    {restaurants.map((item, index) => {
                        // Map backend data to UI
                        const imageUrl = item.restaurant_image || item.logo_url || '/assets/img/list-1.jpg';
                        const city = item.city?.name || 'Maroc';
                        const category = item.category?.name || 'General';

                        return (
                            <SwiperSlide className="singleItem" key={item.id}>
                                <div className="listingitem-container">
                                    <div className="singlelisting-item">
                                        <div className="listing-top-item">
                                            <Link href={`/restaurants/${item.id}`} className="topLink">
                                                <div className="position-absolute start-0 top-0 ms-3 mt-3 z-2">
                                                    <div className="d-flex align-items-center justify-content-start gap-2">
                                                        <span className={`badge badge-xs text-uppercase ${item.resturant_status === 'Ouvert' ? 'listOpen' : 'listClose'}`}>
                                                            {item.resturant_status || (item.is_active ? 'Open' : 'Closed')}
                                                        </span>

                                                        <span className="badge badge-xs badge-transparent">
                                                            {item.min_price ? `${item.min_price} MAD` : '$$$'}
                                                        </span>

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
                                            {/* Avatar/Logo handling could be improved, for now using logo or fallback */}
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
                                                <div className="d-flex align-items-center justify-content-start gap-2">
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
                                                <div className="listing-rates">
                                                    <div className="d-flex align-items-center justify-content-start gap-1">
                                                        <span className={`ratingAvarage ${item.rating_avg > 4.5 ? 'excellent' : 'good'}`}>{item.rating_avg || 'N/A'}</span>
                                                        <span className="overallrates">{item.rating_count ? `${item.rating_count} Reviews` : '0 Reviews'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    )
}
