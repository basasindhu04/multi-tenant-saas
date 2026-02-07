import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        tenantName: '',
        subdomain: '',
        adminEmail: '',
        adminPassword: '',
        adminFullName: ''
    });
    const { registerTenant } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await registerTenant(formData);
        if (res.success) {
            navigate('/login');
        } else {
            setError(res.message);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <form onSubmit={handleSubmit} style={{ width: '400px', padding: '20px', border: '1px solid #ccc' }}>
                <h2>Register Tenant</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <input name="tenantName" placeholder="Organization Name" required onChange={handleChange} style={{ display: 'block', width: '100%', marginBottom: '10px' }} />
                <input name="subdomain" placeholder="Subdomain" required onChange={handleChange} style={{ display: 'block', width: '100%', marginBottom: '10px' }} />
                <input name="adminFullName" placeholder="Admin Full Name" required onChange={handleChange} style={{ display: 'block', width: '100%', marginBottom: '10px' }} />
                <input name="adminEmail" type="email" placeholder="Admin Email" required onChange={handleChange} style={{ display: 'block', width: '100%', marginBottom: '10px' }} />
                <input name="adminPassword" type="password" placeholder="Password" required onChange={handleChange} style={{ display: 'block', width: '100%', marginBottom: '10px' }} />

                <button type="submit" style={{ width: '100%', padding: '10px' }}>Register</button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
};

export default Register;
