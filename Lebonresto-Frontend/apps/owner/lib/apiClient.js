import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';

let accessToken = null;

export const setAccessToken = (token) => {
    accessToken = token;
};

export const getAccessToken = () => accessToken;

export const clearAccessToken = () => {
    accessToken = null;
    if (typeof window !== 'undefined') {
        localStorage.removeItem('lb_owner_profile');
    }
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
            config.headers.Authorization = `Bearer ${accessToken}`;
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

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Attempt Refresh specific for OWNER
                const { data } = await apiClient.post('/auth/owner/refresh');

                if (data && data.access_token) {
                    setAccessToken(data.access_token);
                    originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
                    return apiClient(originalRequest);
                }
            } catch (refreshError) {
                // Refresh failed - Logout
                clearAccessToken();
                if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/auth/login')) {
                    window.location.href = '/login'; // Owner app login route
                }
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
