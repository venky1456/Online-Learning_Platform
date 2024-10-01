const User = require('../models/User');
const Payment = require('../models/Payment');
const { updateInstructorApproval } = require('../controllers/adminController');
const Instructor = require('../models/Instructor'); // Assuming you have an Instructor model


// View All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// Edit User Details
exports.editUserDetails = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

// View Payment History
exports.viewPaymentHistory = async (req, res) => {
    try {
        const payments = await Payment.find().populate('userId', 'name email');
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching payments', error });
    }
};

// Fetch Pending Instructors

// Fetch Pending Instructors
// Example in adminController.js
exports.getPendingInstructors = async (req, res) => {
    try {
        const pendingInstructors = await User.find({ role: 'instructor', isApproved: false });
        res.json(pendingInstructors);
    } catch (error) {
        console.error('Error fetching pending instructors:', error.message);
        res.status(500).send('Server Error');
    }
};



// Approve or Disapprove Instructor
exports.    updateInstructorApproval = async (req, res) => {
    const { id } = req.params;
    const { isApproved } = req.body;

    try {
        const instructor = await Instructor.findById(id);
        if (!instructor) {
            return res.status(404).json({ message: 'Instructor not found' });
        }

        instructor.isApproved = isApproved;
        await instructor.save();

        res.status(200).json({ message: 'Instructor approval status updated' });
    } catch (error) {
        console.error('Error updating instructor approval:', error);
        res.status(500).json({ message: 'Server error' });
    }
};



// Edit Instructor Details
exports.editInstructorDetails = async (req, res) => {
    try {
        const updatedInstructor = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedInstructor) {
            return res.status(404).json({ message: 'Instructor not found' });
        }
        res.json(updatedInstructor);
    } catch (error) {
        res.status(500).json({ message: 'Error updating instructor', error });
    }
};

// Approve Instructor
exports.approveInstructor = async (req, res) => {
    try {
        const instructor = await User.findById(req.params.id);
        if (!instructor || instructor.role !== 'instructor') {
            return res.status(404).json({ message: 'Instructor not found' });
        }

        instructor.isApproved = true;
        await instructor.save();
        res.json({ message: 'Instructor approved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error approving instructor', error });
    }
};

// Get all pending instructors
exports.getPendingInstructors = async (req, res) => {
    try {
        const pendingInstructors = await Instructor.find({ isApproved: false });
        res.status(200).json(pendingInstructors);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pending instructors', error: error.message });
    }
};

// Approve an instructor
exports.approveInstructor = async (req, res) => {
    const instructorId = req.params.id;

    try {
        const instructor = await Instructor.findById(instructorId);

        if (!instructor) {
            return res.status(404).json({ message: 'Instructor not found' });
        }

        instructor.isApproved = true;
        await instructor.save();

        res.status(200).json({ message: 'Instructor approved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error approving instructor', error: error.message });
    }
};

// Disapprove an instructor
exports.disapproveInstructor = async (req, res) => {
    const instructorId = req.params.id;

    try {
        const instructor = await Instructor.findById(instructorId);

        if (!instructor) {
            return res.status(404).json({ message: 'Instructor not found' });
        }

        // Remove the instructor from the database
        await instructor.remove();

        res.status(200).json({ message: 'Instructor disapproved and removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error disapproving instructor', error: error.message });
    }
};
