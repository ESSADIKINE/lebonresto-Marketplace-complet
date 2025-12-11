'use client';

import React from 'react';
import AuthLayout from '../../components/auth/AuthLayout';
import LoginForm from '../../components/auth/LoginForm';

// curl -X POST "http://localhost:3000/auth/login" -H "Content-Type: application/json" -d '{"email":"customer@test.com","password":"password123"}'

export default function LoginPage() {
    return (
        <AuthLayout
            title="Welcome to LeBonResto"
            subtitleItems={["Attract", "Manage", "Retain"]}
            bottomNote={
                <span className="text-primary fw-medium small" style={{ fontSize: '0.75rem' }}>
                    Are you a restaurant owner? <a href="/for-restaurants" className="text-decoration-none fw-bold">Click here</a>
                </span>
            }
        >
            <LoginForm />
        </AuthLayout>
    );
}
