import React from 'react';
import { BsGeoAlt, BsArrowRight, BsTelephone, BsEnvelope } from 'react-icons/bs';
import styles from './restaurant-detail-page.module.css';

export default function RestaurantSidebarRight({ restaurant }) {
    if (!restaurant) return null;

    // 1. Resolve Embed URL (Strict Mode: No coords fallback)
    let embedUrl = null;
    const isValidEmbed = restaurant.google_maps_embed_url &&
        (restaurant.google_maps_embed_url.startsWith('https://www.google.com/maps/embed') ||
            restaurant.google_maps_embed_url.startsWith('https://www.google.ma/maps/embed'));

    if (isValidEmbed) {
        embedUrl = restaurant.google_maps_embed_url;
    }



    return (
        <div className="d-flex flex-column gap-4 sticky-top" style={{ top: '20px' }}>

            {/* 1. Map Panel */}
            <div className={`${styles.sidebarPanel} p-0 overflow-hidden shadow-sm border-0`} style={{ borderRadius: '12px' }}>
                <div style={{ height: '320px', width: '100%', position: 'relative', backgroundColor: '#f8f9fa' }}>
                    {embedUrl ? (
                        <iframe
                            src={embedUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title={`Carte de ${restaurant.name}`}
                        />
                    ) : (
                        <div className="h-100 w-100 d-flex align-items-center justify-content-center text-muted small p-4">
                            <div className="text-center">
                                <BsGeoAlt size={32} className="mb-3 opacity-25" />
                                <h6 className="fw-bold mb-1">Localisation indisponible</h6>
                                <p className="mb-0 text-secondary opacity-75" style={{ fontSize: '0.85rem' }}>
                                    Le lien Google Maps n’est pas renseigné pour ce restaurant.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Restaurant Contact Info */}
                <div className="p-4 bg-white">
                    <div className="d-flex flex-column gap-3">
                        {/* Address */}
                        {restaurant.address && (
                            <div className="d-flex align-items-start gap-3">
                                <div className="mt-1 text-primary">
                                    <BsGeoAlt size={18} />
                                </div>
                                <div>
                                    <h6 className="fw-bold mb-1" style={{ fontSize: '0.9rem' }}>Adresse</h6>
                                    <p className="mb-0 text-muted small" style={{ lineHeight: '1.4' }}>
                                        {restaurant.address}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Phone */}
                        {restaurant.phone && (
                            <div className="d-flex align-items-start gap-3">
                                <div className="mt-1 text-primary">
                                    <BsTelephone size={18} />
                                </div>
                                <div>
                                    <h6 className="fw-bold mb-1" style={{ fontSize: '0.9rem' }}>Téléphone</h6>
                                    <p className="mb-0 text-muted small">
                                        <a href={`tel:${restaurant.phone}`} className="text-decoration-none text-muted hover-primary">
                                            {restaurant.phone}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Email */}
                        {restaurant.email && (
                            <div className="d-flex align-items-start gap-3">
                                <div className="mt-1 text-primary">
                                    <BsEnvelope size={18} />
                                </div>
                                <div>
                                    <h6 className="fw-bold mb-1" style={{ fontSize: '0.9rem' }}>Email</h6>
                                    <p className="mb-0 text-muted small">
                                        <a href={`mailto:${restaurant.email}`} className="text-decoration-none text-muted hover-primary">
                                            {restaurant.email}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}
