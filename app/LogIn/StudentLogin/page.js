'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importing useRouter for navigation

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Initialize useRouter

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { username, password } = formData;

    // Only check if both username and password are provided
    if (!username || !password) {
      return 'Username and password are required.';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await fetch('/api/studentlogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const text = await response.text(); // Read the response as text
      console.log('Response text:', text); // Log the response

      // Check if the response is JSON
      let data;
      try {
        data = JSON.parse(text); // Try to parse the response as JSON
      } catch (err) {
        console.error('Failed to parse JSON:', err);
        if (text.includes('<html>')) {
          setError('Unexpected error page returned from server. Please check server configuration.');
        } else {
          setError('Unexpected server response. Please try again.');
        }
        return;
      }

      if (response.ok) {
        setMessage('Login successful!');
        // Redirect after successful login
        router.push('/StudentPortal/student-dashboard');
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', color: 'black', background: 'white' }}>
      <h1>Login as a Student</h1>
      <form onSubmit={handleSubmit}>
        {[{ label: 'Username', name: 'username', type: 'text' },
          { label: 'Password', name: 'password', type: 'password' },
        ].map(({ label, name, type }) => (
          <div key={name} style={{ marginBottom: '15px' }}>
            <label htmlFor={name} style={{ display: 'block', marginBottom: '5px' }}>{label}</label>
            <input
              id={name}
              name={name}
              type={type}
              value={formData[name]}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
          </div>
        ))}
        <button
          type="submit"
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      </form>
      {message && <p style={{ color: 'green', marginTop: '20px' }}>{message}</p>}
      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
      <div style={{ marginTop: '10px' }}>
        <a href="/forgot-password" style={{ color: '#4CAF50' }}>Forgot Password?</a>
      </div>
    </div>
  );
};

export default Login;
