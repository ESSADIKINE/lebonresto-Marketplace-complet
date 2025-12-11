'use client';

import React from 'react';
import AuthLayout from '../../components/auth/AuthLayout';
import RegisterForm from '../../components/auth/RegisterForm';

// curl -X POST "http://localhost:3000/auth/register/customer" -H "Content-Type: application/json" -d '{"name":"Test User","email":"test@example.com","password":"secret123"}'

export default function RegisterPage() {
    return (
        <AuthLayout
            title="Create your LeBonResto account"
            subtitleItems={["Attract", "Manage", "Retain"]}
            bottomNote={
                <span className="text-secondary small fw-light">
                    By registering, you agree to our Terms of Service and Privacy Policy.
                </span>
            }
        >
            <RegisterForm />
        </AuthLayout>
    );
}
