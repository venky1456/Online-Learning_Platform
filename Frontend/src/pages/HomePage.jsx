// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import Navbar from '../components/PostLoginNavbar';
import Footer from '../components/Footer';
import './HomePage.css'; // Import the CSS file

const HomePage = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Retrieve dark mode preference from local storage or default to false
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true' || false;
  });

  // Apply dark mode class to body


  return (
    <div className={`homepage-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <main className="homepage-main">
        <h1>Welcome to GV's Online Learning Platform</h1>
        <p>Explore and enroll in the best courses available online.</p>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
