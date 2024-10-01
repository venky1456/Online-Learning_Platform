const Payment = require('../models/Payment');
const Course = require('../models/Course');

// Process payment for a course
exports.processPayment = async (req, res) => {
  const { courseId, paymentDetails } = req.body;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ msg: 'Course not found' });
    }

    // Create payment record
    const payment = new Payment({
      user: req.user.id,
      course: courseId,
      paymentDetails,
    });

    await payment.save();

    // Add course to user's enrolled courses
    course.students.push(req.user.id);
    await course.save();

    res.json({ msg: 'Payment successful and course enrolled' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Get payment history for the user
exports.getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user.id }).populate('course');
    res.json(payments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
