'use client';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import styles from '../components/Home.module.css';
import styles1 from '../components/Sidebar.module.css';

export default function StudentDashboard() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch student data when the component mounts
  useEffect(() => {
    fetchStudentData();
  }, []);

  // Function to fetch student data (includes student number)
  const fetchStudentData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found');

      console.log('Fetching student data with token:', token);

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
      setStudentData(data); // Set the student data in state
      fetchStudentDetails(data.studentNumber); // Fetch student details using the student number
    } catch (err) {
      console.error('Error fetching student data:', err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false); // Set loading state to false after data is fetched or if an error occurs
    }
  };

  // Function to fetch student details based on student number
  const fetchStudentDetails = async (studentNumber) => {
    try {
      const res = await fetch(`/api/students/studentlogindetails?studentNumber=${studentNumber}`, {
        method: 'GET',
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        setError(errorResponse.error || 'Failed to fetch student details');
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log('Fetched student data:', data); // Log the fetched data
      setStudentData((prevData) => ({
        ...prevData,
        ...data, // Merge the fetched details into the previous student data
      }));
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch student details');
      setLoading(false);
    }
  };

  // Format date for last login display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'N/A' : date.toLocaleString();
  };

  return (
    <div style={{ backgroundColor: 'white', height: '100vh', color: 'black' }}>
      <Sidebar
        className={styles1.container}
        studentNumber={studentData?.studentNumber || ''} // Pass student number to Sidebar
      />
      <div className={styles.content}>
        <header className={styles.header}>
          {loading ? (
            <p>Loading...</p> // Display loading message while fetching data
          ) : error ? (
            <p>{error}</p> // Display error message if something went wrong
          ) : (
            <p>
              Welcome, <strong>Student {studentData?.studentNumber}</strong>!
              <br />
              Last Login: <strong>{formatDate(studentData?.lastLogin)}</strong>
            </p>
          )}
        </header>
        <main style={{ padding: '40px', background: '#f7f7f7', borderRadius: '15px', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)', maxWidth: '900px', margin: '40px auto', color: '#333', fontFamily: 'Roboto, sans-serif' }}>
  <h2 style={{ fontSize: '28px', marginBottom: '20px', fontWeight: '700', textAlign: 'center', color: '#2f3d4c', textTransform: 'uppercase', letterSpacing: '2px' }}>
    Welcome to the Student Portal
  </h2>
  <p style={{ fontSize: '16px', textAlign: 'center', lineHeight: '1.8', marginBottom: '30px', fontWeight: '400', color: '#555' }}>
    Manage your school's admission, fees, and applications.
  </p>

  {/* Display student details */}
  {studentData && (
    <div style={{ background: '#ffffff', padding: '20px', borderRadius: '10px', boxShadow: '0 8px 20px rgba(0, 0, 0, 0.08)', border: '1px solid #d1d1d1', marginTop: '20px' }}>
      <p style={{ margin: '15px 0', fontSize: '16px', color: '#333', display: 'flex', alignItems: 'center' }}>
        <strong style={{ color: '#4a90e2', fontWeight: '600', marginRight: '10px' }}>Full Name:</strong> {studentData?.full_name}
      </p>
      <p style={{ margin: '15px 0', fontSize: '16px', color: '#333', display: 'flex', alignItems: 'center' }}>
        <strong style={{ color: '#4a90e2', fontWeight: '600', marginRight: '10px' }}>Email:</strong> {studentData?.email}
      </p>
      <p style={{ margin: '15px 0', fontSize: '16px', color: '#333', display: 'flex', alignItems: 'center' }}>
        <strong style={{ color: '#4a90e2', fontWeight: '600', marginRight: '10px' }}>Country:</strong> {studentData?.country}
      </p>
      <p style={{ margin: '15px 0', fontSize: '16px', color: '#333', display: 'flex', alignItems: 'center' }}>
        <strong style={{ color: '#4a90e2', fontWeight: '600', marginRight: '10px' }}>Username:</strong> {studentData?.username}
      </p>
    </div>
  )}
</main>



        <footer className={styles.footer}>
          <p>&copy; 2024 School Management System</p>
        </footer>
      </div>
    </div>
  );
}
