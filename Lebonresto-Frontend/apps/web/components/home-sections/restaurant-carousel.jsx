'use client';

import React from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import RestaurantCard from '../restaurant/RestaurantCard';

export default function RestaurantCarousel({ restaurants, isLoading, isError, emptyMessage = "Aucun restaurant disponible." }) {

    if (isLoading) {
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

    if (isError || !restaurants || restaurants.length === 0) {
        return (
            <div className="row align-items-center justify-content-center">
                <div className="col-12 text-center py-5">
                    <p className="text-muted">{emptyMessage}</p>
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
                        spaceBetween={20}
                        modules={[Autoplay]}
                        loop={restaurants.length > 4}
                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                        breakpoints={{
                            320: { slidesPerView: 1, spaceBetween: 15 },
                            640: { slidesPerView: 2, spaceBetween: 15 },
                            1024: { slidesPerView: 3, spaceBetween: 20 },
                            1440: { slidesPerView: 4, spaceBetween: 20 },
                        }}
                        className="pb-4 pt-2"
                    >
                        {restaurants.map((restaurant, index) => {
                            return (
                                <SwiperSlide className="h-auto" key={restaurant.id || index}>
                                    <div className="h-100">
                                        <RestaurantCard restaurant={restaurant} layout="grid" />
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
