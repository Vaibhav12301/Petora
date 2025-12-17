import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import Logo from '../assets/PetoraLogo.svg';
import Faceboook from '../assets/facebook.svg';
import Twitter from '../assets/twitter.svg';
// import X from '../assets/x-twitter.svg'
import Instagram from '../assets/instagram.svg';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer__wrapper">
          <div className="footer__col1">
            <div className="navbar-brand">
                <Link to="/" className="navbar-brand-link">
                  <img src={Logo} alt="Petora Logo" className="navbar-logo-img" /> 
                </Link>
            </div>
            <p className="footer__desc">
              Helping furry, feathered, and scaled friends find their forever homes since 2025.
            </p>
            <div className="footer__socials">
              <h4 className="footer__socials__title">Follow Our Journey</h4>
              <ol className="footer__socials__list">
                {/* Facebook */}
                <li><a href="https://www.facebook.com/" alt='facebook' target="_blank"><img src={Faceboook} className="socials"/></a></li>
                {/* Instagram */}
                <li><a href="https://www.instagram.com/" alt='instagram' target="_blank"><img src={Instagram} className="socials"/></a></li>
                {/* Twitter */}
                <li><a href="https://x.com/" alt='twitter' target="_blank"><img src={Twitter} className="socials"/></a></li>
              </ol>
            </div>
          </div>

          <div className="footer__col2">
            <h3 className="footer__text__title">Quick Links</h3>
            <ol className="footer__text">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/pets">Adopt a Pet</Link></li>
              <li><Link to="/shelters">Our Shelters</Link></li>
              <li><Link to='/AboutUs'>About Us</Link></li>
              <li><Link to="/ContactUs">Contact Us</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ol>
          </div>

          <div className="footer__col3">
            <h3 className="footer__text__title">Support</h3>
            <ol className="footer__text">
              <li><a href="#">Adoption FAQs</a></li>
              <li><a href="#">Support Center</a></li>
              <li><a href="#">Feedback</a></li>
            </ol>
          </div>

          <div className="footer__col4">
            <h3 className="footer__text__title">Contact Us</h3>
            <ol className="footer__text">
              <li><a href="tel:+910123456789">+91 01234 56789</a></li>
              <li><a href="mailto:info@petora.com">info@petora.com</a></li>
              <li><a href="#">123 Petora Lane, Animal City, Maharashtra 400001</a></li>
            </ol>
          </div>
        </div>
      </div>
      <div id="copyright">
        <div className="container">
          <p className="copyright__text">
            © copyright 2025 Petora | Pet Adoption Platform | All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;