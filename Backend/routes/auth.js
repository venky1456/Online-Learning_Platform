const express = require('express');
const { protect } = require('../middleware/authMiddleware'); // Ensure this is correct
const { getUser, register, login } = require('../controllers/authController'); // Ensure this is correct

const router = express.Router();

// Route to register a new user
router.post('/register', register);

// Route to log in an existing user
router.post('/login', login);

// Route to get the current user's details (protected route)
router.get('/me', protect, getUser); // Ensure protect and getUser are correctly imported

module.exports = router;
