import React from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';

export default function FilterBar({ onSearch, filters, children }) {
    return (
        <div className="row g-3 mb-4">
            {onSearch && (
                <div className="col-12 col-md-8 col-lg-8">
                    <div className="position-relative">
                        <div className="position-absolute top-50 start-0 translate-middle-y ps-3" style={{ zIndex: 10 }}>
                            <FiSearch className="text-muted" size={18} />
                        </div>
                        <input
                            type="text"
                            className="form-control ps-5 py-2 shadow-sm"
                            placeholder="Search..."
                            onChange={(e) => onSearch(e.target.value)}
                            style={{
                                borderRadius: '0.75rem',
                                border: '2px solid var(--lb-gray-200)',
                                fontSize: '0.9rem',
                                transition: 'all 0.2s ease',
                                backgroundColor: '#ffffff'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = 'var(--lb-primary)';
                                e.target.style.boxShadow = '0 0 0 3px rgba(1, 107, 97, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'var(--lb-gray-200)';
                                e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                            }}
                        />
                    </div>
                </div>
            )}

            {filters && filters.map((filter, index) => (
                <div key={index} className={`col-12 col-md-3 col-lg-2 ${index === 0 ? 'ms-auto' : ''}`}>
                    <div className="position-relative">
                        <div className="position-absolute top-50 start-0 translate-middle-y ps-3" style={{ zIndex: 10, pointerEvents: 'none' }}>
                            <FiFilter className="text-muted" size={16} />
                        </div>
                        <select
                            className="form-select py-2 ps-5 shadow-sm"
                            onChange={(e) => filter.onChange(e.target.value)}
                            defaultValue={filter.defaultValue || ""}
                            style={{
                                borderRadius: '0.75rem',
                                border: '2px solid var(--lb-gray-200)',
                                fontSize: '0.9rem',
                                transition: 'all 0.2s ease',
                                cursor: 'pointer'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = 'var(--lb-primary)';
                                e.target.style.boxShadow = '0 0 0 3px rgba(1, 107, 97, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'var(--lb-gray-200)';
                                e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                            }}
                        >
                            {filter.options.map((opt, i) => (
                                <option key={i} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
            ))}

            {children}
        </div>
    );
}
