'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
    BsCalendarEvent,
    BsClock,
    BsPerson,
    BsChevronDown,
    BsSliders,
    BsChevronLeft,
    BsChevronRight
} from 'react-icons/bs';

/**
 * RestaurantFiltersBar
 * A fixed/sticky bar similar to TheFork/OpenTable.
 * 
 * Props:
 * - date: string | null
 * - time: string | null
 * - persons: number (default 2)
 * - quickFilters: Array<{ id, label, icon?, active }>
 * - onOpenDatePicker: () => void
 * - onOpenTimePicker: () => void
 * - onOpenPersonsPicker: () => void
 * - onToggleQuickFilter: (id) => void
 * - onOpenAllFilters: () => void
 */
export default function RestaurantFiltersBar({
    date,
    time = '20:00',
    persons = 2,
    quickFilters = [],
    onOpenDatePicker = () => { },
    onOpenTimePicker = () => { },
    onOpenPersonsPicker = () => { },
    onToggleQuickFilter = () => { },
    onOpenAllFilters = () => { }
}) {
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    // Provide defaults for display
    const displayDate = date ? new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }) : 'Date';
    const displayTime = time || 'Heure';
    const displayPersons = persons ? `${persons} pers.` : '2 pers.';

    // Scroll Logic
    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5); // tolerance
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [quickFilters]); // Re-check if items change

    const scrollBy = (offset) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
            setTimeout(checkScroll, 300); // Check after animation
        }
    };

    return (
        <div className="filters-bar-wrapper w-100 border-bottom">
            <div className="container py-3">
                <div className="row align-items-center gy-3">

                    {/* Row 1: Date / Time / Persons */}
                    <div className="col-12 col-md-auto d-flex gap-2">
                        <button
                            className="filters-pill-btn"
                            onClick={onOpenDatePicker}
                            aria-label="Sélectionner une date"
                        >
                            <BsCalendarEvent size={16} />
                            <span>{displayDate}</span>
                            <BsChevronDown size={12} className="text-muted ms-1" />
                        </button>

                        <button
                            className="filters-pill-btn"
                            onClick={onOpenTimePicker}
                            aria-label="Sélectionner une heure"
                        >
                            <BsClock size={16} />
                            <span>{displayTime}</span>
                            <BsChevronDown size={12} className="text-muted ms-1" />
                        </button>

                        <button
                            className="filters-pill-btn"
                            onClick={onOpenPersonsPicker}
                            aria-label="Sélectionner le nombre de personnes"
                        >
                            <BsPerson size={18} />
                            <span>{displayPersons}</span>
                            <BsChevronDown size={12} className="text-muted ms-1" />
                        </button>

                        {/* Divider only on desktop */}
                        <div className="d-none d-lg-block border-end mx-2 align-self-center" style={{ height: '24px' }}></div>
                    </div>

                    {/* Row 2: All Filters & Quick Chips */}
                    <div className="col-12 col-md d-flex align-items-center gap-3 overflow-hidden">

                        {/* 'All Filters' Button */}
                        <button
                            className="btn btn-outline-primary rounded-pill d-flex align-items-center gap-2 flex-shrink-0 px-3 py-2 fw-medium border-2"
                            onClick={onOpenAllFilters}
                            style={{ fontSize: '0.9rem' }}
                        >
                            <BsSliders size={16} />
                            <span>Filtres</span>
                        </button>

                        {/* Scrollable Chips Area */}
                        <div className="filters-chip-scroll-container flex-grow-1">
                            {/* Left Arrow */}
                            {showLeftArrow && (
                                <button
                                    className="filters-scroll-arrow position-absolute start-0"
                                    onClick={() => scrollBy(-200)}
                                    aria-label="Défiler à gauche"
                                    style={{ left: '-10px' }}
                                >
                                    <BsChevronLeft size={12} />
                                </button>
                            )}

                            {/* Chips List */}
                            <div
                                className="filters-chip-scroll w-100 px-1"
                                ref={scrollRef}
                                onScroll={checkScroll}
                            >
                                {quickFilters.map((filter) => (
                                    <button
                                        key={filter.id}
                                        className={`filter-chip ${filter.active ? 'active' : ''}`}
                                        onClick={() => onToggleQuickFilter(filter.id)}
                                        aria-pressed={filter.active}
                                    >
                                        {filter.icon && <span className="me-2">{filter.icon}</span>}
                                        {filter.label}
                                    </button>
                                ))}

                                {/* Placeholder for empty state */}
                                {quickFilters.length === 0 && (
                                    <span className="text-muted small fst-italic ms-2">Aucun filtre rapide</span>
                                )}
                            </div>

                            {/* Right Arrow */}
                            {showRightArrow && (
                                <button
                                    className="filters-scroll-arrow position-absolute end-0"
                                    onClick={() => scrollBy(200)}
                                    aria-label="Défiler à droite"
                                    style={{ right: '-5px' }}
                                >
                                    <BsChevronRight size={12} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/*
// Integration Example:

// Inside RestaurantListingClient.jsx or parent page:

const [quickFilters, setQuickFilters] = useState([
    { id: 'yums', label: 'Yums acceptés', active: false },
    { id: 'promo', label: 'Promotions', active: true },
    { id: 'new', label: 'Nouveautés', active: false },
    { id: 'italien', label: 'Italien', active: false },
    { id: 'terrasse', label: 'Terrasse', active: false },
]);

const handleToggle = (id) => {
    setQuickFilters(prev => prev.map(f => f.id === id ? { ...f, active: !f.active } : f));
};

<RestaurantFiltersBar
    date={null}
    time="19:30"
    persons={2}
    quickFilters={quickFilters}
    onToggleQuickFilter={handleToggle}
    onOpenDatePicker={() => console.log('Date Picker')}
    onOpenAllFilters={() => console.log('Open Drawer')}
/>
*/
