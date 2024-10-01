import React from 'react';
import { useNavigate } from 'react-router-dom';

const InstructorDashboard = () => {
  const navigate = useNavigate();

  const handleMyCourses = () => {
    navigate('/my-courses'); // This navigates to the MyCoursesPage component
  };

  return (
    <div className="instructor-dashboard">
      <button onClick={handleMyCourses}>My Courses</button>
      {/* Other instructor buttons can be added here */}
    </div>
  );
};

export default InstructorDashboard;
