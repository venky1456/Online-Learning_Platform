// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'], // User roles
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false, // Default to false, indicating no approval for instructors
  },
  coursesEnrolled: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
  // other fields (if any)
});

const User = mongoose.model('User', userSchema);

module.exports = User;
