import React from 'react';

export default function AdminCard({ title, children, footer, className = '', actions }) {
    return (
        <div className={`admin-card ${className}`}>
            {(title || actions) && (
                <div className="admin-card-header">
                    {title && <h3 className="admin-card-title">{title}</h3>}
                    {actions && <div>{actions}</div>}
                </div>
            )}
            <div className="admin-card-body">
                {children}
            </div>
            {footer && (
                <div className="admin-card-footer">
                    {footer}
                </div>
            )}
        </div>
    );
}
