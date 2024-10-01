import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get('/api/admin/get-pending-instructors'); // Ensure this endpoint is correctly implemented
        setInstructors(response.data);
      } catch (error) {
        console.error('Error fetching pending instructors:', error);
      }
    };

    fetchInstructors();
  }, []);

  const approveInstructor = async (id) => {
    try {
      await axios.put(`/api/admin/approve-instructor/${id}`);
      setInstructors(instructors.filter((instructor) => instructor._id !== id));
    } catch (error) {
      console.error('Error approving instructor:', error);
    }
  };

  return (
    <div>
      <h1>Pending Instructors</h1>
      {instructors.length > 0 ? (
        instructors.map((instructor) => (
          <div key={instructor._id}>
            <p>{instructor.name} ({instructor.email})</p>
            <button onClick={() => approveInstructor(instructor._id)}>Approve</button>
          </div>
        ))
      ) : (
        <p>No pending instructors.</p>
      )}
    </div>
  );
};

export default AdminDashboard;
