"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../components/auth/AuthProvider';
import { BsEnvelope, BsLock } from 'react-icons/bs';

export default function OwnerLoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await login(email, password);
            if (data.needsVerification) {
                window.location.href = `/verify-email?email=${encodeURIComponent(email)}`;
            } else {
                window.location.href = '/dashboard';
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            setLoading(false);
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h3 className="text-center fw-bold mb-3">Owner Portal</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <div className="input-group">
                            <span className="input-group-text"><BsEnvelope /></span>
                            <input
                                type="email"
                                className="form-control"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <div className="input-group">
                            <span className="input-group-text"><BsLock /></span>
                            <input
                                type="password"
                                className="form-control"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <div className="text-center mt-3">
                        <Link href="/register" className="text-decoration-none">Register New Restaurant</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
