// filepath: Frontend/src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import PreLoginNavbar from './PreLoginNavbar';
import PostLoginNavbar from './PostLoginNavbar';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return user ? <PostLoginNavbar /> : <PreLoginNavbar />;
};

export default Navbar;