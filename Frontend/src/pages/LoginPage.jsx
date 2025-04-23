import React, { useState } from 'react';
import '../pages/LoginPage.css'; // Adjust the path based on your project structure

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const handleLogin = async () => {
    // Reset error state
    setError(null);

    // Basic validation
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    setLoading(true); // Set loading state
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log('API response:', data); // Log the response for debugging

      if (response.ok) {
        if (data.token && data.user) {
          localStorage.setItem('user', JSON.stringify(data.user)); // Store user data
          localStorage.setItem('token', data.token); // Store token
          window.location.href = '/'; // Redirect to homepage
        } else {
          setError('Unexpected response format. Please contact support.');
        }
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error); // Log error for debugging
      setError('An error occurred while logging in. Please try again later.');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your Email"
        disabled={loading}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your Password"
        disabled={loading}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
};

export default LoginPage;