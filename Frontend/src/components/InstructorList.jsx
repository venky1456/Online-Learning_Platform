import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InstructorList = () => {
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        axios.get('/api/admin/instructors')
            .then(res => setInstructors(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleApprove = (id) => {
        axios.put(`/api/admin/instructors/${id}/approve`, { role: 'approve' })
            .then(() => window.location.reload())
            .catch(err => console.error(err));
    };

    const handleDisapprove = (id) => {
        axios.put(`/api/admin/instructors/${id}/approve`, { role: 'disapprove' })
            .then(() => window.location.reload())
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h2>All Instructors</h2>
            <ul>
                {instructors.map(instructor => (
                    <li key={instructor._id}>
                        {instructor.name} - {instructor.email}
                        <button onClick={() => handleApprove(instructor._id)}>Approve</button>
                        <button onClick={() => handleDisapprove(instructor._id)}>Disapprove</button>
                        <Link to={`/admin/instructors/${instructor._id}/edit`}>Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InstructorList;
