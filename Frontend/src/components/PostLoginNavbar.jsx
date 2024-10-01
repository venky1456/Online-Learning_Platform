// src/components/PostLoginNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import './PostLoginNavbar.css'; // Import the CSS file


const PostLoginNavbar = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login after logout
  };

  return (
    <nav className="post-login-navbar">
      <div className="logo">GV Courses</div>
      <ul className="menu-items">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/contact-us">Contact Us</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><ProfileDropdown /></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default PostLoginNavbar;
