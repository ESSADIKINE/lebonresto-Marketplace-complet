'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { loginOwner } from '../../store/slices/authSlice';
import { BsEye, BsEyeSlash, BsExclamationCircle } from 'react-icons/bs';

export default function LoginForm() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const [formState, setFormState] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [localError, setLocalError] = useState('');

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        });
        if (localError) setLocalError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');

        if (!formState.email || !formState.password) {
            setLocalError('Please fill in all fields');
            return;
        }

        try {
            const resultAction = await dispatch(loginOwner({
                email: formState.email,
                password: formState.password
            }));

            if (loginOwner.fulfilled.match(resultAction)) {
                router.push('/dashboard');
            } else {
                setLocalError('Invalid email or password');
            }
        } catch (err) {
            setLocalError('An error occurred. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-100">
            {/* Error Alert */}
            {(error || localError) && (
                <div className="alert alert-danger d-flex align-items-center py-2 mb-4 small" role="alert">
                    <BsExclamationCircle className="me-2" />
                    <div>{localError || typeof error === 'string' ? error : 'Login failed'}</div>
                </div>
            )}

            {/* Email Field */}
            <div className="form-floating mb-3">
                <input
                    type="email"
                    className={`form-control ${localError ? 'is-invalid' : ''}`}
                    id="floatingInput"
                    placeholder="name@example.com"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    disabled={loading}
                    aria-invalid={!!localError}
                />
                <label htmlFor="floatingInput">Email Address</label>
            </div>

            {/* Password Field */}
            <div className="form-floating mb-4 position-relative">
                <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${localError ? 'is-invalid' : ''}`}
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                    disabled={loading}
                    aria-invalid={!!localError}
                />
                <label htmlFor="floatingPassword">Password</label>

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-muted text-decoration-none me-2"
                    style={{ zIndex: 10 }}
                    tabIndex="-1"
                >
                    {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
                </button>

                <div className="text-end mt-2">
                    <Link href="/forgot-password" className="text-decoration-none small text-muted hover-primary">
                        Forgot password?
                    </Link>
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="btn btn-primary w-100 py-3 rounded-3 fw-bold ls-1 text-uppercase mb-4"
                disabled={loading}
                style={{ transition: 'all 0.2s' }}
            >
                {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : null}
                {loading ? 'Connecting...' : 'Login to Dashboard'}
            </button>

            {/* Switch to Register */}
            <div className="text-center">
                <span className="text-muted me-2">Become a partner?</span>
                <Link href="/register" className="text-primary fw-bold text-decoration-none hover-underline">
                    Register your restaurant
                </Link>
            </div>
        </form>
    );
}
