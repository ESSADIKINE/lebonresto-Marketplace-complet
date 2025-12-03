import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import AdminPageHeader from '../../../components/admin/AdminPageHeader';
import AdminCard from '../../../components/admin/AdminCard';
import AdminTable from '../../../components/admin/AdminTable';
import FilterBar from '../../../components/admin/FilterBar';
import { FiMessageCircle, FiTrash2, FiEye } from 'react-icons/fi';

export default function Feedback() {
    const columns = [
        {
            header: 'User',
            accessor: 'user',
            className: 'ps-4',
            render: (row) => (
                <div className="d-flex align-items-center">
                    <div className="avatar avatar-sm me-3">
                        <div className="avatar-img rounded-circle bg-light d-flex align-items-center justify-content-center text-info border">
                            <FiMessageCircle />
                        </div>
                    </div>
                    <div>
                        <h6 className="mb-0 fw-semibold text-dark">User {row.id}</h6>
                        <small className="text-muted">user{row.id}@example.com</small>
                    </div>
                </div>
            )
        },
        {
            header: 'Type',
            accessor: 'type',
            render: () => (
                <span className="admin-badge admin-badge-warning">Bug Report</span>
            )
        },
        {
            header: 'Message',
            accessor: 'message',
            render: () => (
                <p className="text-muted text-sm text-truncate mb-0" style={{ maxWidth: '300px' }}>
                    I found a bug on the checkout page when trying to apply a coupon...
                </p>
            )
        },
        {
            header: 'Date',
            accessor: 'date',
            render: () => <span className="text-muted">Oct 26, 2023</span>
        },
        {
            header: 'Actions',
            accessor: 'actions',
            className: 'text-end pe-4',
            render: () => (
                <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-sm btn-icon btn-light border" title="View"><FiEye /></button>
                    <button className="btn btn-sm btn-icon btn-light border text-danger" title="Delete"><FiTrash2 /></button>
                </div>
            )
        }
    ];

    const data = [1, 2, 3].map(i => ({ id: i }));

    return (
        <div className="container-fluid">
            <AdminPageHeader
                title="Feedback"
                subtitle="Review user feedback and bug reports."
            />

            <AdminCard>
                <FilterBar
                    onSearch={(val) => console.log(val)}
                    filters={[
                        {
                            options: [
                                { label: 'All Types', value: '' },
                                { label: 'Bug Report', value: 'bug' },
                                { label: 'Feature Request', value: 'feature' },
                                { label: 'General', value: 'general' }
                            ],
                            onChange: (val) => console.log(val)
                        }
                    ]}
                />

                <AdminTable
                    columns={columns}
                    data={data}
                />
            </AdminCard>
        </div>
    );
}

Feedback.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
