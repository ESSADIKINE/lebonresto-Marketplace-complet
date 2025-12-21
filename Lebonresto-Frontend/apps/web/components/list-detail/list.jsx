'use client';

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import Link from 'next/link'
import { BsGeoAlt, BsPatchCheckFill, BsStar, BsStarFill, BsSuitHeart, BsTelephone, BsCupHot } from 'react-icons/bs';
import { useGetRecommendedRestaurantsQuery } from '../../store/api'

export default function List() {
    const { data: restaurantsData, isLoading } = useGetRecommendedRestaurantsQuery();

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
        <div className="listingSingleblock">
            <div className="SingleblockHeader">
                <a data-bs-toggle="collapse" data-parent="#similar" data-bs-target="#similar" aria-controls="similar" href="#" aria-expanded="false" className="collapsed"><h4 className="listingcollapseTitle">Similar Lists</h4></a>
            </div>

            <div id="similar" className="panel-collapse collapse show">
                <div className="card-body p-4 pt-2">
                    <div className="owl-carousel owl-theme similarSliders">
                        <Swiper
                            slidesPerView={2}
                            spaceBetween={15}
                            modules={[Autoplay, Pagination]}
                            pagination={true}
                            loop={restaurants.length > 2}
                            autoplay={{ delay: 2000, disableOnInteraction: false, }}
                            breakpoints={{
                                320: { slidesPerView: 1 },
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 2 },
                                1440: { slidesPerView: 2 },
                            }}
                        >
                            {restaurants.map((item, index) => {
                                // Map backend data to UI
                                const imageUrl = item.restaurant_image || item.logo_url || '/assets/img/list-1.jpg';
                                const city = item.city?.name || 'Maroc';
                                const category = item.category?.name || 'Restaurant';

                                return (
                                    <SwiperSlide className="singleItem" key={item.id}>
                                        <div className="listingitem-container">
                                            <div className="singlelisting-item bg-light border-0">
                                                <div className="listing-top-item">
                                                    <div className="position-absolute end-0 top-0 me-3 mt-3 z-2">
                                                        <Link href="#" className="bookmarkList" data-bs-toggle="tooltip" data-bs-title="Save Listing"><BsSuitHeart className="m-0" /></Link>
                                                    </div>
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
                                                    <div className="opssListing position-absolute start-0 bottom-0 ms-3 mb-4 z-2">
                                                        <div className="d-flex align-items-center justify-content-between gap-2">
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
                                                                <div className="list-infos">
                                                                    <div className="gap-3 mt-1">
                                                                        <div className="list-distance text-light d-flex align-items-center"><BsGeoAlt className="mb-0 me-2" />{city}</div>
                                                                        {item.phone && <div className="list-calls text-light hide-mob mt-1 d-flex align-items-center"><BsTelephone className="mb-0 me-2" />{item.phone}</div>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="listing-footer-item border-0">
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
                                                            <span className="d-flex align-items-center justify-content-start gap-1 text-sm">
                                                                <BsStarFill className="mb-0 text-warning" />
                                                                <span className="text-md fw-bold ms-1">{item.rating_avg || 0}</span>
                                                            </span>
                                                            <span className="text-md text-muted-2 hide-mob mt-2">({item.rating_count || 0} Reviews)</span>
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
            </div>
        </div>
    )
}
