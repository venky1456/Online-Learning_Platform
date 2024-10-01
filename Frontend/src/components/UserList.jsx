import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/api/admin/users')
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`/api/admin/users/${id}`)
            .then(() => setUsers(users.filter(user => user._id !== id)))
            .catch(err => console.error(err));
    };

    return (
        <div>
            <h2>All Users</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.name} - {user.email}
                        <Link to={`/admin/users/${user._id}/edit`}>Edit</Link>
                        <button onClick={() => handleDelete(user._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
