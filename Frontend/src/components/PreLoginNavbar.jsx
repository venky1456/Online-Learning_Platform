// src/components/PreLoginNavbar.jsx
import './PreLoginNavbar.css';

import React from 'react';
import { Link } from 'react-router-dom';

const PreLoginNavbar = () => {
  return (
    <nav>
      <div className="logo">GV Courses</div>
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
};

export default PreLoginNavbar;
