"use client";

import React, { useState } from 'react';
import WebsiteHeader from '../components/WebsiteHeader';
import styles from '../components/ApplyNow.module.css';

export default function ApplyNow() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    username: '',
    password: '',
  });
  const [message, setMessage] = useState(''); // State for success/error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { fullName, email, password } = formData;

    if (!fullName.trim()) {
      return 'Full name is required.';
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
      setMessage(validationError);
      return;
    }

    try {
      const res = await fetch('/api/students/studentloginregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Student successfully registered!');
        setFormData({
          fullName: '',
          email: '',
          country: '',
          username: '',
          password: '',
        });
      } else {
        setMessage(data.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div style={{ backgroundColor: 'white', height: '100vh', color: 'black' }}>
      <WebsiteHeader />

      <main className={styles.container}>
        <h1>Apply Now</h1>
        <p className={styles.introText}>
          Join our community of learners and start your journey toward a rewarding career! Please fill out the form below to create your account.
        </p>

        {message && <p className={styles.message}>{message}</p>} {/* Display success/error message */}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="country">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter your country"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Choose a username"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
            />
          </div>

          <button type="submit" className={styles.submitButton}>Create Account</button>
        </form>

        <p className={styles.terms}>
          By creating an account, you agree to our <a href="/terms" className={styles.link}>Terms of Service</a> and <a href="/privacy" className={styles.link}>Privacy Policy</a>.
        </p>
      </main>
    </div>
  );
}
