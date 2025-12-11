import React, { useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const WEEKDAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

export default function ReservationCalendar({ selectedDate, onDateSelect, reservations = [] }) {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => {
        const day = new Date(year, month, 1).getDay(); // 0=Sun, 1=Mon
        return day === 0 ? 6 : day - 1; // logical Mon=0
    };

    const daysInMonth = getDaysInMonth(currentMonth.getFullYear(), currentMonth.getMonth());
    const firstDay = getFirstDayOfMonth(currentMonth.getFullYear(), currentMonth.getMonth());

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const isToday = (d) => {
        const today = new Date();
        return d === today.getDate() && currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear();
    };

    const isSelected = (d) => {
        if (!selectedDate) return false;
        return d === selectedDate.getDate() && currentMonth.getMonth() === selectedDate.getMonth() && currentMonth.getFullYear() === selectedDate.getFullYear();
    };

    const isAvailable = (day) => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
    };

    const renderDays = () => {
        const slots = [];
        // Empty slots
        for (let i = 0; i < firstDay; i++) {
            slots.push(<div key={`empty-${i}`} className="col p-2"></div>);
        }
        // Days
        for (let day = 1; day <= daysInMonth; day++) {
            const available = isAvailable(day);
            const selected = isSelected(day);
            const today = isToday(day);

            let bgClass = "bg-white text-dark hover-bg-light cursor-pointer";
            if (!available) bgClass = "bg-light text-muted opacity-50 cursor-not-allowed";
            if (selected) bgClass = "bg-primary text-white shadow";
            else if (today) bgClass = "bg-light text-primary fw-bold border border-primary";

            slots.push(
                <div key={day} className="col p-1 text-center">
                    <div
                        className={`p-2 rounded-circle d-flex align-items-center justify-content-center mx-auto ${bgClass}`}
                        style={{ width: '40px', height: '40px', transition: 'all 0.2s', cursor: available ? 'pointer' : 'not-allowed' }}
                        onClick={() => available && onDateSelect(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))}
                    >
                        {day}
                    </div>
                </div>
            );
        }
        return slots;
    };

    return (
        <div className="card border-0 shadow-sm rounded-4 p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
                <button className="btn btn-icon btn-light rounded-circle btn-sm" onClick={handlePrevMonth}><BsChevronLeft /></button>
                <h5 className="fw-bold m-0 text-capitalize">{currentMonth.toLocaleString('fr-FR', { month: 'long', year: 'numeric' })}</h5>
                <button className="btn btn-icon btn-light rounded-circle btn-sm" onClick={handleNextMonth}><BsChevronRight /></button>
            </div>

            <div className="row row-cols-7 g-0 mb-2">
                {WEEKDAYS.map(d => (
                    <div key={d} className="col text-center text-muted small fw-semibold py-2">{d}</div>
                ))}
            </div>

            <div className="row row-cols-7 g-0">
                {renderDays()}
            </div>

            <div className="mt-4 d-flex gap-3 justify-content-center text-xs text-muted">
                <div className="d-flex align-items-center"><span className="bg-primary rounded-circle me-1" style={{ width: 8, height: 8 }}></span> Sélectionné</div>
                <div className="d-flex align-items-center"><span className="border border-primary bg-light rounded-circle me-1" style={{ width: 8, height: 8 }}></span> Aujourd'hui</div>
                <div className="d-flex align-items-center"><span className="bg-light rounded-circle me-1" style={{ width: 8, height: 8 }}></span> Passé</div>
            </div>
        </div>
    );
}
