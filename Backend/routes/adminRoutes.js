const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, admin } = require('../middleware/authMiddleware');
const { 
  updateInstructorApproval, 
  getAllUsers, 
  editUserDetails, 
  deleteUser, 
  viewPaymentHistory, 
  getPendingInstructors, 
  editInstructorDetails 
} = require('../controllers/adminController');

// Admin Routes

// Get all users
router.get('/users', protect, admin, getAllUsers);

// Edit user details
router.put('/users/:id', protect, admin, editUserDetails);

// Delete user
router.delete('/users/:id', protect, admin, deleteUser);

// View payment history
router.get('/payments', protect, admin, viewPaymentHistory);

// Get all pending instructors
router.get('/pending-instructors', protect, admin, getPendingInstructors);

// Approve instructor
router.put('/approve-instructor/:id', protect, admin, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user || user.role !== 'instructor') {
      return res.status(404).json({ message: 'Instructor not found.' });
    }

    user.isApproved = true;
    await user.save();
    res.status(200).json({ message: 'Instructor approved successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// Edit instructor details
router.put('/instructors/:id', protect, admin, editInstructorDetails);

module.exports = router;
