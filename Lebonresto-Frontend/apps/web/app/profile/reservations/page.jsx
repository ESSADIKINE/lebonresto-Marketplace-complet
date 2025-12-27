'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../../components/auth/AuthProvider';
import { useGetCustomerReservationsQuery } from '../../../store/api';
import { BsCalendarCheck, BsClock, BsPeople, BsGeoAlt, BsArrowRightCircle, BsCalendarX } from 'react-icons/bs';
import PageLoader from '../../../components/ui/PageLoader';

export default function MyReservationsPage() {
    const { user } = useAuth();
    const userId = user?.id || user?.userId;

    const { data: reservations = [], isLoading, error } = useGetCustomerReservationsQuery(userId, {
        skip: !userId
    });

    if (isLoading) return <PageLoader />;

    // Sort reservations: Upcoming first, then by date desc
    const sortedReservations = [...reservations].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    const getStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case 'confirmed':
            case 'confirmée':
                return <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill px-3">Confirmée</span>;
            case 'pending':
            case 'en attente':
                return <span className="badge bg-warning-subtle text-warning-emphasis border border-warning-subtle rounded-pill px-3">En attente</span>;
            case 'cancelled':
            case 'annulée':
                return <span className="badge bg-danger-subtle text-danger border border-danger-subtle rounded-pill px-3">Annulée</span>;
            case 'completed':
            case 'terminée':
                return <span className="badge bg-secondary-subtle text-secondary border border-secondary-subtle rounded-pill px-3">Terminée</span>;
            default:
                return <span className="badge bg-light text-dark border rounded-pill px-3">{status}</span>;
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="container-fluid px-0">
            {/* Header / Hero */}
            <div className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden position-relative">
                <div
                    className="position-absolute w-100 h-100 top-0 start-0"
                    style={{
                        background: 'linear-gradient(135deg, #016B61 0%, #018f81 100%)',
                        zIndex: 0
                    }}
                ></div>
                <div className="card-body py-5 position-relative text-center text-white z-1">
                    <h1 className="fw-bold display-5 mb-2">Mes Réservations</h1>
                    <p className="lead opacity-75 mb-0">Retrouvez l'historique de vos expériences culinaires</p>
                </div>
            </div>

            {/* List */}
            {sortedReservations.length === 0 ? (
                <div className="text-center py-5">
                    <div className="mb-4 text-muted opacity-25">
                        <BsCalendarX size={80} />
                    </div>
                    <h3 className="fw-bold text-muted">Aucune réservation trouvée</h3>
                    <p className="text-muted mb-4">Vous n'avez pas encore effectué de réservation.</p>
                    <Link href="/restaurants" className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm hover-translate">
                        Découvrir des restaurants
                    </Link>
                </div>
            ) : (
                <div className="row g-4">
                    {sortedReservations.map((reservation) => (
                        <div key={reservation.id} className="col-lg-6">
                            <div className="card border-0 shadow-sm rounded-4 h-100 overflow-hidden hover-shadow transition-all">
                                <div className="card-body p-0 d-flex flex-column flex-md-row">
                                    {/* Left: Image (Placeholder or Real) */}
                                    <div
                                        className="bg-light d-flex align-items-center justify-content-center"
                                        style={{
                                            minWidth: '180px',
                                            minHeight: '180px',
                                            backgroundImage: reservation.restaurant?.images?.[0] ? `url(${reservation.restaurant.images[0]})` : undefined,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                    >
                                        {!reservation.restaurant?.images?.[0] && (
                                            <span className="text-muted fw-bold fs-4 text-uppercase">
                                                {reservation.restaurant?.name?.slice(0, 2) || 'RES'}
                                            </span>
                                        )}
                                    </div>

                                    {/* Right: Details */}
                                    <div className="p-4 flex-grow-1 d-flex flex-column justify-content-between">
                                        <div>
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <h5 className="fw-bold mb-0 text-truncate" title={reservation.restaurant?.name}>
                                                    {reservation.restaurant?.name || 'Restaurant Inconnu'}
                                                </h5>
                                                {getStatusBadge(reservation.status)}
                                            </div>

                                            <div className="text-muted small mb-3">
                                                <div className="d-flex align-items-center gap-2 mb-1">
                                                    <BsCalendarCheck className="text-primary" />
                                                    <span className="fw-medium text-dark">{formatDate(reservation.date)}</span>
                                                </div>
                                                <div className="d-flex align-items-center gap-2 mb-1">
                                                    <BsClock className="text-primary" />
                                                    <span>{reservation.time.slice(0, 5)}</span>
                                                </div>
                                                <div className="d-flex align-items-center gap-2">
                                                    <BsPeople className="text-primary" />
                                                    <span>{reservation.guests} personne{reservation.guests > 1 ? 's' : ''}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-end mt-3 border-top pt-3">
                                            <Link
                                                href={`/restaurants/${reservation.restaurant_id}`}
                                                className="btn btn-sm btn-outline-primary rounded-pill px-3 d-flex align-items-center gap-2"
                                            >
                                                Voir le restaurant
                                                <BsArrowRightCircle />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
