'use client';

import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useGetMyReservationsQuery } from '../../../store/api';
import { BsCalendarCheck, BsClock, BsPerson, BsTicketDetailed, BsArrowRight } from 'react-icons/bs';

export default function ReservationsPage() {
    const { user } = useSelector((state) => state.auth);
    // curl -X GET "http://localhost:3000/reservations/me"
    const { data: reservations, isLoading } = useGetMyReservationsQuery(undefined, {
        skip: !user?.id,
    });

    if (isLoading) return <div className="text-center py-5"><span className="spinner-border text-primary"></span></div>;

    if (!reservations || reservations.length === 0) {
        return (
            <div className="text-center py-5">
                <div className="mb-3 text-muted display-1"><BsTicketDetailed /></div>
                <h4>Aucune réservation trouvée</h4>
                <p className="text-muted">Vous n'avez pas encore effectué de réservation.</p>
                <Link href="/restaurants" className="btn btn-primary rounded-pill px-4 mt-2">Explorer les restaurants</Link>
            </div>
        );
    }

    // Sort by date desc
    const sortedReservations = [...reservations].sort((a, b) => new Date(b.reservation_time) - new Date(a.reservation_time));
    const now = new Date();
    const upcoming = sortedReservations.filter(r => new Date(r.reservation_time) >= now);
    const past = sortedReservations.filter(r => new Date(r.reservation_time) < now);

    const ReservationCard = ({ res, isPast }) => {
        const date = new Date(res.reservation_time);

        return (
            <div className={`card mb-3 border-0 shadow-sm ${isPast ? 'opacity-75' : ''}`}>
                <div className="card-body">
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                        <div className="d-flex align-items-center gap-3">
                            <div className={`rounded-circle d-flex align-items-center justify-content-center ${isPast ? 'bg-light text-muted' : 'bg-light-primary text-primary'}`} style={{ width: 60, height: 60 }}>
                                <BsCalendarCheck className="fs-3" />
                            </div>
                            <div>
                                <h5 className="mb-1 fw-bold">{res.restaurant?.name || 'Restaurant inconnu'}</h5>
                                <div className="text-muted small d-flex align-items-center gap-3">
                                    <span className="d-flex align-items-center"><BsClock className="me-1" /> {date.toLocaleDateString()} à {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    <span className="d-flex align-items-center"><BsPerson className="me-1" /> {res.guest_count} pers.</span>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                            <span className={`badge ${res.status === 'confirmed' ? 'bg-success' : res.status === 'pending' ? 'bg-warning text-dark' : 'bg-secondary'} rounded-pill px-3 py-2`}>
                                {res.status === 'confirmed' ? 'Confirmée' : res.status === 'pending' ? 'En attente' : res.status}
                            </span>
                            {res.restaurant_id && (
                                <Link href={`/restaurants/${res.restaurant_id}`} className="btn btn-sm btn-outline-primary rounded-pill">
                                    Voir <BsArrowRight className="ms-1" />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <h4 className="fw-bold mb-4">Mes Réservations</h4>

            {upcoming.length > 0 && (
                <div className="mb-5">
                    <h6 className="text-uppercase text-muted fw-bold mb-3 small">À venir</h6>
                    {upcoming.map(res => <ReservationCard key={res.id} res={res} />)}
                </div>
            )}

            {past.length > 0 && (
                <div>
                    <h6 className="text-uppercase text-muted fw-bold mb-3 small">Historique</h6>
                    {past.map(res => <ReservationCard key={res.id} res={res} isPast />)}
                </div>
            )}
        </div>
    );
}
