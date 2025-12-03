'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerCustomer, clearError } from '../../../store/slices/authSlice';

const bg = '/assets/img/auth-bg.png';
const logo = '/assets/img/icon.png';

export default function Register() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth || {});

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        first_name: '',
        last_name: '',
        phone: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [validationError, setValidationError] = useState('');

    useEffect(() => {
        // Clear any previous errors when component mounts
        dispatch(clearError());
    }, [dispatch]);

    useEffect(() => {
        // Redirect to grid-layout if already authenticated
        if (isAuthenticated) {
            router.push('/restaurants_grid');
        }
    }, [isAuthenticated, router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear validation error when user types
        setValidationError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setValidationError('Les mots de passe ne correspondent pas');
            return;
        }

        // Validate password length
        if (formData.password.length < 6) {
            setValidationError('Le mot de passe doit contenir au moins 6 caractères');
            return;
        }

        try {
            // Remove confirmPassword before sending to API
            const { confirmPassword, ...registerData } = formData;
            await dispatch(registerCustomer(registerData)).unwrap();
            // Redirect will happen via useEffect when isAuthenticated changes
        } catch (err) {
            // Error is handled by Redux state
            console.error('Registration failed:', err);
        }
    };

    return (
        <section
            style={{
                backgroundImage: `url(${bg})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#ffe8ee',
                backgroundSize: 'cover',
                minHeight: '100vh',
            }}
        >
            <div className="container">
                <div className="row align-items-center justify-content-center" style={{ minHeight: '100vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
                    <div className="col-xl-6 col-lg-8 col-md-10">
                        <div className="authWrap">
                            <div className="authhead">
                                <div className="text-center mb-4">
                                    <Link href="/">
                                        <img className="img-fluid" src={logo} width="55" alt="logo" />
                                    </Link>
                                </div>
                            </div>
                            <div className="authbody d-black mb-4">
                                <div className="card rounded-4 p-sm-5 p-4">
                                    <div className="card-body p-0">
                                        <div className="text-center">
                                            <h1 className="mb-2 fs-2">Créer un compte</h1>
                                            <p className="mb-0">Découvrez les meilleurs restaurants du Maroc</p>
                                        </div>

                                        {(error || validationError) && (
                                            <div className="alert alert-danger mt-3" role="alert">
                                                {validationError || (typeof error === 'string' ? error : 'Une erreur est survenue. Veuillez réessayer.')}
                                            </div>
                                        )}

                                        <form className="mt-4 text-start" onSubmit={handleSubmit}>
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Prénom</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="first_name"
                                                            value={formData.first_name}
                                                            onChange={handleChange}
                                                            placeholder="Jean"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-label">Nom</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            name="last_name"
                                                            value={formData.last_name}
                                                            onChange={handleChange}
                                                            placeholder="Dupont"
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">Adresse Email</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    placeholder="email@exemple.com"
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">Téléphone</label>
                                                <input
                                                    type="tel"
                                                    className="form-control"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="+212 6XX XX XX XX"
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">Mot de passe</label>
                                                <div className="position-relative">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        placeholder="••••••••"
                                                        required
                                                        minLength="6"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="btn btn-link position-absolute end-0 top-50 translate-middle-y"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        style={{ textDecoration: 'none' }}
                                                    >
                                                        {showPassword ? '🙈' : '👁️'}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className="form-label">Confirmer le mot de passe</label>
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    className="form-control"
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    placeholder="••••••••"
                                                    required
                                                />
                                            </div>

                                            <div className="form-group">
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id="terms"
                                                        required
                                                    />
                                                    <label className="form-check-label" htmlFor="terms">
                                                        J'accepte les{' '}
                                                        <Link href="/privacy-policy" className="text-primary">
                                                            conditions d'utilisation
                                                        </Link>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary full-width fw-medium"
                                                    disabled={loading}
                                                >
                                                    {loading ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                            Inscription...
                                                        </>
                                                    ) : (
                                                        "S'inscrire"
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="authfooter">
                                <div className="text-center">
                                    <p className="text-dark mb-0">
                                        Vous avez déjà un compte?
                                        <Link href="/login" className="fw-medium text-primary">
                                            {' '}
                                            Se connecter
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
