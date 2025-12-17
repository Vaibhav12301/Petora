import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

// Image Imports
import LabradorImage from '../assets/Labrador.jpg';
import CockatielImage from '../assets/Cockatiel.jpg';
import BengalCatImage from '../assets/Bengal_Cat.jpg';

const AboutUs = () => {
    return (
        <div className="about-container">
            <h1 className="about-title" data-aos="fade-down">Our Mission: Finding Forever Homes</h1>
            <p className="about-subtitle" data-aos="fade-down">
                Petora is dedicated to connecting wonderful pets with loving families across India. We believe every animal deserves a second chance at happiness.
            </p>

            {/* Section 1: Core Values */}
            <section className="about-section mission-section">
                <div className="mission-content" data-aos="fade-left">
                    <h2 className="section-heading">More Than Just Adoption</h2>
                    <p>
                        We partner with local shelters and rescue organizations to streamline the adoption process, ensuring pets are safe, healthy, and ready for their new lives. Our core values are Compassion, Integrity, and Community. We are committed to responsible pet ownership and lifelong support.
                    </p>
                    <Link to="/pets" className="button primary-btn about-button">
                        See Available Pets
                    </Link>
                </div>
                <div className="mission-image-container" data-aos="fade-right">
                    <img src={LabradorImage} alt="Happy Labrador puppy" className="mission-image main-image" />
                </div>
            </section>
            
            {/* Section 2: Our Impact / Statistics */}
            <section className="about-section impact-section" data-aos="fade-up">
                <h2 className="section-heading">Petora's Impact</h2>
                <div className="impact-grid">
                    <div className="impact-item card">
                        <span className="impact-number text-orange">200+</span>
                        <p className="impact-label">Pets Rehomed</p>
                    </div>
                    <div className="impact-item card">
                        <span className="impact-number text-green">15</span>
                        <p className="impact-label">Partner Shelters</p>
                    </div>
                    <div className="impact-item card">
                        <span className="impact-number text-orange">10K+</span>
                        <p className="impact-label">Community Members</p>
                    </div>
                </div>
            </section>

            {/* Section 3: Meet the Pets (Visuals) */}
            <section className="about-section team-section">
                <h2 className="section-heading" data-aos="fade-up">Our Wonderful Community</h2>
                <div className="pet-collage-wrapper">
                    <img src={BengalCatImage} alt="Bengal Cat resting" className="collage-image cat-image" data-aos="fade-left"/>
                    <img src={CockatielImage} alt="Cockatiel bird" className="collage-image bird-image" data-aos="fade-right"/>
                </div>
                <p className="team-info" data-aos="fade-up">
                    Every pet featured on our site has a story. We work hard to tell those stories honestly so you can make a perfect match for your home and lifestyle.
                </p>
            </section>
            
        </div>
    );
};

export default AboutUs;