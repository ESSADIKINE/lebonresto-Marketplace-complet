'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import apiClient from '../../../lib/apiClient';

const bg = '/assets/img/auth-bg.png';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // TODO: Implement forgot-password endpoint in backend
            // await apiClient.post('/auth/forgot-password', { email });

            // Placeholder success message
            setSuccess(true);
            console.log('Password reset request for:', email);
        } catch (err) {
            setError(err.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <section style={{ backgroundImage: `url(${bg})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundColor: '#ffe8ee', backgroundSize: 'cover', minHeight: '100vh' }}>
                <div className="container">
                    <div className="row align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                        <div className="col-xl-5 col-lg-7 col-md-9">
                            <div className="authWrap">
                                <div className="authhead">
                                    <div className="text-center mb-4">
                                        <Link href="/" className="text-decoration-none">
                                            <h2 className="text-primary fw-bold">LeBonResto</h2>
                                        </Link>
                                    </div>
                                </div>
                                <div className="authbody d-black mb-4">
                                    <div className="card rounded-4 p-sm-5 p-4 border-0 shadow-lg">
                                        <div className="card-body p-0">
                                            <div className="text-center">
                                                <h1 className="mb-2 fs-2 fw-bold">Mot de passe oublié ?</h1>
                                                <p className="text-muted">Entrez votre email pour réinitialiser votre mot de passe</p>
                                            </div>

                                            {error && (
                                                <div className="alert alert-danger mt-3" role="alert">
                                                    {error}
                                                </div>
                                            )}

                                            {success && (
                                                <div className="alert alert-success mt-3" role="alert">
                                                    Un lien de réinitialisation a été envoyé à votre email. (Fonctionnalité à venir)
                                                </div>
                                            )}

                                            <form className="mt-4 text-start" onSubmit={handleSubmit}>
                                                <div className="form mb-4">
                                                    <div className="form-group mb-4">
                                                        <label className="fw-medium mb-2">Email</label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            placeholder="nom@exemple.com"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                            required
                                                        />
                                                    </div>

                                                    <div className="form-group mb-4">
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary w-100 fw-bold py-3 rounded-3"
                                                            disabled={loading}
                                                        >
                                                            {loading ? (
                                                                <>
                                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                                    Envoi...
                                                                </>
                                                            ) : (
                                                                'Envoyer le lien'
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="authfooter">
                                    <div className="text-center">
                                        <p className="text-dark mb-0">Retour à la <Link href="/login" className="fw-bold text-primary">Connexion</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
