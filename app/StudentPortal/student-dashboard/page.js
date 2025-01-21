'use client';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'; // Adjust the path as needed
// Adjust the path as needed
import styles from '../components/Home.module.css'; // Adjust the path to your CSS module
import styles1 from '../components/Sidebar.module.css';
 
export default function StudentDashboard() {
  const [studentNumber, setStudentNumber] = useState(null); // Default to null instead of 'Unknown'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the student number from localStorage
    const storedStudentNumber = localStorage.getItem('studentNumber');
    
    if (storedStudentNumber) {
      setStudentNumber(storedStudentNumber);
    } else {
      setStudentNumber('Unavailable'); // Handle case when no student number is available
    }
    
    setLoading(false); // Set loading to false after the check
  }, []);

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <Sidebar className={styles1.container} studentNumber={studentNumber} />

      {/* Main Content */}
      <div className={styles.content}>
        <header className={styles.header}>
        
          {loading ? (
            <p>Loading...</p>
          ) : (
            <p>
              Welcome, <strong>Student {studentNumber}</strong>!
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
