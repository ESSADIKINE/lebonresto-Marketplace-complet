import React from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const pages = [];
    // Simple pagination logic: show all pages if small, or simplified range
    // For now, let's keep it robust but simple:
    for (let i = 1; i <= totalPages; i++) {
        // Show first, last, current, and neighbors
        if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - 1 && i <= currentPage + 1)
        ) {
            pages.push(i);
        } else if (
            (i === currentPage - 2 && currentPage > 3) ||
            (i === currentPage + 2 && currentPage < totalPages - 2)
        ) {
            pages.push('...');
        }
    }

    // Deduplicate ellipses
    const uniquePages = pages.filter((p, i) => p !== pages[i - 1] || typeof p === 'number');

    return (
        <div className="d-flex justify-content-center align-items-center gap-2 mt-5">
            <button
                className="btn btn-white border shadow-sm rounded-circle p-2 d-flex align-items-center justify-content-center"
                style={{ width: '40px', height: '40px' }}
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
            >
                <BsChevronLeft className="text-muted" />
            </button>

            <div className="d-flex align-items-center gap-1 bg-white border shadow-sm rounded-pill p-1 px-2">
                {uniquePages.map((page, idx) => (
                    typeof page === 'number' ? (
                        <button
                            key={idx}
                            onClick={() => onPageChange(page)}
                            className={`btn btn-sm rounded-circle fw-bold d-flex align-items-center justify-content-center ${currentPage === page ? 'btn-primary text-white' : 'btn-light text-muted bg-transparent'}`}
                            style={{ width: '32px', height: '32px' }}
                        >
                            {page}
                        </button>
                    ) : (
                        <span key={idx} className="text-muted px-1 small">...</span>
                    )
                ))}
            </div>

            <button
                className="btn btn-white border shadow-sm rounded-circle p-2 d-flex align-items-center justify-content-center"
                style={{ width: '40px', height: '40px' }}
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
            >
                <BsChevronRight className="text-muted" />
            </button>
        </div>
    );
}
