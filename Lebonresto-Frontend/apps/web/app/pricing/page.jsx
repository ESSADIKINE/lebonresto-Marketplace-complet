import React from 'react'

import { BsCheckCircleFill } from 'react-icons/bs'
import Link from 'next/link'

const bg = '/assets/img/title-banner.jpg'

export default function Pricing() {
    return (
        <>

            <section className="bg-cover position-relative" style={{ backgroundImage: `url(${bg})` }} data-overlay="6">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-xl-7 col-lg-9 col-md-12 col-sm-12">
                            <div className="position-relative text-center mb-5 pt-5 pt-lg-0">
                                <h1 className="text-light display-4 fw-bold">Espace Restaurateur</h1>
                                <p className="text-white fs-5 opacity-75">Boostez votre visibilité et gérez vos réservations simplement</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-5 pb-5">
                <div className="container">
                    <div className="row justify-content-center g-4">
                        {/* Free Plan */}
                        <div className="col-lg-4 col-md-6">
                            <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden">
                                <div className="card-header bg-white border-0 pt-5 pb-0 text-center">
                                    <h4 className="fw-bold text-muted mb-0">Découverte</h4>
                                    <div className="display-4 fw-bold text-dark my-3">Gratuit</div>
                                    <p className="text-muted">Pour commencer votre présence en ligne</p>
                                </div>
                                <div className="card-body p-4">
                                    <ul className="list-unstyled d-flex flex-column gap-3 mb-4">
                                        <li className="d-flex align-items-center gap-2"><BsCheckCircleFill className="text-success" /> Page restaurant basique</li>
                                        <li className="d-flex align-items-center gap-2"><BsCheckCircleFill className="text-success" /> Photos limitées (5)</li>
                                        <li className="d-flex align-items-center gap-2"><BsCheckCircleFill className="text-success" /> Réception des avis</li>
                                        <li className="d-flex align-items-center gap-2 text-muted opacity-50"><BsCheckCircleFill /> Réservations en ligne</li>
                                        <li className="d-flex align-items-center gap-2 text-muted opacity-50"><BsCheckCircleFill /> Support prioritaire</li>
                                    </ul>
                                    <div className="d-grid">
                                        <Link href="/register?type=owner" className="btn btn-outline-primary rounded-pill py-3 fw-bold">Commencer gratuitement</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pro Plan */}
                        <div className="col-lg-4 col-md-6">
                            <div className="card border-0 shadow-lg h-100 rounded-4 overflow-hidden position-relative">
                                <div className="position-absolute top-0 start-0 w-100 bg-primary text-white text-center py-1 small fw-bold">RECOMMANDÉ</div>
                                <div className="card-header bg-white border-0 pt-5 pb-0 text-center">
                                    <h4 className="fw-bold text-primary mb-0">Professionnel</h4>
                                    <div className="display-4 fw-bold text-dark my-3">499 <span className="fs-4 text-muted fw-normal">DH/mois</span></div>
                                    <p className="text-muted">La solution complète pour votre restaurant</p>
                                </div>
                                <div className="card-body p-4">
                                    <ul className="list-unstyled d-flex flex-column gap-3 mb-4">
                                        <li className="d-flex align-items-center gap-2"><BsCheckCircleFill className="text-success" /> Page restaurant complète</li>
                                        <li className="d-flex align-items-center gap-2"><BsCheckCircleFill className="text-success" /> Photos illimitées</li>
                                        <li className="d-flex align-items-center gap-2"><BsCheckCircleFill className="text-success" /> Gestion des avis</li>
                                        <li className="d-flex align-items-center gap-2"><BsCheckCircleFill className="text-success" /> Réservations en ligne illimitées</li>
                                        <li className="d-flex align-items-center gap-2"><BsCheckCircleFill className="text-success" /> Tableau de bord statistiques</li>
                                    </ul>
                                    <div className="d-grid">
                                        <Link href="/register?type=owner" className="btn btn-primary rounded-pill py-3 fw-bold">Choisir ce plan</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enterprise Plan */}
                        <div className="col-lg-4 col-md-6">
                            <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden">
                                <div className="card-header bg-white border-0 pt-5 pb-0 text-center">
                                    <h4 className="fw-bold text-dark mb-0">Chaines & Groupes</h4>
                                    <div className="display-4 fw-bold text-dark my-3">Sur devis</div>
                                    <p className="text-muted">Pour les réseaux de restaurants</p>
                                </div>
                                <div className="card-body p-4">
                                    <ul className="list-unstyled d-flex flex-column gap-3 mb-4">
                                        <li className="d-flex align-items-center gap-2"><BsCheckCircleFill className="text-success" /> Multi-établissements</li>
                                        <li className="d-flex align-items-center gap-2"><BsCheckCircleFill className="text-success" /> API dédiée</li>
                                        <li className="d-flex align-items-center gap-2"><BsCheckCircleFill className="text-success" /> Account manager dédié</li>
                                        <li className="d-flex align-items-center gap-2"><BsCheckCircleFill className="text-success" /> Marketing personnalisé</li>
                                        <li className="d-flex align-items-center gap-2"><BsCheckCircleFill className="text-success" /> Support 24/7</li>
                                    </ul>
                                    <div className="d-grid">
                                        <Link href="/contact-us" className="btn btn-outline-dark rounded-pill py-3 fw-bold">Contacter l'équipe commerciale</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}
