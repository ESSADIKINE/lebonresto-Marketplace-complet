'use client';

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useGetRestaurantsQuery } from '../store/api'
import { BsGeoAlt, BsPatchCheckFill, BsStar, BsStarFill, BsSuitHeart, BsTelephone } from 'react-icons/bs'
import { FaUtensils } from 'react-icons/fa6';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function FeaturedListing({ restaurants: initialRestaurants, cities, categories }) {
    // Fetch restaurants (featured ones ideally, but for now just all or a subset)
    const { data: restaurantsData, isLoading, isError } = useGetRestaurantsQuery({ limit: 8 }, { skip: !!initialRestaurants });

    if (!initialRestaurants && isLoading) {
        return (
            <div className="row align-items-center justify-content-center">
                <div className="col-12 text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (!initialRestaurants && (isError || !restaurantsData)) {
        return null;
    }

    const restaurants = initialRestaurants || (Array.isArray(restaurantsData) ? restaurantsData : []);

    return (
        <div className="row align-items-center justify-content-center">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="owl-carousel owl-theme itemslider">
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={15}
                        modules={[Autoplay, Pagination]}
                        pagination={true}
                        loop={restaurants.length > 4}
                        autoplay={{ delay: 2000, disableOnInteraction: false }}
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1440: { slidesPerView: 4 },
                        }}
                    >
                        {restaurants.map((item, index) => {
                            const placeholderImage = '/assets/img/restaurant-placeholder.jpg';
                            const restaurantImage = item.restaurant_image || placeholderImage;
                            const ownerImage = item.logo_url || '/assets/img/team-1.jpg';
                            const ratingAvg = item.rating_avg || 0;
                            const ratingCount = item.rating_count || 0;
                            const isOpen = item.resturant_status === 'Ouvert' || item.status === 'APPROVED';

                            // Map category and city if not present
                            const category = item.category || (categories && categories.find(c => c.id === item.category_id));
                            const city = item.city || (cities && cities.find(c => c.id === item.city_id));
                            const cityName = city?.name || item.address || 'Location';
                            const categoryName = category?.name;

                            return (
                                <SwiperSlide className="singleItem" key={index}>
                                    <div className="listingitem-container">
                                        <div className="singlelisting-item bg-light border-0">
                                            <div className="listing-top-item">
                                                <div className="position-absolute end-0 top-0 me-3 mt-3 z-2">
                                                    <Link href="#" className="bookmarkList" data-bs-toggle="tooltip" data-bs-title="Save Listing" aria-label="Save to favorites"><BsSuitHeart className="m-0" /></Link>
                                                </div>
                                                <Link href={`/restaurants/${item.id}`} className="topLink">
                                                    <div className="position-absolute start-0 top-0 ms-3 mt-3 z-2">
                                                        <div className="d-flex align-items-center justify-content-start gap-2">
                                                            <span className={`badge badge-xs text-uppercase ${item.resturant_status === 'Ouvert' ? 'listOpen' : 'listClose'}`}>
                                                                {item.resturant_status || 'Closed'}
                                                            </span>

                                                            <span className="badge badge-xs badge-transparent">$$$</span>

                                                            {item.is_featured &&
                                                                <span className="badge badge-xs badge-transparent"><BsStar className="mb-0 me-1" />Featured</span>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div style={{ position: 'relative', height: '250px', width: '100%' }}>
                                                        <Image
                                                            src={restaurantImage}
                                                            alt={item.name}
                                                            fill
                                                            className="img-fluid"
                                                            style={{ objectFit: 'cover' }}
                                                        />
                                                    </div>
                                                </Link>
                                                <div className="opssListing position-absolute start-0 bottom-0 ms-3 mb-4 z-2">
                                                    <div className="d-flex align-items-center justify-content-between gap-2">
                                                        <div className="listing-avatar">
                                                            <Link href="#" className="avatarImg">
                                                                <Image
                                                                    src={ownerImage}
                                                                    className="img-fluid circle"
                                                                    alt="Avatar"
                                                                    width={40}
                                                                    height={40}
                                                                    style={{ objectFit: 'cover' }}
                                                                />
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
                                                                    <div className="list-distance text-light d-flex align-items-center">
                                                                        <BsGeoAlt className="mb-0 me-2" />
                                                                        {cityName}
                                                                    </div>
                                                                    <div className="list-calls text-light hide-mob mt-1 d-flex align-items-center">
                                                                        <BsTelephone className="mb-0 me-2" />
                                                                        {item.phone || '+123 456 7890'}
                                                                    </div>
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
                                                            {category && (
                                                                <Link href={{ pathname: '/restaurants_grid', query: { category_id: item.category_id } }} className="d-flex align-items-center justify-content-start gap-2">
                                                                    <span className="catIcon bg-primary">
                                                                        {category.category_image ? (
                                                                            <Image
                                                                                src={category.category_image}
                                                                                alt={categoryName}
                                                                                width={16}
                                                                                height={16}
                                                                                style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
                                                                            />
                                                                        ) : (
                                                                            <FaUtensils className="text-white" />
                                                                        )}
                                                                    </span>
                                                                    <span className="catTitle">{categoryName}</span>
                                                                </Link>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="listing-rates">
                                                        <span className="d-flex align-items-center justify-content-start gap-1 text-sm">
                                                            {[...Array(5)].map((_, i) => (
                                                                <BsStarFill key={i} className={`mb-0 ${i < Math.round(ratingAvg) ? 'text-warning' : 'text-muted'}`} />
                                                            ))}
                                                        </span>
                                                        <span className="text-md text-muted-2 hide-mob mt-2">({ratingCount} Reviews)</span>
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
    )
}

