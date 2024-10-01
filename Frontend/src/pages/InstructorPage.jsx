// src/pages/InstructorPage.jsx
import React from 'react';
import Navbar from '../components/PostLoginNavbar';
import Footer from '../components/Footer';

const InstructorPage = () => {
  return (
    <div>
      <main>
        <h1>Meet Our Instructors</h1>
        <div className="instructor-list">
          <div className="instructor-card">
            <h2>John Doe</h2>
            <p>Qualification: PhD in Computer Science</p>
            <p>Subject: Web Development</p>
          </div>
          <div className="instructor-card">
            <h2>Jane Smith</h2>
            <p>Qualification: MSc in Data Science</p>
            <p>Subject: Data Analysis</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default InstructorPage;
