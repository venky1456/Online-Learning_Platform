// src/pages/PaymentPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PaymentForm from '../components/PaymentForm';
import Footer from '../components/Footer';
import '../pages/PaymentPage.css'; // Ensure this path matches your project structure

const PaymentPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePaymentSuccess = async () => {
    try {
      setLoading(true);
      
      // Simulate payment process (Replace with actual payment logic)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Retrieve cart and enrolled courses from local storage
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      const enrolledCourses = JSON.parse(localStorage.getItem('enrolled')) || [];

      // Filter out the purchased course from the cart
      const updatedCart = storedCart.filter(course => course._id !== courseId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));

      // Add the purchased course to enrolled courses
      const selectedCourse = storedCart.find(course => course._id === courseId);
      if (selectedCourse) {
        enrolledCourses.push(selectedCourse);
        localStorage.setItem('enrolled', JSON.stringify(enrolledCourses));
      }

      // Redirect to enrolled courses page
      navigate('/enrolled-courses');
    } catch (error) {
      setError('Payment failed. Please try again.');
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentError = (errorMessage) => {
    setError(errorMessage);
  };

  return (
    <div className="payment-page">
      <main>
        <h1>Payment</h1>
        {loading && <p>Processing payment...</p>}
        {error && <p className="error">{error}</p>}
        <PaymentForm 
          onSuccess={handlePaymentSuccess} 
          onError={handlePaymentError} 
        />
      </main>
      <Footer />
    </div>
  );
};

export default PaymentPage;
