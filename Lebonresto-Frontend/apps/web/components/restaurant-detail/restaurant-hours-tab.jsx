'use client';

import React from 'react';
import { BsClockHistory, BsInfoCircle } from 'react-icons/bs';
import styles from './restaurant-detail-page.module.css';

export default function RestaurantHoursTab({ horaires }) {
    // Current day mapping: Sunday=0, Monday=1, ..., Saturday=6
    // API data day_of_week: 1=Monday, ..., 7=Sunday
    // Javascript getDay(): 0=Sunday, 1=Monday, ..., 6=Saturday
    // Let's normalize Javascript day to 1-7 (Mon-Sun)
    const today = new Date();
    let currentDayIndex = today.getDay(); // 0-6 (Sun-Sat)
    // Convert to 1-7 (Mon-Sun)
    // Sun(0) -> 7, Mon(1) -> 1, ...
    const todayApiValue = currentDayIndex === 0 ? 7 : currentDayIndex;

    const dayNames = {
        1: 'Lundi',
        2: 'Mardi',
        3: 'Mercredi',
        4: 'Jeudi',
        5: 'Vendredi',
        6: 'Samedi',
        7: 'Dimanche'
    };

    // Safe formatting for time (HH:mm:ss -> HH:mm)
    const formatTime = (timeStr) => {
        if (!timeStr) return '';
        return timeStr.substring(0, 5);
    };

    // Sort function for days (ensure 1-7 order)
    const sortedHours = [...(horaires || [])].sort((a, b) => a.day_of_week - b.day_of_week);

    if (!horaires || horaires.length === 0) {
        return (
            <div className="text-center py-5 text-muted bg-light rounded-3">
                <BsClockHistory size={32} className="mb-2 opacity-50" />
                <p className="mb-0">Les horaires ne sont pas disponibles.</p>
            </div>
        );
    }

    return (
        <div className={styles.hoursContainer}>
            {sortedHours.map((slot) => {
                const isToday = slot.day_of_week === todayApiValue;
                const dayLabel = dayNames[slot.day_of_week] || `Jour ${slot.day_of_week}`;

                return (
                    <div
                        key={slot.id || slot.day_of_week}
                        className={`${styles.hoursRow} ${isToday ? styles.todayRow : ''}`}
                    >
                        {/* Day Label */}
                        <div className={styles.hoursDay}>
                            {dayLabel}
                            {isToday && <span className={styles.todayBadge}>Auj.</span>}
                        </div>

                        {/* Hours / Status */}
                        <div className={styles.hoursTime}>
                            {slot.is_closed ? (
                                <span className={styles.closedLabel}>Fermé</span>
                            ) : (
                                <>
                                    {/* Open Time */}
                                    <div>
                                        {formatTime(slot.open_time)} - {formatTime(slot.close_time)}
                                    </div>

                                    {/* Break Info */}
                                    {slot.break_start && slot.break_end && (
                                        <div className={styles.breakTime}>
                                            Pause : {formatTime(slot.break_start)} - {formatTime(slot.break_end)}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                );
            })}

        </div>
    );
}
