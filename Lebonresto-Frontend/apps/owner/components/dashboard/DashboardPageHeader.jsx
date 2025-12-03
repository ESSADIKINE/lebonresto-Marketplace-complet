import React from 'react';

export default function AdminPageHeader({ title, subtitle, children }) {
    return (
        <div className="admin-page-header">
            <div>
                <h1 className="admin-page-title">{title}</h1>
                {subtitle && <p className="admin-page-subtitle">{subtitle}</p>}
            </div>
            {children && (
                <div className="mt-3 mt-md-0 d-flex gap-2">
                    {children}
                </div>
            )}
        </div>
    );
}
