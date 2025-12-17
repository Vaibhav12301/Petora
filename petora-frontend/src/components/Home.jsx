import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

// Image Imports
import GoldyImage from '../assets/Goldy.jpg';
import RicoImage from '../assets/Rico.jpg';
import MarcoImage from '../assets/Marco.jpg';
import LabradorImage from '../assets/Labrador.jpg';
import BengalCatImage from '../assets/Bengal_Cat.jpg';
import BeagleImage from '../assets/Beagle_1.jpg';

//  Imported Icons
import Clock from '../assets/clock.svg';
import Address from '../assets/map-pin.svg';
import Phone from '../assets/phone.svg';
import Testimonials from '../assets/testimonial_img1.jpg';
import Stars from '../assets/4star.jpg';
import Search from '../assets/search.svg'; 
import Submit from '../assets/check-square.svg';
import Shipping from '../assets/truck.svg'

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section id="hero">
        <div className="container">
          <div className="hero__wrapper">
            <div className="hero__left" data-aos="fade-left">
              <div className="hero__left__wrapper">
                <h1 className="hero__heading">Find Your Forever Friend</h1>
                <p className="hero__info">
                  Welcome to Petora, the platform connecting loving families with pets in need. Browse available dogs, cats, birds, and more, all ready for their new home.
                </p>
                <div className="button__wrapper">
                  <Link to="/pets" className="btn primary-btn button">Explore Pets</Link>
                  <a href="#adoptGuideSection" className="btn secondary-btn button secondary">Learn How to Adopt</a>
                </div>
              </div>
            </div>
            <div className="hero__right" data-aos="fade-right">
              <div className="hero__imgWrapper">
                <div className="pet-image-grid">
                  <img src={GoldyImage} alt="Friendly Golden Retriever" className="pet-img dog-img" />
                  <img src={MarcoImage} alt="Calico Cat" className="pet-img cat-img" />
                  <img src={RicoImage} alt="Green Parrot" className="pet-img bird-img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Gallery Section */}
      <section id="petGallery" data-aos="fade-up">
          <div className="container">
              <h2 className="gallery__title">Our Gallery of Your Future Furry Friends</h2>
              <div className="gallery__wrapper">
                  <div className="gallery__item"> <img src={LabradorImage} alt="Yellow Labrador" className="gallery__img" /> </div>
                  <div className="gallery__item"> <img src={BengalCatImage} alt="Bengal Cat" className="gallery__img" /> </div>
                  <div className="gallery__item"> <img src={BeagleImage} alt="Beagle Dog" className="gallery__img" /> </div>
                  <div className="gallery__item"> <img src={GoldyImage} alt="Golden Retriever" className="gallery__img" /> </div>
                  <div className="gallery__item"> <img src={MarcoImage} alt="Calico Cat" className="gallery__img" /> </div>
                  <div className="gallery__item"> <img src={RicoImage} alt="Green Parrot" className="gallery__img" /> </div>
              </div>
              <Link to="/pets" className="btn primary-btn button gallery__button">View All Available Pets</Link>
          </div>
      </section>

      {/* Learn How to Adopt Guide Section */}
      <section id="adoptGuideSection" className="how-to-adopt-section" data-aos="fade-up">
        <div className="container">
            <h2 className="guide__heading">Our Simple 3-Step Adoption Process</h2>
            <p className="guide__subtitle">The fastest path to welcoming your new family member.</p>

            <div className="guide__wrapper">
                {/* Step 1: Browse Pets */}
                <div className="guide__item">
                    <div className="guide__icon">
                        <img src={Search} alt="search icon" className="guide__icon__img" />
                    </div> 
                    <h3 className="guide__title">1. Find Your Match</h3>
                    <p className="guide__text">
                        Explore our profiles of available pets. Use filters for species, size, and gender to find a pet that fits your home and lifestyle.
                    </p>
                </div>

                {/* Step 2: Apply and Connect */}
                <div className="guide__item">
                    <div className="guide__icon">
                        <img src={Submit} alt="submit icon" className="guide__icon__img" />
                    </div> 
                    <h3 className="guide__title">2. Submit Application</h3>
                    <p className="guide__text">
                        Fill out the application form for the pet you wish to adopt. Our partner shelters will review your details and contact you for an interview.
                    </p>
                </div>

                {/* Step 3: Meet & Welcome Home */}
                <div className="guide__item">
                    <div className="guide__icon">
                        <img src={Shipping} alt="shipping icon" className="guide__icon__img" />
                    </div> 
                    <h3 className="guide__title">3. Welcome Home</h3>
                    <p className="guide__text">
                        Once approved, you'll finalize the adoption papers and arrange the best time to meet and pick up your new companion.
                    </p>
                </div>

            </div>
        </div>
      </section>
      {/* END NEW ADOPT GUIDE SECTION */}


      {/* Shelter Info Section (Using storeInfo__wrapper) */}
      <section id="storeInfo" data-aos="fade-up">
        <div className="container">
          <div className="storeInfo__wrapper">
            <div className="storeInfo__item">
              <div className="storeInfo__icon">
                <img src={Clock} alt="clock icon"/>
              </div>
              <h3 className="storeInfo__title">
                200+
              </h3>
              <p className="storeInfo__text">
                Pets Adopted
              </p>
            </div>
            <div className="storeInfo__item">
              <div className="storeInfo__icon">
                <img src={Address} alt="address icon"/>
              </div>
              <h3 className="storeInfo__title">
                15+ Locations
              </h3>
              <p className="storeInfo__text">
                Across Maharashtra
              </p>
            </div>
            <div className="storeInfo__item">
              <div className="storeInfo__icon">
                <img src={Phone} alt="phone icon"/>
              </div>
              <h3 className="storeInfo__title">
                24/7
              </h3>
              <p className="storeInfo__text">
                Support Available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section ... (omitted for brevity) */}
      <section id="testimonial">
        <div className="container">
          <div className="testimonial__wrapper" data-aos="fade-up">
            <h2 className="testimonial__title">Happy Adoption Stories</h2>
            <div className="testimonial__items__wrapper">
              
              {/* Testimonial Item 1 */}
              <div className="testimonial__item card" data-aos="fade-left">
                <div className="testimonial__item__img">
                  <img src={Testimonials} alt="Happy Adopter"/>
                </div>
                <div className="testimonial__item__info">
                  <h3 className="testimonial__item__name">Pabha Jadhav</h3>
                  <div className="testimonial__item__stars">
                    <img src={Stars} alt="4 star"/>
                  </div>
                  <p className="testimonial__item__text">
                    “We found Goldy through Petora, and our life is complete! The process was smooth and the support team was fantastic. Highly recommend for finding your next family member.”
                  </p>
                </div>
              </div>
              
              {/* Testimonial Item 2 */}
              <div className="testimonial__item card" data-aos="fade-right">
                <div className="testimonial__item__img">
                  <img src={Testimonials} alt="Happy Adopter"/>
                </div>
                <div className="testimonial__item__info">
                  <h3 className="testimonial__item__name">Vaishnavi Gaikwad</h3>
                  <div className="testimonial__item__stars">
                    <img src={Stars} alt="4 star"/>
                  </div>
                  <p className="testimonial__item__text">
                    "From start to finish, a lovely experience. We adopted Marco, and the staff provided excellent advice on cat care. The application process was clear and quick!"
                  </p>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </section>
      
    </>
  );
};

export default Home;