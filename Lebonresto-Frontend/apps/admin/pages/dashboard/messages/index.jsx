import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import AdminPageHeader from '../../../components/admin/AdminPageHeader';
import { FiSearch, FiStar, FiTrash2, FiCornerUpLeft, FiSend, FiMoreVertical } from 'react-icons/fi';

export default function Messages() {
    return (
        <div className="container-fluid">
            <AdminPageHeader
                title="Messages"
                subtitle="View and reply to inquiries from users and restaurant owners."
            />

            <div className="row g-4" style={{ height: 'calc(100vh - 240px)', minHeight: '600px' }}>
                <div className="col-lg-4 col-xl-3 h-100">
                    <div className="admin-card h-100 d-flex flex-column mb-0 p-0 overflow-hidden">
                        <div className="p-3 border-bottom bg-white">
                            <div className="input-group">
                                <span className="input-group-text bg-light border-end-0"><FiSearch className="text-muted" /></span>
                                <input type="text" className="form-control bg-light border-start-0" placeholder="Search messages..." />
                            </div>
                        </div>
                        <div className="list-group list-group-flush flex-grow-1 overflow-auto custom-scrollbar">
                            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                                <a href="#" className={`list-group-item list-group-item-action border-0 p-3 ${i === 1 ? 'bg-primary-subtle border-start border-4 border-primary' : ''}`} key={i}>
                                    <div className="d-flex align-items-center mb-1">
                                        <div className="avatar avatar-sm me-2">
                                            <div className="avatar-img rounded-circle bg-light d-flex align-items-center justify-content-center text-primary fw-bold border">
                                                U{i}
                                            </div>
                                        </div>
                                        <div className="flex-grow-1 overflow-hidden">
                                            <h6 className="mb-0 text-truncate text-dark fw-semibold">User Name {i}</h6>
                                        </div>
                                        <small className="text-muted ms-2" style={{ fontSize: '0.7rem' }}>10:30 AM</small>
                                    </div>
                                    <p className="text-muted text-sm text-truncate mb-0 ps-5">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    </p>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="col-lg-8 col-xl-9 h-100">
                    <div className="admin-card h-100 d-flex flex-column mb-0 p-0 overflow-hidden">
                        <div className="admin-card-header bg-white py-3 d-flex justify-content-between align-items-center border-bottom">
                            <div className="d-flex align-items-center">
                                <div className="avatar avatar-md me-3">
                                    <div className="avatar-img rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center fw-bold">
                                        U1
                                    </div>
                                </div>
                                <div>
                                    <h6 className="mb-0 fw-bold text-dark">User Name 1</h6>
                                    <small className="text-muted">user1@example.com</small>
                                </div>
                            </div>
                            <div className="d-flex gap-2">
                                <button className="btn btn-sm btn-icon btn-light border" title="Star"><FiStar /></button>
                                <button className="btn btn-sm btn-icon btn-light border text-danger" title="Delete"><FiTrash2 /></button>
                                <button className="btn btn-sm btn-icon btn-light border"><FiMoreVertical /></button>
                            </div>
                        </div>

                        <div className="card-body bg-light flex-grow-1 overflow-auto p-4 custom-scrollbar">
                            <div className="d-flex flex-column gap-3">
                                <div className="align-self-start d-flex gap-2" style={{ maxWidth: '75%' }}>
                                    <div className="avatar avatar-xs mt-1">
                                        <div className="avatar-img rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center fw-bold text-xs">U1</div>
                                    </div>
                                    <div className="bg-white p-3 rounded-3 shadow-sm">
                                        <p className="mb-1 text-dark">Hello, I have a question about my listing. Can I update the cover image?</p>
                                        <small className="text-muted" style={{ fontSize: '0.7rem' }}>10:30 AM</small>
                                    </div>
                                </div>

                                <div className="align-self-end d-flex gap-2 flex-row-reverse" style={{ maxWidth: '75%' }}>
                                    <div className="avatar avatar-xs mt-1">
                                        <div className="avatar-img rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold text-xs">A</div>
                                    </div>
                                    <div className="bg-primary text-white p-3 rounded-3 shadow-sm">
                                        <p className="mb-1">Hi! Sure, you can update it from your dashboard settings. Let me know if you need help.</p>
                                        <small className="text-white-50" style={{ fontSize: '0.7rem' }}>10:32 AM</small>
                                    </div>
                                </div>

                                <div className="align-self-start d-flex gap-2" style={{ maxWidth: '75%' }}>
                                    <div className="avatar avatar-xs mt-1">
                                        <div className="avatar-img rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center fw-bold text-xs">U1</div>
                                    </div>
                                    <div className="bg-white p-3 rounded-3 shadow-sm">
                                        <p className="mb-1 text-dark">Thanks! I'll try that now.</p>
                                        <small className="text-muted" style={{ fontSize: '0.7rem' }}>10:33 AM</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card-footer bg-white p-3 border-top">
                            <div className="input-group">
                                <input type="text" className="form-control border-end-0 bg-light" placeholder="Type a message..." />
                                <button className="btn btn-primary px-4"><FiSend className="me-2" /> Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Messages.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
