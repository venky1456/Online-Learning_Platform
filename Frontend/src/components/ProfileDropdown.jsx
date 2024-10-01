import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProfileDropdown.css';

const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Apply the correct theme based on the isDarkMode state
        document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
    }, [isDarkMode]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className="profile-dropdown">
            <div className="profile-icon" onClick={toggleDropdown}>
                <img 
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" 
                    alt="Profile" 
                />
            </div>
            {isOpen && (
                <div className="dropdown-menu">
                    <Link to="/profile">
                        <button>Profile</button>
                    </Link>
                    <button onClick={toggleDarkMode}>
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                    <button>Logout</button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
