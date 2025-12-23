'use client';

import React from 'react';
import { useGetLatestFeedbackQuery } from '../store/api';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaStar, FaQuoteLeft } from 'react-icons/fa6';

export default function ClientOne({ reviews: initialReviews }) {
    const { data: apiReviews, isLoading, isError } = useGetLatestFeedbackQuery(undefined, { skip: !!initialReviews });
    const reviews = initialReviews || apiReviews;

    if (!reviews && isLoading) {
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

    if (isError || !reviews || reviews.length === 0) {
        return null; // Hide if no reviews
    }

    // Take first 8 reviews
    const displayReviews = reviews.slice(0, 8);

    return (
        <div className="row">
            <div className="col-12">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    modules={[Autoplay, Pagination]}
                    pagination={{ clickable: true, dynamicBullets: true }}
                    loop={displayReviews.length > 3}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    className="pb-5 px-2" // Add padding for shadow and pagination
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 25 },
                        1200: { slidesPerView: 3, spaceBetween: 30 },
                    }}
                >
                    {displayReviews.map((review) => {
                        const rating = review.rating || 5;
                        const stars = Array(5).fill(0).map((_, i) => i < rating);

                        // Handle potential nested arrays or direct objects
                        const customerObj = Array.isArray(review.customer) ? review.customer[0] : review.customer;
                        const customerName = customerObj
                            ? `${customerObj.first_name || customerObj.name || 'Client'} ${customerObj.last_name || ''}`.trim()
                            : 'Client Anonyme';

                        const restaurantObj = Array.isArray(review.restaurant) ? review.restaurant[0] : review.restaurant;
                        const restaurantName = restaurantObj?.name || 'Restaurant Partenaire';
                        const restaurantId = restaurantObj?.id;

                        // Initials for avatar fallback
                        const initials = customerName
                            .split(' ')
                            .map(n => n[0])
                            .slice(0, 2)
                            .join('')
                            .toUpperCase();

                        return (
                            <SwiperSlide key={review.id} className="h-auto">
                                <div className="card border-0 rounded-4 shadow-sm h-100 position-relative overflow-hidden"
                                    style={{ transition: 'all 0.3s ease', backgroundColor: '#fff' }}>

                                    <div className="card-body p-4 d-flex flex-column">
                                        {/* User Info & Avatar */}
                                        <div className="d-flex align-items-center mb-4">
                                            <div className="flex-shrink-0">
                                                {customerObj?.avatar_url ? (
                                                    <img
                                                        src={customerObj.avatar_url}
                                                        alt={customerName}
                                                        className="rounded-circle object-fit-cover"
                                                        style={{ width: '56px', height: '56px', border: '3px solid #f8f9fa' }}
                                                    />
                                                ) : (
                                                    <div
                                                        className="rounded-circle d-flex align-items-center justify-content-center bg-primary-subtle text-primary fw-bold fs-5"
                                                        style={{ width: '56px', height: '56px', border: '3px solid #f8f9fa' }}
                                                    >
                                                        {initials}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ms-3">
                                                <h6 className="fw-bold mb-1 text-dark">{customerName}</h6>
                                                <p className="small text-muted mb-0">
                                                    {new Date(review.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                </p>
                                            </div>
                                            <div className="ms-auto opacity-25">
                                                <FaQuoteLeft className="fs-3 text-primary" />
                                            </div>
                                        </div>

                                        {/* Rating */}
                                        <div className="mb-3 text-warning fs-6">
                                            {stars.map((isFilled, i) => (
                                                <FaStar key={i} className={isFilled ? '' : 'text-muted opacity-25'} style={{ marginRight: '2px' }} />
                                            ))}
                                        </div>

                                        {/* Comment */}
                                        <div className="flex-grow-1">
                                            <p className="text-secondary fst-italic mb-4" style={{ lineHeight: '1.6' }}>
                                                "{review.comment && review.comment.length > 120
                                                    ? review.comment.substring(0, 120) + '...'
                                                    : review.comment}"
                                            </p>
                                        </div>

                                        {/* Restaurant Context Tag */}
                                        <div className="pt-3 border-top mt-auto">
                                            <p className="mb-0 small text-muted">
                                                A mangé chez <Link href={restaurantId ? `/restaurant/${restaurantId}` : '#'} className="fw-bold text-primary text-decoration-none hover-underline">
                                                    {restaurantName}
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </div>
    );
}
