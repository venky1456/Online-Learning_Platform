import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SelectedCoursesPage.css'; // Import your CSS file here

const SelectedCoursesPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveFromCart = (courseId) => {
    const updatedCart = cart.filter(course => course._id !== courseId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleEnroll = (courseId) => {
    navigate(`/payment/${courseId}`);
  };

  return (
    <div className="fullscreen-container">
      <div className="courses-container">
        <h1>Enrolled Courses</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty. Add some courses to view them here.</p>
        ) : (
          <div className="course-cards">
            {cart.map(course => (
              <div key={course._id} className="course-card">
                {course.imageUrl && <img src={course.imageUrl} alt={course.title} className="course-image" />}
                <div className="course-info">
                  <h2>{course.title}</h2>
                  <p>{course.description}</p>
                  <div className="button-container">
                    <button 
                      onClick={() => handleRemoveFromCart(course._id)}
                      className="add-to-cart-button"
                    >
                      Remove
                    </button>
                    <button 
                      onClick={() => handleEnroll(course._id)}
                      className="buy-now-button"
                    >
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectedCoursesPage;
