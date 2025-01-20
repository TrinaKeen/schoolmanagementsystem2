'use client';
import { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    username: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { fullName, email, country, username, password } = formData;

    if (!fullName || !email || !country || !username || !password) {
      return 'All fields are required.';
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return 'Please enter a valid email address.';
    }

    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
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
      const response = await fetch('/api/studentregister', {
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
        setError('Unexpected server response. Please try again.');
        return;
      }
  
      if (response.ok) {
        setMessage('Student successfully registered!');
        setFormData({
          fullName: '',
          email: '',
          country: '',
          username: '',
          password: '',
        });
      } else {
        setError(data.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', color: 'black', background: 'white' }}>
      <h1>Register as a Student</h1>
      <form onSubmit={handleSubmit}>
        {[{ label: 'Full Name', name: 'fullName', type: 'text' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Country', name: 'country', type: 'text' },
          { label: 'Username', name: 'username', type: 'text' },
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
          Register
        </button>
      </form>
      {message && <p style={{ color: 'green', marginTop: '20px' }}>{message}</p>}
      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
    </div>
  );
};

export default Register;
