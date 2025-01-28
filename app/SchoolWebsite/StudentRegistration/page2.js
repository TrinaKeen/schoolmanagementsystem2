'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    country: '',
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const validateForm = () => {
    const { fullname, email, country, username, password } = formData;

    if (!fullname || !email || !country || !username || !password) {
      return 'All fields are required.';
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return 'Please enter a valid email address.';
    }

    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }

    return null; // Validation passed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setSuccess('');
      return;
    }

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess('Student successfully registered!');
        setError('');
        setTimeout(() => {
          router.push('/LogIn/StudentLogin');
        }, 2000); // Delay for 2 seconds to show the success message
      } else {
        setError(data.error || 'Registration failed. Please try again.');
        setSuccess('');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.');
      setSuccess('');
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', color: 'black', background: 'white' }}>
      <h1>Register</h1>
      <form style={{ color: 'black' }} onSubmit={handleSubmit}>
        {['fullname', 'email', 'country', 'username', 'password'].map((field) => (
          <div style={{ marginBottom: '15px' }} key={field}>
            <label htmlFor={field} style={{ display: 'block', marginBottom: '5px' }}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
              id={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
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
            marginRight: '10px',
          }}
        >
          Register
        </button>
        <button
          type="button"
          onClick={handleCancel}
          style={{
            backgroundColor: '#f44336',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Cancel
        </button>
      </form>
      {success && <p style={{ color: 'green', marginTop: '20px' }}>{success}</p>}
      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
    </div>
  );
}
