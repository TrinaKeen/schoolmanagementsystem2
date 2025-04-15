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
      // Save the token and user details in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.userId);
      localStorage.setItem('name', data.user.username);
      localStorage.setItem('role', data.user.role);
  
      // Show success message
      setSuccess('Login successful! Redirecting...');
      setError('');
  
      // Determine redirect path based on role
      const role = data.user.role?.toLowerCase(); // safer lowercase comparison
      const redirectPath = role === 'admin' ? '/admin' : '/student';
  
      console.log("Redirecting to:", redirectPath);
  
      // Redirect after a short delay
      setTimeout(() => {
        router.push(redirectPath);
      }, 2000);
    } else {
      // Handle error messages
      if (data.error === 'Invalid credentials') {
        setError('Incorrect email or password. Please try again.');
      } else if (data.error === 'Email not registered') {
        setError('Email is not registered. Please sign up first.');
      } else {
        setError(data.error || 'An error occurred during login.');
      }
      setSuccess('');
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
