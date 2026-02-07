import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const { API_URL } = useAuth();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get(`${API_URL}/projects`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProjects(res.data.data.projects);
            } catch (error) {
                console.error("Failed to fetch projects");
            }
        };
        fetchProjects();
    }, [API_URL, token]);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Projects</h2>
            <Link to="/dashboard">Back to Dashboard</Link>
            <div style={{ marginTop: '20px' }}>
                {projects.length === 0 ? (
                    <p>No projects found.</p>
                ) : (
                    <ul>
                        {projects.map(p => (
                            <li key={p.id}>
                                <strong>{p.name}</strong> - {p.status}
                                <br />
                                {p.description}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ProjectList;
