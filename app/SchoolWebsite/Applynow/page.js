"use client";

import React, { useState } from 'react';
import WebsiteHeader from '../components/WebsiteHeader'; // Importing the WebsiteHeader component for the page header
import styles from '../components/ApplyNow.module.css'; // CSS module for styling the Apply Now page

export default function ApplyNow() {
  // State to store the form data from the user input fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    username: '',
    password: '',
  });

  // State to store any success or error messages for user feedback
  const [message, setMessage] = useState('');

  // Function to handle changes in form input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update the formData state with the new value of the field
  };

  // Function to validate the form inputs before submission
  const validateForm = () => {
    const { fullName, email, password } = formData;

    // Check if fullName is provided
    if (!fullName.trim()) {
      return 'Full name is required.'; // Return error message if full name is empty
    }

    // Check if email format is valid
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return 'Please enter a valid email address.'; // Return error if email format is invalid
    }

    // Check if password length is less than 6 characters
    if (password.length < 6) {
      return 'Password must be at least 6 characters long.'; // Return error message if password is too short
    }

    return null; // Return null if all validations pass
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)

    // First, validate the form data
    const validationError = validateForm();
    if (validationError) {
      setMessage(validationError); // If there's a validation error, set the error message
      return; // Exit the function early if validation fails
    }

    try {
      // Send a POST request to register the student
      const res = await fetch('/api/students/studentloginregister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the request header to JSON
        },
        body: JSON.stringify(formData), // Send the formData as the request body
      });

      const data = await res.json(); // Parse the JSON response

      // If the request was successful, show success message
      if (res.ok) {
        setMessage('Student successfully registered!');
        // Clear the form data after successful registration
        setFormData({
          fullName: '',
          email: '',
          country: '',
          username: '',
          password: '',
        });
      } else {
        // If the registration failed, show the error message from the response
        setMessage(data.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      // Handle any unexpected errors during the API call
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
