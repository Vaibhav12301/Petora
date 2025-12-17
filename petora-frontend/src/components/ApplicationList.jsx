import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ApplicationDetailModal from './ApplicationDetailModal'; 

const API_BASE_URL = 'http://localhost:5000';

const ApplicationList = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedApplication, setSelectedApplication] = useState(null); // State for modal data

    // fetchApplications function remains the same (as defined in previous response)
    const fetchApplications = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get(`${API_BASE_URL}/api/applications`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // Sort by status to bring 'Submitted' to the top
            const sortedApps = response.data.sort((a, b) => {
                if (a.status === 'Submitted') return -1;
                if (b.status === 'Submitted') return 1;
                return new Date(b.createdAt) - new Date(a.createdAt);
            });
            setApplications(sortedApps);
        } catch (err) {
            console.error("Error fetching applications:", err);
            setError("Failed to load applications. Make sure the server is running.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchApplications();
    }, [fetchApplications]);

    const handleViewDetails = (application) => {
        setSelectedApplication(application);
    };

    const handleCloseModal = () => {
        setSelectedApplication(null);
    };

    const handleActionSuccess = (newStatus) => {
        // To refresh and trigger a new fetch
        fetchApplications();
    };

    if (loading) return <p className="loading-message">Loading adoption applications...</p>;
    if (error) return <div className="error-message">{error}</div>;
    
    return (
        <div className="application-list-container">
            <h2 className="list-heading">Adoption Applications ({applications.length})</h2>

            {applications.length === 0 ? (
                <p className="no-applications-message">No new applications at this time.</p>
            ) : (
                <table className="applications-table">
                    <thead>
                        <tr>
                            <th>Pet Name</th>
                            <th>Applicant Name</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map(app => (
                            <tr key={app._id}>
                                <td>{app.petId ? app.petId.name : 'Pet Deleted'}</td>
                                <td>{app.applicantName}</td>
                                <td>{app.applicantEmail}</td>
                                <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                                <td><span className={`status-badge status-${app.status.toLowerCase()}`}>{app.status}</span></td>
                                <td>
                                    <button 
                                        className="button secondary action-view"
                                        onClick={() => handleViewDetails(app)} // <-- View Details Handler
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Application Detail Modal */}
            {selectedApplication && (
                <ApplicationDetailModal
                    application={selectedApplication}
                    onClose={handleCloseModal}
                    onActionSuccess={handleActionSuccess}
                />
            )}
        </div>
    );
};

export default ApplicationList;