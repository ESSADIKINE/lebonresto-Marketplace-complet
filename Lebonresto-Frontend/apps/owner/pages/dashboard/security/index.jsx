import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import DashboardPageHeader from '../../../components/dashboard/DashboardPageHeader';
import DashboardCard from '../../../components/dashboard/DashboardCard';
import { FiLock, FiShield, FiKey } from 'react-icons/fi';

export default function Security() {
    return (
        <div className="container-fluid">
            <DashboardPageHeader
                title="Security Settings"
                subtitle="Manage your password and security preferences."
            />

            <div className="row g-4">
                <div className="col-lg-8">
                    <DashboardCard title="Change Password">
                        <form>
                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="form-label fw-semibold text-dark">Current Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0"><FiLock className="text-muted" /></span>
                                        <input type="password" className="form-control border-start-0 ps-0" placeholder="Enter current password" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">New Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0"><FiKey className="text-muted" /></span>
                                        <input type="password" className="form-control border-start-0 ps-0" placeholder="Enter new password" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-semibold text-dark">Confirm New Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-end-0"><FiKey className="text-muted" /></span>
                                        <input type="password" className="form-control border-start-0 ps-0" placeholder="Confirm new password" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <button type="submit" className="btn btn-primary px-4">Update Password</button>
                            </div>
                        </form>
                    </DashboardCard>

                    <DashboardCard title="Two-Factor Authentication" className="mt-4">
                        <div className="d-flex align-items-start gap-3">
                            <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '60px', height: '60px' }}>
                                <FiShield size={28} className="text-primary" />
                            </div>
                            <div className="flex-grow-1">
                                <h6 className="fw-bold mb-2">Secure Your Account</h6>
                                <p className="text-muted mb-3">
                                    Two-factor authentication adds an extra layer of security to your account.
                                    You'll need to enter a code from your phone in addition to your password.
                                </p>
                                <button className="btn btn-outline-primary">Enable 2FA</button>
                            </div>
                        </div>
                    </DashboardCard>
                </div>

                <div className="col-lg-4">
                    <DashboardCard title="Security Tips">
                        <div className="d-flex flex-column gap-3">
                            <div className="d-flex align-items-start gap-2">
                                <div className="bg-success bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '32px', height: '32px' }}>
                                    <FiShield size={16} className="text-success" />
                                </div>
                                <div>
                                    <h6 className="fw-semibold mb-1" style={{ fontSize: '0.875rem' }}>Use a Strong Password</h6>
                                    <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>
                                        Use at least 8 characters with a mix of letters, numbers, and symbols.
                                    </p>
                                </div>
                            </div>
                            <div className="d-flex align-items-start gap-2">
                                <div className="bg-warning bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '32px', height: '32px' }}>
                                    <FiLock size={16} className="text-warning" />
                                </div>
                                <div>
                                    <h6 className="fw-semibold mb-1" style={{ fontSize: '0.875rem' }}>Don't Share Your Password</h6>
                                    <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>
                                        Never share your password with anyone, including LeBonResto staff.
                                    </p>
                                </div>
                            </div>
                            <div className="d-flex align-items-start gap-2">
                                <div className="bg-info bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '32px', height: '32px' }}>
                                    <FiKey size={16} className="text-info" />
                                </div>
                                <div>
                                    <h6 className="fw-semibold mb-1" style={{ fontSize: '0.875rem' }}>Change Regularly</h6>
                                    <p className="text-muted mb-0" style={{ fontSize: '0.8rem' }}>
                                        Update your password every 3-6 months for better security.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </DashboardCard>
                </div>
            </div>
        </div>
    );
}

Security.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
