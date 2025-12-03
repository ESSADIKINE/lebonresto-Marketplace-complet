'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginCustomer, clearError } from '../../../store/slices/authSlice';

const bg = '/assets/img/auth-bg.png';
const logo = '/assets/img/icon.png';

export default function Login() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth || {});

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(loginCustomer(formData)).unwrap();
            // Redirect will happen via useEffect when isAuthenticated changes
        } catch (err) {
            // Error is handled by Redux state
            console.error('Login failed:', err);
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
                <div className="row align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                    <div className="col-xl-5 col-lg-7 col-md-9">
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
                                            <h1 className="mb-2 fs-2">Bienvenue</h1>
                                            <p className="mb-0">Connectez-vous à votre compte LeBonResto</p>
                                        </div>

                                        {error && (
                                            <div className="alert alert-danger mt-3" role="alert">
                                                {typeof error === 'string' ? error : 'Une erreur est survenue. Veuillez réessayer.'}
                                            </div>
                                        )}

                                        <form className="mt-4 text-start" onSubmit={handleSubmit}>
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
                                                <label className="form-label">Mot de passe</label>
                                                <div className="position-relative">
                                                    <input
                                                        type={showPassword ? 'text' : 'password'}
                                                        className="form-control"
                                                        name="password"
                                                        value={formData.password}
                                                        onChange={handleChange}
                                                        placeholder="••••••••"
                                                        required
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

                                            <div className="form-group d-flex align-items-center justify-content-between">
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id="rememberme"
                                                    />
                                                    <label className="form-check-label" htmlFor="rememberme">
                                                        Se souvenir de moi
                                                    </label>
                                                </div>
                                                <Link
                                                    href="/forgot-password"
                                                    className="text-primary fw-medium text-decoration-underline"
                                                >
                                                    Mot de passe oublié?
                                                </Link>
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
                                                            Connexion...
                                                        </>
                                                    ) : (
                                                        'Se connecter'
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
                                        Nouveau sur LeBonResto?
                                        <Link href="/register" className="fw-medium text-primary">
                                            {' '}
                                            Créer un compte
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
