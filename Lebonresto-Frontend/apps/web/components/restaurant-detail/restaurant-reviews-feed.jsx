import React from 'react';
import { BsStarFill, BsStarHalf, BsStar, BsCalendarEvent, BsPersonCircle } from 'react-icons/bs';
import styles from './restaurant-detail-page.module.css';

export default function RestaurantReviewsFeed({ feedback, summary, events }) {

    const reviews = feedback || [];
    const eventList = events || [];

    // Helper to render stars
    const renderStars = (rating) => {
        // Ensure rating is on 0-5 scale. If > 5, assume it's out of 10 and divide by 2.
        const score = rating > 5 ? rating / 2 : rating;
        const stars = [];
        const fullStars = Math.floor(score);
        const hasHalfStar = score % 1 >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<BsStarFill key={i} size={14} style={{ color: 'var(--detail-primary)' }} />);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<BsStarHalf key={i} size={14} style={{ color: 'var(--detail-primary)' }} />);
            } else {
                stars.push(<BsStar key={i} size={14} style={{ color: 'var(--detail-border)' }} />);
            }
        }
        return (
            <div className="d-flex align-items-center gap-2">
                <div className="d-flex gap-1">{stars}</div>
                <span className="fw-bold small" style={{ color: 'var(--detail-primary)' }}>{score.toFixed(1)}/5</span>
            </div>
        );
    };

    return (
        <div className="d-flex flex-column gap-5">

            {/* 1. Global Rating Block (TheFork Style) */}
            <div className={styles.reviewSummaryCard}>
                <div className="row g-5 align-items-center">
                    {/* Left: Circular Rating */}
                    <div className="col-md-5 col-12 d-flex flex-column align-items-center justify-content-center border-end-md">
                        <div className={styles.circularRatingContainer}>
                            {/* SVG Circle for cleaner look than border trick */}
                            <div style={{ position: 'relative', width: 120, height: 120 }}>
                                <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                                    <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                                    <circle
                                        cx="60"
                                        cy="60"
                                        r="54"
                                        fill="none"
                                        stroke="#016B61"
                                        strokeWidth="8"
                                        strokeDasharray="339.292"
                                        strokeDashoffset={339.292 * (1 - (summary?.avg_rating || 0) / 5)}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="d-flex flex-column align-items-center justify-content-center position-absolute top-50 start-50 translate-middle">
                                    <span className={styles.circularRatingScore}>
                                        {(summary?.avg_rating || 0).toFixed(1)}
                                    </span>
                                    <span className={styles.circularRatingLabel}>sur 5</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 text-center">
                            <span className={styles.ratingTag}>Excellent</span>
                            <div className="text-muted small mt-2 fw-medium">
                                {reviews.length} avis
                            </div>
                        </div>
                    </div>

                    {/* Right: Detailed Bars. Note: summary keys are avg_ambiance, avg_cuisine, avg_service (1-5 scale) */}
                    <div className="col-md-7 col-12">
                        {[
                            { label: 'Ambiance', value: (summary?.avg_ambiance || 0) },
                            { label: 'Plats', value: (summary?.avg_cuisine || 0) },
                            { label: 'Service', value: (summary?.avg_service || 0) },
                        ].map((stat, idx) => (
                            <div key={idx} className={styles.statRow}>
                                <span className={styles.statLabel}>{stat.label}</span>
                                <div className={styles.statTrack}>
                                    <div
                                        className={styles.statFill}
                                        style={{ width: `${(stat.value / 5) * 100}%` }}
                                    ></div>
                                </div>
                                <span className={styles.statValue}>{stat.value.toFixed(1)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Verified Badge */}
                <div className={`mt-4 ${styles.verifiedBadgeBox}`}>
                    <div className="text-success">
                        <BsStarFill size={20} />
                    </div>
                    <div>
                        <h6 className="fw-bold mb-1" style={{ fontSize: '0.95rem' }}>De vraies expériences vécues par de vrais clients</h6>
                        <p className="text-muted small mb-0" style={{ lineHeight: '1.5' }}>
                            Seuls les clients qui ont réservé avec TheFork ou payé avec TheFork Pay peuvent publier des notes et des avis.
                        </p>
                        <a href="#" className="small fw-bold text-dark text-decoration-underline mt-1 d-inline-block">
                            Comment les notes sont-elles calculées ?
                        </a>
                    </div>
                </div>
            </div>

            {/* 2. Events Block (if any) */}
            {eventList.length > 0 && (
                <div className="d-flex flex-column gap-3">
                    <h5 className="fw-bold mb-0 ps-2 border-start border-4 border-primary">Événements à venir</h5>
                    {eventList.map((event) => (
                        <div key={event.id} className={`${styles.infoPanel} theme-hover-card`}>
                            <div className="p-3 d-flex gap-3 align-items-center">
                                <div className="bg-light rounded-3 p-3 text-center" style={{ minWidth: '80px' }}>
                                    <BsCalendarEvent className="text-primary h5 mb-1" />
                                    <div className="fw-bold small text-dark">
                                        {new Date(event.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                                    </div>
                                </div>
                                <div>
                                    <h6 className="fw-bold mb-1">{event.name}</h6>
                                    <p className="text-muted small mb-0 line-clamp-1">{event.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 3. Reviews List */}
            <div className="d-flex flex-column gap-3">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className={styles.reviewCard}>
                            {/* Header */}
                            <div className={styles.reviewHeader}>
                                <div className={styles.reviewerInfo}>
                                    <div className={styles.reviewerAvatar}>
                                        {/* Initialize with First Letter or Icon */}
                                        <span className="fw-bold">C</span>
                                    </div>
                                    <div className="d-flex flex-column">
                                        <span className={styles.reviewerName}>Client LeBonResto</span>
                                        <span className={styles.reviewDate}>Il y a 2 jours • A dîné en couple</span>
                                    </div>
                                </div>
                                <div className={styles.reviewRatingBadge}>
                                    {renderStars(review.rating)}
                                </div>
                            </div>

                            {/* Content */}
                            <div className={styles.reviewBody}>
                                <p className={styles.reviewComment}>{review.comment}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-5 text-muted">
                        <p>Aucun avis pour le moment.</p>
                    </div>
                )}
            </div>

        </div>
    );
}
