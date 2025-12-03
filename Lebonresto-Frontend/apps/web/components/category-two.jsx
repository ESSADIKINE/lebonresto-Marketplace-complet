'use client';

import React from 'react'
import Link from 'next/link'
import { useGetCategoriesQuery } from '../store/api'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

// Icon imports for categories
import {
    FaUtensils,
    FaPizzaSlice,
    FaFish,
    FaBurger,
    FaLeaf,
    FaHotdog,
    FaWineGlass,
    FaCakeCandles
} from 'react-icons/fa6';

// Map category names to icons
const getCategoryIcon = (categoryName) => {
    const name = categoryName?.toLowerCase() || '';

    if (name.includes('pizza')) return FaPizzaSlice;
    if (name.includes('burger') || name.includes('fast')) return FaBurger;
    if (name.includes('fish') || name.includes('poisson') || name.includes('seafood')) return FaFish;
    if (name.includes('vegan') || name.includes('vegetar') || name.includes('végé')) return FaLeaf;
    if (name.includes('grill') || name.includes('barbecue') || name.includes('bbq')) return FaHotdog;
    if (name.includes('wine') || name.includes('vin') || name.includes('bar')) return FaWineGlass;
    if (name.includes('dessert') || name.includes('patiss') || name.includes('cake')) return FaCakeCandles;

    // Default icon
    return FaUtensils;
};

export default function CategoryTwo({ categories: initialCategories }) {
    const { data: apiCategories, isLoading, isError } = useGetCategoriesQuery(undefined, { skip: !!initialCategories });
    const categories = initialCategories || apiCategories;

    if (!categories && isLoading) {
        return (
            <div className="row align-items-center justify-content-center">
                <div className="col-12 text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                    <p className="mt-2 text-muted">Chargement des catégories...</p>
                </div>
            </div>
        );
    }

    if (isError || !categories || categories.length === 0) {
        return (
            <div className="row align-items-center justify-content-center">
                <div className="col-12 text-center py-5">
                    <p className="text-muted">Aucune catégorie disponible pour le moment.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="row align-items-center justify-content-center">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                <div className="owl-carousel categorySlider">
                    <Swiper
                        slidesPerView={6}
                        spaceBetween={30}
                        modules={[Autoplay]}
                        loop={categories.length > 6}
                        autoplay={{ delay: 2100, disableOnInteraction: false }}
                        breakpoints={{
                            320: { slidesPerView: 2 },
                            640: { slidesPerView: 3 },
                            1024: { slidesPerView: 6 },
                        }}
                    >
                        {categories.map((category) => {
                            const IconComponent = getCategoryIcon(category.name);

                            return (
                                <SwiperSlide className="singleCategory" key={category.id}>
                                    <div className="category-small-wrapper">
                                        <Link
                                            href={{
                                                pathname: '/restaurants_grid',
                                                query: { category_id: category.id }
                                            }}
                                            className="categoryBox"
                                            aria-label={`View restaurants in category: ${category.name}`}
                                        >
                                            <div className="categoryCaptions">
                                                <div className="catsIcons">
                                                    <div className="icoBoxx">
                                                        <IconComponent className="fs-3" />
                                                    </div>
                                                </div>
                                                <div className="catsTitle">
                                                    <h5>{category.name}</h5>
                                                </div>
                                                <div className="CatsLists">
                                                    <span className="categorycounter text-muted-2 small">
                                                        {category.count_restaurants || 0} Restaurants
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}
