'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { registerCustomer } from '../../store/slices/authSlice';
import { BsEye, BsEyeSlash, BsExclamationCircle } from 'react-icons/bs';

/*
curl -X POST "http://localhost:3000/auth/register/customer" \
     -H "Content-Type: application/json" \
     -d '{"name":"Test User","email":"test@example.com","password":"secret123","phone":"+2126000000"}'
*/

export default function RegisterForm() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',

        acceptTerms: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [localError, setLocalError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormState({
            ...formState,
            [name]: type === 'checkbox' ? checked : value
        });
        if (localError) setLocalError('');
    };

    const validateForm = () => {
        if (!formState.name || !formState.email || !formState.password || !formState.confirmPassword) {
            return 'Please fill in all required fields';
        }
        if (!/\S+@\S+\.\S+/.test(formState.email)) {
            return 'Please enter a valid email address';
        }
        if (formState.password.length < 8) {
            return 'Password must be at least 8 characters';
        }
        if (formState.password !== formState.confirmPassword) {
            return 'Passwords do not match';
        }
        if (!formState.acceptTerms) {
            return 'You must accept the Terms and Privacy Policy';
        }
        return null; // Valid
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError('');

        const validationError = validateForm();
        if (validationError) {
            setLocalError(validationError);
            return;
        }

        try {
            const resultAction = await dispatch(registerCustomer({
                name: formState.name,
                email: formState.email,
                password: formState.password,

            }));

            if (registerCustomer.fulfilled.match(resultAction)) {
                // Success: Redirect to account or login?
                // Per existing pattern or preference: redirect to account if token returned (auto-login)
                router.push('/account');
            } else {
                // Redux will set state.auth.error, but we can also handle it here if payload is structured
                setLocalError(resultAction.payload || 'Registration failed');
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
                    <div>{localError || typeof error === 'string' ? error : 'Registration failed'}</div>
                </div>
            )}

            {/* Name Field */}
            <div className="form-floating mb-3">
                <input
                    type="text"
                    className="form-control"
                    id="floatingName"
                    placeholder="John Doe"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    disabled={loading}
                    required
                />
                <label htmlFor="floatingName">Full Name</label>
            </div>

            {/* Email Field */}
            <div className="form-floating mb-3">
                <input
                    type="email"
                    className="form-control"
                    id="floatingEmail"
                    placeholder="name@example.com"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    disabled={loading}
                    required
                />
                <label htmlFor="floatingEmail">Email Address</label>
            </div>



            {/* Password Field */}
            <div className="form-floating mb-3 position-relative">
                <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                    value={formState.password}
                    onChange={handleChange}
                    disabled={loading}
                    required
                />
                <label htmlFor="floatingPassword">Password (min 8 chars)</label>
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-muted text-decoration-none me-2"
                    tabIndex="-1"
                >
                    {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
                </button>
            </div>

            {/* Confirm Password Field */}
            <div className="form-floating mb-4 position-relative">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    className={`form-control ${formState.confirmPassword && formState.password !== formState.confirmPassword ? 'is-invalid' : ''
                        }`}
                    id="floatingConfirmPassword"
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={formState.confirmPassword}
                    onChange={handleChange}
                    disabled={loading}
                    required
                />
                <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="btn btn-link position-absolute top-50 end-0 translate-middle-y text-muted text-decoration-none me-2"
                    tabIndex="-1"
                >
                    {showConfirmPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
                </button>
            </div>

            {/* Terms Checkbox */}
            <div className="form-check mb-4">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formState.acceptTerms}
                    onChange={handleChange}
                    disabled={loading}
                />
                <label className="form-check-label small text-muted" htmlFor="acceptTerms">
                    I agree to the <Link href="#" className="text-secondary">Terms</Link> and <Link href="#" className="text-secondary">Privacy Policy</Link>.
                </label>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="btn btn-primary w-100 py-3 rounded-3 fw-bold ls-1 text-uppercase mb-4"
                disabled={loading || !formState.acceptTerms}
                style={{ transition: 'all 0.2s' }}
            >
                {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : null}
                {loading ? 'Creating Account...' : 'SIGN UP'}
            </button>

            {/* Switch to Login */}
            <div className="text-center">
                <span className="text-muted me-2">Already have an account?</span>
                <Link href="/login" className="text-primary fw-bold text-decoration-none hover-underline">
                    Log in
                </Link>
            </div>
        </form>
    );
}
