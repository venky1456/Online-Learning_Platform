const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const paymentRoutes = require('./routes/payments');
const studentRoutes = require('./routes/students');
const instructorRoutes = require('./routes/instructors');
const adminRoutes = require('./routes/adminRoutes');



// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Enable CORS for all origins (modify as needed)
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/instructors', adminRoutes);



// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Export the app instance for testing
module.exports = app;

// Start the server if this module is the main entry point
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
