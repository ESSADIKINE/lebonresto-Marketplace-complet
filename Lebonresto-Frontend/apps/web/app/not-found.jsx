'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './not-found.module.css';

export default function NotFound() {
    const router = useRouter();
    const illustrationRef = useRef(null);

    // Parallax effect & Hide Header/Footer
    useEffect(() => {
        // Hide Header/Footer via global CSS
        document.body.classList.add('is-404');

        const handleMouseMove = (e) => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !illustrationRef.current || window.innerWidth < 768) return;

            const x = (e.clientX / window.innerWidth - 0.5) * 4;
            const y = (e.clientY / window.innerHeight - 0.5) * 4;

            illustrationRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        };

        const handleMouseLeave = () => {
            if (illustrationRef.current) illustrationRef.current.style.transform = 'translate3d(0, 0, 0)';
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.body.classList.remove('is-404');
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            const query = e.target.value;
            if (query.trim()) {
                router.push(`/restaurants?q=${encodeURIComponent(query)}`);
            }
        }
    };

    return (
        <div className="bg-white min-vh-100 d-flex align-items-center justify-content-center">
            <main className={styles.container}>
                <div className={styles.illustrationContainer}>
                    <svg
                        ref={illustrationRef}
                        className={styles.illustration}
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        {/* Zellige pattern background (very subtle) */}
                        <path className={`${styles.stroke} ${styles.strokeSubtle}`} d="M30 30 L40 20 M60 20 L70 30" />
                        <path className={`${styles.stroke} ${styles.strokeSubtle}`} d="M20 40 L30 50 M70 50 L80 40" />
                        <path className={`${styles.stroke} ${styles.strokeSubtle}`} d="M30 70 L40 80 M60 80 L70 70" />

                        {/* Plate */}
                        <ellipse className={`${styles.stroke} ${styles.strokeStrong} ${styles.plateRing} ${styles.drawAnimate}`} cx="50" cy="65" rx="28" ry="10" />

                        {/* Pin */}
                        <g className={styles.pinGroup}>
                            <path className={`${styles.stroke} ${styles.strokeStrong} ${styles.drawAnimate}`} d="M50 20 C40 20 32 28 32 38 C32 48 50 78 50 78 C50 78 68 48 68 38 C68 28 60 20 50 20 Z" />
                            <circle className={`${styles.stroke} ${styles.strokeStrong} ${styles.drawAnimate}`} cx="50" cy="38" r="4" />
                        </g>

                        {/* Fork */}
                        <g className={styles.forkGroup}>
                            <path className={styles.stroke} d="M35 70 L35 55" />
                            <path className={styles.stroke} d="M35 55 Q35 50 31 48 L39 48 Q35 50 35 55" />
                            <path className={styles.stroke} d="M31 48 L31 42" />
                            <path className={styles.stroke} d="M35 49 L35 42" />
                            <path className={styles.stroke} d="M39 48 L39 42" />
                        </g>

                        {/* Spoon */}
                        <g className={styles.spoonGroup}>
                            <path className={styles.stroke} d="M65 70 L65 55" />
                            <path className={styles.stroke} d="M65 55 C61 55 59 50 59 44 C59 38 62 36 65 36 C68 36 71 38 71 44 C71 50 69 55 65 55 Z" />
                        </g>
                    </svg>
                    <div className={styles.brandText}>
                        {'LeBonResto'.split('').map((char, index) => (
                            <span
                                key={index}
                                className={styles.brandLetter}
                                style={{ animationDelay: `${2.5 + (index * 0.1)}s` }}
                            >
                                {char}
                            </span>
                        ))}
                    </div>
                </div>

                <div className={styles.content}>
                    <h1 className={styles.errorCode}>404</h1>
                    <h2 className={styles.title}>Page non trouvée</h2>

                    <p className={styles.message}>
                        Cette table n'est pas réservée. Retournons voir le menu...
                    </p>

                    <div className={styles.actions}>
                        <Link href="/" className={`${styles.button} ${styles.buttonPrimary}`} aria-label="Retour à l'accueil">
                            Retour à l'accueil
                            <svg className={styles.buttonChevron} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className={styles.stroke} d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>

                        <Link href="/restaurants" className={`${styles.button} ${styles.buttonSecondary}`} aria-label="Explorer les restaurants">
                            Explorer les restaurants
                        </Link>
                    </div>

                    <div className={styles.searchContainer}>
                        <label htmlFor="searchInput" className={styles.searchLabel}>Ou cherchez ce que vous voulez :</label>
                        <input
                            type="text"
                            id="searchInput"
                            className={styles.searchInput}
                            placeholder="Restaurants, villes, cuisines..."
                            aria-label="Rechercher"
                            onKeyPress={handleSearch}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
