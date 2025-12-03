import React from 'react'
import { FaFacebookF, FaHeart, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'
import Link from 'next/link'
import { BsGeoAltFill, BsTelephoneOutbound, BsEnvelope } from 'react-icons/bs'

export default function Footer() {
    return (
        <footer className="footer skin-dark-footer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-5 col-lg-12 col-xl-4">
                        <div className="footer-widget pe-xl-4 mb-5">
                            <div className="footerLogo">
                                <span className="fw-bold fs-2 text-white">LeBonResto</span>
                            </div>
                            <div className="footerText">
                                <p>La première marketplace de réservation de restaurants au Maroc. Découvrez, réservez et savourez les meilleures tables de votre ville.</p>
                                <p>© {new Date().getFullYear()} LeBonResto. Tous droits réservés.</p>
                            </div>
                            <div className="footerSocialwrap">
                                <ul className="footersocial">
                                    <li><Link href="#" className="social-link"><FaFacebookF className="" /></Link></li>
                                    <li><Link href="#" className="social-link"><FaInstagram className="" /></Link></li>
                                    <li><Link href="#" className="social-link"><FaLinkedin className="" /></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-md-4 offset-md-3 col-lg-3 offset-lg-0 col-xl-2">
                        <div className="footer-widget mb-5 mb-md-5 mb-lg-0">
                            <h4 className="widget-title text-pri">Découvrir</h4>
                            <ul className="footer-menu">
                                <li><Link href="/grid-layout">Restaurants à Casablanca</Link></li>
                                <li><Link href="/grid-layout">Restaurants à Rabat</Link></li>
                                <li><Link href="/grid-layout">Restaurants à Marrakech</Link></li>
                                <li><Link href="/grid-layout">Restaurants à Tanger</Link></li>
                                <li><Link href="/half-map">Recherche sur carte</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                        <div className="footer-widget mb-5 mb-md-5 mb-lg-0">
                            <h4 className="widget-title">Liens Utiles</h4>
                            <ul className="footer-menu">
                                <li><Link href="/about-us">À propos</Link></li>
                                <li><Link href="/blog">Blog</Link></li>
                                <li><Link href="/pricing">Espace Restaurateur</Link></li>
                                <li><Link href="/contact-us">Contact</Link></li>
                                <li><Link href="/privacy-policy">Confidentialité</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-6 col-md-4 col-lg-3 col-xl-2">
                        <div className="footer-widget">
                            <h4 className="widget-title">Contact</h4>
                            <div className="contactInfowrap">
                                <div className="singleinfo">
                                    <div className="icons"><BsGeoAltFill className="" /></div>
                                    <div className="caps">
                                        <h5 className="title">Casablanca, Maroc</h5>
                                        <p className="subs">Siège Social</p>
                                    </div>
                                </div>

                                <div className="singleinfo">
                                    <div className="icons"><BsTelephoneOutbound className="" /></div>
                                    <div className="caps">
                                        <h5 className="title">+212 522 00 00 00</h5>
                                        <p className="subs">Lun - Sam 9h - 18h</p>
                                    </div>
                                </div>

                                <div className="singleinfo">
                                    <div className="icons"><BsEnvelope className="" /></div>
                                    <div className="caps">
                                        <h5 className="title">contact@lebonresto.ma</h5>
                                        <p className="subs">Support 24/7</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
