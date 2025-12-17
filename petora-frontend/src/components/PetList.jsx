import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import PetCard from './PetCard.jsx';
import FilterBar from './FilterBar.jsx';
import './PetList.css';

const API_URL = 'http://localhost:5000/api/pets'; 

const PetList = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeFilters, setActiveFilters] = useState({ status: 'Available' }); 

    const fetchPets = useCallback(async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams(activeFilters).toString();
            const response = await axios.get(`${API_URL}?${query}`);
            setPets(response.data);
        } catch (error) {
            console.error("Error fetching pets:", error);
        } finally {
            setLoading(false);
        }
    }, [activeFilters]);

    // Memorize this function so it doesn't change on every render
    const handleFilterChange = useCallback((newFilters) => {
        setActiveFilters(newFilters);
    }, []); // Empty dependency array because it only uses setState

    useEffect(() => {
        fetchPets();
    }, [fetchPets]);
    
    // if (loading) return <div className="loading-message">Loading pets...</div>;

    return (
        <div className="pet-list-wrapper" data-aos="fade-down">
            <h1 className="list-title">Find Your Furry Friend</h1>
            <FilterBar onFilterChange={handleFilterChange} />
            
            {pets.length === 0 ? (
                <div className="no-pets-message card">
                    No pets found matching your criteria. Try resetting the filters!
                </div>
            ) : (
                <div className="pet-grid">
                    {pets.map(pet => (
                        <PetCard key={pet._id} pet={pet} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PetList;