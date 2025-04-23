import React, { useState, useEffect } from 'react';
import { fetchCourses, checkEnrollment } from '../utils/api'; // Removed deleteCourse import
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import './CoursesPage.css'; // Import your CSS file

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState({});
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [darkMode, setDarkMode] = useState(false); // State for dark mode
  const navigate = useNavigate();

  // Load courses and enrollment data
  useEffect(() => {
    const loadCourses = async () => {
      try {
        const coursesData = await fetchCourses();
        setCourses(coursesData);
        const enrolledCoursesData = await checkEnrollment();
        setEnrolledCourses(enrolledCoursesData);
      } catch (error) {
        setError('Failed to fetch courses.');
      }
    };
    loadCourses();
  }, []);

  // Manage message timeouts
  useEffect(() => {
    const timers = Object.keys(messages).map(courseId =>
      setTimeout(() => {
        setMessages(prevMessages => {
          const { [courseId]: removedMessage, ...restMessages } = prevMessages;
          return restMessages;
        });
      }, 1000)
    );

    return () => timers.forEach(clearTimeout);
  }, [messages]);

  // Toggle dark mode and save user preference
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
    document.body.classList.toggle('dark-mode', !darkMode); // Toggle dark mode on body
  };

  const handleViewVideo = (course) => {
    if (course.price === 0) {
      window.open(course.videoUrl, '_blank');
    } else {
      if (enrolledCourses.includes(course._id)) {
        window.open(course.videoUrl, '_blank');
      } else {
        setMessages(prevMessages => ({
          ...prevMessages,
          [course._id]: 'Please complete the payment to access this course.'
        }));
      }
    }
  };

  const handleEnroll = (courseId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login'); // Redirect to login page if not logged in
      return;
    }
  
    setMessages(prevMessages => ({
      ...prevMessages,
      [courseId]: 'To enroll, please click on "Buy Now" button.'
    }));
  };

  const handleAddToCart = (course) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login'); // Redirect to login page if not logged in
      return;
    }
  
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.some(item => item._id === course._id)) {
      setMessages(prevMessages => ({
        ...prevMessages,
        [course._id]: 'The item is already in the cart.'
      }));
    } else {
      cart.push(course);
      localStorage.setItem('cart', JSON.stringify(cart));
      setMessages(prevMessages => ({
        ...prevMessages,
        [course._id]: 'Course added to cart!'
      }));
    }
  };

  const handleBuyNow = (courseId) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login'); // Redirect to login page if not logged in
      return;
    }
  
    navigate(`/payment/${courseId}`);
  };

  return (
    <section className={`courses-container ${darkMode ? 'dark-mode' : ''}`}>

      <h1>Courses</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="course-cards">
        {courses.map(course => (
          <div className="course-card" key={course._id}>
            {course.imageUrl && <img src={course.imageUrl} alt={course.title} className="course-image" />}
            <div className="course-info">
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              {course.price === 0 ? (
                <button className="free-button" onClick={() => handleViewVideo(course)}>Free</button>
              ) : (
                <>
                  <div className="button-container">
                    <button className="price-button" onClick={() => handleEnroll(course._id)}>
                      ₹{course.price}
                    </button>
                    <button className="add-to-cart-button" onClick={() => handleAddToCart(course)}>Add to Cart</button>
                  </div>
                  <button className="buy-now-button" onClick={() => handleBuyNow(course._id)}>Buy Now</button>
                </>
              )}
              {messages[course._id] && <p className="message">{messages[course._id]}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoursesPage;
