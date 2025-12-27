"use client";
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiClient, { setAccessToken, clearAccessToken, getUserProfile, setUserProfile } from '../../lib/apiClient';

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

// Re-add missing component definition
export const AuthProvider = ({ children }) => {
    const router = useRouter();

    // 1. Initialize State
    // We try to read from local storage immediately to avoid "guest" flash.
    const [user, setUser] = useState(() => getUserProfile());

    // Status: 'loading' | 'authenticated' | 'unauthenticated'
    // If we have a cached user, we start as 'authenticated' (optimistic).
    // Otherwise, we start as 'loading' while we check the server/cookie.
    // Status: 'loading' | 'authenticated' | 'unauthenticated'
    // Starts as 'loading' to match Server (avoid Hydration Error)
    const [status, setStatus] = useState('loading');

    const checkAuth = async () => {
        // If we don't have a user, ensure we are in loading state
        if (!getUserProfile()) {
            setStatus('loading');
        }

        console.log('[AuthProvider] checkAuth: Starting...');
        try {
            const { data } = await apiClient.get('/auth/customer/me');
            console.log('[AuthProvider] checkAuth: User verified', data.email);

            setUser(data);
            setUserProfile(data);
            setStatus('authenticated');
        } catch (error) {
            console.warn('[AuthProvider] checkAuth: Session restoration failed or valid logout.', error.message);

            // Clear everything
            setUser(null);
            setStatus('unauthenticated');
            // We do not clearAccessToken() here automatically, 
            // because the interceptor might have already done it or we want to keep it for retry?
            // Actually, if /me failed after retries, we are definitely logged out.
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (email, password) => {
        setStatus('loading');
        try {
            const { data } = await apiClient.post('/auth/customer/login', { email, password });
            setAccessToken(data.access_token);

            // Fetch full profile immediately to ensure we have avatar_url and latest details
            // This is robust against the login endpoint returning partial data
            try {
                const meRes = await apiClient.get('/auth/customer/me');
                setUser(meRes.data);
                setUserProfile(meRes.data);
            } catch (e) {
                console.warn('Profile fetch failed after login, using fallback', e);
                setUser(data.user);
                setUserProfile(data.user);
            }

            setStatus('authenticated');
            return data;
        } catch (error) {
            setStatus('unauthenticated');
            throw error;
        }
    };

    const register = async (dto) => {
        // Register doesn't immediately log in usually, or it does?
        // Depending on flow. For now just pass through.
        return apiClient.post('/auth/customer/register', dto);
    };

    const logout = async () => {
        setStatus('loading');
        try {
            await apiClient.post('/auth/customer/logout');
        } catch (e) { /* ignore */ }

        clearAccessToken();
        setUser(null);
        setStatus('unauthenticated');
        router.replace('/');
    };

    const requestOtp = async (email, purpose) => {
        return apiClient.post('/auth/customer/otp/send', { email, purpose });
    };

    const verifyOtp = async (email, otp, purpose) => {
        const res = await apiClient.post('/auth/customer/otp/verify', { email, otp, purpose });
        if (purpose === 'verify' && user) {
            const updatedUser = { ...user, is_verified: true };
            setUser(updatedUser);
            setUserProfile(updatedUser);
        }
        return res.data;
    };

    const resetPassword = async (email, otp, newPassword) => {
        return apiClient.post('/auth/customer/password/reset', { email, otp, newPassword });
    };

    return (
        <AuthContext.Provider value={{
            user,
            status,
            isAuthenticated: status === 'authenticated',
            isLoading: status === 'loading',
            needsVerification: user && !user.is_verified,
            login,
            register,
            logout,
            requestOtp,
            verifyOtp,
            resetPassword,
            refreshUser: checkAuth // Expose way to refresh profile
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
