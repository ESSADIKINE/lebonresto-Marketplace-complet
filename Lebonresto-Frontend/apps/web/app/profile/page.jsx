'use client';

import React, { useState } from 'react';
import { useAuth } from '../../components/auth/AuthProvider';
import {
    useGetCustomerReservationsQuery,
    useGetMyFeedbackQuery, // Updated to accept ID
    useGetSavedRestaurantsQuery
} from '../../store/api';
import { BsCameraFill, BsPersonBadge, BsCalendarCheck, BsStar, BsHeart, BsShieldCheck, BsPencilFill } from 'react-icons/bs';
import ProfileEditModal from './ProfileEditModal';

export default function AccountProfilePage() {
    const { user } = useAuth();
    const userId = user?.id || user?.userId;

    // Stats Data
    // Pass userId to queries. Skip if no user.
    const { data: reservations = [] } = useGetCustomerReservationsQuery(userId, { skip: !userId });
    const { data: feedback = [] } = useGetMyFeedbackQuery(userId, { skip: !userId });
    const { data: savedRestaurants = [] } = useGetSavedRestaurantsQuery(undefined, { skip: !userId }); // Mocked for now

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    // Helper for join date
    const getJoinDate = () => {
        if (!user?.created_at) return 'N/A';
        return new Date(user.created_at).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    };

    return (
        <div className="container-fluid px-0">
            {/* Header Section */}
            <div className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden position-relative">
                <div
                    className="position-absolute w-100 top-0 start-0"
                    style={{
                        height: '120px',
                        background: 'linear-gradient(135deg, #016B61 0%, #018f81 100%)',
                        opacity: 0.9
                    }}
                ></div>
                <div className="card-body pt-5 mt-4 px-4 pb-4">
                    <div className="d-flex flex-column flex-md-row align-items-center gap-4 position-relative">
                        <div className="position-relative">
                            {user?.avatar_url ? (
                                <img
                                    src={user.avatar_url}
                                    alt="Profile"
                                    className="rounded-circle shadow border border-4 border-white object-fit-cover"
                                    style={{ width: 110, height: 110 }}
                                />
                            ) : (
                                <div
                                    className="rounded-circle shadow border border-4 border-white bg-white text-primary d-flex align-items-center justify-content-center display-4 fw-bold"
                                    style={{ width: 110, height: 110 }}
                                >
                                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                                </div>
                            )}
                            <button className="btn btn-sm btn-light rounded-circle shadow-sm position-absolute bottom-0 end-0 border d-flex align-items-center justify-content-center" style={{ width: 32, height: 32 }} title="Modifier la photo">
                                <BsCameraFill className="text-dark small" />
                            </button>
                        </div>
                        <div className="text-center text-md-start">
                            <h3 className="fw-bold mb-1">{user?.name || 'Utilisateur'}</h3>
                            <p className="text-muted mb-2">{user?.email}</p>
                            <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">
                                Membre depuis {getJoinDate()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="row g-4">
                {/* Personal Info Display (Read Only) */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-header bg-white border-bottom-0 pt-4 px-4 pb-0 d-flex justify-content-between align-items-center">
                            <h5 className="fw-bold mb-0">Informations Personnelles</h5>
                            <button
                                className="btn btn-light rounded-pill px-3 py-1 btn-sm d-flex align-items-center gap-2 text-primary fw-medium"
                                onClick={() => setIsEditModalOpen(true)}
                            >
                                <BsPencilFill size={12} />
                                Modifier
                            </button>
                        </div>
                        <div className="card-body p-4">
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <div className="p-3 bg-light rounded-3 h-100">
                                        <small className="text-muted d-block mb-1 text-uppercase fw-bold" style={{ fontSize: '0.75rem' }}>Nom complet</small>
                                        <div className="fw-medium fs-5">{user?.name || 'Non défini'}</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-3 bg-light rounded-3 h-100">
                                        <small className="text-muted d-block mb-1 text-uppercase fw-bold" style={{ fontSize: '0.75rem' }}>Email</small>
                                        <div className="fw-medium fs-5 text-truncate" title={user?.email}>{user?.email || 'Non défini'}</div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-3 bg-light rounded-3 h-100">
                                        <small className="text-muted d-block mb-1 text-uppercase fw-bold" style={{ fontSize: '0.75rem' }}>Téléphone</small>
                                        <div className="fw-medium fs-5">{user?.phone || 'Non défini'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics / Extra Info */}
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm rounded-4 h-100 bg-primary text-white position-relative overflow-hidden" style={{ minHeight: '300px' }}>
                        <div className="position-absolute top-0 end-0 p-4 opacity-10" style={{ fontSize: '10rem', lineHeight: 1 }}>
                            <BsPersonBadge />
                        </div>
                        <div className="card-body p-4 d-flex flex-column justify-content-between position-relative z-1">
                            <div>
                                <h5 className="fw-bold mb-4 border-bottom border-white border-opacity-25 pb-3">Statistiques</h5>
                                <div className="d-flex align-items-center mb-3">
                                    <div className="rounded-circle bg-white bg-opacity-25 p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                                        <BsCalendarCheck className="fs-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="small opacity-75">Réservations</div>
                                        <div className="fw-bold fs-5">{reservations.length}</div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center mb-3">
                                    <div className="rounded-circle bg-white bg-opacity-25 p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                                        <BsStar className="fs-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="small opacity-75">Avis publiés</div>
                                        <div className="fw-bold fs-5">{feedback.length}</div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="rounded-circle bg-white bg-opacity-25 p-2 me-3 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                                        <BsHeart className="fs-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="small opacity-75">Favoris</div>
                                        <div className="fw-bold fs-5">{savedRestaurants.length}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 pt-3 border-top border-white border-opacity-25">
                                <small className="opacity-75 d-block mb-1">Status du compte</small>
                                <div className="d-flex align-items-center gap-2">
                                    <BsShieldCheck className="text-warning" />
                                    <span className="fw-bold">{user?.is_verified ? 'Vérifié' : 'Non validé'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <ProfileEditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
            />
        </div>
    );
}
