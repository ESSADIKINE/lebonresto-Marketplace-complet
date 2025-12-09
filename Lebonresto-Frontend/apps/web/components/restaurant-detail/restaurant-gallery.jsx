'use client';

import React from 'react';
import Image from 'next/image';

export default function RestaurantGallery({ images = [] }) {
    if (!images || images.length === 0) return null;

    // Use placeholder if images exist but have no valid url, though backend should provide it.
    // Assuming images is array of { id, image_url, ... }

    const mainImage = images[0];
    const sideImages = images.slice(1, 5); // Take next 4 images
    const remainingCount = Math.max(0, images.length - 5);

    return (
        <div className="gallery-container mb-5">
            <div className="row g-2">
                {/* Main Large Image */}
                <div className="col-lg-8 col-md-12">
                    <div className="position-relative overflow-hidden rounded-3" style={{ height: '400px' }}>
                        <Image
                            src={mainImage.image_url || '/assets/img/restaurant-placeholder.jpg'}
                            alt="Main Restaurant Image"
                            fill
                            className="object-fit-cover w-100 h-100"
                            priority
                        />
                    </div>
                </div>

                {/* Side Grid */}
                <div className="col-lg-4 col-md-12">
                    <div className="row g-2 h-100">
                        {sideImages.map((img, index) => {
                            const isLastItem = index === 3;
                            return (
                                <div className="col-6" key={img.id || index}>
                                    <div className="position-relative overflow-hidden rounded-3" style={{ height: '196px' }}>
                                        <Image
                                            src={img.image_url || '/assets/img/restaurant-placeholder.jpg'}
                                            alt={`Gallery Image ${index + 1}`}
                                            fill
                                            className="object-fit-cover w-100 h-100"
                                        />
                                        {/* Overlay for +N images if it's the last visible block and there are more images */}
                                        {isLastItem && remainingCount > 0 && (
                                            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center cursor-pointer">
                                                <span className="text-white fw-bold fs-4">+{remainingCount} photos</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                        {/* Fallback empty blocks if needed to maintain grid shape could go here, but omitted for cleanup */}
                    </div>
                </div>
            </div>
        </div>
    );
}
