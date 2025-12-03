import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import DashboardPageHeader from '../../../components/dashboard/DashboardPageHeader';
import DashboardCard from '../../../components/dashboard/DashboardCard';
import { FiUser, FiMail, FiPhone, FiMapPin, FiSave, FiCamera, FiBriefcase } from 'react-icons/fi';

export default function Profile() {
    return (
        <div className="container-fluid">
            <DashboardPageHeader
                title="My Profile"
                subtitle="Manage your account settings and preferences."
            />

            <div className="row g-4">
                <div className="col-lg-4">
                    <DashboardCard className="text-center p-4">
                        <div className="position-relative d-inline-block mb-4">
                            <div className="avatar avatar-xl" style={{ width: '120px', height: '120px' }}>
                                <img
                                    src="https://ui-avatars.com/api/?name=Owner+User&background=016B61&color=fff&bold=true&size=120"
                                    alt="Owner User"
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
                        <h5 className="fw-bold mb-1 text-dark">Owner User</h5>
                        <p className="text-muted mb-3">Restaurant Owner</p>
                        <div className="d-flex justify-content-center gap-2">
                            <span className="admin-badge admin-badge-success">Active</span>
                            <span className="admin-badge admin-badge-info">Verified</span>
                        </div>
                    </DashboardCard>
                </div>

                <div className="col-lg-8">
                    <DashboardCard title="Personal Information">
                        <form>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">First Name</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0"><FiUser className="text-muted" /></span>
                                        <input type="text" className="form-control border-start-0 ps-0" defaultValue="Owner" />
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
                                        <input type="email" className="form-control border-start-0 ps-0" defaultValue="owner@lebonresto.com" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">Phone Number</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0"><FiPhone className="text-muted" /></span>
                                        <input type="tel" className="form-control border-start-0 ps-0" defaultValue="+1 234 567 890" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">Company Name</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0"><FiBriefcase className="text-muted" /></span>
                                        <input type="text" className="form-control border-start-0 ps-0" defaultValue="My Restaurant Group" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">VAT Number</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0"><FiBriefcase className="text-muted" /></span>
                                        <input type="text" className="form-control border-start-0 ps-0" defaultValue="FR12345678901" />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <label className="form-label fw-semibold text-dark">Address</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0"><FiMapPin className="text-muted" /></span>
                                        <input type="text" className="form-control border-start-0 ps-0" defaultValue="123 Restaurant St, Paris, France" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </DashboardCard>

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
