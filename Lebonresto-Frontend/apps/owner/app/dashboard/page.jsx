'use client';

import React from 'react';
import DashboardPageHeader from '../../components/dashboard/DashboardPageHeader';
import DashboardCard from '../../components/dashboard/DashboardCard';
import { FiShoppingBag, FiCalendar, FiStar, FiTrendingUp } from 'react-icons/fi';
import CountUp from 'react-countup';

export default function OwnerDashboard() {
    const stats = [
        { title: 'My Restaurants', value: 5, icon: FiShoppingBag, color: 'primary' },
        { title: 'Today\'s Reservations', value: 12, icon: FiCalendar, color: 'success' },
        { title: 'Total Reviews', value: 248, icon: FiStar, color: 'warning' },
        { title: 'Avg Rating', value: 4.5, icon: FiTrendingUp, color: 'info', decimal: true }
    ];

    return (
        <div className="container-fluid">
            <DashboardPageHeader
                title="Dashboard Overview"
                subtitle="Welcome back! Here's what's happening with your restaurants today."
            />

            {/* Stats Cards */}
            <div className="row g-4 mb-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                            <DashboardCard>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <p className="text-muted mb-1 text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                                            {stat.title}
                                        </p>
                                        <h3 className="mb-0 fw-bold">
                                            <CountUp end={stat.value} decimals={stat.decimal ? 1 : 0} duration={2} />
                                        </h3>
                                    </div>
                                    <div className={`bg-${stat.color} bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center`} style={{ width: '60px', height: '60px' }}>
                                        <Icon size={28} className={`text-${stat.color}`} />
                                    </div>
                                </div>
                            </DashboardCard>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="row g-4 mb-4">
                <div className="col-lg-8">
                    <DashboardCard title="Recent Reservations">
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="py-3">Customer</th>
                                        <th className="py-3">Restaurant</th>
                                        <th className="py-3">Date & Time</th>
                                        <th className="py-3">Guests</th>
                                        <th className="py-3">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[1, 2, 3].map((i) => (
                                        <tr key={i}>
                                            <td>
                                                <div className="d-flex align-items-center gap-2">
                                                    <div className="avatar avatar-sm">
                                                        <img
                                                            src={`https://ui-avatars.com/api/?name=Customer+${i}&background=016B61&color=fff&size=40`}
                                                            alt={`Customer ${i}`}
                                                            className="rounded-circle"
                                                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="fw-semibold">Customer {i}</div>
                                                        <small className="text-muted">customer{i}@example.com</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>Restaurant {i}</td>
                                            <td>Dec {i}, 2024 - 7:00 PM</td>
                                            <td>{i + 1}</td>
                                            <td>
                                                <span className="admin-badge admin-badge-success">Confirmed</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </DashboardCard>
                </div>

                <div className="col-lg-4">
                    <DashboardCard title="Recent Reviews">
                        <div className="d-flex flex-column gap-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="border-bottom pb-3">
                                    <div className="d-flex align-items-center gap-2 mb-2">
                                        <div className="avatar avatar-xs">
                                            <img
                                                src={`https://ui-avatars.com/api/?name=Reviewer+${i}&background=016B61&color=fff&size=24`}
                                                alt={`Reviewer ${i}`}
                                                className="rounded-circle"
                                                style={{ width: '24px', height: '24px', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <div className="flex-grow-1">
                                            <div className="fw-semibold" style={{ fontSize: '0.875rem' }}>Reviewer {i}</div>
                                        </div>
                                        <div className="text-warning">
                                            <FiStar size={14} fill="currentColor" />
                                            <span className="ms-1" style={{ fontSize: '0.875rem' }}>4.5</span>
                                        </div>
                                    </div>
                                    <p className="text-muted mb-0" style={{ fontSize: '0.875rem' }}>
                                        Great food and excellent service! Highly recommended.
                                    </p>
                                </div>
                            ))}
                        </div>
                    </DashboardCard>
                </div>
            </div>
        </div>
    );
}
