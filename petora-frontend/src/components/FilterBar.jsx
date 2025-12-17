import React, { useState, useEffect, useRef } from 'react'; 
import axios from 'axios'; 
import './FilterBar.css';

const speciesOptions = ['Dog', 'Cat', 'Bird', 'Rabbit'];
const sizeOptions = ['Small', 'Medium', 'Large'];
const statusOptions = ['Available', 'Pending', 'Adopted']; 


const FilterBar = ({ onFilterChange }) => {
    // This reference tracks whether the component has rendered once.
    const isInitialMount = useRef(true); 
    
    const [localFilters, setLocalFilters] = useState({
        species: '',
        size: '',
        status: 'Available', // Must match PetList's initial filter state
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLocalFilters(prev => ({
            ...prev,
            [name]: value === 'all' ? '' : value,
        }));
    };
    
    const handleReset = () => {
        setLocalFilters({ species: '', size: '', status: 'Available' });
    };

    useEffect(() => {
        if (isInitialMount.current) {
            // On first mount, set the flag to false
            isInitialMount.current = false;
            
            // STOP EXECUTION for this first run.
            return; 
        }
        
        // This code runs only after the component has mounted once
        onFilterChange(localFilters);
        
    }, [localFilters, onFilterChange]);

    return (
        <div className="filter-bar-container" data-aos="fade-down">
            {/* --- Species Filter --- */}
            <div className="filter-group">
                <label htmlFor="species" className="filter-label">Species</label>
                <select
                    id="species"
                    name="species"
                    value={localFilters.species || 'all'}
                    onChange={handleChange}
                    className="filter-select"
                >
                    <option value="all">All Species</option>
                    {speciesOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>

            {/* --- Size Filter --- */}
            <div className="filter-group">
                <label htmlFor="size" className="filter-label">Size</label>
                <select
                    id="size"
                    name="size"
                    value={localFilters.size || 'all'}
                    onChange={handleChange}
                    className="filter-select"
                >
                    <option value="all">All Sizes</option>
                    {sizeOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
            
            {/* --- Status Filter --- */}
            <div className="filter-group">
                <label htmlFor="status" className="filter-label">Status</label>
                <select
                    id="status"
                    name="status"
                    value={localFilters.status || 'all'}
                    onChange={handleChange}
                    className="filter-select"
                >
                    <option value="all">All Statuses</option>
                    {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>

            <button 
                onClick={handleReset}
                className="button reset-button"
            >
                Reset
            </button>
        </div>
    );
};

export default FilterBar;