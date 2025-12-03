import React, { useState } from 'react';
import AdminNavbar from '../navbar/admin-navbar';
import AdminSidebar from '../admin/admin-sidebar';

export default function DashboardLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Full-width navbar at top */}
            <AdminNavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

            {/* Container for sidebar + content */}
            <div className="container-fluid flex-grow-1 p-0">
                <div className="row g-0 h-100">
                    {/* Sidebar column */}
                    <aside className={`col-auto bg-dark d-lg-block ${isSidebarOpen ? 'd-block' : 'd-none'} position-sticky top-0 overflow-y-auto`} style={{ width: '260px', height: '90vh' }}>
                        <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                    </aside>

                    {/* Overlay for mobile */}
                    {isSidebarOpen && (
                        <div
                            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-lg-none"
                            style={{ zIndex: 1040 }}
                            onClick={() => setIsSidebarOpen(false)}
                        ></div>
                    )}

                    {/* Main content column */}
                    <main className="col bg-light p-4 overflow-y-auto" style={{ height: '90vh' }}>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
