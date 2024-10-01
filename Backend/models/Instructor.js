const mongoose = require('mongoose');

const InstructorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    // Add any other instructor-specific fields here
});

const Instructor = mongoose.model('Instructor', InstructorSchema);

module.exports = Instructor;
