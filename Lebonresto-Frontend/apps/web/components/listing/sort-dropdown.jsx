'use client';

import React from 'react';
import { BsSortDown } from 'react-icons/bs';

const SORT_OPTIONS = [
    { value: 'recommended', label: 'Recommandés' },
    { value: 'most_reserved', label: 'Les plus réservés' },
    { value: 'rating_desc', label: 'Mieux notés' },
    { value: 'price_asc', label: 'Prix croissant' },
    { value: 'price_desc', label: 'Prix décroissant' },
    { value: 'newest', label: 'Nouveautés' },
];

export default function SortDropdown({ currentSort = 'recommended', onSortChange }) {
    return (
        <div className="dropdown">
            <button
                className="btn btn-white border shadow-sm rounded-pill px-3 py-2 d-flex align-items-center dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <BsSortDown className="me-2" />
                <span className="me-2 text-muted small">Trier par:</span>
                <span className="fw-medium">
                    {SORT_OPTIONS.find(o => o.value === currentSort)?.label || 'Recommandés'}
                </span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg rounded-4 mt-2 p-2">
                {SORT_OPTIONS.map((option) => (
                    <li key={option.value}>
                        <button
                            className={`dropdown-item rounded-3 px-3 py-2 mb-1 ${currentSort === option.value ? 'bg-light text-primary fw-bold' : ''}`}
                            onClick={() => onSortChange(option.value)}
                        >
                            {option.label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
