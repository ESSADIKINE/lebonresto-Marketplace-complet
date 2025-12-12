import React from 'react';
import styles from './restaurant-detail-page.module.css';

export default function RestaurantGalleryGrid({ images }) {
    if (!images || images.length === 0) {
        return null;
    }

    // Limit to 5 images for the mosaic grid
    const displayImages = images.slice(0, 5);
    const hiddenCount = images.length - 5;

    return (
        <div className="mb-3">
            {/* Custom Grid */}
            <div className={styles.galleryGrid}>
                {displayImages.map((img, idx) => (
                    <div key={idx} className={styles.galleryItem}>
                        <img
                            src={img.image_url}
                            alt={`Galerie ${idx + 1}`}
                            className={styles.galleryImg}
                            loading="lazy"
                        />
                        {/* Overlay on the last item if there are more images */}
                        {idx === 4 && hiddenCount > 0 && (
                            <div className={styles.moreOverlay}>
                                <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>+{hiddenCount}</div>
                                <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>Voir {hiddenCount} autres photos</div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Fallback button if < 5 images or generic access */}
            {images.length < 5 && images.length > 0 && (
                <div className="text-center mt-3">
                    <button className="btn btn-outline-dark rounded-pill px-4 fw-medium btn-sm">
                        Voir toutes les photos ({images.length})
                    </button>
                </div>
            )}
        </div>
    );
}
