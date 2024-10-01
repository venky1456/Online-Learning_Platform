const express = require('express');
const { addCourse, getCourses, enrollCourse, deleteCourse, updateCourse, getInstructorCourses } = require('../controllers/courseController');
const { protect, instructor, student } = require('../middleware/authMiddleware');

const router = express.Router();

// Public route to get all courses
router.get('/', getCourses);

// Protected route for instructors to add courses
router.post('/add', protect, instructor, addCourse);

// Protected route for instructors to view their courses
router.get('/my-courses', protect, instructor, getInstructorCourses);

// Protected route for students to enroll in courses
router.post('/enroll/:id', protect, student, enrollCourse);

// Protected route for instructors to delete a course
router.delete('/:id', protect, instructor, deleteCourse);

// Protected route for instructors to update a course
router.put('/:id', protect, instructor, updateCourse);

module.exports = router;
