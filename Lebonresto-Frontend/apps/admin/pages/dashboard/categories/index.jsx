import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import AdminPageHeader from '../../../components/admin/AdminPageHeader';
import AdminCard from '../../../components/admin/AdminCard';
import AdminTable from '../../../components/admin/AdminTable';
import FilterBar from '../../../components/admin/FilterBar';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

export default function Categories() {
    const columns = [
        {
            header: 'Icon',
            accessor: 'icon',
            className: 'ps-4',
            render: () => (
                <div className="avatar avatar-xs rounded bg-light d-flex align-items-center justify-content-center border">
                    <i className="bi bi-tag text-muted"></i>
                </div>
            )
        },
        {
            header: 'Name',
            accessor: 'name',
            render: (row) => <span className="fw-semibold text-dark">{row.name}</span>
        },
        {
            header: 'Slug',
            accessor: 'slug',
            render: (row) => <span className="text-muted">{row.name.toLowerCase()}</span>
        },
        {
            header: 'Count',
            accessor: 'count',
            render: (row) => <span className="admin-badge admin-badge-secondary">{row.count}</span>
        },
        {
            header: 'Actions',
            accessor: 'actions',
            className: 'text-end pe-4',
            render: () => (
                <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-sm btn-icon btn-light border" title="Edit"><FiEdit /></button>
                    <button className="btn btn-sm btn-icon btn-light border text-danger" title="Delete"><FiTrash2 /></button>
                </div>
            )
        }
    ];

    const data = ['Italian', 'Chinese', 'Mexican', 'Indian', 'Japanese'].map((cat, i) => ({
        name: cat,
        count: 15 + i * 3
    }));

    return (
        <div className="container-fluid">
            <AdminPageHeader
                title="Categories"
                subtitle="Manage restaurant categories and cuisines."
                action={
                    <button className="btn btn-primary d-flex align-items-center gap-2 shadow-sm">
                        <FiPlus /> Add New
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

Categories.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
