import React from 'react';
import './ContactUs.css';

import ContactCatImage from '../assets/ContactCat.jpg'; 

const ContactUs = () => {
  return (
    <div className="contact-container">
      
      {/* Top Headline and Introductory Text */}
      <header className="contact-intro" data-aos="fade-down">
        <h1 className="contact-headline text-green">Reach Out to Petora</h1>
        <p className="contact-intro-text">
          We'd love to hear from you! Whether you have questions about adoption, need support, or just want to share a happy pet story, our team is here to help.
        </p>
      </header>

      {/* --- Main Content Area: Image (Left) + Consolidated Info Card (Right) --- */}
      <section className="contact-main-content" data-aos ="fade-up">
        <div className="main-content-wrapper">
          
          {/* 1. Image Area (Left) */}
          <div className="contact-image-area" data-aos="fade-left">
            <img src={ContactCatImage} alt="Curious cat peeking" className="vertical-cat-image" />
          </div>

          {/* 2. Consolidated Contact Info Card (Right) */}
          <div className="contact-info-area card" data-aos="fade-right">
            <h2 className="info-area-heading">Get in Touch Directly</h2>
            
            <div className="info-block">
                <h3 className="info-title text-orange">Our Location</h3>
                <p className="info-text">123 Petora Lane, Animal City, Maharashtra 400001</p>
            </div>
            
            <div className="info-block">
                <h3 className="info-title text-orange">Call Us</h3>
                <p className="info-text">+91 01234 56789</p>
            </div>
            
            <div className="info-block">
                <h3 className="info-title text-orange">Email Us</h3>
                <p className="info-text">support@petora.com</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* --- Contact Form Section (Bottom) --- */}
      <section className="contact-form-section" data-aos="fade-up">
        <h2 className="form-heading">Send Us a Message</h2>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit" className="button primary-btn">Send Message</button>
        </form>
      </section>
    </div>
  );
};

export default ContactUs;