'use client';

import React from 'react';
import Link from 'next/link';

export default function TopUtilityBar() {
    return (
        <div className="w-100 bg-white border-bottom py-2 d-none d-md-block" style={{ fontSize: '0.85rem' }}>
            <div className="container">
                <div className="d-flex justify-content-end align-items-center gap-3">
                    <Link href="/for-restaurants" className="text-dark text-decoration-none hover-primary fw-medium">
                        Inscrire mon restaurant
                    </Link>
                    <span className="text-muted">|</span>
                    <Link href="/help" className="text-dark text-decoration-none hover-primary fw-medium">
                        Aide
                    </Link>
                </div>
            </div>
        </div>
    );
}
