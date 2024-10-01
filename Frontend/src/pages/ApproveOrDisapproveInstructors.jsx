import React, { useEffect, useState } from 'react';
import { fetchPendingInstructors, updateInstructorApproval } from '../utils/api';

const ApproveOrDisapproveInstructors = () => {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const getInstructors = async () => {
            try {
                const data = await fetchPendingInstructors();
                setInstructors(data);
            } catch (err) {
                console.error('Error fetching pending instructors:', err.message);
                setError('Failed to fetch pending instructors. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        getInstructors();
    }, []);

    const handleApproval = async (instructorId, isApproved) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Authorization token is missing. Please log in.');
            }

            await updateInstructorApproval(instructorId, isApproved, token);

            // Remove the instructor from the list after approval/disapproval
            setInstructors(prevInstructors => prevInstructors.filter(inst => inst._id !== instructorId));
        } catch (err) {
            console.error('Error updating instructor approval:', err.message);
            setError('Failed to update instructor approval. Please try again later.');
        }
    };

    if (loading) {
        return <p>Loading pending instructors...</p>;
    }

    return (
        <div>
            <h1>Approve or Disapprove Instructors</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {instructors.length === 0 ? (
                <p>No pending instructors.</p>
            ) : (
                <ul>
                    {instructors.map(instructor => (
                        <li key={instructor._id}>
                            <p>Name: {instructor.name}</p>
                            <p>Email: {instructor.email}</p>
                            <button onClick={() => handleApproval(instructor._id, true)}>Approve</button>
                            <button onClick={() => handleApproval(instructor._id, false)}>Disapprove</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ApproveOrDisapproveInstructors;
