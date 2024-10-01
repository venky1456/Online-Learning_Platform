// controllers/studentController.js

const Course = require('../models/Course'); // Import your Course model
const User = require('../models/User'); // Import your User model

// Get all courses the student is enrolled in
exports.getEnrolledCourses = async (req, res) => {
  try {
    const student = await User.findById(req.user._id).populate('enrolledCourses');
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }
    res.json(student.enrolledCourses);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

// Enroll in a course
exports.enrollInCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    const student = await User.findById(req.user._id);
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    // Check if already enrolled
    if (student.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ msg: 'Already enrolled in this course' });
    }

    // Add course to student enrolled courses
    student.enrolledCourses.push(courseId);
    await student.save();

    res.json({ msg: 'Enrolled in course', course });
  } catch (error) {
    res.status(500).json({ msg: 'Failed to enroll in course', error: error.message });
  }
};

// Drop (unenroll) from a course
exports.dropCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const student = await User.findById(req.user._id);
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    // Check if not enrolled
    if (!student.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ msg: 'Not enrolled in this course' });
    }

    // Remove course from student enrolled courses
    student.enrolledCourses = student.enrolledCourses.filter(id => id.toString() !== courseId);
    await student.save();

    res.json({ msg: 'Dropped from course' });
  } catch (error) {
    res.status(500).json({ msg: 'Failed to drop course', error: error.message });
  }
};
