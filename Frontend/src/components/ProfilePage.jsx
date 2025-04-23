import React, { useEffect, useState } from 'react';
import './ProfilePage.css'; // Ensure this path matches your project structure

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to show loading

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage
        if (!token) {
          throw new Error('No token found. Please log in again.');
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request
          },
        });

        if (!response.ok) {
          const errorText = await response.text(); // Read the response text for debugging
          throw new Error(`Failed to fetch user details: ${response.statusText}. Response: ${errorText}`);
        }

        const data = await response.json();
        setUserDetails(data); // Set the user details
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError(error.message); // Set the error message
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while fetching data
  }

  if (error) {
    return <p className="error-message">{error}</p>; // Display error message if any
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-card">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="User"
            className="profile-image"
          />
          <h2 className="profile-name">{userDetails.name}</h2>
          <p className="profile-email">{userDetails.email}</p>
        </div>
        <div className="profile-details">
          <div className="details-row">
            <strong>Name</strong><span>:</span>{userDetails.name}
          </div>
          <div className="details-row">
            <strong>Role</strong><span>:</span>{userDetails.role}
          </div>
          <div className="details-row">
            <strong>Email</strong><span>:</span>{userDetails.email}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;