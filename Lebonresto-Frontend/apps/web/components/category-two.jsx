'use client';

import React from 'react'
import Link from 'next/link'
import { useGetCategoriesQuery } from '../store/api'
import HorizontalSlider from './ui/HorizontalSlider';

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

export default function CategoryTwo({
    categories: initialCategories,
    title,
    subtitle,
    viewAllHref
}) {
    const { data: apiCategories, isLoading, isError } = useGetCategoriesQuery(undefined, { skip: !!initialCategories });
    const categories = initialCategories || apiCategories;

    // Loading State
    if (!categories && isLoading) {
        return (
            <HorizontalSlider title={title} subtitle={subtitle}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden h-100 placeholder-glow" key={i} style={{ height: '220px' }}>
                        <span className="placeholder col-12 h-100"></span>
                    </div>
                ))}
            </HorizontalSlider>
        );
    }

    if (isError || !categories || categories.length === 0) {
        return null; // Hide section if empty
    }

    return (
        <HorizontalSlider
            title={title}
            subtitle={subtitle}
            viewAllHref={viewAllHref}
            className="bg-light" // Optional: distinct background for categories
            itemWidth="190px"
        >
            {categories.map((category) => {
                const IconComponent = getCategoryIcon(category.name);

                return (
                    // Wrapper for slider items - let it fill the parent width (190px from itemWidth)
                    <div key={category.id} className="h-100 w-100">
                        <Link
                            href={{
                                pathname: '/restaurants_grid',
                                query: { category_id: category.id }
                            }}
                            className="categoryBox h-100 d-block text-center p-3 rounded-4 position-relative overflow-hidden text-decoration-none"
                            aria-label={`View restaurants in category: ${category.name}`}
                            style={{
                                '--cat-bg': category.category_image ? `url(${category.category_image})` : 'none',
                                aspectRatio: '4/5'
                            }}
                        >
                            {/* Background Layers */}
                            <div className="category-bg-image position-absolute top-0 start-0 w-100 h-100 bg-cover"></div>
                            <div className="category-overlay position-absolute top-0 start-0 w-100 h-100"></div>

                            {/* Content */}
                            <div className="position-relative z-2 h-100 d-flex flex-column align-items-center justify-content-center">
                                <div className="icoBoxx mb-3 bg-white rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: '50px', height: '50px' }}>
                                    <IconComponent className="text-dark fs-5" />
                                </div>

                                <h5 className="mb-1 fw-bold text-dark fs-6">{category.name}</h5>
                                <span className="categorycounter badge bg-light text-dark rounded-pill px-2 py-1 fw-normal small">
                                    {category.count_restaurants || 0} Restaurants
                                </span>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </HorizontalSlider>
    );
}
