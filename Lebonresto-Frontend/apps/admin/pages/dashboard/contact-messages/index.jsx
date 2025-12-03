import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { FiSearch, FiMail, FiTrash2, FiCornerUpLeft } from 'react-icons/fi';

export default function ContactMessages() {
    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Contact Requests</h4>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3 border-0">
                    <div className="row g-3 align-items-center">
                        <div className="col-12">
                            <div className="position-relative">
                                <div className="position-absolute top-50 start-0 translate-middle-y ps-3" style={{ zIndex: 10 }}>
                                    <FiSearch className="text-muted" size={18} />
                                </div>
                                <input
                                    type="text"
                                    className="form-control ps-5 py-2 shadow-sm"
                                    placeholder="Search messages..."
                                    style={{
                                        borderRadius: '0.75rem',
                                        border: '2px solid var(--lb-gray-200)',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.2s ease',
                                        backgroundColor: '#ffffff'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = 'var(--lb-primary)';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(1, 107, 97, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'var(--lb-gray-200)';
                                        e.target.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="bg-light">
                            <tr>
                                <th className="py-3 ps-4">Sender</th>
                                <th className="py-3">Subject</th>
                                <th className="py-3">Date</th>
                                <th className="py-3 text-end pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3].map((i) => (
                                <tr key={i}>
                                    <td className="ps-4">
                                        <div className="d-flex align-items-center">
                                            <div className="avatar avatar-sm me-3">
                                                <div className="avatar-img rounded-circle bg-light d-flex align-items-center justify-content-center text-secondary">
                                                    <FiMail />
                                                </div>
                                            </div>
                                            <div>
                                                <h6 className="mb-0 fw-semibold">John Doe {i}</h6>
                                                <small className="text-muted">john{i}@example.com</small>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="fw-medium">Inquiry about pricing</span>
                                        <p className="text-muted text-sm text-truncate mb-0" style={{ maxWidth: '300px' }}>
                                            Hello, I would like to know more about your enterprise pricing plans...
                                        </p>
                                    </td>
                                    <td className="text-muted">Oct 25, 2023</td>
                                    <td className="text-end pe-4">
                                        <div className="d-flex justify-content-end gap-2">
                                            <button className="btn btn-sm btn-outline-primary"><FiCornerUpLeft /> Reply</button>
                                            <button className="btn btn-sm btn-outline-danger"><FiTrash2 /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

ContactMessages.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
