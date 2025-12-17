import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PetCreationForm.css'; 

const API_BASE_URL = 'http://localhost:5000'; 

const PetCreationForm = () => {
    const [formData, setFormData] = useState({
      name: '', species: '', breed: '', age: '', gender: 'Unknown', size: 'Medium', description: '', shelterId: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [shelters, setShelters] = useState([]);
    const [status, setStatus] = useState(''); // 'success' or 'error: message'
    const [loading, setLoading] = useState(false);

    // Fetch Shelters for the dropdown
    useEffect(() => {
        const fetchShelters = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/api/shelters`);
                setShelters(response.data);
                if (response.data.length > 0) {
                    setFormData(f => ({ ...f, shelterId: response.data[0]._id }));
                }
            } catch (error) {
                console.error("Failed to fetch shelters:", error);
            }
        };
        fetchShelters();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');

        if (!imageFile) {
            setStatus('error: Please upload an image.');
            setLoading(false);
            return;
        }

        const data = new FormData(); 
        
        // Append the file and text fields
        data.append('image', imageFile); 
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        const token = localStorage.getItem('authToken'); 

        try {
            await axios.post(`${API_BASE_URL}/api/pets`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                    'Authorization': `Bearer ${token}`, 
                },
            });
            setStatus('success');
            // Reset form fields
            setFormData({ name: '', species: '', breed: '', age: '', gender: 'Unknown', size: 'Medium', description: '', shelterId: shelters[0]?._id || '' });
            setImageFile(null); // Clear the file input state
        } catch (error) {
            console.error("Pet creation failed:", error.response?.data);
            setStatus(`error: ${error.response?.data?.message || 'Failed to create pet. (Did you log in?)'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="creation-form-wrapper card">
            <h2 className="form-title">Submit a New Pet for Adoption</h2>
            
            {status.startsWith('success') && (
                <div className="status-message success-message">Pet created successfully!</div>
            )}
            {status.startsWith('error') && (
                <div className="status-message error-message">{status.substring(6)}</div>
            )}

            <form onSubmit={handleSubmit} className="form-layout">
                <div className="form-row">
                    <div className="form-group">
                        <label className="input-label" htmlFor="name">Pet Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="form-input" />
                    </div>
                    <div className="form-group">
                        <label className="input-label" htmlFor="species">Species</label>
                        <input type="text" id="species" name="species" value={formData.species} onChange={handleChange} required className="form-input" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="input-label" htmlFor="breed">Breed</label>
                        <input type="text" id="breed" name="breed" value={formData.breed} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="form-group">
                        <label className="input-label" htmlFor="age">Age (Years)</label>
                        <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} min="0" className="form-input" />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="input-label" htmlFor="gender">Gender</label>
                        <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="form-input">
                            <option value="Unknown">Unknown</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="input-label" htmlFor="size">Size</label>
                        <select id="size" name="size" value={formData.size} onChange={handleChange} className="form-input">
                            <option value="Small">Small (e.g., Kitten)</option>
                            <option value="Medium">Medium (e.g., Beagle)</option>
                            <option value="Large">Large (e.g., Great Dane)</option>
                        </select>
                    </div>
                </div>
                
                <div className="form-group">
                    <label className="input-label" htmlFor="shelterId">Shelter/Location</label>
                    <select id="shelterId" name="shelterId" value={formData.shelterId} onChange={handleChange} required className="form-input">
                        {shelters.map(shelter => (
                            <option key={shelter._id} value={shelter._id}>{shelter.name}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label className="input-label" htmlFor="description">Description</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleChange} rows="4" className="form-input textarea-input"></textarea>
                </div>

                <div className="form-group">
                    <label className="input-label" htmlFor="image">Pet Photo (Max 5MB)</label>
                    <input type="file" id="image" name="image" onChange={handleFileChange} accept="image/*" required className="file-input" />
                </div>
                
                <button
                    type="submit"
                    disabled={loading}
                    className="button submit-button"
                >
                    {loading ? 'Submitting Pet...' : 'Save New Pet'}
                </button>
            </form>
        </div>
    );
};

export default PetCreationForm;