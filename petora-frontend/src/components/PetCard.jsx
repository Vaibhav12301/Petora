import React from 'react';
import { Link } from 'react-router-dom';
import './PetCard.css';

const API_BASE_URL = 'http://localhost:5000';

const PetCard = ({ pet }) => {
    if (!pet) {
        return null;
    }

    let displayStatus = pet.status;
    let statusClasses = 'pet-card-status';

    if (pet.status === 'Available') {
        statusClasses += ' status-available';
    } else if (pet.status === 'Adopted') {
        statusClasses += ' status-adopted';
    } else if (pet.status === 'Pending') {
        // The pet object includes details about the *pending application* // or a specific field like pet.pendingApplicantName from the API.
        const applicantName = pet.pendingApplicantName || 'User'; 
        
        // This is the display text requested
        displayStatus = `Applied by ${applicantName}`; 
        statusClasses += ' status-pending'; 
    } else {
        statusClasses += ' status-pending'; 
    }

    return (
        <div className="pet-card">
            <Link to={`/pets/${pet._id}`} className="pet-card-image-link">
                <img
                    src={`${API_BASE_URL}/${pet.imageUrl}`}
                    alt={pet.name}
                    className="pet-card-image"
                />
            </Link>
            <div className="pet-card-content">
                <div className="pet-card-header">
                    <Link to={`/pets/${pet._id}`} className="pet-card-name">
                        {pet.name}
                    </Link>
                    <span className={statusClasses}>
                        {displayStatus}
                    </span>
                </div>
                <p className="pet-card-info">{pet.species} - {pet.breed}</p>
                <p className="pet-card-details">
                    Age: {pet.age} | Gender: {pet.gender} | Size: {pet.size}
                </p>
                <p className="pet-card-description">
                    {pet.description}
                </p>
                <Link
                    to={`/pets/${pet._id}`}
                    className="button pet-card-button" 
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default PetCard;