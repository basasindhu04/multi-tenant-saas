import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        subdomain: ''
    });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await login(formData.email, formData.password, formData.subdomain);
        if (res.success) {
            navigate('/dashboard');
        } else {
            setError(res.message);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <form onSubmit={handleSubmit} style={{ width: '300px', padding: '20px', border: '1px solid #ccc' }}>
                <h2>Login</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <div style={{ marginBottom: '10px' }}>
                    <label>Email</label>
                    <input
                        type="email"
                        required
                        style={{ width: '100%' }}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Password</label>
                    <input
                        type="password"
                        required
                        style={{ width: '100%' }}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Tenant Subdomain</label>
                    <input
                        type="text"
                        required
                        style={{ width: '100%' }}
                        value={formData.subdomain}
                        onChange={(e) => setFormData({ ...formData, subdomain: e.target.value })}
                    />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px' }}>Login</button>
                <p>Don't have an account? <Link to="/register">Register Tenant</Link></p>
            </form>
        </div>
    );
};

export default Login;
