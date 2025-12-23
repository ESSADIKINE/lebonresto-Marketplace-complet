'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { BsArrowRight, BsChevronLeft, BsChevronRight } from 'react-icons/bs';

/**
 * Premium Horizontal Slider Component
 * 
 * @param {string} title - Section title
 * @param {ReactNode} subtitle - Section subtitle (can be string or component)
 * @param {string} viewAllHref - Link for "View All" button
 * @param {ReactNode} children - Card elements to scroll
 * @param {string} itemWidth - Width class for items (e.g., 'col-md-3') or pixel width logic
 */
export default function HorizontalSlider({
    title,
    subtitle,
    viewAllHref,
    children,
    className = "",
    itemWidth = "280px"
}) {
    const scrollContainerRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

            // STRICT HIDING: Use 10px buffer. 
            // Button is hidden if scrollLeft <= 10
            setShowLeftArrow(scrollLeft > 10);

            const isScrollable = scrollWidth > clientWidth;
            setShowRightArrow(isScrollable && (scrollLeft + clientWidth < scrollWidth - 10));
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // 1. Check immediately
        checkScroll();

        // 2. Check after short delay (for images/fonts loading)
        setTimeout(checkScroll, 100);

        // 3. Use ResizeObserver to watch for container size changes
        const observer = new ResizeObserver(() => {
            checkScroll();
        });
        observer.observe(container);

        // 4. Window resize fallback
        window.addEventListener('resize', checkScroll);

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', checkScroll);
        };
    }, [children]);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const { clientWidth } = scrollContainerRef.current;
            const scrollAmount = direction === 'left' ? -(clientWidth * 0.75) : (clientWidth * 0.75);
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            // Re-check after scroll (allow time for smooth scroll to complete)
            setTimeout(checkScroll, 500);
        }
    };

    return (
        <section className={`position-relative overflow-hidden py-5 bg-white ${className}`}>
            <div className="container position-relative">
                {/* 1. Header Section */}
                <div className="row align-items-end justify-content-between mb-4">
                    <div className="col-lg-8 col-md-12">
                        <div className="secHeading-wrap mb-0">
                            {/* Render title directly if it's a string, allowing parent to pass complex JSX titles too */}
                            {typeof title === 'string' ? (
                                <h2 className="display-6 fw-bold mb-2">{title}</h2>
                            ) : (
                                title
                            )}

                            {subtitle && (
                                <p className="lead text-muted fs-6 mb-0">{subtitle}</p>
                            )}
                        </div>
                    </div>
                    {/* View All Link */}
                    {viewAllHref && (
                        <div className="col-lg-4 d-none d-lg-flex justify-content-end pb-1">
                            <Link href={viewAllHref} className="text-primary fw-bold text-decoration-none hover-underline small d-flex align-items-center">
                                Voir tout <BsArrowRight className="ms-2" />
                            </Link>
                        </div>
                    )}
                </div>

                {/* 2. Slider Container */}
                <div className="position-relative slider-wrapper group">
                    {/* Left Gradient Overlay - Conditionally rendered */}
                    {showLeftArrow && (
                        <div
                            className="position-absolute top-0 start-0 h-100 z-2 pe-none slider-fade-left"
                            style={{
                                width: '60px'
                            }}
                        ></div>
                    )}

                    {/* Left Navigation Button - Conditionally rendered */}
                    {showLeftArrow && (
                        <button
                            onClick={() => scroll('left')}
                            className="slider-nav-btn position-absolute start-0 top-50 translate-middle-y"
                            style={{ left: '-24px' }}
                            aria-label="Previous"
                        >
                            <BsChevronLeft size={22} className="text-primary" />
                        </button>
                    )}

                    {/* Scrollable Area */}
                    <div
                        ref={scrollContainerRef}
                        onScroll={checkScroll}
                        className="d-flex gap-4 overflow-auto hide-scrollbar snap-x py-3 px-1"
                        style={{ scrollBehavior: 'smooth' }}
                    >
                        {React.Children.map(children, (child) => (
                            <div className="flex-shrink-0 snap-start" style={{ width: itemWidth }}>
                                {child}
                            </div>
                        ))}

                        {/* Spacer for right padding on mobile */}
                        <div style={{ width: '1px', flexShrink: 0 }}></div>
                    </div>

                    {/* Right Navigation Button - Conditionally rendered */}
                    {showRightArrow && (
                        <button
                            onClick={() => scroll('right')}
                            className="slider-nav-btn position-absolute end-0 top-50 translate-middle-y"
                            style={{ right: '-24px' }}
                            aria-label="Next"
                        >
                            <BsChevronRight size={22} className="text-primary" />
                        </button>
                    )}

                    {/* Right Gradient Overlay - Conditionally rendered */}
                    {showRightArrow && (
                        <div
                            className="position-absolute top-0 end-0 h-100 z-2 pe-none slider-fade-right"
                            style={{
                                width: '60px'
                            }}
                        ></div>
                    )}
                </div>

                {/* Mobile View All Button */}
                {viewAllHref && (
                    <div className="row mt-3 d-lg-none">
                        <div className="col-12 text-center">
                            <Link href={viewAllHref} className="btn btn-outline-primary rounded-pill px-4">
                                Voir tout
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
