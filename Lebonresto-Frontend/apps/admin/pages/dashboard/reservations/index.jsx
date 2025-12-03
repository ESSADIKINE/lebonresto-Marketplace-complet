import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import AdminPageHeader from '../../../components/admin/AdminPageHeader';
import AdminCard from '../../../components/admin/AdminCard';
import AdminTable from '../../../components/admin/AdminTable';
import FilterBar from '../../../components/admin/FilterBar';
import { FiCheckCircle, FiXCircle, FiEye } from 'react-icons/fi';

export default function Reservations() {
    const columns = [
        {
            header: 'ID',
            accessor: 'id',
            className: 'ps-4',
            render: (row) => <span className="fw-semibold text-dark">#RES-{1000 + row.id}</span>
        },
        {
            header: 'Restaurant',
            accessor: 'restaurant',
            render: (row) => <span className="text-dark">Restaurant Name {row.id}</span>
        },
        {
            header: 'Customer',
            accessor: 'customer',
            render: (row) => (
                <div className="d-flex flex-column">
                    <span className="fw-medium text-dark">Customer {row.id}</span>
                    <small className="text-muted">customer{row.id}@example.com</small>
                </div>
            )
        },
        {
            header: 'Date & Time',
            accessor: 'datetime',
            render: () => (
                <div className="d-flex flex-column">
                    <span className="text-dark">Oct 24, 2023</span>
                    <small className="text-muted">19:00 PM</small>
                </div>
            )
        },
        {
            header: 'Guests',
            accessor: 'guests',
            render: (row) => <span className="text-muted">{2 + row.id} People</span>
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => (
                <span className={`admin-badge ${row.id % 2 === 0 ? 'admin-badge-success' : 'admin-badge-warning'}`}>
                    {row.id % 2 === 0 ? 'Confirmed' : 'Pending'}
                </span>
            )
        },
        {
            header: 'Actions',
            accessor: 'actions',
            className: 'text-end pe-4',
            render: (row) => (
                <div className="d-flex justify-content-end gap-2">
                    <button className="btn btn-sm btn-icon btn-light border" title="View Details">
                        <FiEye />
                    </button>
                    {row.id % 2 !== 0 && (
                        <>
                            <button className="btn btn-sm btn-icon btn-success text-white" title="Confirm">
                                <FiCheckCircle />
                            </button>
                            <button className="btn btn-sm btn-icon btn-danger text-white" title="Cancel">
                                <FiXCircle />
                            </button>
                        </>
                    )}
                </div>
            )
        }
    ];

    const data = [1, 2, 3, 4, 5].map(i => ({ id: i }));

    return (
        <div className="container-fluid">
            <AdminPageHeader
                title="Reservations"
                subtitle="Monitor and manage restaurant reservations."
            />

            <AdminCard>
                <FilterBar
                    onSearch={(val) => console.log(val)}
                    filters={[
                        {
                            options: [
                                { label: 'All Status', value: '' },
                                { label: 'Confirmed', value: 'confirmed' },
                                { label: 'Pending', value: 'pending' },
                                { label: 'Cancelled', value: 'cancelled' }
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

Reservations.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
