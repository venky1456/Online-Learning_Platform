const User = require('../models/User'); // Ensure the User model is imported only once
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'The user with this email already exists. Please log in or use a different email.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      isApproved: role === 'instructor' ? false : true, // Default to false for instructors, true for others
    });

    // Save user to the database
    await user.save();

    // Provide different messages based on role
    let message;
    if (role === 'instructor') {
      message = 'Instructor registered successfully. Awaiting admin approval.';
    } else if (role === 'student') {
      message = 'Student registered successfully. You can now log in.';
    } else {
      message = 'Registration successful. You can now log in.';
    }

    res.status(201).json({ message });
  } catch (error) {
    console.error('Error in register:', error.message);
    res.status(500).json({ message: 'An unexpected server error occurred. Please try again later.' });
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

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
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

// Get User Profile
// exports.getUserProfile = async (req, res) => {
//   try {
//     console.log("venky");
//     const userId = req.user.id; // Ensure `req.user` is populated by the auth middleware
//     const user = await User.findById(userId).select('name role email'); // Fetch only required fields
//     console.log(userId, user); // Log the userId and user for debugging
//     // )
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error('Error in getUserProfile:', error.message);
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// };
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Ensure `req.user` is populated by the auth middleware
    const user = await User.findById(userId).select('name role email'); // Fetch only required fields

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user); // Return user details as JSON
  } catch (error) {
    console.error('Error in getUserProfile:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};