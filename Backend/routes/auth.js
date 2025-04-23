const express = require('express');
const { protect } = require('../middleware/authMiddleware'); // Ensure this is correct
const { getUser, register, login, getUserProfile } = require('../controllers/authController'); // Ensure all required controllers are imported

const router = express.Router(); // Declare the router only once

// Route to register a new user
router.post('/register', register);

// Route to log in an existing user
router.post('/login', login);

// Route to get the current user's details (protected route)
router.get('/me', protect, getUser);

// Route to get the user's profile (protected route)
router.get('/profile', protect, getUserProfile);

module.exports = router;