'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateReservationMutation, useGetRestaurantReservationsQuery } from '../../store/api';
import ReservationCalendar from './ReservationCalendar';
import { BsClock, BsPerson, BsCheckCircle } from 'react-icons/bs';

const TIME_SLOTS = [];
for (let h = 12; h <= 23; h++) {
    TIME_SLOTS.push(`${h}:00`);
    TIME_SLOTS.push(`${h}:30`);
}

export default function ReservationForm({ restaurant }) {
    const router = useRouter();
    const [step, setStep] = useState(1); // 1: Date/Time, 2: Details, 3: Success
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');
    const [guests, setGuests] = useState(2);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        notes: ''
    });

    // curl -X POST "http://localhost:3000/reservations"
    const [createReservation, { isLoading }] = useCreateReservationMutation();
    const { data: existingReservations } = useGetRestaurantReservationsQuery(restaurant.id);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        setSelectedTime(''); // Reset time on date change
    };

    const isSlotTaken = (time) => {
        // Basic check: if any reservation matches selectedDate + time
        if (!existingReservations) return false;
        // Logic to compare ISO strings or parts
        // This is simplified. Real app needs check against duration etc.
        return false;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Combine date and time
        // Note: This constructs local time. Backend should handle timezone or we send ISO.
        const dateStr = selectedDate.toLocaleDateString('en-CA'); // YYYY-MM-DD
        const dateTimeStr = `${dateStr}T${selectedTime}:00`;
        const dateTime = new Date(dateTimeStr);

        try {
            await createReservation({
                restaurant_id: restaurant.id,
                customer_id: 1, // Mock or from auth context if available
                reservation_time: dateTime.toISOString(),
                guest_count: guests,
                special_requests: formData.notes,
                // Add contact info if backend supports guest checkout fields in body
                // status: 'pending'
            }).unwrap();
            setStep(3);
        } catch (err) {
            console.error(err);
            alert("Erreur lors de la réservation. Veuillez réessayer.");
        }
    };

    if (step === 3) {
        return (
            <div className="text-center py-5">
                <div className="mb-4 text-success"><BsCheckCircle size={60} /></div>
                <h2 className="fw-bold mb-3">Réservation Confirmée !</h2>
                <p className="text-muted mb-4">Un email de confirmation vous a été envoyé.</p>
                <div className="d-flex justify-content-center gap-3">
                    <button onClick={() => router.push('/')} className="btn btn-light rounded-pill px-4">Accueil</button>
                    <button onClick={() => router.push(`/restaurants/${restaurant.id}`)} className="btn btn-primary rounded-pill px-4">Retour au restaurant</button>
                </div>
            </div>
        );
    }

    return (
        <div className="row g-4">
            {/* Left: Calendar & Time */}
            <div className="col-lg-7">
                <h4 className="fw-bold mb-4">1. Choisissez une date et une heure</h4>
                <ReservationCalendar
                    selectedDate={selectedDate}
                    onDateSelect={handleDateSelect}
                    reservations={existingReservations}
                />

                {selectedDate && (
                    <div className="mt-4">
                        <h6 className="fw-bold mb-3"><BsClock className="me-2" />Horaires disponibles pour le {selectedDate.toLocaleDateString('fr-FR')}</h6>
                        <div className="d-flex flex-wrap gap-2">
                            {TIME_SLOTS.map(time => (
                                <button
                                    key={time}
                                    className={`btn btn-sm px-3 rounded-pill ${selectedTime === time ? 'btn-primary' : 'btn-outline-secondary border-0 bg-light text-dark'}`}
                                    onClick={() => setSelectedTime(time)}
                                    disabled={isSlotTaken(time)}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                        {!selectedTime && <p className="text-danger small mt-2">Veuillez sélectionner une heure.</p>}
                    </div>
                )}
            </div>

            {/* Right: Details Form */}
            <div className="col-lg-5">
                <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: 100 }}>
                    <h4 className="fw-bold mb-3">2. Vos coordonnées</h4>

                    <div className="mb-3">
                        <label className="form-label small fw-bold">Nombre de personnes</label>
                        <div className="d-flex align-items-center bg-light rounded-pill p-1 border">
                            <button type="button" className="btn btn-sm rounded-circle btn-light shadow-none" onClick={() => setGuests(Math.max(1, guests - 1))}>-</button>
                            <span className="flex-grow-1 text-center fw-bold">{guests} personnes</span>
                            <button type="button" className="btn btn-sm rounded-circle btn-light shadow-none" onClick={() => setGuests(guests + 1)}>+</button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <input type="text" className="form-control rounded-pill bg-light border-0 px-3" placeholder="Prénom" value={formData.first_name} onChange={e => setFormData({ ...formData, first_name: e.target.value })} required />
                        </div>
                        <div className="mb-2">
                            <input type="text" className="form-control rounded-pill bg-light border-0 px-3" placeholder="Nom" value={formData.last_name} onChange={e => setFormData({ ...formData, last_name: e.target.value })} required />
                        </div>
                        <div className="mb-2">
                            <input type="email" className="form-control rounded-pill bg-light border-0 px-3" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                        </div>
                        <div className="mb-2">
                            <input type="tel" className="form-control rounded-pill bg-light border-0 px-3" placeholder="Téléphone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} required />
                        </div>
                        <div className="mb-3">
                            <textarea className="form-control rounded-4 bg-light border-0 px-3 py-2" rows="2" placeholder="Demandes spéciales (allergies, occasion...)" value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })}></textarea>
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary rounded-pill py-3 fw-bold shadow-sm" disabled={!selectedTime || isLoading}>
                                {isLoading ? 'Confirmation...' : 'Confirmer la réservation'}
                            </button>
                        </div>
                        <p className="text-center text-muted text-xs mt-3 mb-0">Aucun paiement requis pour réserver.</p>
                    </form>
                </div>
            </div>
        </div>
    );
}
