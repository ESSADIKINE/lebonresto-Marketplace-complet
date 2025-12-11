'use client';

import React from 'react'
import { useGetRestaurantsQuery } from '../store/api'
import RestaurantCard from './restaurant/RestaurantCard';
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
                                    <div className="p-2 h-100">
                                        <RestaurantCard restaurant={item} layout="grid" />
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

