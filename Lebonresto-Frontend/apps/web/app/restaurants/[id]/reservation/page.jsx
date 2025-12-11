'use client';

import React from 'react';
import FooterTop from '../../../../components/footer-top';

import { useGetRestaurantByIdQuery } from '../../../../store/api';
import ReservationForm from '../../../../components/reservation/reservation-form';
import Link from 'next/link';
import { BsArrowLeft, BsGeoAlt, BsStarFill } from 'react-icons/bs';

export default function ReservationPage({ params }) {
    const { id } = params;

    const { data: restaurant, isLoading } = useGetRestaurantByIdQuery(id);

    if (isLoading) {
        return <div className="vh-100 d-flex align-items-center justify-content-center text-primary"><span className="spinner-border"></span></div>;
    }

    if (!restaurant) {
        return <div className="vh-100 d-flex align-items-center justify-content-center">Restaurant introuvable.</div>;
    }

    return (
        <div className="bg-light min-vh-100 d-flex flex-column">
            {/* Navbar is global in layout */}

            <div className="flex-grow-1 container pt-5 pb-5">

                {/* Back Button */}
                <div className="mb-4">
                    <Link href={`/restaurants/${id}`} className="text-decoration-none text-muted fw-medium d-inline-flex align-items-center hover-primary">
                        <BsArrowLeft className="me-2" /> Retour au restaurant
                    </Link>
                </div>

                {/* Header Summary */}
                <div className="row justify-content-center mb-5">
                    <div className="col-lg-8 text-center">
                        <h1 className="fw-bold mb-3">Réserver une table</h1>
                        <div className="card border-0 shadow-sm d-inline-block text-start px-4 py-3 rounded-4">
                            <div className="d-flex align-items-center">
                                <img
                                    src={restaurant.restaurant_image || '/assets/img/restaurant-placeholder.jpg'}
                                    className="rounded-3 object-fit-cover me-3"
                                    width="60" height="60"
                                    alt={restaurant.name}
                                />
                                <div>
                                    <h5 className="fw-bold mb-1 m-0">{restaurant.name}</h5>
                                    <div className="text-muted small d-flex align-items-center mb-0">
                                        <BsGeoAlt className="me-1" /> {restaurant.city?.name} •
                                        <BsStarFill className="mx-1 text-warning" /> {restaurant.rating_avg || 0}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ReservationForm restaurant={restaurant} />

            </div>

            <FooterTop />

        </div>
    );
}
