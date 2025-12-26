"use client";
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '../../components/auth/AuthProvider';

export default function VerifyEmailPage() {
    const { verifyOtp, requestOtp } = useAuth();
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || '';

    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);
        try {
            await verifyOtp(email, otp, 'verify');
            window.location.href = '/dashboard';
        } catch (err) {
            setError(err.response?.data?.message || 'Verification failed');
            setLoading(false);
        }
    };

    const handleResend = async () => {
        try {
            await requestOtp(email, 'verify');
            setMessage('OTP resent successfully');
        } catch (err) {
            setError('Could not resend OTP');
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="card shadow-sm border-0 p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h3 className="text-center fw-bold mb-3">Verify Email</h3>
                <p className="text-center text-muted small">Enter the 6-digit code sent to {email}</p>

                {error && <div className="alert alert-danger">{error}</div>}
                {message && <div className="alert alert-success">{message}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control text-center fs-4"
                            maxLength={6}
                            placeholder="000000"
                            required
                            value={otp}
                            onChange={e => setOtp(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary w-100" type="submit" disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify'}
                    </button>

                    <div className="text-center mt-3">
                        <button type="button" className="btn btn-link text-decoration-none" onClick={handleResend}>
                            Resend Code
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
