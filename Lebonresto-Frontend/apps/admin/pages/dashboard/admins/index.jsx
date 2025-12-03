import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import AdminPageHeader from '../../../components/admin/AdminPageHeader';
import AdminCard from '../../../components/admin/AdminCard';
import AdminTable from '../../../components/admin/AdminTable';
import FilterBar from '../../../components/admin/FilterBar';
import { FiPlus, FiEdit, FiTrash2, FiShield, FiMoreVertical } from 'react-icons/fi';

export default function Admins() {
    const columns = [
        {
            header: 'User',
            accessor: 'user',
            className: 'ps-4',
            render: (row) => (
                <div className="d-flex align-items-center">
                    <div className="avatar avatar-md me-3">
                        <div className="avatar-img rounded-circle bg-dark text-white d-flex align-items-center justify-content-center fw-bold border border-white shadow-sm">
                            A{row.id}
                        </div>
                    </div>
                    <div>
                        <h6 className="mb-0 fw-semibold text-dark">Admin Name {row.id}</h6>
                        <small className="text-muted">Last login: 2h ago</small>
                    </div>
                </div>
            )
        },
        {
            header: 'Email',
            accessor: 'email',
            render: (row) => <span className="text-muted">admin{row.id}@lebonresto.com</span>
        },
        {
            header: 'Role',
            accessor: 'role',
            render: (row) => (
                <div className="d-flex align-items-center gap-1">
                    <FiShield className="text-primary" />
                    <span className="fw-medium text-dark">{row.id === 1 ? 'Super Admin' : 'Manager'}</span>
                </div>
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
            header: 'Actions',
            accessor: 'actions',
            className: 'text-end pe-4',
            render: (row) => (
                <div className="dropdown">
                    <button className="btn btn-sm btn-icon btn-light" data-bs-toggle="dropdown">
                        <FiMoreVertical />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end border-0 shadow-sm">
                        <li><a className="dropdown-item py-2" href="#"><FiEdit className="me-2" /> Edit Permissions</a></li>
                        {row.id !== 1 && (
                            <>
                                <li><hr className="dropdown-divider" /></li>
                                <li><a className="dropdown-item py-2 text-danger" href="#"><FiTrash2 className="me-2" /> Remove</a></li>
                            </>
                        )}
                    </ul>
                </div>
            )
        }
    ];

    const data = [1, 2].map(i => ({ id: i }));

    return (
        <div className="container-fluid">
            <AdminPageHeader
                title="Administrators"
                subtitle="Manage admin users and their permissions."
                action={
                    <button className="btn btn-primary d-flex align-items-center gap-2 shadow-sm">
                        <FiPlus /> Add New Admin
                    </button>
                }
            />

            <AdminCard>
                <FilterBar
                    onSearch={(val) => console.log(val)}
                />

                <AdminTable
                    columns={columns}
                    data={data}
                />
            </AdminCard>
        </div>
    );
}

Admins.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
