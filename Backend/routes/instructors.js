const express = require('express');
const router = express.Router();
const {
    getInstructorCourses,
    addCourse,
    updateCourse,
    deleteCourse,
    updateInstructorApproval  // Ensure this is defined and imported correctly
} = require('../controllers/instructorController');
const { protect, admin, instructor } = require('../middleware/authMiddleware');

// Get all courses created by the instructor
router.get('/courses', protect, instructor, getInstructorCourses);

// Add a new course
router.post('/courses', protect, instructor, addCourse);

// Update a specific course by ID
router.put('/courses/:id', protect, instructor, updateCourse);

// Delete a specific course by ID
router.delete('/courses/:id', protect, instructor, deleteCourse);

// Approve or disapprove an instructor
router.put('/instructors/:id/approval', protect, admin, updateInstructorApproval);

// Get all instructors (requires admin access)

module.exports = router;
