'use client';
import React from 'react';
import { BsBell, BsCalendar, BsInfoCircle, BsCheckCircle } from 'react-icons/bs';
import { useGetMyNotificationsQuery, useMarkNotificationAsSeenMutation } from '../../../store/api/notificationsApi';
import Link from 'next/link';
import { PageLoader } from '../../../components/ui/PageLoader';

export default function NotificationsPage() {
    const { data: notifications, isLoading, error } = useGetMyNotificationsQuery();
    const [markAsSeen] = useMarkNotificationAsSeenMutation();

    if (isLoading) return <div className="py-5 text-center"><div className="spinner-border text-primary" role="status"></div></div>;

    if (error) {
        return (
            <div className="alert alert-danger" role="alert">
                Une erreur est survenue lors du chargement des notifications.
            </div>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('fr-FR', {
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const getIconByType = (type) => {
        switch (type) {
            case 'success': return <BsCheckCircle className="text-success" size={24} />;
            case 'info': return <BsInfoCircle className="text-info" size={24} />;
            case 'reminder': return <BsCalendar className="text-warning" size={24} />;
            default: return <BsBell className="text-primary" size={24} />;
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Notifications</h4>
            </div>

            {(!notifications || notifications.length === 0) ? (
                <div className="text-center py-5 bg-white rounded-4 shadow-sm border border-light">
                    <div className="mb-3 text-muted display-4 opacity-25"><BsBell /></div>
                    <h5 className="fw-bold text-dark">Aucune notification</h5>
                    <p className="text-muted mb-0">Vous n'avez pas de nouvelles notifications pour le moment.</p>
                </div>
            ) : (
                <div className="d-flex flex-column gap-3">
                    {notifications.map((notification) => (
                        <Link
                            key={notification.id}
                            href={`/profile/notifications/${notification.id}`}
                            className="text-decoration-none"
                            onClick={() => !notification.seen && markAsSeen(notification.id)}
                        >
                            <div className={`card border-0 shadow-sm hover-shadow transition-all ${!notification.seen ? 'bg-white border-start border-4 border-primary' : 'bg-light'}`} style={{ borderRadius: '12px' }}>
                                <div className="card-body p-4">
                                    <div className="d-flex gap-3">
                                        <div className="flex-shrink-0 mt-1">
                                            {getIconByType(notification.type)}
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="d-flex justify-content-between align-items-start mb-1">
                                                <h6 className={`mb-0 ${!notification.seen ? 'fw-bold text-dark' : 'text-secondary'}`}>
                                                    {notification.title || 'Notification'}
                                                </h6>
                                                {!notification.seen && (
                                                    <span className="badge bg-primary-subtle text-primary rounded-pill px-2" style={{ fontSize: '0.65rem' }}>Nouveau</span>
                                                )}
                                            </div>
                                            <p className={`mb-2 small ${!notification.seen ? 'text-dark' : 'text-muted'}`} style={{ lineHeight: '1.5' }}>
                                                {notification.message}
                                            </p>
                                            <small className="text-muted d-flex align-items-center gap-1" style={{ fontSize: '0.7rem' }}>
                                                <BsCalendar size={10} />
                                                {formatDate(notification.created_at)}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
