'use client';
import React from 'react';
import { BsBell } from 'react-icons/bs';

export default function NotificationsPage() {
    // Scaffold: Empty state
    const notifications = [];

    return (
        <div>
            <h4 className="fw-bold mb-4">Notifications</h4>

            {notifications.length === 0 ? (
                <div className="text-center py-5">
                    <div className="mb-3 text-muted display-1"><BsBell /></div>
                    <h4>Aucune notification</h4>
                    <p className="text-muted">Vous n'avez pas de nouvelles notifications pour le moment.</p>
                </div>
            ) : (
                <ul className="list-group">
                    {/* List notifications here */}
                </ul>
            )}
        </div>
    );
}
