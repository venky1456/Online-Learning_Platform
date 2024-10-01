import React, { useState, useEffect } from 'react';

// Base API URL configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'; // Use environment variables for flexibility

// Helper function to get the token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Helper function to handle HTTP responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    const error = data.msg || 'An error occurred';
    throw new Error(error);
  }
  return data;
};

// Fetch Courses
export const fetchCourses = async () => {
  const token = getToken();
  try {
    const response = await fetch(`${API_URL}/courses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Login User
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await handleResponse(response);
    localStorage.setItem('token', data.token); // Store the token in localStorage
    localStorage.setItem('user', JSON.stringify(data.user)); // Store user data as JSON
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Enroll in a Course
export const enrollCourse = async (courseId) => {
  const token = getToken();
  try {
    const response = await fetch(`${API_URL}/courses/enroll/${courseId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error enrolling in course:', error);
    throw error;
  }
};

// Fetch Selected Courses
export const fetchSelectedCourses = async () => {
  const token = getToken();
  try {
    const response = await fetch(`${API_URL}/courses/selected`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching selected courses:', error);
    throw error;
  }
};

// Add a Course (for Instructors)
// src/utils/api.js

// src/utils/api.js

// Ensure the addCourse function is updated to match the new API endpoint and method
// src/utils/api.js

export const addCourse = async (courseData) => {
  const token = localStorage.getItem('token');
  console.log('Token:', token); // Add this line for debugging

  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.post(`${API_URL}/courses/add`, courseData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.msg : 'An error occurred');
  }
};



// Fetch User Enrolled Courses
export const fetchUserCourses = async () => {
  const token = getToken();
  try {
    const response = await fetch(`${API_URL}/user/enrolled-courses`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return await handleResponse(response);
  } catch (error) {
    console.error('Error fetching user courses:', error);
    throw error;
  }
};
// Delete a Course (for Instructors)
// In your utils/api.js or wherever the deleteCourse function is defined
export const deleteCourse = async (courseId) => {
  const token = JSON.parse(localStorage.getItem('token')); // Ensure you are passing the token if needed
  const response = await fetch(`/api/courses/${courseId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // Ensure the token is being sent if required
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete course'); // This will be caught in your frontend
  }

  return response.json();
};


// Update a Course (for Instructors)
export const updateCourse = async (courseId, courseData) => {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch(`${API_URL}/courses/${courseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(courseData),
    });
    if (!response.ok) {
      throw new Error('Failed to update course');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating course:', error);
    throw error;
  }
};
// In your api.js or utils/api.js
import axios from 'axios';

export const checkEnrollment = async () => {
  try {
    const response = await axios.get('/api/enrollments');
    return response.data; // This will be an array of enrolled course IDs
  } catch (error) {
    console.error('Error fetching enrollment data:', error);
    throw error;
  }
};
// api.js

export const fetchMyCourses = async () => {
  const response = await fetch('/api/instructors/my-courses', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch courses');
  }

  return response.json();
};
// utils/api.js

// Other existing API functions...

// utils/api.js
// utils/api.js
// utils/api.js
// utils/api.js
// src/utils/api.js


export const fetchInstructorCourses = async () => {
  try {
    const response = await axios.get('/api/courses/my-courses');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching courses');
  }
};
// src/utils/api.js
export const fetchUserDetails = async (userId) => {
  try {
    const response = await fetch(`/api/admin/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) throw new Error('Error fetching user details');
    return await response.json();
  } catch (error) {
    console.error('Error in fetchUserDetails:', error.message);
    throw error;
  }
};

export const fetchUserPayments = async (userId) => {
  try {
    const response = await fetch(`/api/admin/user/${userId}/payments`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (!response.ok) throw new Error('Error fetching payment history');
    return await response.json();
  } catch (error) {
    console.error('Error in fetchUserPayments:', error.message);
    throw error;
  }
};

// Base URL for the API

// Get all pending instructor requests
export const fetchPendingInstructors = async () => {
    try {
        const response = await axios.get(`${API_URL}/admin/pending-instructors`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure token is included
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching pending instructors:', error.response ? error.response.data : error.message);
        throw error;
    }
};



export const updateInstructorApproval = async (id, isApproved, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/instructors/${id}/approve`,
      { isApproved },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating instructor approval:', error);

    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request data:', error.request);
    } else {
      console.error('Error message:', error.message);
    }

    throw error; // Re-throw the error for further handling if needed
  }
};


// Other API functions...
