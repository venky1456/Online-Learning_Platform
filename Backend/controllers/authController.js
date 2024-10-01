const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User


exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Create new user
    user = new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role,
      isApproved: role === 'instructor' ? false : true, // Default to false for instructors, true for others
    });

    // Save user to the database
    await user.save();

    // Provide different messages based on role
    const message = role === 'instructor'
      ? 'Instructor registered. Awaiting admin approval.'
      : 'Registration successful';

    res.status(201).json({ message });
  } catch (error) {
    console.error('Error in register:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Login User


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (user.role === 'instructor' && !user.isApproved) {
      return res.status(403).json({ message: 'Instructor not approved by admin.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error in login:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
};


// Get Current User
exports.getUser = async (req, res) => {
  try {
    // Find user by ID, ensuring the password is not included
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error in getUser:', error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// Admin approves instructor
exports.approveInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const instructor = await User.findById(id);

    if (!instructor || instructor.role !== 'instructor') {
      return res.status(404).json({ msg: 'Instructor not found' });
    }

    instructor.isApproved = true;
    await instructor.save();

    res.json({ msg: 'Instructor approved successfully' });
  } catch (error) {
    console.error('Error approving instructor:', error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
};
