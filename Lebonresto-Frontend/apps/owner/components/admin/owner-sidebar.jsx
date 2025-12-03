import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
    FiHome, FiShoppingBag, FiFileText, FiImage,
    FiCalendar, FiUser, FiShield
} from 'react-icons/fi';

export default function OwnerSidebar({ isOpen, onClose }) {
    const router = useRouter();
    const isActive = (path) => {
        // For exact dashboard path, only match exactly
        if (path === '/dashboard') {
            return router.pathname === '/dashboard';
        }
        // For other paths, match exact or child paths
        return router.pathname === path || router.pathname.startsWith(path + '/');
    };

    const menuItems = [
        { name: "Overview", icon: <FiHome />, path: "/dashboard" },
        { name: "My Restaurants", icon: <FiShoppingBag />, path: "/dashboard/my-restaurants" },
        { name: "Menus", icon: <FiFileText />, path: "/dashboard/menus" },
        { name: "Images", icon: <FiImage />, path: "/dashboard/images" },
        { name: "Reservations", icon: <FiCalendar />, path: "/dashboard/reservations" },
        { name: "Profile", icon: <FiUser />, path: "/dashboard/profile" },
        { name: "Security", icon: <FiShield />, path: "/dashboard/security" }
    ];

    return (
        <div className={`admin-sidebar d-flex flex-column h-100 ${isOpen ? 'show' : ''}`}>
            <div className="flex-grow-1 overflow-y-auto p-3">
                <nav className="nav flex-column gap-1">
                    {menuItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.path}
                            className={`nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 transition-all ${isActive(item.path)
                                ? 'bg-primary text-white'
                                : 'text-light text-opacity-75 hover-bg-light-10'
                                }`}
                            onClick={onClose}
                            style={{
                                transition: 'all 0.2s ease',
                                fontSize: '0.9rem',
                                fontWeight: '500'
                            }}
                        >
                            <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </div>

            <div className="p-3 border-top border-secondary border-opacity-25">
                <div className="d-flex align-items-center justify-content-center text-light opacity-50">
                    <small>© 2024 LeBonResto</small>
                </div>
            </div>
        </div>
    );
}
