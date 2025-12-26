"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient, { setAccessToken, clearAccessToken } from '../../lib/apiClient';

const AuthContext = createContext({
    user: null,
    loading: true,
    isAuthenticated: false,
    needsVerification: false,
    login: async () => { },
    register: async () => { },
    logout: async () => { },
    requestOtp: async () => { },
    verifyOtp: async () => { },
    resetPassword: async () => { },
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAuth = async () => {
        try {
            // Owner Profile Endpoint
            const { data } = await apiClient.get('/auth/owner/me');
            setUser(data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (email, password) => {
        const { data } = await apiClient.post('/auth/owner/login', { email, password });
        setAccessToken(data.access_token);
        setUser(data.user);
        return data;
    };

    const register = async (dto) => {
        return apiClient.post('/auth/owner/register', dto);
    };

    const logout = async () => {
        try {
            await apiClient.post('/auth/owner/logout');
        } catch (e) { /* ignore */ }
        clearAccessToken();
        setUser(null);
        window.location.href = '/login';
    };

    const requestOtp = async (email, purpose) => {
        return apiClient.post('/auth/owner/otp/send', { email, purpose });
    };

    const verifyOtp = async (email, otp, purpose) => {
        const res = await apiClient.post('/auth/owner/otp/verify', { email, otp, purpose });
        if (purpose === 'verify' && user) {
            setUser({ ...user, is_verified: true });
        }
        return res.data;
    };

    const resetPassword = async (email, otp, newPassword) => {
        return apiClient.post('/auth/owner/password/reset', { email, otp, newPassword });
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            isAuthenticated: !!user,
            needsVerification: user && !user.is_verified,
            login,
            register,
            logout,
            requestOtp,
            verifyOtp,
            resetPassword
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
