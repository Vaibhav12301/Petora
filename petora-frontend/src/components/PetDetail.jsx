import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ApplicationForm from './ApplicationForm';
import './PetDetail.css';

const API_BASE_URL = 'http://localhost:5000';

const PetDetail = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/pets/${id}`);
        setPet(response.data);
      } catch (err) {
        setError('Failed to fetch pet details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id]);

  if (loading) return <div className="pet-loading">Loading pet details...</div>;
  if (error) return <div className="pet-error">{error}</div>;
  if (!pet) return <div className="pet-notfound">Pet not found.</div>;

  return (
    <div className="pet-container">
      <div className="pet-grid">
        {/* Pet Information Section */}
        <div className="pet-info">
          <img
            src={`${API_BASE_URL}/${pet.imageUrl}`}
            alt={pet.name}
            className="pet-image"
          />

          <h1 className="pet-name">{pet.name}</h1>
          <p className="pet-subtitle">{pet.species} - {pet.breed}</p>

          <div className="pet-meta">
            <p><strong>Age:</strong> {pet.age} years</p>
            <p><strong>Gender:</strong> {pet.gender}</p>
            <p><strong>Size:</strong> {pet.size}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span className={`pet-status ${pet.status === 'Available' ? 'available' : 'unavailable'}`}>
                {pet.status}
              </span>
            </p>
          </div>

          <h2 className="section-title">About {pet.name}</h2>
          <p className="pet-description">{pet.description}</p>

          <h2 className="section-title">Shelter Info</h2>
          <p className="shelter-line">Managed by: <strong>{pet.shelterId?.name || 'N/A'}</strong></p>
          <p className="shelter-line">Location: {pet.shelterId?.location || 'N/A'}</p>
        </div>

        {/* Application Form Section */}
        <div className="application-section">
          {pet.status === 'Available' ? (
            <ApplicationForm petId={pet._id} petName={pet.name} />
          ) : (
            <div className="alert">
              This pet is currently <strong>{pet.status}</strong> and not accepting new applications.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetDetail;