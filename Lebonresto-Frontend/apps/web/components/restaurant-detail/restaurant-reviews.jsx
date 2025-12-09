'use client';

import React from 'react';
import { BsStarFill, BsPersonCircle } from 'react-icons/bs';

export default function RestaurantReviews({ feedback = [], summary }) {

    const rating = summary?.average_rating || 0;
    const reviewCount = summary?.total_reviews || feedback.length || 0;

    return (
        <div className="card border-0 rounded-4 shadow-sm mb-4" id="reviews-section">
            <div className="card-body p-4">
                <h5 className="fw-bold mb-4">Avis & Notes</h5>

                {/* Summary Header */}
                <div className="d-flex align-items-center mb-5 p-4 bg-light rounded-3">
                    <div className="display-4 fw-bold text-dark me-3">{Number(rating).toFixed(1)}</div>
                    <div>
                        <div className="d-flex text-warning mb-1">
                            {[...Array(5)].map((_, i) => (
                                <BsStarFill key={i} className={i < Math.round(rating) ? "" : "text-muted opacity-25"} />
                            ))}
                        </div>
                        <p className="text-muted mb-0">Basé sur {reviewCount} avis</p>
                    </div>
                </div>

                {/* Reviews List */}
                <div className="d-flex flex-column gap-4">
                    {feedback.length === 0 && <p className="text-muted text-center py-3">Soyez le premier à donner votre avis !</p>}

                    {feedback.map((review) => (
                        <div className="d-flex border-bottom pb-4" key={review.id}>
                            <div className="flex-shrink-0 me-3">
                                <div className="avatar-placeholder bg-light text-primary rounded-circle d-flex align-items-center justify-content-center fs-4" style={{ width: '50px', height: '50px' }}>
                                    {/* Could use real avatar if available */}
                                    <BsPersonCircle />
                                </div>
                            </div>
                            <div className="flex-grow-1">
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                    <h6 className="fw-bold mb-0">
                                        {review.customer ? `${review.customer.first_name} ${review.customer.last_name}` : 'Client Anonyme'}
                                    </h6>
                                    <span className="text-muted small">{new Date(review.created_at).toLocaleDateString('fr-FR')}</span>
                                </div>
                                <div className="d-flex text-warning text-xs mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <BsStarFill key={i} size={12} className={i < review.rating ? "" : "text-muted opacity-25"} />
                                    ))}
                                </div>
                                <p className="text-muted mb-0">{review.comment}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
