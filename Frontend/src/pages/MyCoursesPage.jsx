import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchInstructorCourses, deleteCourse } from '../utils/api';

const MyCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const coursesData = await fetchInstructorCourses();
        console.log('Courses data:', coursesData); // Log the data received
        if (Array.isArray(coursesData)) {
          setCourses(coursesData);
        } else {   
          throw new Error('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching courses:', error.message); // Log error details to console
        setError('Failed to fetch courses. Please try again later.');
      }
    };

    loadCourses(); // Fetch courses when the component mounts
  }, []);

  const handleDeleteCourse = async (courseId) => {
    try {
      await deleteCourse(courseId);
      setCourses(courses.filter(course => course._id !== courseId));
    } catch (error) {
      console.error('Error deleting course:', error.message);
      setError('Failed to delete course. Please try again later.');
    }
  };

  const handleUpdateCourse = (courseId) => {
    navigate(`/update-course/${courseId}`);
  };

  const handleViewCourse = (courseId) => {
    navigate(`/course-details/${courseId}`);
  };

  return (
    <div className="my-courses-container">
      <h1>My Courses</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="course-cards">
        {courses.length > 0 ? (
          courses.map(course => (
            <div className="course-card" key={course._id}>
              <h2>{course.title}</h2>
              <p>{course.description}</p>
              <button onClick={() => handleViewCourse(course._id)}>View</button>
              <button onClick={() => handleUpdateCourse(course._id)}>Update</button>
              <button onClick={() => handleDeleteCourse(course._id)}>Delete</button>
            </div>
          ))
        ) : (
          <p>No courses found.</p>
        )}
        
      </div>
    </div>
    
  );
};

export default MyCoursesPage;
