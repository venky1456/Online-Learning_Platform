import React from 'react';
import { Link } from 'react-router-dom';
import './PreLoginNavbar.css';

const PreLoginNavbar = () => {
  return (
    <nav className="pre-login-navbar">
      <div className="logo">GV Courses</div>
      <ul className="menu-items">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/contact-us">Contact Us</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
};

export default PreLoginNavbar;