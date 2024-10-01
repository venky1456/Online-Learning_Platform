// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from 'react';
import './ProfilePage.css'; // Ensure this path matches your project structure

const ProfilePage = () => {
    const [userDetails, setUserDetails] = useState({});
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Fetch user details from your backend API
        const fetchUserDetails = async () => {
            try {
                const response = await fetch('/api/user-details', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Include token if required
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUserDetails(data);  // Set the user details from the response
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };
        fetchUserDetails();
    }, []);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark-mode');
    };

    return (
        <div className={`profile-page ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="profile-container">
                <div className="profile-card">
                    <img 
                        src={userDetails.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} 
                        alt="User" 
                        className="profile-image"
                    />
                    <h2 className="profile-name">{userDetails.name || "Name not available"}</h2>
                    <p className="profile-email">{userDetails.email || "Email not available"}</p>
                </div>
                <div className="profile-details">
                    <div className="details-row">
                        <strong>Name</strong><span>:</span>{userDetails.name || "Name not available"}
                    </div>
                    <div className="details-row">
                        <strong>Role</strong><span>:</span>{userDetails.role || "Role not available"}
                    </div>
                    <div className="details-row">
                        <strong>Email</strong><span>:</span>{userDetails.email || "Email not available"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
