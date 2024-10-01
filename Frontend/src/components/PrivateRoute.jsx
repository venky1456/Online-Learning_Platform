import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRole }) => {
  // Get the user from localStorage
  const user = JSON.parse(localStorage.getItem('user'));

  // Check if user is authenticated
  if (!user) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" />;
  }

  // Check if user has the required role
  if (requiredRole && user.role !== requiredRole) {
    // Redirect to home page if user does not have the required role
    return <Navigate to="/" />;
  }

  // Render the children if authenticated and authorized
  return children;
};

export default PrivateRoute;
