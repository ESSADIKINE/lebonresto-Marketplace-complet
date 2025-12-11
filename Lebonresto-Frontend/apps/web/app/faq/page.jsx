import React from 'react'
import NavbarLight from '../../components/navbar/navbar-light'


const bg = '/assets/img/title-banner.jpg'

export default function FAQ() {
    return (
        <>
            <NavbarLight />

            <section className="bg-cover position-relative" style={{ backgroundImage: `url(${bg})` }} data-overlay="6">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-xl-7 col-lg-9 col-md-12 col-sm-12">
                            <div className="position-relative text-center mb-5 pt-5 pt-lg-0">
                                <h1 className="text-light display-4 fw-bold">Foire Aux Questions</h1>
                                <p className="text-white fs-5 opacity-75">Réponses aux questions les plus fréquentes</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-5 pb-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="accordion" id="faqAccordion">

                                <div className="mb-4">
                                    <h3 className="fw-bold mb-3">Pour les clients</h3>
                                    <div className="accordion-item border-0 shadow-sm mb-3 rounded-3 overflow-hidden">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                                                Comment réserver une table ?
                                            </button>
                                        </h2>
                                        <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                            <div className="accordion-body text-muted">
                                                C'est très simple ! Recherchez un restaurant par ville ou catégorie, choisissez celui qui vous plaît, cliquez sur "Réserver", sélectionnez la date, l'heure et le nombre de personnes, puis confirmez. Vous recevrez une confirmation instantanée par email.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item border-0 shadow-sm mb-3 rounded-3 overflow-hidden">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                                                Est-ce que la réservation est payante ?
                                            </button>
                                        </h2>
                                        <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                            <div className="accordion-body text-muted">
                                                Non, la réservation via LeBonResto est totalement gratuite pour les clients. Vous payez uniquement votre repas au restaurant.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item border-0 shadow-sm mb-3 rounded-3 overflow-hidden">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                                                Comment annuler ma réservation ?
                                            </button>
                                        </h2>
                                        <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                            <div className="accordion-body text-muted">
                                                Vous pouvez annuler votre réservation à tout moment depuis votre compte client ou via le lien d'annulation présent dans l'email de confirmation.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h3 className="fw-bold mb-3">Pour les restaurateurs</h3>
                                    <div className="accordion-item border-0 shadow-sm mb-3 rounded-3 overflow-hidden">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                                                Comment inscrire mon restaurant ?
                                            </button>
                                        </h2>
                                        <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                            <div className="accordion-body text-muted">
                                                Cliquez sur "Espace Restaurateur" dans le menu, choisissez une offre (Gratuite ou Pro), et remplissez le formulaire d'inscription. Notre équipe vérifiera vos informations et activera votre compte sous 24h.
                                            </div>
                                        </div>
                                    </div>
                                    <div className="accordion-item border-0 shadow-sm mb-3 rounded-3 overflow-hidden">
                                        <h2 className="accordion-header">
                                            <button className="accordion-button collapsed fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#faq5">
                                                Puis-je gérer mes disponibilités ?
                                            </button>
                                        </h2>
                                        <div id="faq5" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                            <div className="accordion-body text-muted">
                                                Oui, vous disposez d'un tableau de bord complet pour gérer vos horaires, vos tables disponibles, et fermer les réservations pour certaines dates ou services.
                                            </div>
                                        </div>
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
