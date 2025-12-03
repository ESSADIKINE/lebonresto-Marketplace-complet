'use client';

import React from 'react'
import { useGetLatestFeedbackQuery } from '../store/api'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FaStar } from 'react-icons/fa6';

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
        return (
            <div className="row align-items-center justify-content-center">
                <div className="col-12 text-center py-5">
                    <p className="text-muted">Aucun avis disponible pour le moment.</p>
                </div>
            </div>
        );
    }

    // Take first 8 reviews
    const displayReviews = reviews.slice(0, 8);

    return (
        <div className="row align-items-center justify-content-center">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    modules={[Autoplay, Pagination]}
                    pagination={true}
                    loop={displayReviews.length > 4}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1200: { slidesPerView: 4 },
                    }}
                >
                    {displayReviews.map((review) => {
                        const rating = review.rating || 5;
                        const stars = Array(5).fill(0).map((_, i) => i < rating);

                        const customerObj = Array.isArray(review.customer) ? review.customer[0] : review.customer;
                        const customerName = customerObj
                            ? `${customerObj.first_name} ${customerObj.last_name}`
                            : 'Client Anonyme';

                        const restaurantObj = Array.isArray(review.restaurant) ? review.restaurant[0] : review.restaurant;
                        const restaurantName = restaurantObj?.name || 'Restaurant';

                        return (
                            <SwiperSlide className="singleItem" key={review.id}>
                                <div className="reviews-wrappers">
                                    <div className="reviewsBox card border-0 rounded-4 shadow-sm h-100">
                                        <div className="card-body p-xl-4 p-lg-4 p-4">
                                            <div className="reviews-topHeader d-flex flex-column mb-3">
                                                <div className="d-flex align-items-center justify-content-center mb-2">
                                                    {stars.map((isFilled, i) => (
                                                        <span className={`me-1 text-sm ${isFilled ? 'text-warning' : 'text-muted'}`} key={i}>
                                                            <FaStar />
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className="revws-desc text-center">
                                                    <p className="text-primary fw-semibold mb-1">{restaurantName}</p>
                                                    <p className="m-0 text-dark small">
                                                        "{review.comment && review.comment.length > 80
                                                            ? review.comment.substring(0, 80) + '...'
                                                            : review.comment}"
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="reviewsers d-flex flex-column mt-4">
                                        <div className="d-flex align-items-center flex-column flex-thumbes gap-2">
                                            <div className="revws-pic">
                                                <div className="img-fluid circle d-flex align-items-center justify-content-center bg-light text-primary fw-bold" style={{ width: '55px', height: '55px', borderRadius: '50%' }}>
                                                    {customerName.charAt(0)}
                                                </div>
                                            </div>
                                            <div className="revws-caps text-center">
                                                <h6 className="fw-medium fs-6 m-0">{customerName}</h6>
                                                <p className="text-muted-2 text-md m-0">
                                                    {new Date(review.created_at).toLocaleDateString('fr-FR')}
                                                </p>
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
