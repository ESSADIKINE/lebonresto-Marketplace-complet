"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../components/auth/AuthProvider';

export default function OwnerRegisterPage() {
    const { register } = useAuth();
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', password: '', company_name: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await register(formData);
            window.location.href = `/verify-email?email=${encodeURIComponent(formData.email)}`;
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            setLoading(false);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '450px', width: '100%' }}>
                <h3 className="text-center fw-bold mb-3">Join LeBonResto</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Restaurant/Company Name</label>
                        <input type="text" className="form-control" required
                            value={formData.company_name}
                            onChange={e => setFormData({ ...formData, company_name: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Full Name</label>
                        <input type="text" className="form-control" required
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Phone</label>
                        <input type="text" className="form-control" required
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Email</label>
                        <input type="email" className="form-control" required
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input type="password" className="form-control" required
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>

                    <div className="text-center mt-3">
                        Already have an account? <Link href="/login" className="text-decoration-none">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
