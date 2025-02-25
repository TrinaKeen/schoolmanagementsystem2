'use client';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'; // Adjust the path as needed
import styles from '../components/Home.module.css'; // Adjust the path to your CSS module
import styles1 from '../components/Sidebar.module.css';

export default function StudentDashboard() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found');

      console.log('Fetching student data with token:', token); // Log the token for debugging

      const res = await fetch('/api/students/student-data', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch student data');
      }

      const data = await res.json();
      setStudentData(data);
    } catch (err) {
      console.error('Error fetching student data:', err); // Log the error
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Sidebar
        className={styles1.container}
        studentNumber={studentData?.studentNumber || ''}
      />
      <div className={styles.content}>
        <header className={styles.header}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <p>
              Welcome, <strong>Student {studentData.studentNumber}</strong>!
              <br />
              Last Login: <strong>{new Date(studentData.lastLogin).toLocaleString()}</strong>
            </p>
          )}
        </header>
        <main className={styles.main}>
          <h2>Welcome to the School Management System</h2>
          <p>Manage your school's admission, fees, and applications.</p>
        </main>
        <footer className={styles.footer}>
          <p>&copy; 2024 School Management System</p>
        </footer>
      </div>
    </div>
  );
}
