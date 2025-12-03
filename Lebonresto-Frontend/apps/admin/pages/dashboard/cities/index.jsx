import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import AdminPageHeader from '../../../components/admin/AdminPageHeader';
import AdminCard from '../../../components/admin/AdminCard';
import AdminTable from '../../../components/admin/AdminTable';
import FilterBar from '../../../components/admin/FilterBar';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

export default function Cities() {
    const columns = [
        {
            header: 'Name',
            accessor: 'name',
            className: 'ps-4',
            render: (row) => <span className="fw-semibold text-dark">{row.name}</span>
        },
        {
            header: 'Slug',
            accessor: 'slug',
            render: (row) => <span className="text-muted">{row.name.toLowerCase().replace(' ', '-')}</span>
        },
        {
            header: 'Restaurants',
            accessor: 'restaurants',
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

    const data = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'].map((city, i) => ({
        name: city,
        count: 10 + i * 5
    }));

    return (
        <div className="container-fluid">
            <AdminPageHeader
                title="Cities"
                subtitle="Manage cities and locations."
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

Cities.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
