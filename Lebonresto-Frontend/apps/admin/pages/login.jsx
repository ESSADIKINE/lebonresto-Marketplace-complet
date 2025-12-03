import React from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function Login() {
    return (
        <>
            <Head>
                <title>Login - LeBonResto Admin</title>
            </Head>
            <section className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-5 col-lg-6 col-md-8">
                            <div className="card shadow-sm border-0 rounded-3">
                                <div className="card-body p-5">
                                    <div className="text-center mb-4">
                                        <h4 className="fw-bold text-primary">LeBonResto Admin</h4>
                                        <p className="text-muted">Sign in to manage the platform</p>
                                    </div>

                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label fw-medium">Email Address</label>
                                            <input type="email" className="form-control" placeholder="name@example.com" />
                                        </div>

                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <label className="form-label fw-medium mb-0">Password</label>
                                                <Link href="/forgot-password" className="text-primary text-sm fw-medium text-decoration-none">Forgot?</Link>
                                            </div>
                                            <input type="password" className="form-control" placeholder="*******" />
                                        </div>

                                        <div className="d-grid">
                                            <button type="submit" className="btn btn-primary fw-bold">Sign In</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="text-center mt-3">
                                <p className="text-muted text-sm">© {new Date().getFullYear()} LeBonResto. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
