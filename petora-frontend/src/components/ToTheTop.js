import React, { useState, useEffect } from 'react';
import ToTheTopIcon from "../assets/chevrons-up.svg";
import './ToTheTop.css'; 

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Button appears when user scrolls past 100 pixels
            setIsVisible(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    return (
        // Apply class name. The visibility is now controlled by conditional rendering 
        // using a class based on 'isVisible' state.
        <button 
            onClick={scrollToTop} 
            className={`scroll-to-top-button ${isVisible ? 'is-visible' : ''}`}
            aria-label="Scroll to top"
        >
            <img src={ToTheTopIcon} alt="Scroll to top icon" className="scroll-icon" />
        </button>
    );
};
export default ScrollToTopButton;