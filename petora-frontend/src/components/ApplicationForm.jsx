import React, { useState } from 'react';
import axios from 'axios';
import './ApplicationForm.css';

const API_BASE_URL = 'http://localhost:5000';

const ApplicationForm = ({ petId, petName }) => {
    const [formData, setFormData] = useState({
      applicantName: '',
      applicantEmail: '',
      applicantPhone: '',
      message: '',
    });
    const [status, setStatus] = useState(null); // 'success', 'error', or null
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setStatus(null);

      const applicationData = {
        ...formData,
        petId: petId, // Attach the pet ID from props
      };

      try {
        await axios.post(`${API_BASE_URL}/api/applications`, applicationData);
        setStatus('success');
        setFormData({
          applicantName: '',
          applicantEmail: '',
          applicantPhone: '',
          message: '',
        }); // Clear form on success
      } catch (error) {
        console.error("Application submission failed:", error.response?.data);
        setStatus('error');
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="application-form-card card">
        <h2 className="form-title">Apply to Adopt {petName}</h2>
        
        {status === 'success' && (
          <div className="status-message success-message">
            Application submitted successfully! We will be in touch soon.
          </div>
        )}
        
        {status === 'error' && (
          <div className="status-message error-message">
            Error submitting application. Please check your details and try again.
          </div>
        )}

        <form onSubmit={handleSubmit} className="form-layout">
          <div className="form-group">
            <label htmlFor="applicantName" className="input-label">Full Name</label>
            <input
              type="text"
              name="applicantName"
              value={formData.applicantName}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="applicantEmail" className="input-label">Email Address</label>
            <input
              type="email"
              name="applicantEmail"
              value={formData.applicantEmail}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="applicantPhone" className="input-label">Phone Number</label>
            <input
              type="tel"
              name="applicantPhone"
              value={formData.applicantPhone}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="input-label">Tell us why you want to adopt</label>
            <textarea
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              className="form-input textarea-input"
            ></textarea>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="button submit-button"
          >
            {loading ? 'Submitting...' : `Submit Application`}
          </button>
        </form>
      </div>
    );
};

export default ApplicationForm;