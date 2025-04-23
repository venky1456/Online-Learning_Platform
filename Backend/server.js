// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const authRoutes = require('./routes/auth');
// const courseRoutes = require('./routes/courses');
// const paymentRoutes = require('./routes/payments');
// const studentRoutes = require('./routes/students');
// const instructorRoutes = require('./routes/instructors');
// const adminRoutes = require('./routes/adminRoutes');

// // Load environment variables
// dotenv.config();

// // Connect to the database
// connectDB();

// const app = express();

// // Enable CORS with specific configuration
// app.use(cors({
//   origin: 'http://localhost:3000', // Replace with your frontend's URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,
// }));

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Define routes
// app.use('/api/auth', authRoutes);
// app.use('/api/courses', courseRoutes);
// app.use('/api/payments', paymentRoutes);
// app.use('/api/students', studentRoutes);
// app.use('/api/instructors', instructorRoutes);
// app.use('/api/admin', adminRoutes);

// // Handle undefined routes
// app.use((req, res, next) => {
//   res.status(404).json({ error: 'Route not found' });
// });

// // Global error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Internal Server Error' });
// });

// // Export the app instance for testing
// module.exports = app;

// // Start the server if this module is the main entry point
// if (require.main === module) {
//   const PORT = process.env.PORT || 5000;
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }
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

// Enable CORS with specific configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Use environment variable for frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/admin', adminRoutes);

// Handle undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// Export the app instance for testing
module.exports = app;

// Start the server if this module is the main entry point
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  });
}
