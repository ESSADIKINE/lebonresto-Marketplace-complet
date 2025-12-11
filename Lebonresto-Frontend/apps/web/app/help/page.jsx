'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BsQuestionLg, BsChatTextFill } from 'react-icons/bs';

/* 
  Help Page Implementation
  Route: /help
*/

// --- Sub-components ---

const HelpHero = () => (
    <section className="py-5 bg-light">
        <div className="container">
            <div className="row justify-content-center text-center">
                <div className="col-lg-8">
                    <h1 className="fw-bold mb-3">Nous sommes là pour vous aider !</h1>
                    <p className="lead text-muted mb-0">
                        Que vous soyez client ou restaurateur, notre équipe est à votre disposition pour répondre à toutes vos questions.
                    </p>
                </div>
            </div>
        </div>
    </section>
);

const HelpContactCards = () => {
    // Shared icon style
    const iconContainerStyle = {
        width: '3.5rem',
        height: '3.5rem',
        backgroundColor: 'var(--bs-primary)',
        color: '#fff',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
    };

    return (
        <section className="py-5">
            <div className="container">
                <h3 className="fw-bold mb-4 text-center text-lg-start">Contactez-nous</h3>
                <div className="row g-4">
                    {/* FAQ Card */}
                    <div className="col-md-6">
                        <div className="card h-100 shadow-sm rounded-4 border-0 p-4">
                            <div className="d-flex align-items-start gap-3">
                                <div style={iconContainerStyle}>
                                    <BsQuestionLg size={24} />
                                </div>
                                <div>
                                    <h4 className="fw-bold h5 mb-2">Foire aux questions</h4>
                                    <p className="text-muted mb-3 small">
                                        Réponses rapides aux questions les plus fréquentes (Mon compte, Mes réservations, Annulations...)
                                    </p>
                                    <Link
                                        href="#" // Placeholder for now
                                        className="btn btn-outline-primary btn-sm rounded-pill fw-medium"
                                    >
                                        Accéder à la FAQ
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chat / Login Card */}
                    <div className="col-md-6">
                        <div className="card h-100 shadow-sm rounded-4 border-0 p-4">
                            <div className="d-flex align-items-start gap-3">
                                <div style={iconContainerStyle}>
                                    <BsChatTextFill size={20} />
                                </div>
                                <div>
                                    <h4 className="fw-bold h5 mb-2">Contactez-nous</h4>
                                    <p className="text-muted mb-3 small">
                                        Connectez-vous pour nous contacter via le chat en direct avec notre support.
                                    </p>
                                    <Link
                                        href="/login"
                                        className="btn btn-primary btn-sm rounded-pill fw-medium text-white"
                                    >
                                        Connexion
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const HelpRestaurantOwnerBlock = () => (
    <section className="py-5 bg-white">
        <div className="container">
            <h2 className="fw-bold mb-5 text-center text-lg-start">Êtes-vous un restaurateur ?</h2>
            <div className="row g-5 align-items-center">
                {/* Left: Image */}
                <div className="col-lg-6">
                    <div className="position-relative w-100 h-100" style={{ minHeight: '300px' }}>
                        <Image
                            src="/assets/img/banner-1.jpg" // High quality asset
                            alt="Restaurateurs"
                            fill
                            className="img-fluid rounded-4 shadow-sm object-fit-cover"
                        />
                    </div>
                </div>

                {/* Right: Content */}
                <div className="col-lg-6 d-flex flex-column gap-5">

                    {/* Block A */}
                    <div>
                        <h3 className="h4 fw-bold mb-3">Inscrivez votre restaurant</h3>
                        <p className="text-muted mb-3">
                            Rejoignez LeBonResto pour augmenter votre visibilité et gérer vos réservations simplement. Donnez-nous plus de détails, et nous vous contacterons le plus rapidement possible.
                        </p>
                        <Link
                            href="/for-restaurants"
                            className="btn btn-primary rounded-pill px-4 fw-medium"
                        >
                            Voir plus d'informations
                        </Link>
                    </div>

                    <hr className="text-muted opacity-25" />

                    {/* Block B */}
                    <div>
                        <h3 className="h4 fw-bold mb-3">Déjà client ?</h3>
                        <p className="text-muted mb-3">
                            Connectez-vous à votre espace LeBonResto Manager pour gérer votre établissement et contactez-nous via le Chat dédié.
                        </p>
                        <Link
                            href="/login" // Assuming generic login leads to manager too based on auth flow
                            className="btn btn-outline-primary rounded-pill px-4 fw-medium"
                        >
                            Connectez-vous à LeBonResto Manager
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    </section>
);

const HelpLegalNotice = () => (
    <section className="py-4 bg-light border-top mt-5">
        <div className="container">
            <p className="small text-muted mb-0" style={{ lineHeight: '1.6' }}>
                LeBonResto et les restaurants partenaires traitent vos données personnelles pour la gestion et le suivi de vos réservations ainsi que pour la relation client. Conformément à la réglementation en vigueur, vous disposez d’un droit d’accès, de rectification, d’effacement, de portabilité de vos données et d’un droit d’opposition à certains traitements, notamment à des fins marketing. Ces droits peuvent être exercés via notre <a href="#" className="text-decoration-underline text-muted">formulaire dédié</a> ou directement auprès du restaurant. Pour plus d’informations, consultez notre <Link href="#" className="text-decoration-underline text-muted">politique de confidentialité et de cookies</Link>.
            </p>
        </div>
    </section>
);

// --- Main Page Component ---

export default function HelpPage() {
    return (
        <>
            <HelpHero />
            <HelpContactCards />
            <HelpRestaurantOwnerBlock />
            <HelpLegalNotice />
        </>
    );
}
