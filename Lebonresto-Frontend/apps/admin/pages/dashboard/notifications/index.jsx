import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { FiBell, FiCheck, FiTrash2 } from 'react-icons/fi';

export default function Notifications() {
    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Notifications</h4>
                <button className="btn btn-outline-secondary btn-sm">Mark all as read</button>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="list-group list-group-flush">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div className="list-group-item border-0 p-4" key={i}>
                            <div className="d-flex align-items-start gap-3">
                                <div className={`avatar rounded-circle d-flex align-items-center justify-content-center text-white ${i % 2 === 0 ? 'bg-primary' : 'bg-success'}`}>
                                    <FiBell />
                                </div>
                                <div className="flex-grow-1">
                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                        <h6 className="mb-0 fw-semibold">New Registration</h6>
                                        <small className="text-muted">2 hours ago</small>
                                    </div>
                                    <p className="text-muted mb-0">A new restaurant "Tasty Bites" has registered and is waiting for approval.</p>
                                </div>
                                <div className="d-flex gap-2">
                                    <button className="btn btn-sm btn-icon btn-light text-success" title="Mark as read"><FiCheck /></button>
                                    <button className="btn btn-sm btn-icon btn-light text-danger" title="Delete"><FiTrash2 /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

Notifications.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
