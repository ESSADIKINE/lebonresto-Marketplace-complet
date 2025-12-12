'use client';

import React, { useState } from 'react';
import { BsFileEarmarkPdf, BsCalendarEvent, BsCupHot } from 'react-icons/bs';
import styles from './restaurant-detail-page.module.css';

import RestaurantHoursTab from './restaurant-hours-tab'; // New Import
import { IoMdClose } from 'react-icons/io';
import RestaurantReviewsFeed from './restaurant-reviews-feed';

export default function RestaurantContentTabs({ menus, plats, events, horaires, feedback, summary }) {
    const [activeTab, setActiveTab] = useState('avis');
    const [selectedPdf, setSelectedPdf] = useState(null);

    // Safe fallbacks
    const menusList = menus || [];
    const platsList = plats || [];
    const eventsList = events || [];
    const horairesList = horaires || [];

    const handleMenuClick = (e, pdfUrl) => {
        e.preventDefault();
        setSelectedPdf(pdfUrl);
    };

    const closePdfModal = () => {
        setSelectedPdf(null);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'menus':
                return (
                    <div className={styles.eventsGrid}>
                        {menusList.length > 0 ? (
                            menusList.map((menu) => (
                                <a
                                    key={menu.id}
                                    href={menu.pdf_url}
                                    onClick={(e) => handleMenuClick(e, menu.pdf_url)}
                                    className={styles.menuCard}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <div className={styles.menuIconContainer}>
                                        <BsFileEarmarkPdf size={24} />
                                    </div>
                                    <h6 className={styles.menuTitle}>{menu.title}</h6>
                                    <p className={styles.menuDesc}>{menu.description || 'Voir le menu PDF'}</p>
                                    <div className={styles.menuAction}>
                                        VOIR LE MENU
                                    </div>
                                </a>
                            ))
                        ) : (
                            <div className="text-center py-5 text-muted bg-light rounded-3 col-span-full" style={{ gridColumn: '1 / -1' }}>
                                <BsFileEarmarkPdf size={32} className="mb-2 opacity-50" />
                                <p className="mb-0">Aucun menu disponible pour le moment.</p>
                            </div>
                        )}
                    </div>
                );
            case 'plats':
                return (
                    <div className={styles.eventsGrid}>
                        {platsList.length > 0 ? (
                            platsList.map((plat) => (
                                <div key={plat.id} className={styles.platCard}>
                                    {/* Background Image */}
                                    <img
                                        src={plat.image || plat.image_url || '/placeholder-food.jpg'}
                                        alt={plat.name}
                                        className={styles.platBgImage}
                                    />

                                    {/* Overlay */}
                                    <div className={styles.platOverlay}></div>

                                    {/* Premium Badge */}
                                    {plat.is_premium && (
                                        <div className={styles.premiumBadge}>
                                            Premium
                                        </div>
                                    )}

                                    {/* Price Badge */}
                                    {plat.price && (
                                        <div className={styles.platPriceBadge}>
                                            {plat.price} <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>MAD</span>
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className={styles.platContent}>
                                        <h6 className={styles.platTitle}>{plat.name}</h6>
                                        <p className={styles.platDesc}>{plat.description}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-5 text-muted bg-light rounded-3 col-span-full" style={{ gridColumn: '1 / -1' }}>
                                <BsCupHot size={32} className="mb-2 opacity-50" />
                                <p className="mb-0">La carte n'est pas encore disponible.</p>
                            </div>
                        )}
                    </div>
                );
            case 'events':
                return (
                    <div className={styles.eventsGrid}>
                        {eventsList.length > 0 ? (
                            eventsList.map((event) => {
                                // Determine Dates
                                const startDate = event.promo_start_at ? new Date(event.promo_start_at) : new Date(event.date || event.event_date);
                                const endDate = event.promo_end_at ? new Date(event.promo_end_at) : null;
                                const now = new Date();

                                // Determine Status
                                let statusLabel = '';
                                let statusClass = '';

                                if (endDate) {
                                    if (now < startDate) {
                                        statusLabel = 'Bientôt';
                                        statusClass = styles.statusUpcoming;
                                    } else if (now >= startDate && now <= endDate) {
                                        statusLabel = 'En cours';
                                        statusClass = styles.statusActive;
                                    } else {
                                        statusLabel = 'Terminé';
                                        statusClass = styles.statusEnded;
                                    }
                                } else {
                                    // Single date event
                                    if (now < startDate) {
                                        statusLabel = 'À venir';
                                        statusClass = styles.statusUpcoming;
                                    } else {
                                        statusLabel = 'À venir';
                                        statusClass = styles.statusUpcoming;
                                        if (startDate < now) {
                                            statusLabel = 'Passé';
                                            statusClass = styles.statusEnded;
                                        }
                                    }
                                }

                                // Format Date Range
                                const formatDate = (date) => date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
                                const dateDisplay = endDate
                                    ? `Du ${formatDate(startDate)} au ${formatDate(endDate)}`
                                    : `Le ${formatDate(startDate)}`;

                                return (
                                    <div key={event.id} className={styles.eventCard}>
                                        {/* Background Image */}
                                        <img
                                            src={event.image || event.image_url || '/placeholder-event.jpg'}
                                            alt={event.name || event.title}
                                            className={styles.eventBgImage}
                                        />

                                        {/* Overlay */}
                                        <div className={styles.eventOverlay}></div>

                                        {/* Status Badge */}
                                        <div className={`${styles.statusBadge} ${statusClass}`}>
                                            {statusLabel}
                                        </div>

                                        {/* Promo Badge if applicable */}
                                        {event.is_promo && (
                                            <div className={styles.promoBadge}>
                                                PROMO -{event.discount_percentage}%
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className={styles.eventContent}>
                                            <div className={styles.eventDateRange}>
                                                <BsCalendarEvent size={12} />
                                                {dateDisplay}
                                            </div>
                                            <h6 className={styles.eventTitle}>{event.name || event.title}</h6>
                                            <p className={styles.eventDesc}>{event.description}</p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center py-5 text-muted bg-light rounded-3 col-span-full" style={{ gridColumn: '1 / -1' }}>
                                <BsCalendarEvent size={32} className="mb-2 opacity-50" />
                                <p className="mb-0">Aucun événement à venir.</p>
                            </div>
                        )}
                    </div>
                );
            case 'horaires':
                return <RestaurantHoursTab horaires={horairesList} />;
            case 'avis':
                return (
                    <RestaurantReviewsFeed
                        feedback={feedback}
                        summary={summary}
                        events={[]} /* Pass empty events to avoid duplication */
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white border rounded-4 p-4 mb-4 shadow-sm">
            {/* Tabs Header */}
            <div className="d-flex align-items-center gap-2 mb-4 border-bottom pb-3 overflow-auto scrollbar-hide">
                <button
                    onClick={() => setActiveTab('avis')}
                    className={`btn rounded-pill px-4 fw-bold ${activeTab === 'avis' ? 'btn-primary' : 'btn-light bg-white border'}`}
                >
                    Avis
                </button>
                <button
                    onClick={() => setActiveTab('menus')}
                    className={`btn rounded-pill px-4 fw-bold ${activeTab === 'menus' ? 'btn-primary' : 'btn-light bg-white border'}`}
                >
                    Menus
                </button>
                <button
                    onClick={() => setActiveTab('events')}
                    className={`btn rounded-pill px-4 fw-bold ${activeTab === 'events' ? 'btn-primary' : 'btn-light bg-white border'}`}
                >
                    Événements
                </button>
                <button
                    onClick={() => setActiveTab('plats')}
                    className={`btn rounded-pill px-4 fw-bold ${activeTab === 'plats' ? 'btn-primary' : 'btn-light bg-white border'}`}
                >
                    Plats
                </button>
                <button
                    onClick={() => setActiveTab('horaires')}
                    className={`btn rounded-pill px-4 fw-bold ${activeTab === 'horaires' ? 'btn-primary' : 'btn-light bg-white border'}`}
                >
                    Horaires
                </button>
            </div>

            {/* Content Area */}
            <div>
                {renderContent()}
            </div>

            {/* PDF Modal */}
            {selectedPdf && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    zIndex: 1050,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }} onClick={closePdfModal}>
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '900px',
                        height: '85vh',
                        backgroundColor: '#fff',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column'
                    }} onClick={e => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                            <h5 className="mb-0 fw-bold">Menu</h5>
                            <button onClick={closePdfModal} className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center">
                                <IoMdClose size={24} />
                            </button>
                        </div>
                        {/* PDF Viewer */}
                        <div className="flex-grow-1 bg-light">
                            <iframe
                                src={`${selectedPdf}#view=FitH`}
                                title="Menu PDF"
                                width="100%"
                                height="100%"
                                style={{ border: 'none' }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
