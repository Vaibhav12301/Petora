import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';
import Logo from '../assets/PetoraLogo.svg';


const Navbar = () => {
  const navItemClasses = ({ isActive }) =>
    isActive ? 'navbar-link active' : 'navbar-link';

  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        <div className="navbar-main">
          <div className="navbar-brand">
            <Link to="/" className="navbar-brand-link">
              <img src={Logo} alt="Petora Logo" className="navbar-logo-img" /> 
            </Link>
          </div>
          <div className="navbar-links-desktop">
            <div className="navbar-links-list">
              <NavLink to="/" className={navItemClasses} end>
                Home
              </NavLink>
              <NavLink to="/pets" className={navItemClasses}>
                Adopt a Pet
              </NavLink>
              <NavLink to="/login" className={navItemClasses}>
                Shelter Login
              </NavLink>
              <NavLink to="/AboutUs" className={navItemClasses}>
                About Us
              </NavLink>
              <NavLink to="/ContactUs" className={navItemClasses}>
                Contact Us
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;