'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentCustomer } from '../../store/slices/authSlice';

import { BsPerson, BsCalendarRange, BsHeart, BsChatText, BsBoxArrowRight, BsBell, BsGear } from 'react-icons/bs';

export default function AccountLayout({ children }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const { user, token, isAuthenticated, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!token) {
            router.push('/login');
        } else if (!user && !loading) {
            dispatch(fetchCurrentCustomer()).unwrap().catch(() => router.push('/login'));
        }
    }, [token, user, loading, dispatch, router]);

    const handleLogout = () => {
        // Dispatch logout action or simple reload clear
        // Ideally: dispatch(logout());
        // For now, assuming basic clear logic:
        if (typeof window !== 'undefined') localStorage.removeItem('lb_customer_token');
        window.location.href = '/';
    };

    if (!token || (!user && loading)) {
        return (
            <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
                <div className="spinner-border text-primary" role="status"></div>
            </div>
        );
    }

    const menuItems = [
        { label: 'Mon profil', href: '/profile', icon: BsPerson },
        { label: 'Mes réservations', href: '/profile/orders', icon: BsCalendarRange },
        { label: 'Restaurants favoris', href: '/profile/saved-restaurants', icon: BsHeart },
        { label: 'Notifications', href: '/profile/notifications', icon: BsBell },
        { label: 'Paramètres', href: '/profile/settings', icon: BsGear },
    ];

    return (
        <div className="bg-light min-vh-100">
            <section className="gray">
                <div className="container py-5">
                    <div className="row">
                        {/* Sidebar */}
                        <div className="col-lg-3 col-md-4">
                            <div className="dashboard-navbar bg-white rounded-4 shadow-sm p-3 mb-4 sticky-top" style={{ top: '100px' }}>
                                <div className="d-user-avater text-center mb-3 pb-3 border-bottom">
                                    <div className="avatar-lg mb-2 rounded-circle bg-light-primary text-primary d-flex align-items-center justify-content-center mx-auto" style={{ width: 80, height: 80, fontSize: '2rem' }}>
                                        {user?.name?.charAt(0).toUpperCase() || <BsPerson />}
                                    </div>
                                    <h5 className="mb-0">{user?.name || 'Client'}</h5>
                                    <span className="text-muted small">{user?.email}</span>
                                </div>

                                <div className="d-navigation">
                                    <ul className="list-unstyled mb-0">
                                        {menuItems.map((item) => {
                                            const isActive = pathname === item.href;
                                            return (
                                                <li key={item.href} className="mb-1">
                                                    <Link
                                                        href={item.href}
                                                        className={`d-flex align-items-center px-3 py-2 rounded-3 text-decoration-none ${isActive ? 'bg-primary text-white' : 'text-dark hover-bg-light'}`}
                                                    >
                                                        <item.icon className="me-2" />
                                                        {item.label}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                        <li className="mt-3 pt-3 border-top">
                                            <button
                                                onClick={handleLogout}
                                                className="d-flex align-items-center w-100 px-3 py-2 rounded-3 text-decoration-none text-danger border-0 bg-transparent hover-bg-light-danger"
                                            >
                                                <BsBoxArrowRight className="me-2" />
                                                Déconnexion
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="col-lg-9 col-md-8">
                            <div className="bg-white rounded-4 shadow-sm p-4">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    );
}
