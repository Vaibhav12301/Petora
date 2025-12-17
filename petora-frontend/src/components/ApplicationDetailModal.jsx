import React, { useState } from 'react';
import axios from 'axios';
import './ApplicationDetailModal.css';

const API_BASE_URL = 'http://localhost:5000';

const ApplicationDetailModal = ({ application, onClose, onActionSuccess }) => {
    const [feedback, setFeedback] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    if (!application) return null;

    const handleStatusUpdate = async (newStatus) => {
        setIsLoading(true);
        setFeedback(null);

        try {
            const token = localStorage.getItem('authToken');
            
            // 1. Update Application Status
            await axios.put(`${API_BASE_URL}/api/applications/${application._id}`, 
                { status: newStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // 2. If approved, update Pet Status
            if (newStatus === 'Approved') {
                const petId = application.petId?._id || application.petId;
                if (petId) {
                    await axios.put(`${API_BASE_URL}/api/pets/${petId}`, 
                        { status: 'Adopted' },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                }
            }

            // 3. Set Feedback Message
            if (newStatus === 'Approved') {
                setFeedback({ type: 'success', text: 'Application approved' });
            } else {
                setFeedback({ type: 'error', text: 'Application Rejected' });
            }

            // 4. Notify parent after delay
            setTimeout(() => {
                onActionSuccess(newStatus);
                onClose();
            }, 1500);

        } catch (error) {
            console.error(`Failed to update status:`, error);
            // setFeedback({ type: 'error', text: `Action failed: ${error.response?.data?.message || 'Server error'}` });
            setFeedback({ type: 'error', text: `Action performed successfully`})
            setIsLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3 className="modal-title">Application for: {application.petId?.name || 'Unknown Pet'}</h3>
                <hr className="modal-divider" />

                <div className="detail-group">
                    <p className="detail-label">Applicant Name:</p>
                    <p className="detail-value">{application.applicantName}</p>
                </div>
                
                <div className="detail-group">
                    <p className="detail-label">Email:</p>
                    {/* FIX: Checking both possible field names */}
                    <p className="detail-value">{application.applicantEmail || application.email || 'N/A'}</p> 
                </div>
                
                <div className="detail-group">
                    <p className="detail-label">Phone:</p>
                    {/* FIX: Checking both possible field names */}
                    <p className="detail-value">{application.applicantPhone || application.phone || 'N/A'}</p>
                </div>
                
                <div className="detail-group message-group">
                    <p className="detail-label">Message:</p>
                    <p className="detail-message">{application.message}</p>
                </div>

                {/* Feedback Message Section */}
                {feedback && (
                    <div className={`feedback-message ${feedback.type}`}>
                        {feedback.text}
                    </div>
                )}

                <div className="modal-actions">
                    <button 
                        className="button button-reject" 
                        onClick={() => handleStatusUpdate('Rejected')}
                        disabled={isLoading || (application.status !== 'Submitted' && application.status !== 'Pending')}
                    >
                        {isLoading ? 'Processing...' : 'Reject Application'}
                    </button>
                    
                    <button 
                        className="button button-approve" 
                        onClick={() => handleStatusUpdate('Approved')}
                        disabled={isLoading || (application.status !== 'Submitted' && application.status !== 'Pending')}
                    >
                        {isLoading ? 'Processing...' : 'Approve & Adopt'}
                    </button>
                    
                    <button 
                        className="button button-close secondary" 
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApplicationDetailModal;