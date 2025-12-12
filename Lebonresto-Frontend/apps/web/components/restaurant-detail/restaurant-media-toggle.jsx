import React, { useState } from 'react';
import { BsGlobe, BsPlayFill, BsGrid } from 'react-icons/bs';
import styles from './restaurant-detail-page.module.css';

export default function RestaurantMediaToggle({ visit360_url, video_url, restaurantName }) {
    // Determine initial active tab
    const has360 = !!visit360_url;
    const hasVideo = !!video_url;

    // Default to what's available
    const [activeTab, setActiveTab] = useState(has360 ? '360' : (hasVideo ? 'video' : null));

    if (!has360 && !hasVideo) {
        return (
            <div className={`${styles.mediaHero} bg-light d-flex align-items-center justify-content-center text-muted p-5`} style={{ height: '400px' }}>
                <div className="text-center opacity-50">
                    <BsGrid size={40} className="mb-3" />
                    <p className="fw-medium mb-0">Médias non disponibles</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.mediaHero}>
            {/* Overlay Switcher */}
            <div className={styles.mediaSwitcher}>
                {has360 && (
                    <button
                        className={`${styles.switcherBtn} ${activeTab === '360' ? styles.active : ''}`}
                        onClick={() => setActiveTab('360')}
                    >
                        <BsGlobe size={16} /> Visite 360°
                    </button>
                )}
                {hasVideo && (
                    <button
                        className={`${styles.switcherBtn} ${activeTab === 'video' ? styles.active : ''}`}
                        onClick={() => setActiveTab('video')}
                    >
                        <BsPlayFill size={18} /> Vidéo
                    </button>
                )}
            </div>

            {/* Media Content */}
            <div className="w-100 h-100 bg-black">
                {activeTab === '360' && has360 && (
                    <iframe
                        src={visit360_url}
                        title={`Visite virtuelle - ${restaurantName}`}
                        allowFullScreen
                        className={styles.mediaFrame}
                    />
                )}

                {activeTab === 'video' && hasVideo && (
                    <>
                        {video_url.includes('youtube.com') || video_url.includes('youtu.be') ? (
                            <iframe
                                src={video_url.replace('watch?v=', 'embed/')}
                                title={`Vidéo - ${restaurantName}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                className={styles.mediaFrame}
                            />
                        ) : (
                            <video controls className={`${styles.mediaFrame} object-fit-cover`}>
                                <source src={video_url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
