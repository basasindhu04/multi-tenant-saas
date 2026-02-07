import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div style={{ padding: '20px' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                <h1>Dashboard</h1>
                <div>
                    <span style={{ marginRight: '20px' }}>Welcome, {user?.fullName} ({user?.role})</span>
                    <button onClick={logout}>Logout</button>
                </div>
            </header>

            <div style={{ marginTop: '20px' }}>
                <h3>Tenant: {user?.tenant?.name || 'N/A'}</h3>

                <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
                    <div style={{ border: '1px solid #ccc', padding: '20px', width: '200px' }}>
                        <h4>Projects</h4>
                        <Link to="/projects">View Projects</Link>
                    </div>
                    {user?.role === 'tenant_admin' && (
                        <div style={{ border: '1px solid #ccc', padding: '20px', width: '200px' }}>
                            <h4>Users</h4>
                            {/* <Link to="/users">Manage Users</Link> */}
                            <p>Manage Users (Link not implemented in this minimal version)</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
