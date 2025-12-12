
import React from 'react';
import { BsGeoAlt, BsTelephone, BsClock, BsGlobe } from 'react-icons/bs';

export default function RestaurantInfoSidebar({ restaurant }) {
    if (!restaurant) return null;

    return (
        <div className="d-flex flex-column gap-4">
            {/* Contact Card */}
            <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden">
                <div className="card-body p-4">
                    <h5 className="fw-bold mb-4">Informations</h5>

                    <div className="d-flex flex-column gap-3">
                        {/* Address */}
                        <div className="d-flex align-items-start gap-3">
                            <div className="bg-light rounded-circle p-2 text-primary">
                                <BsGeoAlt size={18} />
                            </div>
                            <div>
                                <h6 className="fw-bold mb-1">Adresse</h6>
                                <p className="text-muted small mb-0">
                                    {restaurant.address || 'Adresse non renseignée'}
                                    <br />
                                    {restaurant.city?.name}
                                </p>
                            </div>
                        </div>

                        {/* Phone */}
                        {restaurant.phone && (
                            <div className="d-flex align-items-start gap-3">
                                <div className="bg-light rounded-circle p-2 text-primary">
                                    <BsTelephone size={18} />
                                </div>
                                <div>
                                    <h6 className="fw-bold mb-1">Téléphone</h6>
                                    <p className="text-muted small mb-0">
                                        {restaurant.phone}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Opening Hours (Placeholder logic) */}
                        <div className="d-flex align-items-start gap-3">
                            <div className="bg-light rounded-circle p-2 text-primary">
                                <BsClock size={18} />
                            </div>
                            <div>
                                <h6 className="fw-bold mb-1">Horaires</h6>
                                <p className={`small mb-0 fw-bold ${restaurant.resturant_status === 'Ouvert' ? 'text-success' : 'text-danger'}`}>
                                    {restaurant.resturant_status || 'Fermé'}
                                </p>
                                <p className="text-muted small mb-0">
                                    09:00 - 23:00 (Est.)
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Placeholder */}
            {restaurant.latitude && restaurant.longitude && (
                <div className="card border-0 rounded-4 shadow-sm bg-white overflow-hidden" style={{ minHeight: '200px' }}>
                    <div className="card-body p-0 position-relative h-100">
                        {/* We can integrate Leaflet here later, for now just a placeholder visual */}
                        <div className="bg-light w-100 h-100 d-flex align-items-center justify-content-center text-muted" style={{ minHeight: '200px' }}>
                            <div className="text-center">
                                <BsGlobe size={32} className="mb-2 opacity-50" />
                                <p className="small m-0">Carte non chargée</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
