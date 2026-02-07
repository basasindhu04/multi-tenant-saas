import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Use environment variable or default to backend service name for Docker
    // BUT: Browser runs on host, so it needs to access backend via localhost:5000 
    // unless we are using a proxy. The docker-compose maps 5000:5000, so localhost:5000 works.
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                // Check expiry
                if (decoded.exp * 1000 < Date.now()) {
                    logout();
                } else {
                    // Verify with backend
                    axios.get(`${API_URL}/auth/me`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                        .then(res => setUser(res.data.data))
                        .catch(() => logout())
                        .finally(() => setLoading(false));
                }
            } catch (e) {
                logout();
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, [API_URL]);

    const login = async (email, password, subdomain) => {
        try {
            const res = await axios.post(`${API_URL}/auth/login`, { email, password, tenantSubdomain: subdomain });
            const { token, user } = res.data.data;
            localStorage.setItem('token', token);
            setUser(user);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const registerTenant = async (data) => {
        try {
            await axios.post(`${API_URL}/auth/register-tenant`, data);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
        registerTenant,
        loading,
        API_URL
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
