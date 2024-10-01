// src/pages/AddCoursePage.jsx

import React, { useState } from 'react';
import { addCourse } from '../utils/api';

const AddCoursePage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const courseData = { title, description, price, imageUrl, videoUrl };
      await addCourse(courseData);
      setMessage('Course added successfully!');
    } catch (error) {
      console.error('Error:', error.message); // Log the error message
      setMessage('Failed to add course. Make sure you are an instructor.');
    }
  };
  

  return (
    <div>
      <h1>Add Course</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        <input type="text" placeholder="Video URL" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} required />
        <button type="submit">Add Course</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddCoursePage;
