import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DashboardPageHeader from '../../components/dashboard/DashboardPageHeader';
import DashboardCard from '../../components/dashboard/DashboardCard';
import { FiFileText, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';

export default function Menus() {
    const menus = [
        { id: 1, name: "Lunch Menu", items: 12, price: "€25.00", status: "Active" },
        { id: 2, name: "Dinner Menu", items: 24, price: "€45.00", status: "Active" },
        { id: 3, name: "Weekend Special", items: 8, price: "€35.00", status: "Draft" },
    ];

    return (
        <div className="container-fluid">
            <DashboardPageHeader
                title="Menus"
                subtitle="Manage your restaurant menus"
            >
                <button className="btn btn-primary d-flex align-items-center gap-2">
                    <FiPlus /> Create Menu
                </button>
            </DashboardPageHeader>

            <div className="row g-4">
                {menus.map((menu) => (
                    <div key={menu.id} className="col-xl-4 col-md-6">
                        <DashboardCard>
                            <div className="d-flex justify-content-between align-items-start mb-3">
                                <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                                    <FiFileText size={24} className="text-primary" />
                                </div>
                                <div className="dropdown">
                                    <button className="btn btn-link text-muted p-0" type="button" data-bs-toggle="dropdown">
                                        <i className="bi bi-three-dots-vertical"></i>
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end border-0 shadow-sm">
                                        <li><a className="dropdown-item" href="#"><FiEdit2 className="me-2" /> Edit</a></li>
                                        <li><a className="dropdown-item text-danger" href="#"><FiTrash2 className="me-2" /> Delete</a></li>
                                    </ul>
                                </div>
                            </div>
                            <h5 className="fw-bold mb-1">{menu.name}</h5>
                            <p className="text-muted mb-3">{menu.items} items • {menu.price}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                {menu.status === 'Active' ? (
                                    <span className="admin-badge admin-badge-success">Active</span>
                                ) : (
                                    <span className="admin-badge admin-badge-secondary">Draft</span>
                                )}
                                <button className="btn btn-sm btn-outline-primary">View Details</button>
                            </div>
                        </DashboardCard>
                    </div>
                ))}
            </div>
        </div>
    );
}

Menus.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
