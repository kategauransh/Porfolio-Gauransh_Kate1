const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

/**
 * Helper to make HTTP requests with automatic header injection
 */
async function request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...options.headers,
    };

    const config = {
        ...options,
        headers,
    };

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const data = await response.json();
        
        if (!response.ok) {
            // Throw the message sent by the backend, or a generic error
            throw new Error(data.message || `HTTP error! Status: ${response.status}`);
        }
        
        return data;
    } catch (error) {
        console.error(`API Error in ${endpoint}:`, error.message);
        throw error;
    }
}

export const api = {
    // Auth endpoints
    async register(username, email, password, role) {
        return request('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ username, email, password, role }),
        });
    },

    async login(username, password) {
        return request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
    },

    // Protected endpoints
    async getUserDashboard() {
        return request('/dashboard/user', {
            method: 'GET',
        });
    },

    async getAdminDashboard() {
        return request('/dashboard/admin', {
            method: 'GET',
        });
    }
};
