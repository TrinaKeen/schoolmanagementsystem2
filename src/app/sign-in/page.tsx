"use client";
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../components/styles/signin.module.css'; // Importing the CSS module

const SignInPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const router = useRouter(); // Use it here

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Save the token in localStorage
      localStorage.setItem('token', data.token);

      // Set success message
      setSuccess('Login successful! Redirecting...');
      setError(''); // Clear any previous error messages

      // Redirect to the /admin/dashboard page
      setTimeout(() => {
        router.push('/admin');
      }, 2000); // Wait 2 seconds before redirecting
    } else {
      // Handling different error cases based on response
      if (data.error === 'Invalid credentials') {
        setError('Incorrect email or password. Please try again.');
      } else if (data.error === 'Email not registered') {
        setError('Email is not registered. Please sign up first.');
      } else {
        setError(data.error || 'An error occurred during login.');
      }
      setSuccess('');  // Clear any previous success message
    }
  };

  return (
    <div className={styles['login-form']}>
      <h1 className={styles['login-form__heading']}>Login</h1>

      {/* Displaying success or error messages */}
      {error && <p className={styles['error']}>{error}</p>}
      {success && <p className={styles['success']}>{success}</p>}  {/* Success message */}

      <form onSubmit={handleSubmit} className={styles['form']}>
        <div>
          <label htmlFor="email" className={styles['form__label']}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles['form__input']}
          />
        </div>
        <div>
          <label htmlFor="password" className={styles['form__label']}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles['form__input']}
          />
        </div>
        <button type="submit" className={styles['button']}>Login</button>
      </form>
    </div>
  );
};

export default SignInPage;
