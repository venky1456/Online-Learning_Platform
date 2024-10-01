const Course = require('../models/Course');
const User = require('../models/User');

// Add a new course (Instructor only)
exports.addCourse = async (req, res) => {
  const { title, description, price, imageUrl, videoUrl } = req.body;

  try {
    // Create a new course
    const course = new Course({
      title,
      description,
      price,
      imageUrl, // Add imageUrl
      videoUrl, // Add videoUrl
      instructor: req.user.id, // Associate the course with the instructor
    });

    // Save the course to the database
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error('Error in addCourse:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all courses
exports.getCourses = async (req, res) => {
  try {
    // Fetch all courses
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error in getCourses:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Enroll in a course (Student only)
exports.enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if the user is already enrolled
    if (course.students.includes(req.user.id)) {
      return res.status(400).json({ message: 'You are already enrolled in this course' });
    }

    // Add the student to the enrolled list
    course.students.push(req.user.id);
    await course.save();

    // Optionally, add the course to the student's enrolled courses
    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { coursesEnrolled: course._id }
    });

    res.status(200).json({ message: 'Successfully enrolled' });
  } catch (error) {
    console.error('Error in enrollCourse:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a course (Instructor only)
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Ensure the logged-in user is the instructor who created the course
    if (course.instructor.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this course' });
    }

    await course.remove();
    res.status(200).json({ message: 'Course removed' });
  } catch (error) {
    console.error('Error in deleteCourse:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a course (Instructor only)
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Ensure the logged-in user is the instructor who created the course
    if (course.instructor.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this course' });
    }

    // Update course fields with new data
    Object.assign(course, req.body);
    await course.save();

    res.status(200).json(course);
  } catch (error) {
    console.error('Error in updateCourse:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all courses created by the logged-in instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Fetch courses where the instructor is the logged-in user
    const courses = await Course.find({ instructor: req.user.id });
    res.status(200).json(courses);
  } catch (error) {
    console.error('Error in getMyCourses:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};
