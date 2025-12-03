import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BsPersonCircle, BsBasket2, BsSearch, BsGeoAlt, BsSpeedometer, BsPersonLinesFill, BsJournalCheck, BsUiRadiosGrid, BsBookmarkStar, BsChatDots, BsYelp, BsWallet, BsPatchPlus, BsBoxArrowInRight, BsPersonPlus, BsQuestionCircle, BsShieldCheck, BsPersonVcard, BsCalendar2Check, BsPersonCheck, BsBlockquoteLeft, BsEnvelopeCheck, BsCoin, BsPatchQuestion, BsHourglassTop, BsInfoCircle, BsXOctagon, BsGear, BsGeoAltFill, BsX, BsShop } from "react-icons/bs";
import { FiX } from 'react-icons/fi';
import { BiSolidShoppingBagAlt } from 'react-icons/bi'

export default function NavbarLight() {
    const [scroll, setScroll] = useState(false);
    const [current, setCurrent] = useState('');
    const [windowWidth, setWindowWidth] = useState(0);
    const [toggle, setIsToggle] = useState(false);

    const router = useRouter();

    useEffect(() => {
        if (typeof window === 'undefined') return;

        window.scrollTo(0, 0)
        setCurrent(router.asPath)
        setWindowWidth(window.innerWidth)

        const handlerScroll = () => {
            if (window.scrollY > 50) {
                setScroll(true)
            } else { setScroll(false) }
        }

        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('scroll', handlerScroll)
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('scroll', handlerScroll)
            window.removeEventListener('resize', handleResize);
        };
    }, [router.asPath])

    return (
        <>
            <div className={`header header-transparent dark navdark ${scroll ? 'header-fixed' : ''}`} data-sticky-element="">
                <div className="container-fluid">
                    <nav id="navigation" className={windowWidth > 991 ? "navigation navigation-landscape" : "navigation navigation-portrait"}>
                        <div className="nav-header">
                            <Link className="nav-brand" href="/">
                                <span className="fw-bold fs-3 text-primary">LeBonResto</span>
                            </Link>
                            <div className="nav-toggle" onClick={() => setIsToggle(!toggle)}></div>
                            <div className="mobile_nav">
                                <ul>
                                    <li>
                                        <Link href="/login" className="d-flex align-items-center"><BsPersonCircle className="me-1" /></Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={`nav-menus-wrapper ${toggle ? 'nav-menus-wrapper-open' : ''}`} style={{ transitionProperty: toggle ? 'none' : 'left' }}>
                            <span className='nav-menus-wrapper-close-button' onClick={() => setIsToggle(!toggle)}>✕</span>
                            <ul className="nav-menu">
                                <li className={`${current === '/' ? 'active' : ''}`}><Link href="/">Accueil</Link></li>

                                <li className={`${['/grid-layout', '/list-layout', '/half-map', '/single-listing'].includes(current) ? 'active' : ''}`}>
                                    <Link href="/grid-layout">Restaurants</Link>
                                    <ul className="nav-dropdown nav-submenu">
                                        <li><Link href="/grid-layout">Vue Grille</Link></li>
                                        <li><Link href="/list-layout">Vue Liste</Link></li>
                                        <li><Link href="/half-map">Carte</Link></li>
                                    </ul>
                                </li>

                                <li className={`${current === '/about-us' ? 'active' : ''}`}><Link href="/about-us">À propos</Link></li>
                                <li className={`${current === '/blog' ? 'active' : ''}`}><Link href="/blog">Blog</Link></li>
                                <li className={`${current === '/contact-us' ? 'active' : ''}`}><Link href="/contact-us">Contact</Link></li>
                            </ul>

                            <ul className="nav-menu nav-menu-social align-to-right">
                                <li>
                                    <Link href="/login" className="d-flex align-items-center text-dark fw-medium">
                                        <BsPersonCircle className="fs-6 me-2" />
                                        <span className="navCl">Connexion</span>
                                    </Link>
                                </li>
                                <li className="list-buttons light">
                                    <Link href="http://localhost:3000" target="_blank" className="bg-primary">
                                        <BsShop className="fs-6 me-2" />
                                        Espace Restaurateur
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav >
                </div >
            </div >
            <div className="clearfix"></div>
        </>
    )
}
