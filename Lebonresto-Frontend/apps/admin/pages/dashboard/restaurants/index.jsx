import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import AdminPageHeader from '../../../components/admin/AdminPageHeader';
import AdminCard from '../../../components/admin/AdminCard';
import AdminTable from '../../../components/admin/AdminTable';
import FilterBar from '../../../components/admin/FilterBar';
import Link from 'next/link';
import { FiPlus, FiMoreVertical, FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';

export default function Restaurants() {
    const columns = [
        {
            header: 'Name',
            accessor: 'name',
            className: 'ps-4',
            render: (row) => (
                <div className="d-flex align-items-center">
                    <div className="avatar avatar-md me-3">
                        <div className="avatar-img rounded bg-light d-flex align-items-center justify-content-center text-muted fw-bold border">
                            IMG
                        </div>
                    </div>
                    <div>
                        <h6 className="mb-0 fw-semibold text-dark">Restaurant Name {row.id}</h6>
                        <small className="text-muted">123 Street, City</small>
                    </div>
                </div>
            )
        },
        {
            header: 'Owner',
            accessor: 'owner',
            render: (row) => <span className="text-dark">Owner Name {row.id}</span>
        },
        {
            header: 'Category',
            accessor: 'category',
            render: () => <span className="admin-badge admin-badge-secondary">Italian</span>
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <span className={`admin-badge ${row.id % 2 === 0 ? 'admin-badge-success' : 'admin-badge-warning'}`}>
                    {row.id % 2 === 0 ? 'Active' : 'Pending'}
                </span>
            )
        },
        {
            header: 'Rating',
            accessor: 'rating',
            render: () => (
                <div className="d-flex align-items-center gap-1 text-warning">
                    <span className="fw-bold text-dark">4.5</span>
                    <i className="bi bi-star-fill"></i>
                </div>
            )
        },
        {
            header: 'Actions',
            accessor: 'actions',
            className: 'text-end pe-4',
            render: (row) => (
                <div className="dropdown">
                    <button className="btn btn-sm btn-icon btn-light" data-bs-toggle="dropdown">
                        <FiMoreVertical />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end border-0 shadow-sm">
                        <li><Link href={`/dashboard/restaurants/${row.id}`} className="dropdown-item py-2"><FiEye className="me-2" /> View Details</Link></li>
                        <li><a className="dropdown-item py-2" href="#"><FiEdit className="me-2" /> Edit</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item py-2 text-danger" href="#"><FiTrash2 className="me-2" /> Delete</a></li>
                    </ul>
                </div>
            )
        }
    ];

    const data = [1, 2, 3, 4, 5, 6].map(i => ({ id: i }));

    return (
        <div className="container-fluid">
            <AdminPageHeader
                title="Restaurants"
                subtitle="Manage all restaurant listings, approvals, and details."
            >
                <button className="btn btn-primary d-flex align-items-center gap-2">
                    <FiPlus /> Add New
                </button>
            </AdminPageHeader>

            <AdminCard>
                <FilterBar
                    onSearch={(val) => console.log(val)}
                    filters={[
                        {
                            options: [
                                { label: 'All Status', value: '' },
                                { label: 'Active', value: 'active' },
                                { label: 'Pending', value: 'pending' }
                            ],
                            onChange: (val) => console.log(val)
                        },
                        {
                            options: [
                                { label: 'All Categories', value: '' },
                                { label: 'Italian', value: 'italian' },
                                { label: 'Fast Food', value: 'fast_food' }
                            ],
                            onChange: (val) => console.log(val)
                        }
                    ]}
                />

                <AdminTable
                    columns={columns}
                    data={data}
                />

                <div className="d-flex justify-content-center mt-4">
                    <nav>
                        <ul className="pagination justify-content-center mb-0">
                            <li className="page-item disabled"><a className="page-link border-0 bg-transparent" href="#">Previous</a></li>
                            <li className="page-item active"><a className="page-link border-0 rounded-circle bg-primary text-white mx-1" href="#">1</a></li>
                            <li className="page-item"><a className="page-link border-0 rounded-circle bg-transparent text-dark mx-1" href="#">2</a></li>
                            <li className="page-item"><a className="page-link border-0 rounded-circle bg-transparent text-dark mx-1" href="#">3</a></li>
                            <li className="page-item"><a className="page-link border-0 bg-transparent" href="#">Next</a></li>
                        </ul>
                    </nav>
                </div>
            </AdminCard>
        </div>
    );
}

Restaurants.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
