import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

let accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

export const setAccessToken = (token) => {
    accessToken = token;
    if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', token);
    }
};

export const getAccessToken = () => accessToken;

export const clearAccessToken = () => {
    accessToken = null;
    if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('lb_user_profile');
    }
};

export const setUserProfile = (user) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('lb_user_profile', JSON.stringify(user));
    }
};

export const getUserProfile = () => {
    if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('lb_user_profile');
        return stored ? JSON.parse(stored) : null;
    }
    return null;
};

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Important for Refresh Cookie
});

// Request Interceptor
apiClient.interceptors.request.use(
    (config) => {
        if (accessToken) {
            console.log('[apiClient] Attaching Access Token to request:', config.url);
            config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
            console.log('[apiClient] No Access Token found for:', config.url);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        console.log('[apiClient] Error Response:', error.response?.status, error.config?.url);

        if (error.response && error.response.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/refresh')) {
            console.log('[apiClient] 401 detected. Attempting Refresh...');
            originalRequest._retry = true;

            try {
                // Attempt Refresh
                const { data } = await apiClient.post('/auth/customer/refresh');
                console.log('[apiClient] Refresh Successful. New Token received.');

                if (data && data.access_token) {
                    setAccessToken(data.access_token);
                    originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
                    return apiClient(originalRequest);
                }
            } catch (refreshError) {
                console.error('[apiClient] Refresh Failed:', refreshError.message);
                console.error('[apiClient] Refresh Failure Details:', refreshError.response?.data);
                // Refresh failed - Logout
                clearAccessToken();
                if (typeof window !== 'undefined') {
                    // Just reload or do nothing. Redirecting to 404 is bad.
                    // window.location.href = '/'; 
                }
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
