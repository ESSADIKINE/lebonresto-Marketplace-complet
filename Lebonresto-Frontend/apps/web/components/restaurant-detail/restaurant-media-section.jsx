'use client';

import React from 'react';

export default function RestaurantMediaSection({ visit360_url, video_url, restaurantName }) {
    if (!visit360_url && !video_url) return null;

    return (
        <div className="row mb-5">
            {/* Virtual Tour Section */}
            {visit360_url && (
                <div className={video_url ? "col-lg-6 col-md-12 mb-4 mb-lg-0" : "col-12"}>
                    <div className="card border-0 rounded-4 shadow-sm h-100">
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-3">Visite virtuelle 360°</h5>
                            <div className="ratio ratio-16x9 rounded-3 overflow-hidden">
                                <iframe
                                    src={visit360_url}
                                    title={`Visite virtuelle - ${restaurantName}`}
                                    allowFullScreen
                                    style={{ border: 0 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Video Section */}
            {video_url && (
                <div className={visit360_url ? "col-lg-6 col-md-12" : "col-12"}>
                    <div className="card border-0 rounded-4 shadow-sm h-100">
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-3">Vidéo</h5>
                            <div className="ratio ratio-16x9 rounded-3 overflow-hidden">
                                {video_url.includes('youtube.com') || video_url.includes('youtu.be') ? (
                                    <iframe
                                        src={video_url.replace('watch?v=', 'embed/')}
                                        title={`Vidéo - ${restaurantName}`}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        style={{ border: 0 }}
                                    />
                                ) : (
                                    <video controls className="w-100 h-100" style={{ objectFit: 'cover' }}>
                                        <source src={video_url} type="video/mp4" />
                                        Votre navigateur ne supporte pas la lecture de vidéos.
                                    </video>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
