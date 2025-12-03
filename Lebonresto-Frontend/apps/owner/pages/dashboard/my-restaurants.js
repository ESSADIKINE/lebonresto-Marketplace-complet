import React from 'react';
import Link from 'next/link';
import DashboardLayout from '../../components/layout/DashboardLayout';
import DashboardPageHeader from '../../components/dashboard/DashboardPageHeader';
import DashboardCard from '../../components/dashboard/DashboardCard';
import { adminListing } from '../../data/data';
import { BsCheck2Circle, BsStarFill, BsStarHalf, BsX } from 'react-icons/bs';

export default function MyRestaurants() {
    return (
        <div className="container-fluid">
            <DashboardPageHeader
                title="My Restaurants"
                subtitle="Manage your restaurant listings"
            />

            <div className="row">
                <div className="col-12">
                    <DashboardCard title="Manage Listings">
                        <div className="table-responsive">
                            <table className="table align-middle mb-0">
                                <thead className="bg-light">
                                    <tr>
                                        <th className="border-0 rounded-start">Restaurant</th>
                                        <th className="border-0">Status</th>
                                        <th className="border-0">Rating</th>
                                        <th className="border-0 rounded-end text-end">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {adminListing.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className="d-flex align-items-center gap-3">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="rounded"
                                                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                                    />
                                                    <div>
                                                        <h6 className="mb-1 fw-bold">{item.title}</h6>
                                                        <small className="text-muted">{item.location}</small>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                {item.expired ? (
                                                    <span className="admin-badge admin-badge-danger">Expired</span>
                                                ) : (
                                                    <span className="admin-badge admin-badge-success">Active</span>
                                                )}
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center text-warning">
                                                    <BsStarFill className="me-1" size={14} />
                                                    <span className="fw-semibold text-dark">{item.rating || "5.0"}</span>
                                                    <span className="text-muted ms-1" style={{ fontSize: '0.8rem' }}>({item.review} reviews)</span>
                                                </div>
                                            </td>
                                            <td className="text-end">
                                                <div className="d-flex align-items-center justify-content-end gap-2">
                                                    <Link href="#" className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1">
                                                        <BsCheck2Circle /> Edit
                                                    </Link>
                                                    <button className="btn btn-sm btn-outline-danger d-flex align-items-center gap-1">
                                                        <BsX size={18} /> Delete
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
            </div>
        </div>
    );
}

MyRestaurants.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
