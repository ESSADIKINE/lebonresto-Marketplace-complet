'use client';

import React from 'react'

import { BsGeoAlt, BsEnvelope, BsTelephone } from 'react-icons/bs'

const bg = '/assets/img/title-banner.jpg'

export default function ContactUs() {
    return (
        <>

            <section className="bg-cover position-relative" style={{ backgroundImage: `url(${bg})` }} data-overlay="6">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-xl-7 col-lg-9 col-md-12 col-sm-12">
                            <div className="position-relative text-center mb-5 pt-5 pt-lg-0">
                                <h1 className="text-light display-4 fw-bold">Contactez-nous</h1>
                                <p className="text-white fs-5 opacity-75">Une question ? Une suggestion ? Nous sommes là pour vous aider.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-5 pb-5">
                <div className="container">
                    <div className="row justify-content-center g-4">
                        <div className="col-lg-4 col-md-6">
                            <div className="card border-0 shadow-sm h-100 p-4 text-center rounded-4">
                                <div className="mb-3 text-primary bg-light rounded-circle d-inline-flex p-3">
                                    <BsGeoAlt size={32} />
                                </div>
                                <h4 className="fw-bold mb-2">Adresse</h4>
                                <p className="text-muted">123 Boulevard Zerktouni<br />Casablanca, Maroc</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="card border-0 shadow-sm h-100 p-4 text-center rounded-4">
                                <div className="mb-3 text-primary bg-light rounded-circle d-inline-flex p-3">
                                    <BsEnvelope size={32} />
                                </div>
                                <h4 className="fw-bold mb-2">Email</h4>
                                <p className="text-muted">contact@lebonresto.ma<br />support@lebonresto.ma</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="card border-0 shadow-sm h-100 p-4 text-center rounded-4">
                                <div className="mb-3 text-primary bg-light rounded-circle d-inline-flex p-3">
                                    <BsTelephone size={32} />
                                </div>
                                <h4 className="fw-bold mb-2">Téléphone</h4>
                                <p className="text-muted">+212 522 00 00 00<br />Lun - Sam, 9h - 18h</p>
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center mt-5">
                        <div className="col-lg-8">
                            <div className="card border-0 shadow-lg rounded-4 p-5">
                                <h3 className="fw-bold mb-4 text-center">Envoyez-nous un message</h3>
                                <form>
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label fw-medium">Nom complet</label>
                                            <input type="text" className="form-control bg-light border-0" placeholder="Votre nom" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label fw-medium">Email</label>
                                            <input type="email" className="form-control bg-light border-0" placeholder="votre@email.com" />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label fw-medium">Sujet</label>
                                            <input type="text" className="form-control bg-light border-0" placeholder="Sujet de votre message" />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label fw-medium">Message</label>
                                            <textarea className="form-control bg-light border-0" rows="5" placeholder="Comment pouvons-nous vous aider ?"></textarea>
                                        </div>
                                        <div className="col-12 text-center mt-4">
                                            <button type="submit" className="btn btn-primary px-5 py-3 fw-bold rounded-3">Envoyer le message</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}
