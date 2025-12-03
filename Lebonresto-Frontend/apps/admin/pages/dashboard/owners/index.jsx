import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import AdminPageHeader from '../../../components/admin/AdminPageHeader';
import AdminCard from '../../../components/admin/AdminCard';
import AdminTable from '../../../components/admin/AdminTable';
import FilterBar from '../../../components/admin/FilterBar';
import Link from 'next/link';
import { FiPlus, FiMoreVertical, FiEye, FiEdit, FiTrash2, FiMail } from 'react-icons/fi';

export default function Owners() {
    const columns = [
        {
            header: 'User',
            accessor: 'user',
            className: 'ps-4',
            render: (row) => (
                <div className="d-flex align-items-center">
                    <div className="avatar avatar-md me-3">
                        <div className="avatar-img rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center fw-bold border">
                            O{row.id}
                        </div>
                    </div>
                    <div>
                        <h6 className="mb-0 fw-semibold text-dark">Owner Name {row.id}</h6>
                        <small className="text-muted">ID: #OWN-{1000 + row.id}</small>
                    </div>
                </div>
            )
        },
        {
            header: 'Contact',
            accessor: 'contact',
            render: (row) => (
                <div className="d-flex flex-column">
                    <span className="text-sm text-dark"><i className="bi bi-envelope me-1 text-muted"></i> owner{row.id}@example.com</span>
                    <span className="text-sm text-muted"><i className="bi bi-telephone me-1"></i> +1 234 567 89{row.id}</span>
                </div>
            )
        },
        {
            header: 'Restaurants',
            accessor: 'restaurants',
            render: (row) => (
                <span className="admin-badge admin-badge-secondary">{row.id} Restaurants</span>
            )
        },
        {
            header: 'Status',
            accessor: 'status',
            render: () => (
                <span className="admin-badge admin-badge-success">Active</span>
            )
        },
        {
            header: 'Joined',
            accessor: 'joined',
            render: () => <span className="text-muted">Oct 24, 2023</span>
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
                        <li><Link href={`/dashboard/owners/${row.id}`} className="dropdown-item py-2"><FiEye className="me-2" /> View Details</Link></li>
                        <li><a className="dropdown-item py-2" href="#"><FiEdit className="me-2" /> Edit</a></li>
                        <li><a className="dropdown-item py-2" href="#"><FiMail className="me-2" /> Send Message</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item py-2 text-danger" href="#"><FiTrash2 className="me-2" /> Ban User</a></li>
                    </ul>
                </div>
            )
        }
    ];

    const data = [1, 2, 3, 4, 5].map(i => ({ id: i }));

    return (
        <div className="container-fluid">
            <AdminPageHeader
                title="Owners"
                subtitle="Manage registered restaurant owners and their accounts."
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
                                { label: 'Inactive', value: 'inactive' }
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
                            <li className="page-item"><a className="page-link border-0 bg-transparent" href="#">Next</a></li>
                        </ul>
                    </nav>
                </div>
            </AdminCard>
        </div>
    );
}

Owners.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
