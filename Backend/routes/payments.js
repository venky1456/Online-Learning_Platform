const express = require('express');
const { processPayment, getPaymentHistory } = require('../controllers/paymentController');
const { protect, student } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, student, processPayment);  // Process payment for a course
router.get('/history', protect, student, getPaymentHistory);  // Get payment history for a student

module.exports = router;
