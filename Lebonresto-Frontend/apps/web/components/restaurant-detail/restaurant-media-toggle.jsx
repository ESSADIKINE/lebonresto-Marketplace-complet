import React, { useState, useRef, useEffect } from 'react';
import { BsGlobe, BsPlayFill, BsGrid, BsFullscreen, BsFullscreenExit } from 'react-icons/bs';
import styles from './restaurant-detail-page.module.css';

export default function RestaurantMediaToggle({ visit360_url, video_url, restaurantName }) {
    // Determine initial active tab
    const has360 = !!visit360_url;
    const hasVideo = !!video_url;

    // Default to what's available
    const [activeTab, setActiveTab] = useState(has360 ? '360' : (hasVideo ? 'video' : null));
    const containerRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const toggleFullscreen = () => {
        if (!containerRef.current) return;

        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable fullscreen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    };

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
        <div
            ref={containerRef}
            className={`${styles.mediaHero} ${isFullscreen ? 'd-flex align-items-center justify-content-center bg-black' : ''}`}
            style={isFullscreen ? { borderRadius: 0 } : {}}
        >
            {/* Overlay Switcher */}
            <div className={styles.mediaSwitcher} style={{ zIndex: 20 }}>
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

            {/* Fullscreen Toggle Button */}
            <button
                className={styles.mediaSwitcher} // Reusing container style for valid blur/rounded look, but repositioning
                style={{
                    left: 'auto',
                    right: '20px',
                    top: '20px',
                    padding: '8px',
                    cursor: 'pointer',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    zIndex: 20
                }}
                onClick={toggleFullscreen}
                title={isFullscreen ? "Quitter le plein écran" : "Plein écran"}
            >
                {isFullscreen ? <BsFullscreenExit size={20} color="var(--detail-text)" /> : <BsFullscreen size={20} color="var(--detail-text)" />}
            </button>

            {/* Media Content */}
            <div className="w-100 h-100 bg-black">
                {activeTab === '360' && has360 && (
                    <iframe
                        src={visit360_url}
                        title={`Visite virtuelle - ${restaurantName}`}
                        allowFullScreen
                        className={styles.mediaFrame}
                        style={isFullscreen ? { height: '100vh' } : {}}
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
                                style={isFullscreen ? { height: '100vh' } : {}}
                            />
                        ) : (
                            <video
                                controls
                                className={`${styles.mediaFrame} object-fit-cover`}
                                style={isFullscreen ? { height: '100vh' } : {}}
                            >
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
