// src/pages/ContactUsPage.jsx
import React from 'react';
import Navbar from '../components/PostLoginNavbar';
import Footer from '../components/Footer';

// src/components/ContactMe.jsx
import './ContactMe.css'; // Import the CSS file for styling

const ContactMe = () => {
  return (
    <section className="contact" id="contact-me">
      <div className="container">
        <div className="contact-content">
          <h2>Contact Me</h2>
          <p className="mail">
            <i className="fas fa-map-marker-alt"></i> Geddakancharam, Ap
          </p>
          <p className="mail">
            <i className="fas fa-phone"></i> Phone: +91 7842681982
          </p>
          <p className="mail">
            Get in touch with me <i className="fas fa-arrow-right"></i> venkateshgokavarapu2022@gmail.com
          </p>
          <p className="links">Or find me on:</p>
          <a href="https://www.linkedin.com/in/venkatesh-gokavarapu-788053285/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i> Linkedin
          </a>
          <a href="https://github.com/venky1456" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github"></i> Github
          </a>
          <a href="https://x.com/venkatesh_1409" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i> Twitter
          </a>
          <a href="https://www.instagram.com/imsanketbodke/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i> Instagram
          </a>
        </div>
      </div>
            <Footer />

    </section>
  );
};

export default ContactMe;

