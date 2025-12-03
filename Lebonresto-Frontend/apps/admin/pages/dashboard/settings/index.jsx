import React from 'react';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { FiGlobe, FiBell, FiSave } from 'react-icons/fi';

export default function Settings() {
    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold mb-0">Platform Settings</h4>
            </div>

            <div className="card border-0 shadow-sm mb-4">
                <div className="card-header bg-white py-3">
                    <h6 className="mb-0 fw-bold">General Settings</h6>
                </div>
                <div className="card-body">
                    <form>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label className="form-label">Platform Name</label>
                                <input type="text" className="form-control" defaultValue="LeBonResto" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Support Email</label>
                                <input type="email" className="form-control" defaultValue="support@lebonresto.com" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Default Currency</label>
                                <select className="form-select">
                                    <option selected>USD ($)</option>
                                    <option>EUR (€)</option>
                                    <option>GBP (£)</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">Timezone</label>
                                <select className="form-select">
                                    <option selected>UTC (GMT+00:00)</option>
                                    <option>EST (GMT-05:00)</option>
                                    <option>PST (GMT-08:00)</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3">
                    <h6 className="mb-0 fw-bold">Notification Preferences</h6>
                </div>
                <div className="card-body">
                    <div className="mb-3">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="notifyNewUser" defaultChecked />
                            <label className="form-check-label" htmlFor="notifyNewUser">Notify on new user registration</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="notifyNewResto" defaultChecked />
                            <label className="form-check-label" htmlFor="notifyNewResto">Notify on new restaurant submission</label>
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="notifyReports" defaultChecked />
                            <label className="form-check-label" htmlFor="notifyReports">Notify on content reports</label>
                        </div>
                    </div>

                    <div className="text-end mt-4">
                        <button type="button" className="btn btn-primary"><FiSave className="me-2" /> Save Settings</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

Settings.getLayout = function getLayout(page) {
    return <DashboardLayout>{page}</DashboardLayout>;
};
