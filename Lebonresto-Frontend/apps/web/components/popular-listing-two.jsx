'use client';

import React from 'react'
import Link from 'next/link'
import { useGetRestaurantsQuery, useGetRestaurantImagesQuery } from '../store/api'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { BsGeoAlt, BsPatchCheckFill, BsStar, BsSuitHeart, BsTelephone, BsEyeFill, BsShareFill } from 'react-icons/bs';
import { FaUtensils } from 'react-icons/fa6';

export default function PopularListingTwo({ restaurants: initialRestaurants }) {
    // Fetch first 8 restaurants (popular ones)
    const { data: restaurantsData, isLoading, isError } = useGetRestaurantsQuery({ limit: 8 }, { skip: !!initialRestaurants });

    if (!initialRestaurants && isLoading) {
        return (
            <div className="row align-items-center justify-content-center">
                <div className="col-12 text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                    <p className="mt-2 text-muted">Chargement des restaurants...</p>
                </div>
            </div>
        );
    }

    if (!initialRestaurants && (isError || !restaurantsData)) {
        return (
            <div className="row align-items-center justify-content-center">
                <div className="col-12 text-center py-5">
                    <p className="text-muted">Aucun restaurant disponible pour le moment.</p>
                </div>
            </div>
        );
    }

    // Backend returns array directly, not wrapped in { data: [] }
    const apiRestaurants = Array.isArray(restaurantsData) ? restaurantsData.slice(0, 8) : [];
    const restaurants = initialRestaurants || apiRestaurants;

    if (restaurants.length === 0) {
        return (
            <div className="row align-items-center justify-content-center">
                <div className="col-12 text-center py-5">
                    <p className="text-muted">Aucun restaurant disponible pour le moment.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="row align-items-center justify-content-center">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="owl-carousel owl-theme itemslider">
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={15}
                        modules={[Autoplay]}
                        loop={restaurants.length > 4}
                        autoplay={{ delay: 2000, disableOnInteraction: false }}
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1440: { slidesPerView: 4 },
                        }}
                    >
                        {restaurants.map((restaurant, index) => {
                            const isApproved = restaurant.status === 'APPROVED';
                            const placeholderImage = '/assets/img/restaurant-placeholder.jpg';
                            const restaurantImage = restaurant.restaurant_image || placeholderImage;
                            const ownerImage = restaurant.owner_image || '/assets/img/team-1.jpg'; // Static fallback
                            const reviewsAvg = restaurant.rating_avg || '4.5'; // Static fallback if missing
                            const reviewsCount = restaurant.rating_count || '12'; // Static fallback

                            // Determine status badge
                            const isOpen = true; // Logic for open/close would go here based on hours

                            return (
                                <SwiperSlide className="singleItem" key={restaurant.id || index}>
                                    <div className="listingitem-container">
                                        <div className="singlelisting-item bg-light border-0">
                                            <div className="listing-top-item">
                                                <div className="position-absolute end-0 top-0 me-3 mt-3 z-2">
                                                    <Link href="#" className="bookmarkList" data-bs-toggle="tooltip" data-bs-title="Save Listing"><BsSuitHeart className="m-0" /></Link>
                                                </div>
                                                <Link href={`/restaurants/${restaurant.id}`} className="topLink">
                                                    <div className="position-absolute start-0 top-0 ms-3 mt-3 z-2">
                                                        <div className="d-flex align-items-center justify-content-start gap-2">
                                                            {isOpen ? (
                                                                <span className="badge badge-xs text-uppercase listOpen">Open</span>
                                                            ) : (
                                                                <span className="badge badge-xs text-uppercase listClose">Closed</span>
                                                            )}

                                                            <span className="badge badge-xs badge-transparent">$$$</span>

                                                            {restaurant.is_featured &&
                                                                <span className="badge badge-xs badge-transparent"><BsStar className="mb-0 me-1" />Featured</span>
                                                            }
                                                        </div>
                                                    </div>
                                                    <img src={restaurantImage} className="img-fluid" alt={restaurant.name} style={{ height: '250px', objectFit: 'cover', width: '100%' }} />
                                                </Link>
                                                <div className="opssListing position-absolute start-0 bottom-0 ms-3 mb-4 z-2">
                                                    <div className="d-flex align-items-center justify-content-between gap-2">
                                                        <div className="listing-avatar">
                                                            <Link href="#" className="avatarImg"><img src={ownerImage} className="img-fluid circle" alt="Avatar" /></Link>
                                                        </div>
                                                        <div className="listing-details">
                                                            <h4 className="listingTitle">
                                                                <Link href={`/restaurants/${restaurant.id}`} className="titleLink">
                                                                    {restaurant.name}
                                                                    <span className="verified"><BsPatchCheckFill className="bi bi-patch-check-fill m-0" /></span>
                                                                </Link>
                                                            </h4>
                                                            <div className="list-infos">
                                                                <div className="gap-3 mt-1">
                                                                    <div className="list-distance text-light d-flex align-items-center">
                                                                        <BsGeoAlt className="mb-0 me-2" />
                                                                        {restaurant.city?.name || restaurant.address || 'Location'}
                                                                    </div>
                                                                    <div className="list-calls text-light hide-mob mt-1 d-flex align-items-center">
                                                                        <BsTelephone className="mb-0 me-2" />
                                                                        {restaurant.phone || '+123 456 7890'}
                                                                    </div>
                                                                    <div className="list-rating text-light d-flex align-items-center">
                                                                        <span className="me-1">{(Number(reviewsAvg) || 0).toFixed(1)}</span>
                                                                        <BsStar className="mb-0 me-1 text-warning" />
                                                                        <span className="text-light opacity-75">({reviewsCount} avis)</span>
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
                                                            <Link href={{ pathname: '/restaurants_grid', query: { category_id: restaurant.category_id } }} className="d-flex align-items-center justify-content-start gap-2">
                                                                <span className="catIcon bg-primary"><FaUtensils className="text-white" /></span>
                                                                <span className="catTitle">{restaurant.category?.name || 'Category'}</span>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="listing-shares">
                                                        <div className="d-flex align-items-center justify-content-start gap-2">
                                                            <Link href="#" className="smallLinks" data-bs-toggle="tooltip" data-bs-title="View Listing"><BsEyeFill className="m-0" /></Link>
                                                            <Link href="#" className="smallLinks" data-bs-toggle="tooltip" data-bs-title="Save Listing"><BsSuitHeart className="m-0" /></Link>
                                                            <Link href="#" className="smallLinks" data-bs-toggle="tooltip" data-bs-title="Share Listing"><BsShareFill className="m-0" /></Link>
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
        </div>
    );
}
