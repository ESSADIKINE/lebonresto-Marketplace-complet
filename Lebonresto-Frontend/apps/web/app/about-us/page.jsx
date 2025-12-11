import React from 'react'
import NavbarLight from '../../components/navbar/navbar-light'

import { BsCheckCircleFill } from 'react-icons/bs'

const bg = '/assets/img/title-banner.jpg'
const aboutImg = '/assets/img/side-img.png'

export default function AboutUs() {
    return (
        <>
            <NavbarLight />

            <section className="bg-cover position-relative" style={{ backgroundImage: `url(${bg})` }} data-overlay="6">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-xl-7 col-lg-9 col-md-12 col-sm-12">
                            <div className="position-relative text-center mb-5 pt-5 pt-lg-0">
                                <h1 className="text-light display-4 fw-bold">À Propos de LeBonResto</h1>
                                <p className="text-white fs-5 opacity-75">La première marketplace de réservation de restaurants au Maroc</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb-5 pt-5">
                <div className="container">
                    <div className="row justify-content-between align-items-center g-4 mb-5">
                        <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12">
                            <div className="missionImg">
                                <img src={aboutImg} className="img-fluid rounded-4 shadow-lg" alt="LeBonResto Mission" />
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                            <div className="missioncaps">
                                <div className="d-block mb-4">
                                    <span className="badge bg-light text-primary rounded-pill mb-2 px-3 py-2 fw-bold">Notre Mission</span>
                                    <h2 className="fw-bold mb-3">Connecter les gourmets aux meilleures tables</h2>
                                </div>
                                <p className="lead text-muted mb-4">LeBonResto est né d'une passion pour la gastronomie marocaine et le désir de simplifier l'expérience de réservation pour tous.</p>
                                <p className="text-muted mb-4">Nous croyons que chaque repas est une occasion de célébrer, de découvrir et de partager. Notre plateforme permet aux utilisateurs de trouver facilement le restaurant parfait pour chaque occasion, tout en aidant les restaurateurs à gérer leurs réservations et à atteindre de nouveaux clients.</p>

                                <div className="d-flex flex-column gap-3">
                                    <div className="d-flex align-items-center gap-3">
                                        <BsCheckCircleFill className="text-primary fs-4" />
                                        <span className="fw-medium">Une sélection rigoureuse des meilleurs restaurants</span>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        <BsCheckCircleFill className="text-primary fs-4" />
                                        <span className="fw-medium">Réservation instantanée et gratuite</span>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        <BsCheckCircleFill className="text-primary fs-4" />
                                        <span className="fw-medium">Avis vérifiés de la communauté</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-light pt-5 pb-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center mb-5">
                            <h2 className="fw-bold">Pourquoi choisir LeBonResto ?</h2>
                            <p className="text-muted">Nous nous engageons à offrir la meilleure expérience possible</p>
                        </div>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100 p-4 text-center rounded-4">
                                <div className="mb-3 text-primary">
                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
                                </div>
                                <h4 className="fw-bold mb-3">Simplicité</h4>
                                <p className="text-muted">Réservez votre table en quelques clics, 24h/24 et 7j/7, sans appel téléphonique.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100 p-4 text-center rounded-4">
                                <div className="mb-3 text-primary">
                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                                </div>
                                <h4 className="fw-bold mb-3">Qualité</h4>
                                <p className="text-muted">Nous sélectionnons avec soin nos partenaires pour vous garantir une expérience culinaire exceptionnelle.</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card border-0 shadow-sm h-100 p-4 text-center rounded-4">
                                <div className="mb-3 text-primary">
                                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                </div>
                                <h4 className="fw-bold mb-3">Communauté</h4>
                                <p className="text-muted">Partagez vos expériences et découvrez les recommandations d'autres passionnés de gastronomie.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



        </>
    )
}
