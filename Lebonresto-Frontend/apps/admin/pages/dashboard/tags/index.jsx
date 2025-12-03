import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import AdminPageHeader from '../../../components/admin/AdminPageHeader';
import AdminCard from '../../../components/admin/AdminCard';
import AdminTable from '../../../components/admin/AdminTable';
import FilterBar from '../../../components/admin/FilterBar';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

export default function Tags() {
    const columns = [
        {
            header: 'Name',
            accessor: 'name',
            className: 'ps-4',
            render: (row) => (
                <span className="badge bg-light text-dark border fw-normal px-3 py-2">{row.name}</span>
            )
        },
        {
            header: 'Slug',
            accessor: 'slug',
            render: (row) => <span className="text-muted">{row.name.toLowerCase().replace(' ', '-')}</span>
        },
        {
            header: 'Usage',
            accessor: 'usage',
            render: (row) => <span className="admin-badge admin-badge-secondary">{row.count} restaurants</span>
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

    const data = ['Wifi', 'Parking', 'Outdoor Seating', 'Pet Friendly', 'Live Music'].map((tag, i) => ({
        name: tag,
        count: 20 + i * 4
    }));

    return (
        <div className="container-fluid">
            <AdminPageHeader
                title="Tags"
                subtitle="Manage descriptive tags for restaurants."
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

Tags.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
