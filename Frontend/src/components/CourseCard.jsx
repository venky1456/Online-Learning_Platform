// src/components/CourseCard.jsx
import React from 'react';

const CourseCard = ({ course, children }) => {
  return (
    <div className="course-card">
      {course.imageUrl && <img src={course.imageUrl} alt={course.title} style={{ width: '100px', height: '100px' }} />}
      <h2>{course.title}</h2>
      <p>{course.description}</p>
      {children}
    </div>
  );
};

export default CourseCard;
