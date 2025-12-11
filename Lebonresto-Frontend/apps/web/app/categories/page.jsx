'use client';

import React from 'react';
import Link from 'next/link';
import { useGetCategoriesQuery } from '../../store/api';
import NavbarLight from '../../components/navbar/navbar-light';
import FooterTop from '../../components/footer-top';

import {
    FaUtensils, FaPizzaSlice, FaFish, FaBurger, FaLeaf, FaHotdog, FaWineGlass, FaCakeCandles
} from 'react-icons/fa6';

const getCategoryIcon = (categoryName) => {
    const name = categoryName?.toLowerCase() || '';
    if (name.includes('pizza')) return FaPizzaSlice;
    if (name.includes('burger') || name.includes('fast')) return FaBurger;
    if (name.includes('fish') || name.includes('poisson') || name.includes('seafood')) return FaFish;
    if (name.includes('vegan') || name.includes('vegetar') || name.includes('végé')) return FaLeaf;
    if (name.includes('grill') || name.includes('barbecue') || name.includes('bbq')) return FaHotdog;
    if (name.includes('wine') || name.includes('vin') || name.includes('bar')) return FaWineGlass;
    if (name.includes('dessert') || name.includes('patiss') || name.includes('cake')) return FaCakeCandles;
    return FaUtensils;
};

export default function CategoriesPage() {
    // curl -X GET "http://localhost:3000/categories"
    const { data: categories, isLoading } = useGetCategoriesQuery();

    return (
        <div className="bg-light min-vh-100">
            <NavbarLight />
            <div className="container py-5">
                <div className="text-center mb-5">
                    <h1 className="fw-bold">Toutes les catégories</h1>
                    <p className="text-muted">Explorez nos types de cuisine variés</p>
                </div>

                {isLoading ? (
                    <div className="text-center py-5"><span className="spinner-border text-primary"></span></div>
                ) : (
                    <div className="row g-4 justify-content-center">
                        {categories?.map((cat) => {
                            const Icon = getCategoryIcon(cat.name);
                            return (
                                <div className="col-lg-3 col-md-4 col-sm-6" key={cat.id}>
                                    <Link href={`/categories/${cat.id}/restaurants`} className="card border-0 rounded-4 shadow-sm h-100 text-decoration-none hover-up p-4 text-center transition-transform">
                                        <div className="mx-auto bg-light rounded-circle d-flex align-items-center justify-content-center text-primary mb-3 transition-colors" style={{ width: 80, height: 80, fontSize: '2rem' }}>
                                            <Icon />
                                        </div>
                                        <h4 className="fw-bold text-dark mb-1">{cat.name}</h4>
                                        <span className="text-muted small">{cat.count_restaurants || 0} Restaurants</span>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <FooterTop />

        </div>
    );
}
