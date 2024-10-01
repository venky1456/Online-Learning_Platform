import React, { useState, useEffect } from 'react';
import PreLoginNavbar from './PreLoginNavbar';
import PostLoginNavbar from './PostLoginNavbar';

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        // Ensure storedUser is a string and can be parsed
        if (typeof storedUser === 'string') {
          setUser(JSON.parse(storedUser));
        } else {
          console.error('Stored user data is not a string');
        }
      }
    } catch (error) {
      console.error('Failed to parse user data:', error);
      // Optionally clear the invalid data
      localStorage.removeItem('user');
    }
  }, []);

  return user ? <PostLoginNavbar /> : <PreLoginNavbar />;
};

export default Navbar;
