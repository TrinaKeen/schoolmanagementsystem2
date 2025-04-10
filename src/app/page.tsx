// src/app/page.tsx

'use client'; // Make sure it's marked as a client component

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import from next/navigation
import styles from '../components/styles/studentloginregister.module.css';

const SignupPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState<'error' | 'success'>('success');

  const handleLoginRedirect = () => {
    router.push('/sign-in');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      // Make the API call to register the user
      const response = await fetch('/api/studentLogin_registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Registration was successful
        setSuccess('Registration successful! Please log in.');
        setError('');  // Clear any previous error
        setPopupType('success');
        setPopupVisible(true);
  
        // Clear the form fields after successful registration
        setEmail('');       // Clear email input
        setUsername('');    // Clear username input
        setPassword('');    // Clear password input
      } else {
        // If the response is not ok, display the error message
        setSuccess('');  // Clear any previous success message
        setError(result.error || 'An error occurred during registration');
        setPopupType('error');
        setPopupVisible(true);
      }
    } catch (err) {
      // Handle any unexpected errors (network issues, server errors)
      setError('Internal server error');
      setSuccess('');  // Clear any previous success message
      setPopupType('error');
      setPopupVisible(true);
    }
  };
  
  

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Sign Up</h1>

      <form className={styles.form} onSubmit={handleRegister}>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input
          id="email"
          className={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="username" className={styles.label}>Full Name</label>
        <input
          id="username"
          className={styles.input}
          type="text"
          placeholder="Fullname"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password" className={styles.label}>Password</label>
        <input
          id="password"
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className={styles['register-button']} type="submit">
          Register
        </button>
      </form>

      {/* Login Link */}
      <a href="#" onClick={handleLoginRedirect} className={styles['login-link']}>
        Already have an account? Login
      </a>

      {/* Popup */}
      <div className={`${styles.popup} ${styles[popupType]} ${popupVisible ? styles.show : ''}`}>
        <div className={styles['popup-content']}>
          <p>{error || success}</p>
        </div>
        <button
          className={styles['popup-button']}
          onClick={() => setPopupVisible(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};



export default SignupPage ;
