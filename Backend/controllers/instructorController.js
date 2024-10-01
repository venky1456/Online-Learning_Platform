// controllers/instructorController.js
const User = require('../models/User'); // Assuming you're using the User model
const Instructor = require('../models/Instructor');
const Course = require('../models/Course'); // Import your Course model

// Get all courses created by the instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

// Add a new course
exports.addCourse = async (req, res) => {
  const { title, description, price, imageUrl, videoUrl } = req.body;

  try {
    const newCourse = new Course({
      title,
      description,
      price,
      imageUrl,
      videoUrl,
      instructor: req.user._id, // Associate the course with the logged-in instructor
      students: [] // Initialize with no students
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ msg: 'Failed to add course', error: error.message });
  }
};

// Update a specific course by ID
exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, imageUrl, videoUrl } = req.body;

  try {
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: 'Not authorized to update this course' });
    }

    course.title = title || course.title;
    course.description = description || course.description;
    course.price = price || course.price;
    course.imageUrl = imageUrl || course.imageUrl;
    course.videoUrl = videoUrl || course.videoUrl;

    await course.save();
    res.json(course);
  } catch (error) {
    res.status(400).json({ msg: 'Failed to update course', error: error.message });
  }
};

// Delete a specific course by ID
exports.deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id);

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: 'Not authorized to delete this course' });
    }

    await course.remove();
    res.json({ msg: 'Course removed' });
  } catch (error) {
    res.status(400).json({ msg: 'Failed to delete course', error: error.message });
  }
};
// instructorController.js


exports.getMyCourses = async (req, res) => {
  try {
    const instructorId = req.user._id; // Assuming req.user is populated with the logged-in user
    const courses = await Course.find({ instructor: instructorId });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch your courses.' });
  }
};


exports.updateInstructorApproval = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Find the instructor by ID and update approval status
    const updatedInstructor = await Instructor.findByIdAndUpdate(
      id,
      { approved: true },
      { new: true }
    );
    
    if (!updatedInstructor) {
      return res.status(404).json({ msg: 'Instructor not found' });
    }
    
    res.status(200).json(updatedInstructor);
  } catch (error) {
    console.error('Error updating instructor approval:', error);
    res.status(500).json({ msg: 'Error updating instructor approval' });
  }
};



