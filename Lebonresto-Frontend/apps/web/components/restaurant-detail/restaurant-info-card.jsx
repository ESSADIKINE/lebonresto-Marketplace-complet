import React from 'react';
import { BsStarFill, BsGeoAlt, BsClock, BsCircleFill } from 'react-icons/bs';
import styles from './restaurant-detail-page.module.css';

export default function RestaurantInfoCard({ restaurant, summary }) {
    if (!restaurant) return null;

    const {
        name,
        address,
        city,
        rating_avg,
        rating_count,
        price_range = '€€-€€€',
        description,
        status, // premium, standard, etc.
        tagsData,
        category,
    } = restaurant;

    const isPremium = status?.toLowerCase() === 'premium';
    const horaires = restaurant.horaires_json || [];

    // 1. Get Today Schedule
    const now = new Date();
    // JS getDay(): 0=Sun, 1=Mon...6=Sat. API day_of_week: 1=Mon...7=Sun.
    const currentDayApiValue = now.getDay() === 0 ? 7 : now.getDay();
    const todaySchedule = horaires.find(h => h.day_of_week === currentDayApiValue);

    // 2. Calculate Status
    let isOpenNow = false;
    let timeString = "Horaires non disponibles";

    if (todaySchedule && !todaySchedule.is_closed) {
        // Parse Open/Close Times (HH:mm:ss -> Date objects for comparison)
        const parseTime = (timeStr) => {
            if (!timeStr) return null;
            const [hours, minutes] = timeStr.split(':').map(Number);
            const date = new Date(now);
            date.setHours(hours, minutes, 0, 0);
            return date;
        };

        const openTime = parseTime(todaySchedule.open_time);
        const closeTime = parseTime(todaySchedule.close_time);

        // Handle closing likely being "next day" if closeTime < openTime (e.g. 19:00 - 02:00)
        // For simplicity, let's assume closeTime is same day unless strictly smaller. 
        // If close time is 00:00, usually handled as 24:00 or next day.
        // Assuming strict "between" check for now as requested.

        // Check Break
        const breakStart = parseTime(todaySchedule.break_start);
        const breakEnd = parseTime(todaySchedule.break_end);

        const currentTime = now;

        // Adjust closeTime for next day crossover if needed (e.g. 00:00 or 02:00)
        if (closeTime < openTime) {
            closeTime.setDate(closeTime.getDate() + 1);
        }

        // Check if currently open
        let isDuringBreak = false;
        if (breakStart && breakEnd && currentTime >= breakStart && currentTime < breakEnd) {
            isDuringBreak = true;
        }

        if (currentTime >= openTime && currentTime < closeTime && !isDuringBreak) {
            isOpenNow = true;
        }

        // Format Display String
        const formatH = (t) => t ? t.slice(0, 5) : '';
        timeString = `${formatH(todaySchedule.open_time)} - ${formatH(todaySchedule.close_time)}`;
        if (todaySchedule.break_start && todaySchedule.break_end) {
            timeString += ` (Pause: ${formatH(todaySchedule.break_start)} - ${formatH(todaySchedule.break_end)})`;
        }
    } else {
        timeString = "Fermé toute la journée";
    }

    return (
        <div className={`${styles.infoPanel} h-100 d-flex flex-column`}>
            {/* Header: Title, Rating, Category */}
            <div className="mb-3">
                <div className="d-flex align-items-center flex-wrap gap-2 mb-2">
                    {isPremium && (
                        <span className="badge bg-warning text-dark fw-bold text-uppercase d-flex align-items-center gap-1" style={{ fontSize: '0.7rem' }}>
                            <BsStarFill size={10} /> Premium
                        </span>
                    )}
                    <span className="badge bg-light text-primary border border-primary border-opacity-10">
                        {category?.name || 'Restaurant'}
                    </span>
                </div>

                <h1 className={`${styles.title} mb-2`}>{name}</h1>

                <div className="d-flex align-items-center gap-3 text-muted small">
                    <div className={styles.ratingBadge}>
                        <span className="text-warning"><BsStarFill size={14} /></span>
                        <span>{typeof rating_avg === 'number' ? rating_avg : 'N/A'}</span>
                        <span className="text-muted fw-normal">({rating_count || 0} avis)</span>
                    </div>
                    <span>•</span>
                    <div className="fw-medium text-dark bg-light px-2 py-0 rounded border">
                        {price_range}
                    </div>
                </div>
            </div>

            {/* Location */}
            <div className="d-flex align-items-start gap-2 text-muted mb-3">
                <BsGeoAlt className="flex-shrink-0 mt-1 text-primary" />
                <span>
                    {address}, <span className="fw-medium text-dark">{city?.name}</span>
                </span>
            </div>

            {/* Description */}
            <p className="text-muted small line-clamp-3 mb-4 flex-grow-1">
                {description || "Découvrez une expérience culinaire unique dans un cadre chaleureux et accueillant."}
            </p>

            {/* Tags */}
            {tagsData && tagsData.length > 0 && (
                <div className="d-flex flex-wrap gap-2 mb-4">
                    {tagsData.slice(0, 5).map((tag, idx) => (
                        <span key={idx} className={styles.chip}>
                            {tag.name}
                        </span>
                    ))}
                </div>
            )}

            {/* Opening Status Footer */}
            <div className="mt-auto pt-3 border-top d-flex align-items-center justify-content-between small">
                <div className="d-flex align-items-center gap-2">
                    <BsCircleFill size={8} className={isOpenNow ? 'text-success' : 'text-danger'} />
                    <span className={`${styles.statusIndicator} ${isOpenNow ? 'text-success' : 'text-danger'}`}>
                        {isOpenNow ? 'Ouvert maintenant' : 'Fermé'}
                    </span>
                </div>
                {/* Dynamic Hours Display */}
                <div className="d-flex align-items-center gap-1 text-muted">
                    <BsClock />
                    <span>Aujourd'hui: <span className="fw-medium text-dark">{timeString}</span></span>
                </div>
            </div>
        </div>
    );
}
