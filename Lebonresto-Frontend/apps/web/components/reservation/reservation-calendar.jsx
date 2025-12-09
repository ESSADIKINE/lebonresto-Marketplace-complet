'use client';

import React, { useState, useEffect } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

export default function ReservationCalendar({ onDateSelect, selectedDate, reservedDates = [] }) {
    const [currentDate, setCurrentDate] = useState(new Date());

    // Helper to get days in month
    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

    // Helper to get start day of week (0-6)
    const getFirstDayOfMonth = (year, month) => {
        const day = new Date(year, month, 1).getDay(); // 0 is Sunday
        return day === 0 ? 6 : day - 1; // Convert to Mon=0, Sun=6
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const handlePrevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
    };

    const isSameDay = (d1, d2) => {
        if (!d1 || !d2) return false;
        return d1.getDate() === d2.getDate() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getFullYear() === d2.getFullYear();
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const renderDays = () => {
        const days = [];
        // Empty slots for previous month
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        // Days of current month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isToday = isSameDay(date, today);
            const isSelected = isSameDay(date, selectedDate);
            const isPast = date < today;

            // Should integrate reservedDates logic here to mark full days
            // For now, simple logic

            days.push(
                <button
                    key={day}
                    className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''} ${isPast ? 'disabled' : ''}`}
                    onClick={() => !isPast && onDateSelect(date)}
                    disabled={isPast}
                    type="button"
                >
                    {day}
                </button>
            );
        }
        return days;
    };

    return (
        <div className="reservation-calendar-container bg-white rounded-4 shadow-sm p-4">
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between mb-4">
                <button className="btn btn-icon btn-light rounded-circle btn-sm" onClick={handlePrevMonth} type="button">
                    <BsChevronLeft />
                </button>
                <h5 className="fw-bold mb-0 text-capitalize">{MONTHS[month]} {year}</h5>
                <button className="btn btn-icon btn-light rounded-circle btn-sm" onClick={handleNextMonth} type="button">
                    <BsChevronRight />
                </button>
            </div>

            {/* Days Header */}
            <div className="calendar-grid-header mb-2">
                {DAYS.map(day => (
                    <div key={day} className="text-muted small fw-bold text-center">{day}</div>
                ))}
            </div>

            {/* Days Grid */}
            <div className="calendar-grid">
                {renderDays()}
            </div>

            <style jsx>{`
                .calendar-grid-header, .calendar-grid {
                    display: grid;
                    grid-template-columns: repeat(7, 1fr);
                    gap: 8px;
                }
                .calendar-day {
                    aspect-ratio: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 0;
                    background: transparent;
                    border-radius: 50%;
                    font-weight: 500;
                    font-size: 0.9rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    color: #212529;
                }
                .calendar-day.empty {
                    cursor: default;
                }
                .calendar-day:hover:not(.disabled):not(.selected) {
                    background-color: #f8f9fa;
                    color: var(--bs-primary);
                }
                .calendar-day.selected {
                    background-color: var(--bs-primary);
                    color: white;
                    box-shadow: 0 4px 10px rgba(var(--bs-primary-rgb), 0.3);
                }
                .calendar-day.today {
                    border: 1px solid var(--bs-primary);
                }
                .calendar-day.disabled {
                    color: #dee2e6;
                    cursor: not-allowed;
                }
            `}</style>
        </div>
    );
}
