'use client';

import React from 'react'
import { BsClock, BsCalendarEvent } from 'react-icons/bs'
import Link from 'next/link'
import Image from 'next/image'
import { useGetUpcomingEventsQuery } from '../store/api'

export default function EventOne() {
    const { data: events, isLoading, isError } = useGetUpcomingEventsQuery();

    if (isLoading) {
        return (
            <div className="row align-items-center justify-content-center">
                <div className="col-12 text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !events || events.length === 0) {
        return (
            <div className="row align-items-center justify-content-center">
                <div className="col-12 text-center py-5">
                    <p className="text-muted">Aucun événement à venir pour le moment.</p>
                </div>
            </div>
        );
    }

    // Take first 6 events
    const displayEvents = events.slice(0, 6);

    return (
        <div className="row align-items-center justify-content-center g-4">
            {displayEvents.map((event) => {
                const eventDate = new Date(event.event_date);
                const day = eventDate.getDate();
                const month = eventDate.toLocaleString('fr-FR', { month: 'short' }).toUpperCase();
                const time = eventDate.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

                const placeholderImage = '/assets/img/event-placeholder.jpg';
                const imageUrl = event.image_url || placeholderImage;

                const restaurantObj = Array.isArray(event.restaurant) ? event.restaurant[0] : event.restaurant;

                return (
                    <div className="col-xl-4 col-lg-4 col-md-6" key={event.id}>
                        <div className="eventCard">
                            <Link
                                href={{
                                    pathname: '/restaurants',
                                    query: { id: event.restaurant_id }
                                }}
                                className="d-block ht-auto"
                                aria-label={`View event: ${event.title}`}
                            >
                                <div className="eventThumbs position-relative">
                                    <div className="eventcats position-absolute top-0 end-0 mt-3 me-3 z-1">
                                        <div className="rounded bg-dark text-center py-2 px-4 shadow-sm">
                                            <h4 className="text-light m-0">{day}</h4>
                                            <h6 className="text-light text-md opacity-75 m-0">{month}</h6>
                                        </div>
                                    </div>
                                    <figure className="m-0 overflow-hidden rounded-3 position-relative" style={{ height: '250px' }}>
                                        <Image
                                            src={imageUrl}
                                            className="img-fluid w-100 h-100 object-fit-cover"
                                            alt={event.title}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </figure>
                                    <div className="eventcats position-absolute bottom-0 start-0 mb-3 ms-3 z-1">
                                        <span className="d-flex align-items-center badge bg-primary text-white">
                                            <BsCalendarEvent className="me-1" />
                                            {restaurantObj?.name || 'Restaurant'}
                                        </span>
                                    </div>
                                </div>
                                <div className="eventCaptions mt-3">
                                    <h6 className="lh-base fw-semibold m-0 mb-1 text-dark">{event.title}</h6>
                                    <p className="text-muted small mb-2">
                                        {event.description && event.description.length > 60
                                            ? event.description.substring(0, 60) + '...'
                                            : event.description}
                                    </p>
                                    <p className="text-md m-0 text-primary fw-medium">
                                        <BsClock className="me-1" />{time}
                                        {event.price > 0 && <span className="ms-3 text-dark">{event.price} DH</span>}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
