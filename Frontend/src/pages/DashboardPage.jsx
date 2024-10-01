// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../pages/dashboard.css'; // Adjust the path based on your project structure

const DashboardPage = ({ user }) => {
  const [instructors, setInstructors] = useState([]);
  const [error, setError] = useState(null);

  // Fetch instructors for admin
  useEffect(() => {
    if (user?.role === 'admin') {
      const fetchInstructors = async () => {
        try {
          const response = await fetch('/api/admin/instructors'); // Replace with your endpoint
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const contentType = response.headers.get('Content-Type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Response is not JSON');
          }
          const data = await response.json();
          setInstructors(data);
        } catch (error) {
          setError(error.message);
          console.error('Error fetching instructors:', error);
        }
      };
      fetchInstructors();
    }
  }, [user]);

  const handleApprove = async (instructorId) => {
    try {
      const response = await fetch(`/api/admin/approve-instructor/${instructorId}`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      alert(data.message);
      const updatedInstructors = instructors.filter(instructor => instructor._id !== instructorId);
      setInstructors(updatedInstructors);
    } catch (error) {
      alert('Error approving instructor');
      console.error('Error:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome to the Dashboard</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/selected-courses">Selected Courses</Link>
        <Link to="/enrolled-courses">Enrolled Courses</Link>
        <Link to="/instructor">Instructors</Link>

        {user?.role === 'instructor' && (
          <>
            <Link to="/add-course">Add Course</Link>
            <Link to="/my-courses">My Courses</Link>
          </>
        )}
      </nav>

      <main>
        <p>Welcome to your dashboard. Manage your content and view details here.</p>
        {user?.role === 'instructor' ? (
          <div>
            <h2>Instructor Options</h2>
            <p>Manage your courses, add new ones, and view user details here.</p>
          </div>
        ) : user?.role === 'admin' ? (
          <div>
            <h2>Admin Options</h2>
            <p>Manage users, view user details, and handle system-wide settings here.</p>
            <div className="admin-buttons-grid">
              <Link to="/user-details" className="gradient-button">User Details</Link>
              <Link to="/edit-user" className="gradient-button">Edit User Details</Link>
              <Link to="/delete-user" className="gradient-button">Delete Users</Link>
              <Link to="/enrollment-progress" className="gradient-button">View User Enrollment and Progress</Link>
              <Link to="/view-instructors" className="gradient-button">View All Instructors</Link>
              <Link to="/payment-history" className="gradient-button">View Payment History</Link>
              <Link to="/approve-instructors" className="gradient-button">Approve or Disapprove Instructors</Link>
              <Link to="/edit-instructor" className="gradient-button">Edit Instructor Details</Link>
            </div>

            <h3>Pending Instructor Approvals</h3>
            {error && <div className="error">Error: {error}</div>}
            <ul>
              {instructors.map(instructor => (
                <li key={instructor._id}>
                  {instructor.name} - <button onClick={() => handleApprove(instructor._id)}>Approve</button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <h2>Student Options</h2>
            <p>View and manage your enrolled courses and selected courses here.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
