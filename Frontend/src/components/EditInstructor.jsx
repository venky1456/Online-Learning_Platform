import React, { useState, useEffect } from 'react'; 
import axios from 'axios';

const EditInstructor = ({ match }) => {
    const [instructor, setInstructor] = useState({ name: '', email: '' });

    useEffect(() => {
        axios.get(`/api/admin/instructors/${match.params.id}`)
            .then(res => setInstructor(res.data))
            .catch(err => console.error(err));
    }, [match.params.id]);

    const handleChange = (e) => {
        setInstructor({ ...instructor, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/api/admin/instructors/${match.params.id}`, instructor)
            .then(() => window.location.href = '/admin/instructors')
            .catch(err => console.error(err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" value={instructor.name} onChange={handleChange} />
            <input name="email" value={instructor.email} onChange={handleChange} />
            <button type="submit">Update</button>
        </form>
    );
};

export default EditInstructor;
