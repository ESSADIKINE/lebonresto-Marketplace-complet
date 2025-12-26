'use client';

import React, { useState } from 'react';
import { BsX, BsChevronLeft, BsChevronRight, BsGrid3X3Gap } from 'react-icons/bs';

export default function RestaurantGalleryPopup({ images, isOpen, onClose }) {
    const [selectedIndex, setSelectedIndex] = useState(null);

    if (!isOpen) return null;

    // --- Handlers ---
    const handleImageClick = (index) => {
        setSelectedIndex(index);
    };

    const handleCloseFullscreen = () => {
        setSelectedIndex(null);
    };

    const handleNext = (e) => {
        e.stopPropagation();
        if (selectedIndex !== null && selectedIndex < images.length - 1) {
            setSelectedIndex(selectedIndex + 1);
        }
    };

    const handlePrev = (e) => {
        e.stopPropagation();
        if (selectedIndex !== null && selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
        }
    };

    // --- Render Logic ---

    // 1. Fullscreen View (Single Image)
    if (selectedIndex !== null) {
        const currentImage = images[selectedIndex];
        return (
            <div className="fixed-top w-100 h-100 bg-black d-flex flex-column" style={{ zIndex: 1060 }}>
                {/* Header (Fullscreen) */}
                <div className="d-flex align-items-center justify-content-between p-3 text-white">
                    <button
                        className="btn btn-outline-light btn-sm border-0 rounded-circle d-flex align-items-center justify-content-center p-2"
                        onClick={handleCloseFullscreen}
                        title="Retour à la grille"
                    >
                        <BsGrid3X3Gap size={24} />
                    </button>
                    <span className="small opacity-75">
                        {selectedIndex + 1} / {images.length}
                    </span>
                    <button
                        className="btn btn-outline-light btn-sm border-0 rounded-circle d-flex align-items-center justify-content-center p-2"
                        onClick={onClose} // Exit completely
                        title="Fermer"
                    >
                        <BsX size={32} />
                    </button>
                </div>

                {/* Main Content (Fullscreen Image) */}
                <div className="flex-grow-1 position-relative d-flex align-items-center justify-content-center bg-black">
                    {/* Image */}
                    <img
                        src={currentImage.image_url}
                        alt={`Photo ${selectedIndex + 1}`}
                        style={{ maxHeight: 'calc(100vh - 80px)', maxWidth: '100%', objectFit: 'contain' }}
                    />

                    {/* Nav Arrows */}
                    {selectedIndex > 0 && (
                        <button
                            className="btn btn-light rounded-circle position-absolute start-0 ms-3 d-flex align-items-center justify-content-center shadow"
                            style={{ width: 60, height: 60, top: '50%', transform: 'translateY(-50%)' }}
                            onClick={handlePrev}
                        >
                            <BsChevronLeft size={40} />
                        </button>
                    )}
                    {selectedIndex < images.length - 1 && (
                        <button
                            className="btn btn-light rounded-circle position-absolute end-0 me-3 d-flex align-items-center justify-content-center shadow"
                            style={{ width: 60, height: 60, top: '50%', transform: 'translateY(-50%)' }}
                            onClick={handleNext}
                        >
                            <BsChevronRight size={40} />
                        </button>
                    )}
                </div>
            </div>
        );
    }

    // 2. Grid View (All Images)
    return (
        <div className="fixed-top w-100 h-100 bg-white d-flex flex-column" style={{ zIndex: 1050 }}>
            <style jsx>{`
                .gallery-scroll::-webkit-scrollbar {
                    width: 8px;
                }
                .gallery-scroll::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }
                .gallery-scroll::-webkit-scrollbar-thumb {
                    background: #ccc;
                    border-radius: 4px;
                }
                .gallery-hover:hover {
                    opacity: 0.9;
                    transform: scale(1.02);
                }
            `}</style>

            {/* Header (Grid) */}
            <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom bg-white">
                <h5 className="fw-bold mb-0">Photos ({images.length})</h5>
                <button
                    className="btn btn-light rounded-circle d-flex align-items-center justify-content-center p-2 bg-light-subtle"
                    onClick={onClose}
                >
                    <BsX size={28} />
                </button>
            </div>

            {/* Grid Content */}
            <div className="flex-grow-1 overflow-y-auto p-4 gallery-scroll">
                <div className="container-fluid" style={{ maxWidth: '1200px' }}>
                    <div className="row g-3">
                        {images.map((img, idx) => (
                            <div key={idx} className="col-6 col-md-4 col-lg-3">
                                <div
                                    className="ratio ratio-4x3 rounded-3 overflow-hidden cursor-pointer shadow-sm gallery-hover transition-all"
                                    onClick={() => handleImageClick(idx)}
                                    style={{ transition: 'transform 0.2s', cursor: 'pointer' }}
                                >
                                    <img
                                        src={img.image_url}
                                        alt={`Galerie ${idx + 1}`}
                                        className="w-100 h-100 object-fit-cover"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
