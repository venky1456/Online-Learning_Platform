// src/pages/EnrolledCoursesPage.jsx
import React, { useState, useEffect } from 'react';

const EnrolledCoursesPage = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const storedEnrolled = JSON.parse(localStorage.getItem('enrolled')) || [];
    setEnrolledCourses(storedEnrolled);
  }, []);

  return (
    <div>
      <h1>Enrolled Courses</h1>
      {enrolledCourses.length === 0 ? (
        <p>You are not enrolled in any courses.</p>
      ) : (
        <ul>
          {enrolledCourses.map(course => (
            <li key={course._id}>
              {course.imageUrl && <img src={course.imageUrl} alt={course.title} style={{ width: '100px', height: '100px' }} />}
              <h2>{course.title}</h2>
              <p>{course.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EnrolledCoursesPage;
