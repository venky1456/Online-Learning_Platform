import React, { useState } from 'react';
import '../pages/LoginPage.css'; // Adjust the path based on your project structure


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
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
          setError('Unexpected response format. Check the server response.');
        }
      } else {
        setError(data.error || 'Login failed'); // Show error from response or a default message
      }
    } catch (error) {
      console.error('Login error:', error); // Log error for debugging
      setError('Login failed. Please try again.'); // Show a user-friendly error message
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p>{error}</p>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
  
};

export default LoginPage; 
