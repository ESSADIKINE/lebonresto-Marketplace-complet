import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import AdminCard from '../../components/admin/AdminCard';
import { FiUsers, FiCoffee, FiCalendar, FiDollarSign, FiArrowUp } from 'react-icons/fi';
import CountUp from 'react-countup';

export default function Dashboard() {
    const stats = [
        { title: 'Total Owners', value: 125, icon: FiUsers, color: 'bg-primary', trend: '+12%' },
        { title: 'Active Restaurants', value: 84, icon: FiCoffee, color: 'bg-success', trend: '+5%' },
        { title: 'Pending Reservations', value: 12, icon: FiCalendar, color: 'bg-warning', trend: '+2%' },
        { title: 'Total Revenue', value: 45200, prefix: '$', icon: FiDollarSign, color: 'bg-info', trend: '+18%' },
    ];

    return (
        <div className="container-fluid">
            <AdminPageHeader
                title="Dashboard Overview"
                subtitle="Welcome back, here's what's happening with your marketplace today."
            />

            <div className="row g-4 mb-4">
                {stats.map((stat, index) => (
                    <div className="col-xl-3 col-md-6" key={index}>
                        <div className="admin-card h-100 mb-0">
                            <div className="admin-card-body">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <div>
                                        <h6 className="text-muted text-uppercase fw-bold" style={{ fontSize: '0.75rem' }}>{stat.title}</h6>
                                        <h2 className="mb-0 fw-bold text-dark">
                                            {stat.prefix}<CountUp end={stat.value} separator="," />
                                        </h2>
                                    </div>
                                    <div className={`rounded-circle p-3 text-white ${stat.color} bg-opacity-75`}>
                                        <stat.icon size={24} />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center text-sm">
                                    <span className="admin-badge admin-badge-success me-2">
                                        <FiArrowUp className="me-1" /> {stat.trend}
                                    </span>
                                    <span className="text-muted small">Since last month</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="row g-4">
                <div className="col-xl-8">
                    <AdminCard title="Recent Registrations" actions={<button className="btn btn-sm btn-light border">View All</button>}>
                        <div className="table-responsive">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <tr key={i}>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="avatar avatar-sm me-3">
                                                        <div className="avatar-img rounded-circle bg-light d-flex align-items-center justify-content-center text-primary fw-bold">
                                                            U{i}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-0 fw-semibold text-dark">User Name {i}</h6>
                                                        <small className="text-muted">user{i}@example.com</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td><span className="admin-badge admin-badge-secondary">Owner</span></td>
                                            <td><span className="admin-badge admin-badge-success">Active</span></td>
                                            <td className="text-muted">Oct 24, 2023</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </AdminCard>
                </div>

                <div className="col-xl-4">
                    <AdminCard title="Pending Approvals">
                        <div className="list-group list-group-flush">
                            {[1, 2, 3].map((i) => (
                                <div className="list-group-item border-bottom px-0 py-3" key={i}>
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <h6 className="mb-0 fw-semibold text-dark">Restaurant {i}</h6>
                                        <small className="text-muted">2h ago</small>
                                    </div>
                                    <p className="text-muted small mb-3">New restaurant registration request pending approval.</p>
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-sm btn-success flex-grow-1">Approve</button>
                                        <button className="btn btn-sm btn-outline-danger flex-grow-1">Reject</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </AdminCard>
                </div>
            </div>
        </div>
    );
}

Dashboard.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
