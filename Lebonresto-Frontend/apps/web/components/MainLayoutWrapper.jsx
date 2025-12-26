'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import TopUtilityBar from './header/TopUtilityBar';
import MainHeader from './header/MainHeader';
import Footer from './footer';
import BackToTop from './back-to-top';

import { useAuth } from './auth/AuthProvider';
import PageLoader from './ui/PageLoader';

/**
 * Wraps the main application content.
 * Conditionally renders Header/Footer/BackToTop depending on the path.
 * Excludes them for Auth pages and other standalone pages.
 */
export default function MainLayoutWrapper({ children }) {
    const pathname = usePathname();
    const { status } = useAuth();

    // Pages that should hide standard layout (header/footer)
    const hiddenLayoutPaths = ['/login', '/register'];
    const shouldHideLayout = hiddenLayoutPaths.includes(pathname);

    // Pages that should have non-sticky header
    const nonStickyPaths = ['/restaurants', '/half-map'];
    // Check if current path starts with any of the non-sticky paths
    const isSticky = !nonStickyPaths.some(path => pathname.startsWith(path));



    // ...

    // Global App Loader
    if (status === 'loading') {
        return <PageLoader />;
    }

    return (
        <div className="d-flex flex-column min-vh-100">
            {!shouldHideLayout && (
                <>
                    <TopUtilityBar />
                    <MainHeader sticky={isSticky} />
                </>
            )}

            <main className="flex-grow-1">
                {children}
            </main>

            {!shouldHideLayout && (
                <>
                    <Footer />
                    <BackToTop />
                </>
            )}
        </div>
    );
}
