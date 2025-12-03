import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import AdminPageHeader from '../../../components/admin/AdminPageHeader';
import FilterBar from '../../../components/admin/FilterBar';
import { FiPlus, FiEdit, FiTrash2, FiCalendar, FiClock, FiMapPin } from 'react-icons/fi';

export default function Events() {
    return (
        <div className="container-fluid">
            <AdminPageHeader
                title="Events"
                subtitle="Manage special events and promotions."
                action={
                    <button className="btn btn-primary d-flex align-items-center gap-2 shadow-sm">
                        <FiPlus /> Add New
                    </button>
                }
            />

            <div className="mb-4">
                <FilterBar
                    onSearch={(val) => console.log(val)}
                    filters={[
                        {
                            options: [
                                { label: 'All Events', value: '' },
                                { label: 'Upcoming', value: 'upcoming' },
                                { label: 'Past', value: 'past' }
                            ],
                            onChange: (val) => console.log(val)
                        }
                    ]}
                />
            </div>

            <div className="row g-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div className="col-xl-3 col-lg-4 col-md-6" key={i}>
                        <div className="card border-0 shadow-sm h-100 hover-shadow transition-all">
                            <div className="position-relative">
                                <div className="ratio ratio-16x9 bg-light rounded-top">
                                    <div className="d-flex align-items-center justify-content-center text-muted">
                                        <FiCalendar size={32} className="opacity-50" />
                                    </div>
                                </div>
                                <div className="position-absolute top-0 end-0 p-2">
                                    <span className="badge bg-success shadow-sm">Upcoming</span>
                                </div>
                                <div className="position-absolute bottom-0 start-0 p-2 w-100">
                                    <div className="bg-white bg-opacity-90 backdrop-blur px-3 py-1 rounded shadow-sm d-inline-block">
                                        <span className="text-primary fw-bold">$50.00</span>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <h6 className="fw-bold mb-1 text-dark">Special Event Name {i}</h6>
                                <p className="text-muted text-sm mb-3">Restaurant Name {i}</p>

                                <div className="d-flex flex-column gap-2">
                                    <div className="d-flex align-items-center text-sm text-muted">
                                        <FiCalendar className="me-2 text-primary" /> Oct 30, 2023
                                    </div>
                                    <div className="d-flex align-items-center text-sm text-muted">
                                        <FiClock className="me-2 text-primary" /> 18:00 - 22:00
                                    </div>
                                    <div className="d-flex align-items-center text-sm text-muted">
                                        <FiMapPin className="me-2 text-primary" /> New York, NY
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer bg-white border-top-0 pt-0 pb-3">
                                <div className="d-flex gap-2 w-100">
                                    <button className="btn btn-sm btn-light flex-grow-1 border fw-medium"><FiEdit className="me-1" /> Edit</button>
                                    <button className="btn btn-sm btn-light flex-grow-1 border text-danger fw-medium"><FiTrash2 className="me-1" /> Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

Events.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
