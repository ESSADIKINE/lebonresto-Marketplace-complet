import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { FiLock, FiShield, FiSave } from 'react-icons/fi';

export default function Security() {
    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Security Settings</h4>
            </div>

            <div className="row g-4">
                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white py-3">
                            <h6 className="mb-0 fw-bold">Change Password</h6>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Current Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light"><FiLock /></span>
                                        <input type="password" class="form-control" placeholder="********" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">New Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light"><FiLock /></span>
                                        <input type="password" class="form-control" placeholder="********" />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Confirm New Password</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light"><FiLock /></span>
                                        <input type="password" class="form-control" placeholder="********" />
                                    </div>
                                </div>
                                <div className="text-end">
                                    <button type="button" className="btn btn-primary"><FiSave className="me-2" /> Update Password</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-header bg-white py-3">
                            <h6 className="mb-0 fw-bold">Two-Factor Authentication</h6>
                        </div>
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-4">
                                <div className="avatar avatar-md bg-primary-subtle text-primary rounded d-flex align-items-center justify-content-center me-3">
                                    <FiShield size={24} />
                                </div>
                                <div>
                                    <h6 className="fw-bold mb-1">Two-Factor Authentication (2FA)</h6>
                                    <p className="text-muted text-sm mb-0">Add an extra layer of security to your account.</p>
                                </div>
                            </div>

                            <div className="form-check form-switch mb-3">
                                <input className="form-check-input" type="checkbox" id="2faSwitch" />
                                <label className="form-check-label fw-medium" htmlFor="2faSwitch">Enable 2FA</label>
                            </div>

                            <p className="text-muted text-sm">
                                When enabled, you'll be required to enter a code sent to your mobile device or email when logging in.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Security.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
