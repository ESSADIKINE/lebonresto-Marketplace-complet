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
                className="btn btn-sm bg-white border shadow-sm rounded-pill px-3 py-2 d-flex align-items-center dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" class="me-2" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z"></path>
                </svg>
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
            <style jsx>{`
                .dropdown-toggle.show {
                    color: var(--bs-primary) !important;
                    border-color: var(--bs-primary) !important;
                    background-color: white !important;
                }
            `}</style>
        </div>
    );
}
