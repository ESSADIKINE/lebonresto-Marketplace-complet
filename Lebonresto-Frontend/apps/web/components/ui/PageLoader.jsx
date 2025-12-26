import React from 'react';
import styles from './PageLoader.module.css';

export default function PageLoader() {
    return (
        <div className={styles.loaderOverlay} role="status" aria-label="Loading LeBonResto" aria-live="polite">

            <div className={styles.iconContainer}>
                <svg className={styles.svg} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">

                    <path className={`${styles.stroke} ${styles.zellige}`} d="M50 92 L45 88 L50 84 L55 88 Z" />
                    <path className={`${styles.stroke} ${styles.zellige}`} d="M38 88 L35 85 M62 88 L65 85" />

                    <g className={styles.pinGroup}>
                        <path className={`${styles.stroke} ${styles.drawPath}`} d="M50 15 C39 15 30 24 30 35 C30 52 50 75 50 75 C50 75 70 52 70 35 C70 24 61 15 50 15 Z" />
                        <circle className={`${styles.stroke} ${styles.drawPath}`} cx="50" cy="35" r="5" />
                    </g>

                    <ellipse className={`${styles.stroke} ${styles.drawPath}`} cx="50" cy="82" rx="20" ry="5" />

                    <g className={styles.forkGroup}>
                        <path className={styles.stroke} d="M30 80 L30 55" />
                        <path className={styles.stroke} d="M30 55 Q30 50 26 48 L34 48 Q30 50 30 55" />
                        <path className={styles.stroke} d="M26 48 L26 38" />
                        <path className={styles.stroke} d="M30 49 L30 38" />
                        <path className={styles.stroke} d="M34 48 L34 38" />
                    </g>

                    <g className={styles.spoonGroup}>
                        <path className={styles.stroke} d="M70 80 L70 55" />
                        <path className={styles.stroke} d="M70 55 C66 55 64 50 64 44 C64 38 67 36 70 36 C73 36 76 38 76 44 C76 50 74 55 70 55 Z" />
                    </g>
                </svg>
            </div>

            <div className={styles.textContainer}>
                <div className={styles.brandLine}>
                    <span className={styles.brandName}>LeBonResto</span>
                    <div className={styles.dots}>
                        <span>.</span><span>.</span><span>.</span>
                    </div>
                </div>
                <div className={styles.caption}>Loading</div>
            </div>

        </div>
    );
}
