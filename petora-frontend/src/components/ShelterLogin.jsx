import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShelterLogin.css';

// Placeholder function for login - will be replaced with axios later
const mockLogin = async (email, password) => {
  return new Promise((resolve, reject) => {
    // Basic mock check: any non-empty credentials succeed
    if (email && password) {
      setTimeout(() => resolve({ token: 'mock-jwt-token-123', name: 'Happy Paws Admin' }), 500);
    } else {
      setTimeout(() => reject(new Error("Invalid credentials")), 500);
    }
  });
};

const ShelterLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // In a real app, this is where you'd call axios.post('/api/auth/login')
      const response = await mockLogin(email, password); 
      
      // Store token and redirect
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('adminName', response.name);
      
      navigate('/admin'); // Redirect to the admin dashboard
    } catch (err) {
      setError("Login failed. Check email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shelter-login-container">
      <div className="login-card">
        <h1 className="login-title">Shelter Admin Login</h1>
        
        {error && (
          <div className="error-message">{error}</div>
        )}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label className="input-label">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-input"
            />
          </div>
          <div>
            <label className="input-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-input"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="button login-button"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShelterLogin;