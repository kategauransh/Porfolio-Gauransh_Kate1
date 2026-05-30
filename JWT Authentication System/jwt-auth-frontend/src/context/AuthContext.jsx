import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hydrate state from localStorage on application load
    useEffect(() => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        const email = localStorage.getItem('email');
        const role = localStorage.getItem('role');

        if (token && username && email && role) {
            setUser({ token, username, email, role });
        }
        setLoading(false);
    }, []);

    const register = async (username, email, password, role) => {
        setError(null);
        try {
            const data = await api.register(username, email, password, role);
            saveSession(data);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const login = async (username, password) => {
        setError(null);
        try {
            const data = await api.login(username, password);
            saveSession(data);
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        setUser(null);
        setError(null);
    };

    const saveSession = (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('email', data.email);
        localStorage.setItem('role', data.role);
        setUser({
            token: data.token,
            username: data.username,
            email: data.email,
            role: data.role
        });
    };

    const clearError = () => setError(null);

    return (
        <AuthContext.Provider value={{ user, loading, error, register, login, logout, clearError }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
