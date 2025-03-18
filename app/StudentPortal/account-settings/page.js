"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../components/accountsettings.module.css';
import Sidebar from '../components/Sidebar';

const AccountSettings = () => {
  const [studentNumber, setStudentNumber] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchStudentNumber = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authorization token is missing');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/students/student-data', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorResponse = await res.json();
          setError(errorResponse.error || 'Failed to fetch student number');
          setLoading(false);
          return;
        }

        
        const data = await res.json();
        const studentNumber = data.studentNumber;
        setStudentNumber(data.studentNumber); // Save the student number
        fetchStudentDetails(studentNumber);

       

      } catch (error) {
        console.error('Error fetching student number:', error);
        setError('Failed to fetch student number');
        setLoading(false);
      }
    };

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
    
        setStudentData(data);
        setLoading(false);
      } catch (error) {
        
        setError('Failed to fetch student details');
        setLoading(false);
      }
    };
    
    
    

    fetchStudentNumber();
  }, []);

  // Change Password
  const handleChangePassword = async (e) => {
    e.preventDefault();
  
    // Validate new password and confirm password match
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords don't match");
      return;
    }
  
    const token = localStorage.getItem('token');
    if (!token) {
      setPasswordError('Authorization token is missing');
      return;
    }
  
    const studentNumber = studentData?.student_number; // Get the student number from studentData
  
    if (!studentNumber) {
      setPasswordError('Student number is missing');
      return;
    }
  
    const res = await fetch('/api/students/studentupdateaccount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ studentNumber, currentPassword, newPassword }),
    });
  
    const data = await res.json();
  
    if (res.ok) {
      alert('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPasswordError(data.error || 'Failed to change password');
    }
  };

  return (
    <div style={{ backgroundColor: 'white', height: '100vh' , paddingLeft: '300px', paddingTop: '50px', color: 'black'}}>
       <Sidebar studentNumber={studentNumber} />
  <div className={styles.formContainer}>
    <h1>Account Settings</h1>

    {/* Error message */}
    {error && <div className={styles.error}>{error}</div>}

    {studentData && (
      <div>
        {/* Display student information */}
        <div className={styles.formItem}>
          <label>Student Number: </label>
          <span>{studentData.student_number}</span> {/* Ensure this matches the API response */}
        </div>

        <div className={styles.formItem}>
          <label>Full Name: </label>
          <span>{studentData.full_name}</span>
        </div>

        <div className={styles.formItem}>
          <label>Email: </label>
          <span>{studentData.email}</span>
        </div>

        <div className={styles.formItem}>
          <label>Country: </label>
          <span>{studentData.country}</span>
        </div>

        <div className={styles.formItem}>
          <label>Username: </label>
          <span>{studentData.username}</span>
        </div>
        <br></br>
        <hr />

        {/* Change Password Section */}
        <h2>Change Password</h2>

        <form onSubmit={handleChangePassword}>
          {/* Current Password */}
          <div className={styles.formItem}>
            <label>Current Password: </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          {/* New Password */}
          <div className={styles.formItem}>
            <label>New Password: </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm New Password */}
          <div className={styles.formItem}>
            <label>Confirm New Password: </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Password Error */}
          {passwordError && <div className={styles.error}>{passwordError}</div>}

          {/* Change Password Button */}
          <button type="submit">Change Password</button>
        </form>
      </div>
    )}
  </div>
</div>

  );
};

export default AccountSettings;
