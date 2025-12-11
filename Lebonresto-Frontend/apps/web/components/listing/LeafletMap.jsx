'use client';

import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import { BsShop, BsGeoAltFill } from 'react-icons/bs';
import { normalizeRestaurantData } from '../../lib/restaurantUtils';
import { renderToStaticMarkup } from 'react-dom/server';

// ... (existing imports)

const MapController = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (center) {
            map.setView(center, map.getZoom());
        }
    }, [center, map]);
    return null;
};

// Custom User/Client Icon Definition
const createUserIcon = () => {
    const iconHtml = renderToStaticMarkup(<BsGeoAltFill />);
    return L.divIcon({
        className: 'lb-map-marker-user',
        html: `<div class="lb-map-marker-inner user-location"><span class="lb-map-marker-icon">${iconHtml}</span></div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        popupAnchor: [0, -20]
    });
};

// Custom Restaurant Icon Definition
const createCustomIcon = () => {
    // Generate static markup for the icon inside
    const iconHtml = renderToStaticMarkup(<BsShop />);

    return L.divIcon({
        className: 'lb-map-marker',
        html: `<div class="lb-map-marker-inner"><span class="lb-map-marker-icon">${iconHtml}</span></div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],     // Center the pill/circle
        popupAnchor: [0, -20]     // Popup above
    });
};

export default function LeafletMap({ restaurants, userLocation }) {

    // Filter valid restaurants with numeric coordinates
    const validRestaurants = useMemo(() => {
        if (!restaurants || !Array.isArray(restaurants)) return [];
        return restaurants
            .map(r => normalizeRestaurantData(r))
            .filter(r => r && r.latitude !== 0 && r.longitude !== 0);
    }, [restaurants]);

    // Calculate center
    const defaultCenter = [31.7917, -7.0926]; // Morocco
    const center = useMemo(() => {
        if (userLocation) return [userLocation.lat, userLocation.lng];
        if (validRestaurants.length === 0) return defaultCenter;

        const sumLat = validRestaurants.reduce((acc, r) => acc + r.latitude, 0);
        const sumLng = validRestaurants.reduce((acc, r) => acc + r.longitude, 0);

        return [sumLat / validRestaurants.length, sumLng / validRestaurants.length];
    }, [validRestaurants, userLocation]);

    // Map styles for user marker
    useEffect(() => {
        const style = document.createElement('style');
        style.innerHTML = `
            .lb-map-marker-inner.user-location {
                background-color: #0d6efd; /* Bootstrap primary blue or desired color */
                border-color: #fff;
            }
            .lb-map-marker-inner.user-location .lb-map-marker-icon {
                color: #fff;
            }
        `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);


    return (
        <div style={{ height: '100%', width: '100%', position: 'relative' }}>
            <MapContainer
                center={center}
                zoom={userLocation || validRestaurants.length > 0 ? 13 : 6}
                scrollWheelZoom={true} // Enable scroll zoom
                className="h-100 w-100"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapController center={center} />

                {/* User Location Marker */}
                {userLocation && (
                    <Marker
                        position={[userLocation.lat, userLocation.lng]}
                        icon={createUserIcon()}
                    >
                        <Popup>
                            <div className="p-1 fw-bold text-center">Votre position</div>
                        </Popup>
                    </Marker>
                )}


                {validRestaurants.map((restaurant) => (
                    <Marker
                        key={restaurant.id}
                        position={[restaurant.latitude, restaurant.longitude]}
                        icon={createCustomIcon()}
                    >
                        <Popup closeButton={false} offset={[0, -10]}>
                            <div className="p-2">
                                <h6 className="fw-bold fs-6 mb-1 text-dark">
                                    {restaurant.name}
                                </h6>
                                <p className="mb-1 text-muted" style={{ fontSize: '0.8rem', lineHeight: '1.2' }}>
                                    {restaurant.address}
                                </p>
                                <div className="d-flex justify-content-between align-items-center mt-2">
                                    <span className={`badge ${restaurant.restaurantStatus === 'Fermé' ? 'bg-secondary' : 'bg-success'} bg-opacity-10 text-success border border-success border-opacity-10 px-2 py-1 user-select-none`} style={{ fontSize: '0.7rem' }}>
                                        {restaurant.restaurantStatus || "Ouvert"}
                                    </span>
                                    <Link
                                        href={`/restaurants/${restaurant.id}`}
                                        className="btn btn-sm btn-primary rounded-pill py-0 px-2 fw-medium"
                                        style={{ fontSize: '0.75rem' }}
                                    >
                                        Voir
                                    </Link>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Float Badge */}
            <div className="position-absolute top-0 start-0 m-3 z-3">
                <div className="bg-white px-3 py-2 rounded-pill shadow-sm fs-6 fw-bold text-dark border d-flex align-items-center gap-2">
                    <span className="text-primary"><BsShop /></span>
                    <span>{validRestaurants.length} restaurants, {userLocation ? 'filtrés par distance' : 'sur la carte'}</span>
                </div>
            </div>
        </div>
    );
}
