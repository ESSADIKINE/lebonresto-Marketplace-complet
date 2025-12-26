'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import ForRestaurantsLeadForm from '../../components/for-restaurants/for-restaurants-lead-form';
import { BsCheckCircleFill, BsGraphUp, BsGlobe, BsMegaphone, BsStarFill, BsQuote } from 'react-icons/bs';

const heroBg = '/assets/img/banner-5.jpg'; // Using existing banner
const benefitImg = '/assets/img/side-img.png'; // Using existing asset

export default function ForRestaurantsPage() {
    const [activeTab, setActiveTab] = useState('more-clients');

    const scrollToForm = () => {
        const element = document.getElementById('lead-form');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const benefits = {
        'more-clients': {
            title: 'Attirez plus de clients',
            description: 'Optimisez votre taux de remplissage en touchant une audience, locale et internationale. LeBonResto vous met en relation avec des milliers de gourmets à la recherche de nouvelles expériences.',
            icon: BsGraphUp,
            stats: '+30% de réservations en moyenne'
        },
        'visibility': {
            title: 'Accédez à une clientèle internationale',
            description: 'Soyez visible auprès des touristes et des expatriés qui utilisent LeBonResto pour découvrir la gastronomie marocaine.',
            icon: BsGlobe,
            stats: 'Visibilité multilingue'
        },
        'marketing': {
            title: 'Outils marketing puissants',
            description: 'Envoyez des newsletters, gérez vos promotions et analysez vos performances grâce à notre tableau de bord intuitif LeBonResto Manager.',
            icon: BsMegaphone,
            stats: 'ROI mesurable'
        }
    };

    return (
        <div className="bg-light min-vh-100">
            {/* 1. Hero Section */}
            <section className="position-relative bg-white pt-5 pb-5 border-bottom overflow-hidden">
                <div className="container mt-4 mb-5">
                    <div className="row align-items-center">
                        <div className="col-lg-6 mb-5 mb-lg-0">
                            <h1 className="display-4 fw-bold text-dark mb-4">
                                Comment attirer plus de clients dans mon restaurant avec <span className="text-primary position-relative">
                                    LeBonResto Manager
                                    <svg className="position-absolute start-0 bottom-0 w-100" height="12" viewBox="0 0 100 12" preserveAspectRatio="none" style={{ zIndex: -1, opacity: 0.3 }}>
                                        <path d="M0,10 Q50,0 100,10" stroke="var(--bs-primary)" strokeWidth="8" fill="none" />
                                    </svg>
                                </span> ?
                            </h1>
                            <p className="lead text-muted mb-5">
                                Augmentez votre visibilité, remplissez vos tables vides et fidélisez vos clients grâce à la plateforme de réservation n°1 au Maroc.
                            </p>
                            <div className="d-flex flex-column flex-sm-row gap-3">
                                <button onClick={scrollToForm} className="btn btn-primary btn-lg rounded-pill px-5 fw-bold shadow-sm">
                                    Inscrire mon restaurant
                                </button>
                                <button className="btn btn-outline-dark btn-lg rounded-pill px-5 fw-medium">
                                    En savoir plus
                                </button>
                            </div>
                            <div className="mt-4 pt-3 d-flex align-items-center gap-3">
                                <div className="d-flex text-warning small">
                                    <BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill /><BsStarFill />
                                </div>
                                <span className="text-muted fw-medium">
                                    Recommandé par <span className="text-dark fw-bold">500+</span> restaurateurs
                                </span>
                            </div>
                        </div>
                        <div className="col-lg-6 position-relative">
                            <div className="position-relative rounded-5 overflow-hidden shadow-lg" style={{ minHeight: '400px' }}>
                                <Image
                                    src={heroBg}
                                    alt="Restaurant Manager Dashboard"
                                    fill
                                    className="object-fit-cover"
                                />
                                <div className="position-absolute top-0 start-0 w-100 h-100 bg-primary opacity-10"></div>
                            </div>
                            {/* Floating Card */}
                            <div className="position-absolute bottom-0 start-0 bg-white p-3 rounded-4 shadow-lg mb-4 ms-n4 d-none d-md-block" style={{ maxWidth: '200px' }}>
                                <div className="d-flex align-items-center mb-2">
                                    <div className="bg-success-subtle rounded-circle p-2 text-success me-2">
                                        <BsGraphUp />
                                    </div>
                                    <span className="fw-bold small text-success">+15% Revenus</span>
                                </div>
                                <p className="text-muted small mb-0 lh-sm">Moyenne observée le premier mois.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Logos Section */}
            <section className="py-5 bg-white border-bottom">
                <div className="container text-center">
                    <p className="text-muted fw-medium text-uppercase ls-1 mb-4 small">Devenez réservable sur les canaux les plus performants</p>
                    <div className="row justify-content-center align-items-center gap-5 grayscale-logos opacity-50">
                        <div className="col-auto"><h4 className="fw-bold m-0 text-dark">LeBonResto</h4></div>
                        <div className="col-auto"><h4 className="fw-bold m-0 text-secondary">Google</h4></div>
                        <div className="col-auto"><h4 className="fw-bold m-0 text-secondary">TripAdvisor</h4></div>
                        <div className="col-auto"><h4 className="fw-bold m-0 text-secondary">Instagram</h4></div>
                        <div className="col-auto"><h4 className="fw-bold m-0 text-secondary">Facebook</h4></div>
                    </div>
                </div>
            </section>

            {/* 3. Advantages Section */}
            <section className="py-5 bg-light">
                <div className="container py-5">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold mb-3">Pourquoi rejoindre LeBonResto ?</h2>
                        <p className="text-muted">Des outils conçus pour les restaurateurs, par des experts.</p>
                    </div>

                    <div className="row g-4">
                        {/* Nav */}
                        <div className="col-lg-4">
                            <div className="list-group border-0 shadow-sm rounded-4 overflow-hidden">
                                {Object.keys(benefits).map((key) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveTab(key)}
                                        className={`list-group-item list-group-item-action p-4 border-0 d-flex align-items-center justify-content-between ${activeTab === key ? 'bg-primary text-white' : 'bg-white text-dark'}`}
                                        style={{ transition: 'all 0.2s' }}
                                    >
                                        <span className="fw-bold fs-5">{benefits[key].title}</span>
                                        {activeTab === key && <BsCheckCircleFill />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="col-lg-8">
                            <div className="bg-white rounded-4 shadow-sm p-5 h-100 d-flex flex-column justify-content-center">
                                <div className="row align-items-center">
                                    <div className="col-md-7">
                                        <div className="mb-3 d-inline-flex bg-primary-subtle text-primary p-3 rounded-circle">
                                            {React.createElement(benefits[activeTab].icon, { size: 32 })}
                                        </div>
                                        <h3 className="fw-bold mb-3">{benefits[activeTab].title}</h3>
                                        <p className="text-muted lead mb-4">
                                            {benefits[activeTab].description}
                                        </p>
                                        <div className="d-flex align-items-center">
                                            <div className="bg-light rounded-3 px-3 py-2 fw-bold text-dark border">
                                                {benefits[activeTab].stats}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5 text-center d-none d-md-block">
                                        {/* Placeholder illustration based on benefit */}
                                        <div className="bg-light rounded-4 p-4 text-muted" style={{ minHeight: '200px' }}>
                                            Illustration: {benefits[activeTab].title}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Discover Manager Banner */}
            <section className="py-5 bg-primary text-white">
                <div className="container py-4">
                    <div className="row align-items-center">
                        <div className="col-lg-8 mb-4 mb-lg-0">
                            <h2 className="fw-bold mb-3">Découvrez LeBonResto Manager</h2>
                            <p className="fs-5 opacity-75 mb-0">
                                La solution tout-en-un pour gérer vos réservations, vos avis et votre marketing depuis votre mobile, tablette ou ordinateur.
                            </p>
                        </div>
                        <div className="col-lg-4 text-lg-end">
                            <button onClick={scrollToForm} className="btn btn-light text-primary btn-lg rounded-pill px-5 fw-bold shadow">
                                Essayer Gratuitement
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Testimonial Section */}
            <section className="py-5 bg-white">
                <div className="container py-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="card bg-light border-0 rounded-4 p-5 position-relative">
                                <BsQuote className="text-primary opacity-25 position-absolute top-0 start-0 m-4 display-1" />
                                <div className="text-center position-relative z-1">
                                    <p className="fs-4 fst-italic fw-light mb-4 text-dark">
                                        "Depuis que nous utilisons LeBonResto, nous avons non seulement augmenté nos réservations de 40%, mais nous avons surtout réussi à lisser notre activité sur les services de semaine. C'est un partenaire indispensable aujourd'hui."
                                    </p>
                                    <div className="d-flex align-items-center justify-content-center gap-3">
                                        <div className="bg-dark rounded-circle" style={{ width: 50, height: 50 }}></div>
                                        <div className="text-start">
                                            <h6 className="fw-bold mb-0">Karim Benson</h6>
                                            <span className="text-muted small">Propriétaire du Restaurant "La Palma"</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Numbers */}
                    <div className="row text-center mt-5 pt-4 g-4">
                        <div className="col-md-4">
                            <h2 className="fw-bold text-primary display-5">5,500+</h2>
                            <p className="text-muted fw-medium text-uppercase ls-1">Restaurants Partenaires</p>
                        </div>
                        <div className="col-md-4">
                            <h2 className="fw-bold text-dark display-5">2M+</h2>
                            <p className="text-muted fw-medium text-uppercase ls-1">Réservations / an</p>
                        </div>
                        <div className="col-md-4">
                            <h2 className="fw-bold text-dark display-5">4.8/5</h2>
                            <p className="text-muted fw-medium text-uppercase ls-1">Note de satisfaction</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Lead Form Section */}
            <section id="lead-form" className="py-5 position-relative" style={{ background: 'linear-gradient(to bottom, #f8f9fa 50%, #ffffff 50%)' }}>
                <div className="container py-5">
                    <div className="row gx-lg-5 align-items-center">
                        <div className="col-lg-5 mb-5 mb-lg-0">
                            <div className="sticky-top" style={{ top: '100px', zIndex: 1 }}>
                                <h2 className="display-5 fw-bold mb-4">
                                    Prêt à attirer plus de clients ?
                                </h2>
                                <p className="lead text-muted mb-5">
                                    Remplissez le formulaire pour être contacté par un expert LeBonResto. L'inscription est simple et rapide.
                                </p>

                                <ul className="list-unstyled d-flex flex-column gap-3 mb-5">
                                    <li className="d-flex align-items-center gap-3">
                                        <BsCheckCircleFill className="text-success fs-5" />
                                        <span className="fw-medium">Pas de frais d'inscription</span>
                                    </li>
                                    <li className="d-flex align-items-center gap-3">
                                        <BsCheckCircleFill className="text-success fs-5" />
                                        <span className="fw-medium">Formation incluse</span>
                                    </li>
                                    <li className="d-flex align-items-center gap-3">
                                        <BsCheckCircleFill className="text-success fs-5" />
                                        <span className="fw-medium">Support client 7j/7</span>
                                    </li>
                                </ul>

                                <div className="position-relative w-100 rounded-4 overflow-hidden shadow" style={{ height: '300px' }}>
                                    <Image
                                        src={benefitImg}
                                        alt="Chef cooking"
                                        fill
                                        className="object-fit-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7">
                            <ForRestaurantsLeadForm />
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
}
