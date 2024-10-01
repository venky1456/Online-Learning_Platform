const express = require('express');
const { getEnrolledCourses, enrollInCourse, dropCourse } = require('../controllers/studentController');
const { protect, student } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get enrolled courses for a student
router.get('/courses', protect, student, getEnrolledCourses);

// Route to enroll in a course
router.post('/courses/enroll/:courseId', protect, student, enrollInCourse);

// Route to drop (unenroll from) a course
router.delete('/courses/drop/:courseId', protect, student, dropCourse);
router.get('/user-details', protect, (req, res) => {
    const { name, email, role } = req.user; // Assuming the user object is stored in req.user
    res.json({ name, email, role });
});

module.exports = router;


