const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware for verifying JWT token
exports.protect = async (req, res, next) => {
  let token;

  // Check if the authorization header exists and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // If no token is provided
  if (!token) {
    return res.status(401).json({ msg: 'Not authorized, token missing' });
  }

  try {
    // Decode the token using JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID and remove the password field from the result
    const user = await User.findById(decoded.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Attach the user to the request object
    req.user = user;

    next();
  } catch (error) {
    console.error('JWT Error:', error.message);

    // Handle different token errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Token expired, please log in again' });
    }

    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Middleware for role-based access (Instructor only)
exports.instructor = (req, res, next) => {
  if (!req.user || req.user.role !== 'instructor') {
    return res.status(403).json({ msg: 'Not authorized as an instructor' });
  }
  next();
};

// Middleware for role-based access (Student only)
exports.student = (req, res, next) => {
  if (!req.user || req.user.role !== 'student') {
    return res.status(403).json({ msg: 'Not authorized as a student' });
  }
  next();
};

// Middleware for role-based access (Admin only)
exports.admin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Not authorized as an admin' });
  }
  next();
};