'use client';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'; // Importing the Sidebar component for layout
import styles from '../components/Home.module.css'; // CSS module for styling the Home page
import styles1 from '../components/Sidebar.module.css'; // CSS module for Sidebar

export default function StudentDashboard() {
  // Setting up React state hooks
  const [studentData, setStudentData] = useState(null); // Holds fetched student data
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const [error, setError] = useState(''); // Error state to store any errors that occur during data fetching

  // Fetch student data once the component mounts
  useEffect(() => {
    fetchStudentData(); // Call the function to fetch student data
  }, []); // Empty dependency array means this will run once when the component mounts

  // Function to fetch student data from the server
  const fetchStudentData = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage for authorization
      if (!token) throw new Error('Token not found'); // If token is not found, throw an error

      console.log('Fetching student data with token:', token); // Debugging: log the token

      // Send a GET request to fetch student data from the API, with the token as authorization
      const res = await fetch('/api/students/student-data', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Authorization header with Bearer token
        },
      });

      // Check if the response is successful
      if (!res.ok) {
        const errorData = await res.json(); // Parse the error response if any
        throw new Error(errorData.error || 'Failed to fetch student data'); // Throw an error with the message
      }

      const data = await res.json(); // Parse the successful response
      setStudentData(data); // Set the fetched student data into state
    } catch (err) {
      console.error('Error fetching student data:', err); // Log the error for debugging
      setError(err.message || 'An unexpected error occurred'); // Set error message in state
    } finally {
      setLoading(false); // Set loading state to false after the data has been fetched or an error has occurred
    }
  };

  return (
    <div style={{ backgroundColor: 'white', height: '100vh', color: 'black' }}>
      {/* Sidebar with student number as a prop */}
      <Sidebar
        className={styles1.container}
        studentNumber={studentData?.studentNumber || ''} // Pass student number to Sidebar (conditional rendering for loading state)
      />
      <div className={styles.content}>
        {/* Header with conditional rendering for loading or error messages */}
        <header className={styles.header}>
          {loading ? (
            <p>Loading...</p> // Show loading message while data is being fetched
          ) : error ? (
            <p>{error}</p> // Show error message if something goes wrong
          ) : (
            <p>
              Welcome, <strong>Student {studentData.studentNumber}</strong>!
              <br />
              Last Login: <strong>{new Date(studentData.lastLogin).toLocaleString()}</strong>
              {/* Show student number and last login time */}
            </p>
          )}
        </header>
        <main className={styles.main}>
          {/* Main content of the dashboard */}
          <h2>Welcome to the Student Portal</h2>
          <p>Manage your school's admission, fees, and applications.</p>
        </main>
        <footer className={styles.footer}>
          {/* Footer section */}
          <p>&copy; 2024 School Management System</p>
        </footer>
      </div>
    </div>
  );
}
