import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PetCreationForm from '../components/PetCreationForm'; 
import ApplicationList from '../components/ApplicationList'; 
import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('addPet');
    const adminName = localStorage.getItem('adminName') || 'Shelter Admin';

    // Basic Auth Check
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('adminName');
        navigate('/');
    };

    return (
        <div className="dashboard-wrapper">
            {/* Header */}
            <div className="dashboard-header">
                <h1 className="welcome-title">Welcome, {adminName}</h1>
                <button
                    onClick={handleLogout}
                    className="button logout-button"
                >
                    Logout
                </button>
            </div>

            {/* Navigation Tabs */}
            <div className="tab-bar-container">
                <nav className="tab-nav">
                    <button
                        onClick={() => setActiveTab('addPet')}
                        className={`tab-button ${
                            activeTab === 'addPet' ? 'tab-active' : ''
                        }`}
                    >
                        Add New Pet
                    </button>
                    <button
                        onClick={() => setActiveTab('applications')}
                        className={`tab-button ${
                            activeTab === 'applications' ? 'tab-active' : ''
                        }`}
                    >
                        Manage Applications
                    </button>
                    {/*  If I want to add more tabs for Pet Management etc. */}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
                {activeTab === 'addPet' && <PetCreationForm />}
                {/* Display the ApplicationList component */}
                {activeTab === 'applications' && <ApplicationList />}
            </div>
        </div>
    );
};

export default AdminDashboard;