import React, { useState } from 'react';
import OwnerNavbar from '../navbar/owner-navbar';
import OwnerSidebar from '../admin/owner-sidebar';

export default function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <div className="d-flex flex-column vh-100">
            {/* Navbar - Full Width, 10vh */}
            <OwnerNavbar toggleSidebar={toggleSidebar} />

            {/* Content Area - Sidebar + Main Content, 90vh */}
            <div className="container-fluid flex-grow-1 p-0">
                <div className="row g-0 h-100">
                    {/* Sidebar - Left Column */}
                    <aside
                        className="col-auto position-sticky top-0 overflow-y-auto"
                        style={{ height: '90vh' }}
                    >
                        <OwnerSidebar isOpen={sidebarOpen} onClose={closeSidebar} />
                    </aside>

                    {/* Main Content - Right Column */}
                    <main
                        className="col overflow-y-auto p-4"
                        style={{ height: '90vh', backgroundColor: 'var(--admin-bg)' }}
                    >
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
