import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DashboardPageHeader from '../../components/dashboard/DashboardPageHeader';
import DashboardCard from '../../components/dashboard/DashboardCard';
import DashboardTable from '../../components/dashboard/DashboardTable';
import { FiCalendar, FiClock, FiUsers, FiCheckCircle, FiXCircle } from 'react-icons/fi';

export default function Reservations() {
    const reservations = [
        { id: 1, customer: "John Doe", restaurant: "La Bella Italia", date: "2024-12-05", time: "19:00", guests: 2, status: "Confirmed" },
        { id: 2, customer: "Jane Smith", restaurant: "Sushi Master", date: "2024-12-06", time: "20:30", guests: 4, status: "Pending" },
        { id: 3, customer: "Mike Johnson", restaurant: "Burger King", date: "2024-12-07", time: "12:00", guests: 3, status: "Cancelled" },
    ];

    return (
        <div className="container-fluid">
            <DashboardPageHeader
                title="Reservations"
                subtitle="Manage your restaurant reservations"
            />

            <DashboardCard title="All Reservations">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="py-3 ps-4">Customer</th>
                                <th className="py-3">Restaurant</th>
                                <th className="py-3">Date & Time</th>
                                <th className="py-3">Guests</th>
                                <th className="py-3">Status</th>
                                <th className="py-3 text-end pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reservations.map((res) => (
                                <tr key={res.id}>
                                    <td className="ps-4">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="avatar avatar-sm bg-light rounded-circle d-flex align-items-center justify-content-center text-primary fw-bold">
                                                {res.customer.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="fw-semibold">{res.customer}</div>
                                                <small className="text-muted">ID: #{res.id}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{res.restaurant}</td>
                                    <td>
                                        <div className="d-flex flex-column">
                                            <div className="d-flex align-items-center gap-2">
                                                <FiCalendar size={14} className="text-muted" />
                                                <span>{res.date}</span>
                                            </div>
                                            <div className="d-flex align-items-center gap-2 text-muted">
                                                <FiClock size={14} />
                                                <small>{res.time}</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="d-flex align-items-center gap-2">
                                            <FiUsers size={14} className="text-muted" />
                                            <span>{res.guests}</span>
                                        </div>
                                    </td>
                                    <td>
                                        {res.status === 'Confirmed' && <span className="admin-badge admin-badge-success">Confirmed</span>}
                                        {res.status === 'Pending' && <span className="admin-badge admin-badge-warning">Pending</span>}
                                        {res.status === 'Cancelled' && <span className="admin-badge admin-badge-danger">Cancelled</span>}
                                    </td>
                                    <td className="text-end pe-4">
                                        <div className="d-flex align-items-center justify-content-end gap-2">
                                            <button className="btn btn-sm btn-icon btn-light text-success" title="Approve">
                                                <FiCheckCircle size={18} />
                                            </button>
                                            <button className="btn btn-sm btn-icon btn-light text-danger" title="Reject">
                                                <FiXCircle size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </DashboardCard>
        </div>
    );
}

Reservations.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
