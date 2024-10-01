import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUser = ({ match }) => {
    const [user, setUser] = useState({ name: '', email: '', role: '' });

    useEffect(() => {
        axios.get(`/api/admin/users/${match.params.id}`)
            .then(res => setUser(res.data))
            .catch(err => console.error(err));
    }, [match.params.id]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/api/admin/users/${match.params.id}`, user)
            .then(() => window.location.href = '/admin/users')
            .catch(err => console.error(err));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="name" value={user.name} onChange={handleChange} />
            <input name="email" value={user.email} onChange={handleChange} />
            <select name="role" value={user.role} onChange={handleChange}>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="admin">Admin</option>
            </select>
            <button type="submit">Update</button>
        </form>
    );
};

export default EditUser;
