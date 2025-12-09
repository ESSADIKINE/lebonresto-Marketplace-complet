'use client';

import React, { useState } from 'react';
import { useCreateReservationMutation, useGetCurrentCustomerQuery } from '../../store/api';
import ReservationCalendar from './reservation-calendar';
import Link from 'next/link';

// Mock Time Slots (normally fetched or generated based on opening hours)
const LUNCH_SLOTS = ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30'];
const DINNER_SLOTS = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'];

export default function ReservationForm({ restaurant }) {
    const { data: customer } = useGetCurrentCustomerQuery();
    const [createReservation, { isLoading }] = useCreateReservationMutation();

    const [selectedDate, setSelectedDate] = useState(new Date()); // Default today
    const [selectedTime, setSelectedTime] = useState(null);
    const [guestCount, setGuestCount] = useState(2);
    const [notes, setNotes] = useState('');
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (!selectedDate || !selectedTime) {
            setErrorMsg("Veuillez sélectionner une date et une heure.");
            return;
        }

        if (!customer) {
            // In a real app, maybe redirect to login or show modal
            setErrorMsg("Vous devez être connecté pour réserver.");
            return;
        }

        try {
            // Construct ISO Date object from Date + Time string
            const [hours, minutes] = selectedTime.split(':');
            const reservationDateTime = new Date(selectedDate);
            reservationDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);

            const payload = {
                restaurant_id: restaurant.id,
                customer_id: customer.id,
                reservation_time: reservationDateTime.toISOString(),
                guest_count: parseInt(guestCount),
                notes: notes
            };

            await createReservation(payload).unwrap();
            setSuccess(true);
            window.scrollTo(0, 0);

        } catch (err) {
            console.error('Reservation failed', err);
            setErrorMsg("Une erreur est survenue lors de la réservation. Veuillez réessayer.");
        }
    };

    if (success) {
        return (
            <div className="card border-0 rounded-4 shadow py-5 px-4 text-center">
                <div className="mb-4 text-success display-1">
                    <i className="bi bi-check-circle-fill"></i>
                </div>
                <h2 className="fw-bold text-success mb-3">Réservation Confirmée !</h2>
                <p className="text-muted mb-4 lead">
                    Votre table chez <strong>{restaurant.name}</strong> a été réservée avec succès.<br />
                    Un email de confirmation vous a été envoyé.
                </p>
                <div className="d-flex gap-3 justify-content-center">
                    <Link href={`/restaurants/${restaurant.id}`} className="btn btn-outline-primary rounded-pill px-4">
                        Retour au restaurant
                    </Link>
                    <Link href="/me/reservations" className="btn btn-primary rounded-pill px-4">
                        Mes réservations
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="row g-4">
            {/* Left Column: Calendar */}
            <div className="col-lg-6">
                <h4 className="fw-bold mb-4">1. Choisissez une date</h4>
                <ReservationCalendar
                    onDateSelect={(date) => {
                        setSelectedDate(date);
                        setSelectedTime(null); // Reset time on date change
                    }}
                    selectedDate={selectedDate}
                />
            </div>

            {/* Right Column: Details */}
            <div className="col-lg-6">
                <form onSubmit={handleSubmit}>
                    <div className="card border-0 rounded-4 shadow-sm h-100">
                        <div className="card-body p-4">
                            <h4 className="fw-bold mb-4">2. Horaires & Détails</h4>

                            {/* Time Slots */}
                            <div className="mb-4">
                                <label className="form-label fw-bold text-muted small">DÉJEUNER</label>
                                <div className="d-flex flex-wrap gap-2 mb-3">
                                    {LUNCH_SLOTS.map(time => (
                                        <button
                                            key={time}
                                            type="button"
                                            className={`btn btn-sm px-3 rounded-pill fw-medium ${selectedTime === time ? 'btn-primary' : 'btn-outline-secondary border-secondary-subtle'}`}
                                            onClick={() => setSelectedTime(time)}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>

                                <label className="form-label fw-bold text-muted small">DÎNER</label>
                                <div className="d-flex flex-wrap gap-2">
                                    {DINNER_SLOTS.map(time => (
                                        <button
                                            key={time}
                                            type="button"
                                            className={`btn btn-sm px-3 rounded-pill fw-medium ${selectedTime === time ? 'btn-primary' : 'btn-outline-secondary border-secondary-subtle'}`}
                                            onClick={() => setSelectedTime(time)}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Guest Count */}
                            <div className="mb-4">
                                <label className="form-label fw-bold">Nombre de personnes</label>
                                <select
                                    className="form-select form-select-lg rounded-3 bg-light border-0"
                                    value={guestCount}
                                    onChange={(e) => setGuestCount(e.target.value)}
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
                                        <option key={num} value={num}>{num} {num === 1 ? 'personne' : 'personnes'}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Notes */}
                            <div className="mb-4">
                                <label className="form-label fw-bold">Demande spéciale (optionnel)</label>
                                <textarea
                                    className="form-control bg-light border-0 rounded-3"
                                    rows="3"
                                    placeholder="Allergies, table calme, anniversaire..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                ></textarea>
                            </div>

                            {/* Error Msg */}
                            {errorMsg && (
                                <div className="alert alert-danger rounded-3 py-2 text-sm text-center mb-3">
                                    {errorMsg}
                                </div>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                className="btn btn-primary w-100 rounded-pill py-3 fw-bold fs-5 shadow-sm"
                                disabled={isLoading || !selectedDate || !selectedTime}
                            >
                                {isLoading ? (
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                ) : 'Confirmer la réservation'}
                            </button>
                            <p className="text-center text-muted small mt-3 mb-0">
                                Aucun prépaiement requis. Confirmation immédiate.
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
