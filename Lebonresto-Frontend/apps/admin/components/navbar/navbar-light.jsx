import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
const logo = '/assets/img/logo-light.svg'
const logoDark = '/assets/img/logo.svg'
const googleLogo = '/assets/img/google.png'
const facebookLogo = '/assets/img/facebook.png'
const brand1 = '/assets/img/brand/logo-1.png'
const brand2 = '/assets/img/brand/logo-2.png'
const brand3 = '/assets/img/brand/logo-3.png'
const list1 = '/assets/img/list-3.jpg'
const list2 = '/assets/img/list-4.jpg'
const list3 = '/assets/img/list-5.jpg'

import { BsPersonCircle, BsBasket2, BsSearch, BsGeoAlt, BsSpeedometer, BsPersonLinesFill, BsJournalCheck, BsUiRadiosGrid, BsBookmarkStar, BsChatDots, BsYelp, BsWallet, BsPatchPlus, BsBoxArrowInRight, BsPersonPlus, BsQuestionCircle, BsShieldCheck, BsPersonVcard, BsCalendar2Check, BsPersonCheck, BsBlockquoteLeft, BsEnvelopeCheck, BsCoin, BsPatchQuestion, BsHourglassTop, BsInfoCircle, BsXOctagon, BsGear, BsGeoAltFill, BsX } from "react-icons/bs";
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
                            <Link className="nav-brand" href="/"><img src={logo} className="logo" alt="" /></Link>
                            <div className="nav-toggle" onClick={() => setIsToggle(!toggle)}></div>
                            <div className="mobile_nav">
                                <ul>
                                    <li>
                                        <Link href="#login" className="d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#login"><BsPersonCircle className="me-1" /></Link>
                                    </li>
                                    <li>
                                        <a href="#cartSlider" className="cart-content" data-bs-toggle="offcanvas" role="button" aria-controls="cartSlider"><BsBasket2 className="" /><span className="head-cart-counter">3</span></a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={`nav-menus-wrapper ${toggle ? 'nav-menus-wrapper-open' : ''}`} style={{ transitionProperty: toggle ? 'none' : 'left' }}>
                            <span className='nav-menus-wrapper-close-button' onClick={() => setIsToggle(!toggle)}>✕</span>
                            <ul className="nav-menu">
                                <li className={`${current === '/' ? 'active' : ''}`}><Link href="/">Home</Link></li>
                                <li className={`${['/grid-layout', '/list-layout', '/half-map', '/single-listing'].includes(current) ? 'active' : ''}`}><Link href="#">Listings<span className="submenu-indicator"><span className="submenu-indicator-chevron"></span></span></Link>
                                    <ul className="nav-dropdown nav-submenu">
                                        <li className={`${current === '/grid-layout' ? 'active' : ''}`}><Link href="/grid-layout">Grid Layout</Link></li>
                                        <li className={`${current === '/list-layout' ? 'active' : ''}`}><Link href="/list-layout">List Layout</Link></li>
                                        <li className={`${current === '/half-map' ? 'active' : ''}`}><Link href="/half-map">Half Map Screen</Link></li>
                                        <li className={`${current === '/single-listing' ? 'active' : ''}`}><Link href="/single-listing">Single Listing</Link></li>
                                    </ul>
                                </li>

                                <li className={`${['/dashboard-user', '/dashboard-my-profile', '/dashboard-my-bookings', '/dashboard-my-listings', '/dashboard-bookmarks', '/dashboard-messages', '/dashboard-reviews', '/dashboard-wallet', '/dashboard-add-listing'].includes(current) ? 'active' : ''}`}><Link href="#">User Dashboard<span className="submenu-indicator"><span className="submenu-indicator-chevron"></span></span></Link>
                                    <ul className="nav-dropdown nav-submenu">
                                        <li className={`${current === '/dashboard-user' ? 'active' : ''}`}><Link href="/dashboard-user" className='d-flex'><BsSpeedometer className="me-1 align-self-center" />Dashboard Area</Link></li>
                                        <li className={`${current === '/dashboard-my-profile' ? 'active' : ''}`}><Link href="/dashboard-my-profile" className='d-flex'><BsPersonLinesFill className="me-1 align-self-center" />My Profile</Link></li>
                                        <li className={`${current === '/dashboard-my-bookings' ? 'active' : ''}`}><Link href="/dashboard-my-bookings" className='d-flex'><BsJournalCheck className="me-1 align-self-center" />My Bookings</Link></li>
                                        <li className={`${current === '/dashboard-my-listings' ? 'active' : ''}`}><Link href="/dashboard-my-listings" className='d-flex'><BsUiRadiosGrid className="me-1 align-self-center" />My Listings</Link></li>
                                        <li className={`${current === '/dashboard-bookmarks' ? 'active' : ''}`}><Link href="/dashboard-bookmarks" className='d-flex'><BsBookmarkStar className="me-1 align-self-center" />Bookmarkes</Link></li>
                                        <li className={`${current === '/dashboard-messages' ? 'active' : ''}`}><Link href="/dashboard-messages" className='d-flex'><BsChatDots className="me-1 align-self-center" />Messages</Link></li>
                                        <li className={`${current === '/dashboard-reviews' ? 'active' : ''}`}><Link href="/dashboard-reviews" className='d-flex'><BsYelp className="me-1 align-self-center" />Reviews</Link></li>
                                        <li className={`${current === '/dashboard-wallet' ? 'active' : ''}`}><Link href="/dashboard-wallet" className='d-flex'><BsWallet className="me-1 align-self-center" />Wallet</Link></li>
                                        <li className={`${current === '/dashboard-add-listing' ? 'active' : ''}`}><Link href="/dashboard-add-listing" className='d-flex'><BsPatchPlus className="me-1 align-self-center" />Add Listing</Link></li>
                                    </ul>
                                </li>

                                <li className={`${['/author-profile', '/booking-page', '/about-us', '/blog', '/contact-us', '/pricing', '/help-center', '/comingsoon', '/faq', '/error', '/elements', '/privacy-policy', '/checkout-page', '/success-payment', '/invoice-page', '/viewcart'].includes(current) ? 'active' : ''}`}><Link href="#">Pages<span className="submenu-indicator"><span className="submenu-indicator-chevron"></span></span></Link>
                                    <ul className="nav-dropdown nav-submenu">
                                        <li><Link href="#" className='d-flex'><BsPersonCircle className="me-1 align-self-center" />My Account<span className="submenu-indicator"><span className="submenu-indicator-chevron"></span></span></Link>
                                            <ul className="nav-dropdown nav-submenu">
                                                <li><Link href="/login" className='d-flex'><BsBoxArrowInRight className="me-1 align-self-center" />User Login</Link></li>
                                                <li><Link href="/register" className='d-flex'><BsPersonPlus className="me-1 align-self-center" />Signup Page</Link></li>
                                                <li><Link href="/forgot-password" className='d-flex'><BsQuestionCircle className="me-1 align-self-center" />Forget Password</Link></li>
                                                <li><Link href="/two-factor-auth" className='d-flex'><BsShieldCheck className="me-1 align-self-center" />Two Step verification</Link></li>
                                            </ul>
                                        </li>
                                        <li><Link href="#" className='d-flex'><BiSolidShoppingBagAlt className="me-1 align-self-center" />Shop<span className="submenu-indicator"><span className="submenu-indicator-chevron"></span></span></Link>
                                            <ul className="nav-dropdown nav-submenu">
                                                <li><Link href="/checkout-page" className='d-flex'><BsBoxArrowInRight className="me-1 align-self-center" />Checkout</Link></li>
                                                <li><Link href="/success-payment" className='d-flex'><BsPersonPlus className="me-1 align-self-center" />Success Payment</Link></li>
                                                <li><Link href="/invoice-page" className='d-flex'><BsQuestionCircle className="me-1 align-self-center" />Invoice</Link></li>
                                                <li><Link href="/viewcart" className='d-flex'><BsShieldCheck className="me-1 align-self-center" />Viewcart</Link></li>
                                            </ul>
                                        </li>
                                        <li className={`${current === '/author-profile' ? 'active' : ''}`}><Link href="/author-profile" className='d-flex'><BsPersonVcard className="me-1 align-self-center" />Author Profile</Link></li>
                                        <li className={`${current === '/booking-page' ? 'active' : ''}`}><Link href="/booking-page" className='d-flex'><BsCalendar2Check className="me-1 align-self-center" />Booking Page</Link></li>
                                        <li className={`${current === '/about-us' ? 'active' : ''}`}><Link href="/about-us" className='d-flex'><BsPersonCheck className="me-1 align-self-center" />About Us</Link></li>
                                        <li className={`${current === '/blog' ? 'active' : ''}`}><Link href="/blog" className='d-flex'><BsBlockquoteLeft className="me-1 align-self-center" />Blog Page</Link></li>
                                        <li className={`${current === '/contact-us' ? 'active' : ''}`}><Link href="/contact-us" className='d-flex'><BsEnvelopeCheck className="me-1 align-self-center" />Contact Us</Link></li>
                                        <li className={`${current === '/pricing' ? 'active' : ''}`}><Link href="/pricing" className='d-flex'><BsCoin className="bi bi-coin me-1 align-self-center" />Pricing</Link></li>
                                        <li className={`${current === '/privacy-policy' ? 'active' : ''}`}><Link href="/privacy-policy" className='d-flex'><BsCoin className="bi bi-coin me-1 align-self-center" />Privacy Policy</Link></li>
                                        <li className={`${current === '/help-center' ? 'active' : ''}`}><Link href="/help-center" className='d-flex'><BsPatchQuestion className="me-1 align-self-center" />Help Center</Link></li>
                                        <li className={`${current === '/comingsoon' ? 'active' : ''}`}><Link href="/comingsoon" className='d-flex'><BsHourglassTop className="me-1 align-self-center" />Coming Soon</Link></li>
                                        <li className={`${current === '/faq' ? 'active' : ''}`}><Link href="/faq" className='d-flex'><BsInfoCircle className="me-1 align-self-center" />FAQ's</Link></li>
                                        <li className={`${current === '/error' ? 'active' : ''}`}><Link href="/error" className='d-flex'><BsXOctagon className="me-1 align-self-center" />Error Page</Link></li>
                                        <li className={`${current === '/elements' ? 'active' : ''}`}><Link href="/elements" className='d-flex'><BsGear className="me-1 align-self-center" />Elements</Link></li>
                                    </ul>
                                </li>

                                <li><Link href="#" className="mob-addlisting light" ><BsGeoAltFill className="me-1" />Add Listing</Link></li>
                            </ul>

                            <ul className="nav-menu nav-menu-social align-to-right">
                                <li>
                                    <Link href="#login" className="d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#login"><BsPersonCircle className="fs-6 me-1" /><span className="navCl">SignUp or SignIn</span></Link>
                                </li>
                                <li>
                                    <a href="#cartSlider" className="cart-content" data-bs-toggle="offcanvas" role="button" aria-controls="cartSlider"><BsBasket2 className="" /><span className="head-cart-counter">3</span></a>
                                </li>
                                <li className="list-buttons light">
                                    <Link href="/register"><BsGeoAlt className="fs-6 me-1" />Add Listing</Link>
                                </li>
                            </ul>
                        </div>
                    </nav >
                </div >
            </div >
            <div className="clearfix"></div>

            <div className="modal fade" id="login" tabIndex="-1" role="dialog" aria-labelledby="loginmodal" aria-hidden="true">
                <div className="modal-dialog" id="loginmodal">
                    <div className="modal-content">
                        <div className="modal-header justify-content-end border-0 pb-0">
                            <Link href="#" className="square--30 circle bg-light-danger text-danger" data-bs-dismiss="modal" aria-label="Close"><FiX className="" /></Link>
                        </div>

                        <div className="modal-body px-4">
                            <div className="text-center mb-5">
                                <h2>Welcome Back</h2>
                                <p className="fs-6">Login to manage your account.</p>
                            </div>

                            <form className="needs-validation px-lg-2" noValidate>
                                <div className="row align-items-center justify-content-between g-3 mb-4">
                                    <div className="col-xl-6 col-lg-6 col-md-6"><Link href="#" className="btn btn-outline-secondary border rounded-3 text-md px-lg-2 full-width"><img src={googleLogo} className="img-fluid me-2" width="16" alt="" />Login with Google</Link></div>
                                    <div className="col-xl-6 col-lg-6 col-md-6"><Link href="#" className="btn btn-outline-secondary border rounded-3 text-md px-lg-2 full-width"><img src={facebookLogo} className="img-fluid me-2" width="16" alt="" />Login with Facebook</Link></div>
                                </div>

                                <div className="form-group form-border mb-4">
                                    <label className="form-label" htmlFor="email01">Your email</label>
                                    <input type="email" className="form-control" id="email01" placeholder="email@site.com" required />
                                    <span className="invalid-feedback">Please enter a valid email address.</span>
                                </div>

                                <div className="mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label className="form-label" htmlFor="pass01">Password</label>
                                        <Link className="link fw-medium text-primary" href="/forgot-password">Forgot Password?</Link>
                                    </div>

                                    <div className="form-group form-border input-group-merge">
                                        <input type="password" className="form-control" id="pass01" placeholder="8+ characters required" required />
                                    </div>

                                    <span className="invalid-feedback">Please enter a valid password.</span>
                                </div>

                                <div className="d-grid mb-3">
                                    <button type="submit" className="btn btn-primary fw-medium">Log in</button>
                                </div>

                                <div className="text-center">
                                    <p>Don't have an account yet? <Link className="link fw-medium text-primary" href="/signup">Sign up here</Link></p>
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer p-3 border-top">
                            <div className="d-flex align-items-center justify-content-between gap-3">
                                <div className="brand px-lg-4 px-3"><img src={brand1} className="img-fluid" alt="" /></div>
                                <div className="brand px-lg-4 px-3"><img src={brand2} className="img-fluid" alt="" /></div>
                                <div className="brand px-lg-4 px-3"><img src={brand3} className="img-fluid" alt="" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="offcanvas offcanvas-end" data-bs-scroll="true" tabIndex="-1" id="cartSlider" aria-labelledby="cartSliderLabel">
                <div className="offcanvas-header border-bottom d-flex justify-content-between">
                    <h6 className="offcanvas-title" id="cartSliderLabel">Your cart Items</h6>
                    <Link href="#" className="square--35 circle text-muted-2 border" data-bs-dismiss="offcanvas" aria-label="Close"><FiX className="" /></Link>
                </div>
                <div className="offcanvas-body">
                    <div className="cartItems w-100">
                        <div className="d-flex align-items-center justify-content-start flex-column gap-3">

                            <div className="singleCartitem d-flex align-items-center justify-content-between gap-4 w-100">
                                <div className="d-flex align-items-center justify-content-start gap-3">
                                    <div className="cartiteThumb"><figure className="d-block m-0"><img src={list1} className="img-fluid rounded-2" width="60" alt="" /></figure></div>
                                    <div className="cartCaption">
                                        <h6 className="lh-base m-0">Spicy Burger</h6>
                                        <p className="m-0">1x$25.50</p>
                                    </div>
                                </div>

                                <div className="removeItemcart"><Link href="#" className="square--35 circle badge-secondary"><FiX className="" /></Link></div>
                            </div>

                            <div className="singleCartitem d-flex align-items-center justify-content-between gap-3 w-100">
                                <div className="d-flex align-items-center justify-content-start gap-3">
                                    <div className="cartiteThumb"><figure className="d-block m-0"><img src={list2} className="img-fluid rounded-2" width="60" alt="" /></figure></div>
                                    <div className="cartCaption">
                                        <h6 className="lh-base m-0">Premium Package</h6>
                                        <p className="m-0">1x$22.10</p>
                                    </div>
                                </div>

                                <div className="removeItemcart"><Link href="#" className="square--35 circle badge-secondary"><FiX className="" /></Link></div>
                            </div>

                            <div className="singleCartitem d-flex align-items-center justify-content-between gap-3 w-100">
                                <div className="d-flex align-items-center justify-content-start gap-3">
                                    <div className="cartiteThumb"><figure className="d-block m-0"><img src={list3} className="img-fluid rounded-2" width="60" alt="" /></figure></div>
                                    <div className="cartCaption">
                                        <h6 className="lh-base m-0">Platinum Plaster</h6>
                                        <p className="m-0">1x$17.40</p>
                                    </div>
                                </div>

                                <div className="removeItemcart"><Link href="" className="square--35 circle badge-secondary"><FiX className="" /></Link></div>
                            </div>

                        </div>

                        <div className="cartSubtotal w-100 py-3 border-top mt-3">
                            <h6 className="m-0">Subtotal: $128.75</h6>
                        </div>

                    </div>

                    <div className="cartButtons w-100 py-2">
                        <div className="d-flex align-items-center justify-content-center flex-wrap gap-2">
                            <Link href="/viewcart" className="btn btn-md btn-light-primary fw-medium flex-fill">View Cart</Link>
                            <Link href="/checkout-page" className="btn btn-md btn-primary fw-medium flex-fill">Checkout</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="offcanvas offcanvas-top h-auto" tabIndex="-1" id="searchSlider" aria-labelledby="searchSliderLabel">
                <div className="offcanvas-body" id="searchSliderLabel">
                    <div className="searchForm w-100 mb-3">
                        <div className="p-2 ps-3 rounded border d-flex align-items-center justify-content-between gap-2">
                            <div className="searchicons"><span><BsSearch className="fs-4 opacity-75" /></span></div>
                            <div className="flex-fill"><input type="search" className="form-control border-0 ps-0" placeholder="What are you looking for?" /></div>
                            <div className="closeSlides"><Link href="#" className="square--35 circle text-muted-2 border" data-bs-dismiss="offcanvas" aria-label="Close"><BsX /></Link></div>
                        </div>
                    </div>
                    <div className="popularSearches d-flex align-items-center justify-content-center gap-2 flex-wrap">
                        <div className="singleItem"><Link href="#" className="badge badge-xs badge-primary rounded-pill">Real Estate</Link></div>
                        <div className="singleItem"><Link href="#" className="badge badge-xs badge-primary rounded-pill">Eat & Drink</Link></div>
                        <div className="singleItem"><Link href="#" className="badge badge-xs badge-primary rounded-pill">Shopping</Link></div>
                        <div className="singleItem"><Link href="#" className="badge badge-xs badge-primary rounded-pill">Nightlife</Link></div>
                        <div className="singleItem"><Link href="#" className="badge badge-xs badge-primary rounded-pill">Services</Link></div>
                    </div>
                </div>
            </div>
        </>
    )
}
