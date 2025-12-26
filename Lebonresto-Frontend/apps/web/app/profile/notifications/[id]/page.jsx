'use client';

import React, { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetNotificationByIdQuery, useMarkNotificationAsSeenMutation } from '../../../../store/api/notificationsApi';
import { BsArrowLeft, BsBell, BsCalendar, BsCheckCircle, BsInfoCircle, BsTrash } from 'react-icons/bs';

export default function NotificationDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: notification, isLoading, error } = useGetNotificationByIdQuery(id);
    const [markAsSeen] = useMarkNotificationAsSeenMutation();

    // Mark as seen automatically when viewing details
    useEffect(() => {
        if (notification && !notification.seen) {
            markAsSeen(id);
        }
    }, [notification, id, markAsSeen]);

    if (isLoading) {
        return <div className="py-5 text-center"><div className="spinner-border text-primary" role="status"></div></div>;
    }

    if (error || !notification) {
        return (
            <div className="container py-5 text-center">
                <div className="alert alert-danger d-inline-block">
                    Notification introuvable ou erreur de chargement.
                </div>
                <div className="mt-3">
                    <button onClick={() => router.back()} className="btn btn-outline-secondary">
                        <BsArrowLeft className="me-2" /> Retour
                    </button>
                </div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const getIconByType = (type) => {
        switch (type) {
            case 'success': return <BsCheckCircle className="text-success" size={48} />;
            case 'info': return <BsInfoCircle className="text-info" size={48} />;
            case 'reminder': return <BsCalendar className="text-warning" size={48} />;
            default: return <BsBell className="text-primary" size={48} />;
        }
    };

    return (
        <div className="container py-4">
            <div className="mb-4">
                <button
                    onClick={() => router.back()}
                    className="btn btn-link text-decoration-none text-dark p-0 d-flex align-items-center gap-2"
                >
                    <BsArrowLeft size={20} />
                    <span className="fw-medium">Retour aux notifications</span>
                </button>
            </div>

            <div className="card border-0 shadow-lg overflow-hidden rounded-4">
                <div className="card-header bg-white border-0 p-4 pb-0 d-flex justify-content-between align-items-start">
                    <div className="d-flex align-items-center gap-3">
                        <div className="bg-light p-3 rounded-circle">
                            {getIconByType(notification.type)}
                        </div>
                        <div>
                            <h4 className="fw-bold mb-1 text-dark">
                                {notification.title || 'Notification'}
                            </h4>
                            <div className="text-muted small d-flex align-items-center gap-2">
                                <BsCalendar size={12} />
                                {formatDate(notification.created_at)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-body p-4">
                    <div className="bg-light p-4 rounded-3 text-secondary mb-4" style={{ fontSize: '1.05rem', lineHeight: '1.6' }}>
                        {notification.message}
                    </div>

                    {/* Placeholder for future action buttons if needed */}
                    <div className="d-flex justify-content-end gap-2">
                        {/* <button className="btn btn-outline-danger btn-sm d-flex align-items-center gap-2">
                            <BsTrash /> Supprimer
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    );
}
