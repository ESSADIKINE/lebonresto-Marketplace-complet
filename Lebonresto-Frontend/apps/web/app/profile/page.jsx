'use client';
import React from 'react';
import { useAuth } from '../../components/auth/AuthProvider';

export default function ProfilePage() {
    const { user } = useAuth();

    return (
        <div className="container py-5 mt-5">
            <div className="card shadow-sm border-0">
                <div className="card-body p-5 text-center">
                    <h2 className="mb-4">Mon Profil</h2>
                    <div className="mb-4">
                        <div className="bg-light-primary text-primary rounded-circle d-flex align-items-center justify-content-center mx-auto fw-bold" style={{ width: 100, height: 100, fontSize: '2.5rem' }}>
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                    </div>
                    <h4>{user?.name}</h4>
                    <p className="text-muted">{user?.email}</p>
                    <div className="mt-4">
                        <span className="badge bg-success">Compte Vérifié</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
