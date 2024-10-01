const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const Enrollment = require('../models/Enrollment');

// Route to check enrollment status for a user
router.get('/api/enrollments', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const enrollments = await Enrollment.find({ user: userId }).select('course');

    const enrolledCourses = enrollments.map(enrollment => enrollment.course);
    res.json(enrolledCourses);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
