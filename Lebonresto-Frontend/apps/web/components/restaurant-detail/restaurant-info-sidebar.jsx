'use client';

import React from 'react';
import { BsClock, BsTelephone, BsGlobe, BsGeoAlt } from 'react-icons/bs';

export default function RestaurantInfoSidebar({ restaurant }) {
    return (
        <div className="card border-0 rounded-4 shadow-sm mb-4">
            <div className="card-body p-4">
                <h5 className="fw-bold mb-4">Informations pratiques</h5>

                {/* Map Placeholder */}
                <div className="map-frame rounded-3 overflow-hidden mb-4" style={{ height: '200px', backgroundColor: '#eee' }}>
                    {/* Integrate real map here later */}
                    <div className="w-100 h-100 d-flex align-items-center justify-content-center text-muted">
                        <BsGeoAlt className="me-2" /> Carte
                    </div>
                </div>

                <div className="d-flex align-items-start mb-3">
                    <div className="icon-box text-primary fs-5 bg-light rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                        <BsGeoAlt />
                    </div>
                    <div>
                        <h6 className="fw-medium mb-1">Adresse</h6>
                        <p className="text-muted text-sm mb-0">{restaurant.address}, {restaurant.city?.name}</p>
                    </div>
                </div>

                <div className="d-flex align-items-start mb-3">
                    <div className="icon-box text-primary fs-5 bg-light rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                        <BsClock />
                    </div>
                    <div>
                        <h6 className="fw-medium mb-1">Horaires</h6>
                        {/* Static for now, usually needs complex parsing of opening_hours JSON */}
                        <p className="text-muted text-sm mb-0">Ouvert aujourd'hui</p>
                        <span className="text-success text-xs fw-bold">12:00 - 23:00</span>
                    </div>
                </div>

                <div className="d-flex align-items-start mb-3">
                    <div className="icon-box text-primary fs-5 bg-light rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                        <BsTelephone />
                    </div>
                    <div>
                        <h6 className="fw-medium mb-1">Téléphone</h6>
                        <p className="text-muted text-sm mb-0">{restaurant.phone || 'Non renseigné'}</p>
                    </div>
                </div>

                {restaurant.website && (
                    <div className="d-flex align-items-start">
                        <div className="icon-box text-primary fs-5 bg-light rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                            <BsGlobe />
                        </div>
                        <div>
                            <h6 className="fw-medium mb-1">Site Web</h6>
                            <a href={restaurant.website} target="_blank" rel="noopener noreferrer" className="text-primary text-sm">Visiter le site</a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
