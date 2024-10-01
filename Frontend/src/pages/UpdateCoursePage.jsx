// src/pages/UpdateCoursePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateCoursePage = () => {
  const { id } = useParams(); // Get the course ID from the URL
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    videoUrl: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch the course details to pre-fill the form
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/courses/${id}`);
        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course:', error);
        setError('Failed to fetch course details');
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/courses/${id}`, course); // Send updated course data
      navigate('/dashboard'); // Redirect to the dashboard after successful update
    } catch (error) {
      console.error('Error updating course:', error);
      setError('Failed to update course');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Update Course</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={course.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={course.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={course.imageUrl}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Video URL</label>
          <input
            type="text"
            name="videoUrl"
            value={course.videoUrl}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Course</button>
      </form>
    </div>
  );
};

export default UpdateCoursePage;
