'use client';

import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
// import { useGetCustomerFeedbackQuery } from '../../../store/api';
import { BsStarFill, BsStar, BsChatText, BsEmojiFrown } from 'react-icons/bs';

export default function FeedbackPage() {
    const { user } = useSelector((state) => state.auth);
    // curl -X GET "http://localhost:3000/customers/{id}/feedback"
    // const { data: feedbackList, isLoading } = useGetCustomerFeedbackQuery(user?.id, {
    //     skip: !user?.id,
    // });
    const feedbackList = [];
    const isLoading = false;

    if (isLoading) return <div className="text-center py-5"><span className="spinner-border text-primary"></span></div>;

    if (!feedbackList || feedbackList.length === 0) {
        return (
            <div className="text-center py-5">
                <div className="mb-3 text-muted display-1"><BsChatText /></div>
                <h4>Aucun avis</h4>
                <p className="text-muted">Partagez votre expérience après avoir visité un restaurant.</p>
                <Link href="/account/reservations" className="btn btn-primary rounded-pill px-4 mt-2">Mes réservations</Link>
            </div>
        );
    }

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                i <= rating ?
                    <BsStarFill key={i} className="text-warning me-1" /> :
                    <BsStar key={i} className="text-muted me-1" />
            );
        }
        return stars;
    };

    return (
        <div>
            <h4 className="fw-bold mb-4">Mes Avis</h4>

            <div className="row g-4">
                {feedbackList.map((item) => (
                    <div className="col-lg-6" key={item.id}>
                        <div className="card shadow-sm border-0 h-100 p-3">
                            <div className="d-flex justify-content-between mb-2">
                                <div>
                                    <h6 className="fw-bold mb-1">{item.restaurant?.name || 'Restaurant inconnu'}</h6>
                                    <div className="d-flex align-items-center small">
                                        {renderStars(item.rating)}
                                        <span className="text-muted ms-2">({item.rating}/5)</span>
                                    </div>
                                </div>
                                <small className="text-muted">{new Date(item.created_at).toLocaleDateString()}</small>
                            </div>
                            <p className="text-muted mb-0 small fst-italic">"{item.comment}"</p>
                            {item.restaurant_id && (
                                <Link href={`/restaurants/${item.restaurant_id}`} className="stretched-link" aria-label="Voir restaurant"></Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
