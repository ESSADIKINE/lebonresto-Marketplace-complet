'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsCheckCircleFill } from 'react-icons/bs';

/**
 * Shared layout for Login and Register pages.
 * Desktop: Split screen (Image Left, Form Right).
 * Mobile: Stacked (Image Top, Form Bottom).
 */
export default function AuthLayout({
    title,
    subtitleItems = [],
    children,
    bottomNote
}) {
    return (
        <div className="container-fluid vh-100 d-flex flex-column bg-light p-0 overflow-hidden">
            <div className="row g-0 flex-grow-1">
                {/* Left Side: Hero Image */}
                <div className="col-lg-7 col-xl-8 d-none d-lg-block position-relative overflow-hidden">
                    <Image
                        src="/assets/img/banner-5.jpg" // Using existing clear asset
                        alt="Restaurant atmosphere"
                        fill
                        className="object-fit-cover"
                        priority
                    />
                    <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>

                    {/* Overlay Text */}
                    <div className="position-absolute top-50 start-50 translate-middle text-center w-75">
                        <h1 className="display-3 fw-bold text-white mb-4 ls-1">{title}</h1>
                        <div className="d-flex justify-content-center gap-4 flex-wrap">
                            {subtitleItems.map((item, index) => (
                                <div key={index} className="d-flex align-items-center text-white fs-4 fw-light">
                                    <BsCheckCircleFill className="text-secondary me-2 fs-5" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side: Form Container */}
                <div className="col-lg-5 col-xl-4 d-flex flex-column justify-content-center align-items-center bg-white position-relative shadow-start-lg overflow-y-auto custom-scrollbar" style={{ maxHeight: '100vh' }}>
                    {/* Mobile Header Image (Visible only on < lg) */}
                    <div className="d-lg-none w-100 position-relative mb-4" style={{ height: '200px' }}>
                        <Image
                            src="/assets/img/banner-5.jpg"
                            alt="Header"
                            fill
                            className="object-fit-cover"
                        />
                        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
                        <h3 className="position-absolute top-50 start-50 translate-middle text-white fw-bold m-0 w-100 text-center px-2">
                            {title}
                        </h3>
                    </div>

                    <div className="w-100 px-4 px-md-5 py-4" style={{ maxWidth: '500px' }}>
                        {/* Logo Area */}
                        <div className="text-center mb-5">
                            <h4 className="fw-bold text-primary ls-1 mb-0">
                                <span className="text-dark">LeBon</span>Resto
                            </h4>
                            <span className="text-muted small text-uppercase ls-2" style={{ fontSize: '0.65rem' }}>Manager & Customer Access</span>
                        </div>

                        {/* Specific Page Content (Form) */}
                        {children}

                        {/* Footer Links */}
                        <div className="mt-5 pt-4 text-center border-top">
                            <div className="d-flex gap-3 justify-content-center mb-3">
                                <Link href="/" className="text-muted text-decoration-none small hover-primary">
                                    lebonresto.com
                                </Link>
                                <span className="text-muted small">•</span>
                                <Link href="#" className="text-muted text-decoration-none small hover-primary">
                                    Privacy Policy
                                </Link>
                            </div>
                            <p className="text-muted mb-0" style={{ fontSize: '0.75rem' }}>
                                © {new Date().getFullYear()} LeBonResto Manager
                            </p>
                            {bottomNote && <div className="mt-2">{bottomNote}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
