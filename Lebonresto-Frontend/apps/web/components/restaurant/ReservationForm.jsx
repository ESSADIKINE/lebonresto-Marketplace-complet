import React, { useState } from 'react';
import { BsCalendarCheck, BsPerson, BsClock, BsChatText } from 'react-icons/bs';

export default function ReservationForm({ restaurantName }) {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        guests: 2,
        name: '',
        email: '',
        phone: '',
        comment: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Réservation demandée pour ${formData.guests} personnes chez ${restaurantName} le ${formData.date} à ${formData.time}`);
        // Later: Call API
    };

    return (
        <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '100px' }}>
            <div className="mb-4 text-center">
                <h4 className="fw-bold mb-1">Réserver une table</h4>
                <p className="text-muted small">Confirmation immédiate</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-12">
                        <label className="form-label small fw-bold text-muted">Date</label>
                        <div className="input-group">
                            <span className="input-group-text bg-light border-end-0"><BsCalendarCheck /></span>
                            <input
                                type="date"
                                className="form-control bg-light border-start-0 ps-0"
                                name="date"
                                required
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="col-6">
                        <label className="form-label small fw-bold text-muted">Heure</label>
                        <div className="input-group">
                            <span className="input-group-text bg-light border-end-0"><BsClock /></span>
                            <select
                                className="form-select bg-light border-start-0 ps-0"
                                name="time"
                                required
                                onChange={handleChange}
                            >
                                <option value="">Choisir</option>
                                <option value="12:00">12:00</option>
                                <option value="12:30">12:30</option>
                                <option value="13:00">13:00</option>
                                <option value="13:30">13:30</option>
                                <option value="19:00">19:00</option>
                                <option value="19:30">19:30</option>
                                <option value="20:00">20:00</option>
                                <option value="20:30">20:30</option>
                                <option value="21:00">21:00</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-6">
                        <label className="form-label small fw-bold text-muted">Couverts</label>
                        <div className="input-group">
                            <span className="input-group-text bg-light border-end-0"><BsPerson /></span>
                            <select
                                className="form-select bg-light border-start-0 ps-0"
                                name="guests"
                                value={formData.guests}
                                onChange={handleChange}
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                    <option key={num} value={num}>{num} pers.</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="col-12">
                        <hr className="my-2 opacity-10" />
                    </div>

                    <div className="col-12">
                        <input
                            type="text"
                            className="form-control bg-light"
                            placeholder="Votre nom complet"
                            name="name"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-12">
                        <input
                            type="email"
                            className="form-control bg-light"
                            placeholder="Email"
                            name="email"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-12">
                        <input
                            type="tel"
                            className="form-control bg-light"
                            placeholder="Téléphone"
                            name="phone"
                            required
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-12">
                        <textarea
                            className="form-control bg-light"
                            rows="2"
                            placeholder="Demande spéciale (allergies, occasion...)"
                            name="comment"
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="col-12 mt-4">
                        <button type="submit" className="btn btn-primary w-100 fw-bold rounded-3 py-3">
                            Confirmer la réservation
                        </button>
                        <p className="text-center text-muted extra-small mt-2 mb-0" style={{ fontSize: '0.75rem' }}>
                            Aucun paiement requis pour réserver
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
}
