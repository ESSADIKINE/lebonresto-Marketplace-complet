'use client';

import React from 'react';
import Link from 'next/link';
import { BsCalendarEvent } from 'react-icons/bs';

export default function RestaurantEvents({ events = [] }) {
    if (!events || events.length === 0) return null;

    return (
        <div className="card border-0 rounded-4 shadow-sm mb-4 bg-primary bg-opacity-10">
            <div className="card-body p-4">
                <h5 className="fw-bold mb-4 text-primary"><BsCalendarEvent className="me-2" /> Événements à venir</h5>

                <div className="row g-3">
                    {events.map((event) => {
                        const date = new Date(event.start_date || event.event_date);
                        return (
                            <div className="col-md-6" key={event.id}>
                                <div className="bg-white rounded-3 p-3 shadow-sm h-100">
                                    <div className="d-flex align-items-center mb-2">
                                        <div className="badge bg-danger me-2">
                                            {date.getDate()} {date.toLocaleString('fr-FR', { month: 'short' })}
                                        </div>
                                        {event.is_promo && <div className="badge bg-warning text-dark me-2">Promo</div>}
                                    </div>
                                    <h6 className="fw-bold mb-1">{event.title}</h6>
                                    <p className="text-muted small mb-0 line-clamp-2">{event.description}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
