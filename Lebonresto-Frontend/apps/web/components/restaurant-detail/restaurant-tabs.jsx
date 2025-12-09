'use client';

import React, { useState } from 'react';
import { BsFileEarmarkPdf } from 'react-icons/bs';

export default function RestaurantTabs({ restaurant, menus = [], plats = [] }) {
    const [activeTab, setActiveTab] = useState('carte'); // carte, menus

    return (
        <div className="card border-0 rounded-4 shadow-sm mb-4">
            <div className="card-header bg-white border-bottom-0 p-4 pb-0">
                <ul className="nav nav-tabs nav-tabs-primary border-bottom-0 gap-4" role="tablist">
                    <li className="nav-item">
                        <button
                            className={`nav-link border-0 bg-transparent fs-5 fw-bold p-0 pb-3 ${activeTab === 'carte' ? 'active text-primary border-bottom border-2 border-primary' : 'text-muted'}`}
                            onClick={() => setActiveTab('carte')}
                        >
                            La Carte
                        </button>
                    </li>
                    <li className="nav-item">
                        <button
                            className={`nav-link border-0 bg-transparent fs-5 fw-bold p-0 pb-3 ${activeTab === 'menus' ? 'active text-primary border-bottom border-2 border-primary' : 'text-muted'}`}
                            onClick={() => setActiveTab('menus')}
                        >
                            Menus
                        </button>
                    </li>
                </ul>
            </div>
            <div className="card-body p-4">

                {activeTab === 'carte' && (
                    <div className="tab-pane fade show active">
                        {plats.length === 0 ? (
                            <p className="text-muted">Aucun plat disponible pour le moment.</p>
                        ) : (
                            <div className="row g-4">
                                {plats.map((plat) => (
                                    <div className="col-lg-6 col-md-12" key={plat.id}>
                                        <div className="d-flex align-items-start border rounded-3 p-3 h-100 theme-hover-border">
                                            {plat.image && (
                                                <div className="flex-shrink-0 me-3">
                                                    <img src={plat.image} alt={plat.name} className="img-fluid rounded-3 object-fit-cover" style={{ width: '80px', height: '80px' }} />
                                                </div>
                                            )}
                                            <div className="flex-grow-1">
                                                <div className="d-flex justify-content-between align-items-start mb-1">
                                                    <h6 className="fw-bold mb-0 text-dark">{plat.name}</h6>
                                                    <span className="fw-bold text-primary ms-3 text-nowrap">{plat.price} MAD</span>
                                                </div>
                                                <p className="text-muted small mb-0 line-clamp-2">{plat.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'menus' && (
                    <div className="tab-pane fade show active">
                        {menus.length === 0 ? (
                            <p className="text-muted">Aucun menu disponible pour le moment.</p>
                        ) : (
                            <div className="d-flex flex-column gap-3">
                                {menus.map((menu) => (
                                    <div className="border rounded-3 p-4 bg-light bg-opacity-25" key={menu.id}>
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h5 className="fw-bold mb-0">{menu.title}</h5>
                                            {menu.price > 0 && <span className="badge bg-primary fs-6">{menu.price} MAD</span>}
                                        </div>
                                        <p className="text-muted mb-3">{menu.description}</p>

                                        {/* If it has sections or items, list them here. Assuming flat structure for now or PDF link */}
                                        {menu.pdf_url && (
                                            <a download href={menu.pdf_url} className="btn btn-sm btn-outline-dark rounded-pill fw-medium">
                                                <BsFileEarmarkPdf className="me-2" /> Télécharger le menu (PDF)
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}
