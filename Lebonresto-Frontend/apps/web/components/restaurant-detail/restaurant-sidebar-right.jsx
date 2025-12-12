import React from 'react';
import dynamic from 'next/dynamic';
import { BsGeoAlt, BsArrowRight } from 'react-icons/bs';
import styles from './restaurant-detail-page.module.css';

// Dynamic import for LeafletMap
const LeafletMap = dynamic(() => import('../listing/LeafletMap'), {
    loading: () => <div className="h-100 w-100 d-flex align-items-center justify-content-center bg-light text-muted">Chargement de la carte...</div>,
    ssr: false
});

export default function RestaurantSidebarRight({ restaurant }) {
    if (!restaurant) return null;



    return (
        <div className="d-flex flex-column gap-4 sticky-top" style={{ top: '20px' }}>

            {/* 1. Map Panel */}
            <div className={`${styles.sidebarPanel} p-0 overflow-hidden`}>
                <div style={{ height: '250px' }}>
                    {restaurant.latitude && restaurant.longitude ? (
                        <LeafletMap restaurants={[restaurant]} fullHeight />
                    ) : (
                        <div className="h-100 w-100 bg-light d-flex align-items-center justify-content-center text-muted">
                            Carte non disponible
                        </div>
                    )}
                </div>
                <div className="p-3 text-center border-top">
                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=${restaurant.latitude},${restaurant.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-link text-decoration-none fw-bold text-dark d-flex align-items-center justify-content-center gap-2"
                    >
                        <BsGeoAlt /> Voir l'itinéraire <BsArrowRight />
                    </a>
                </div>
            </div>



        </div>
    );
}
