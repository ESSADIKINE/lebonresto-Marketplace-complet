import React from 'react';
import Link from 'next/link';
import { FiMenu, FiBell, FiUser, FiSettings, FiLogOut, FiShield, FiMessageSquare, FiMail } from 'react-icons/fi';

export default function AdminNavbar({ toggleSidebar }) {
    return (
        <nav className="navbar navbar-expand-lg admin-navbar">
            <div className="container-fluid">
                <div className="d-flex align-items-center gap-3">
                    <button
                        className="btn btn-link text-dark p-0 d-lg-none"
                        type="button"
                        onClick={toggleSidebar}
                    >
                        <FiMenu size={24} />
                    </button>
                    <Link href="/dashboard" className="navbar-brand d-flex align-items-center gap-2">
                        <span className="fw-bold text-primary fs-4">LeBonResto</span>
                        <span className="badge bg-light text-secondary border fw-normal" style={{ fontSize: '0.65rem' }}>ADMIN</span>
                    </Link>
                </div>

                <div className="d-flex align-items-center gap-3">
                    <Link href="/dashboard/messages" className="btn btn-icon btn-light rounded-circle border-0">
                        <FiMessageSquare size={20} className="text-muted" />
                    </Link>

                    <Link href="/dashboard/contact-messages" className="btn btn-icon btn-light rounded-circle border-0">
                        <FiMail size={20} className="text-muted" />
                    </Link>

                    <Link href="/dashboard/notifications" className="btn btn-icon btn-light rounded-circle position-relative border-0">
                        <FiBell size={20} className="text-muted" />
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-light p-1">
                            <span className="visually-hidden">New alerts</span>
                        </span>
                    </Link>

                    <div className="dropdown">
                        <a
                            href="#"
                            className="d-flex align-items-center gap-2 text-decoration-none dropdown-toggle no-arrow"
                            id="userDropdown"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <div className="avatar avatar-sm" style={{ width: '40px', height: '40px' }}>
                                <img
                                    src="https://ui-avatars.com/api/?name=Admin+User&background=016B61&color=fff&bold=true&size=40"
                                    alt="Admin User"
                                    className="rounded-circle"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                />
                            </div>
                            <div className="d-none d-md-block text-start lh-1">
                                <div className="fw-semibold text-dark" style={{ fontSize: '0.875rem' }}>Admin User</div>
                                <small className="text-muted" style={{ fontSize: '0.75rem' }}>Super Admin</small>
                            </div>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2" aria-labelledby="userDropdown">
                            <li>
                                <Link href="/dashboard/profile" className="dropdown-item d-flex align-items-center gap-2 py-2">
                                    <FiUser size={16} /> Profile
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/security" className="dropdown-item d-flex align-items-center gap-2 py-2">
                                    <FiShield size={16} /> Security
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/settings" className="dropdown-item d-flex align-items-center gap-2 py-2">
                                    <FiSettings size={16} /> Settings
                                </Link>
                            </li>
                            <li><hr className="dropdown-divider my-1" /></li>
                            <li>
                                <Link href="/login" className="dropdown-item d-flex align-items-center gap-2 py-2 text-danger">
                                    <FiLogOut size={16} /> Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
