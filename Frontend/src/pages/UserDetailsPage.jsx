import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserDetails, fetchUserCourses } from '../utils/api';

const UserDetailsPage = () => {
  const [userDetails, setUserDetails] = useState({});
  const [userCourses, setUserCourses] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Redirect to home if the user is not an admin
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    // Load user data if the user is an admin
    const loadUserData = async () => {
      try {
        const [userDetailsData, userCoursesData] = await Promise.all([
          fetchUserDetails(),
          fetchUserCourses(),
        ]);
        setUserDetails(userDetailsData);
        setUserCourses(userCoursesData);
      } catch (error) {
        setError('Failed to load user data.');
        console.error(error);
      }
    };

    loadUserData();
  }, [user, navigate]);

  return (
    <div>
      <h1>User Details</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <h2>Registration Details</h2>
        <p><strong>Name:</strong> {userDetails.name || 'N/A'}</p>
        <p><strong>Email:</strong> {userDetails.email || 'N/A'}</p>
        <p><strong>Role:</strong> {userDetails.role || 'N/A'}</p>
        <p><strong>Registered on:</strong> {userDetails.createdAt ? new Date(userDetails.createdAt).toLocaleDateString() : 'N/A'}</p>
      </div>

      <div>
        <h2>Enrolled Courses</h2>
        {userCourses.length === 0 ? (
          <p>No courses enrolled yet.</p>
        ) : (
          <ul>
            {userCourses.map((course) => (
              <li key={course._id}>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <p><strong>Progress:</strong> {course.progress || 0}%</p>
                <progress value={course.progress || 0} max="100"></progress>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserDetailsPage;
