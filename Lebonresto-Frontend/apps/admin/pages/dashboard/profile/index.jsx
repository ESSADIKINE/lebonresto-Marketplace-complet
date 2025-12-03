import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import AdminPageHeader from '../../../components/admin/AdminPageHeader';
import AdminCard from '../../../components/admin/AdminCard';
import { FiUser, FiMail, FiPhone, FiMapPin, FiSave, FiCamera } from 'react-icons/fi';

export default function Profile() {
    return (
        <div className="container-fluid">
            <AdminPageHeader
                title="My Profile"
                subtitle="Manage your account settings and preferences."
            />

            <div className="row g-4">
                <div className="col-lg-4">
                    <AdminCard className="text-center p-4">
                        <div className="position-relative d-inline-block mb-4">
                            <div className="avatar avatar-xl" style={{ width: '120px', height: '120px' }}>
                                <img
                                    src="https://ui-avatars.com/api/?name=Admin+User&background=016B61&color=fff&bold=true&size=120"
                                    alt="Admin User"
                                    className="rounded-circle shadow"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', border: '4px solid #fff' }}
                                />
                            </div>
                            <button
                                className="btn btn-sm btn-primary rounded-circle shadow-sm position-absolute d-flex align-items-center justify-content-center"
                                title="Change Avatar"
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    bottom: '5px',
                                    right: '5px',
                                    padding: 0,
                                    border: '3px solid #fff'
                                }}
                            >
                                <FiCamera size={18} />
                            </button>
                        </div>
                        <h5 className="fw-bold mb-1 text-dark">Admin User</h5>
                        <p className="text-muted mb-3">Super Administrator</p>
                        <div className="d-flex justify-content-center gap-2">
                            <span className="admin-badge admin-badge-success">Active</span>
                            <span className="admin-badge admin-badge-info">Verified</span>
                        </div>
                    </AdminCard>
                </div>

                <div className="col-lg-8">
                    <AdminCard title="Personal Information">
                        <form>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">First Name</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0"><FiUser className="text-muted" /></span>
                                        <input type="text" className="form-control border-start-0 ps-0" defaultValue="Admin" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">Last Name</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0"><FiUser className="text-muted" /></span>
                                        <input type="text" className="form-control border-start-0 ps-0" defaultValue="User" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">Email Address</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0"><FiMail className="text-muted" /></span>
                                        <input type="email" className="form-control border-start-0 ps-0" defaultValue="admin@lebonresto.com" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">Phone Number</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0"><FiPhone className="text-muted" /></span>
                                        <input type="tel" className="form-control border-start-0 ps-0" defaultValue="+1 234 567 890" />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label fw-semibold text-dark">Address</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0"><FiMapPin className="text-muted" /></span>
                                        <input type="text" className="form-control border-start-0 ps-0" defaultValue="123 Admin St, Tech City" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </AdminCard>

                    <div className="text-end mt-3">
                        <button type="button" className="btn btn-primary px-4"><FiSave className="me-2" /> Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

Profile.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
