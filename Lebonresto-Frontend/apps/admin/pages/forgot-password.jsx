import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function ForgotPassword() {
    return (
        <>
            <Head>
                <title>Forgot Password - LeBonResto Admin</title>
            </Head>
            <section className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-5 col-lg-6 col-md-8">
                            <div className="card shadow-sm border-0 rounded-3">
                                <div className="card-body p-5">
                                    <div className="text-center mb-4">
                                        <h4 className="fw-bold text-primary">LeBonResto Admin</h4>
                                        <p className="text-muted">Reset your password</p>
                                    </div>

                                    <form>
                                        <div className="mb-4">
                                            <label className="form-label fw-medium">Email Address</label>
                                            <input type="email" className="form-control" placeholder="name@example.com" />
                                            <div className="form-text">We'll send you a link to reset your password.</div>
                                        </div>

                                        <div className="d-grid gap-2">
                                            <button type="submit" className="btn btn-primary fw-bold">Send Reset Link</button>
                                            <Link href="/login" className="btn btn-light fw-medium">Back to Login</Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
