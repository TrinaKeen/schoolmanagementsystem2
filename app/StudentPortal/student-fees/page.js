'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../components/accountsettings.module.css'; // Create a CSS module for styling
import Sidebar from '../components/Sidebar'; 
import styles1 from '../components/Sidebar.module.css';

const studentFees = () => {
    const [studentData, setStudentData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [studentnumber, setStudentnumber] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [username, setUsername] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const router = useRouter();
    
    
    
    useEffect(() => {
      const fetchStudentData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authorization token is missing');
          setLoading(false);
          return;
        }
  
        try {
          const res = await fetch('/api/auth/student-accountsettings', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
  
          if (res.ok) {
            const data = await res.json();
            console.log('Fetched student data:', data);
            setStudentData(data);
            setStudentnumber(data.studentNumber); // Set student number
            setFullname(data.fullname);
            setEmail(data.email);
            setCountry(data.country);
            setUsername(data.username);
          } else {
            setError('Failed to fetch student data');
          }
        } catch (err) {
          setError('Failed to fetch student data');
        } finally {
          setLoading(false);
        }
      };
  
      fetchStudentData();
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authorization token is missing');
        return;
      }
  
      const updatedData = {
        studentnumber,
        fullname,
        email,
        country,
        username,
        currentPassword,
        newPassword,
      };
  
      try {
        const res = await fetch('/api/auth/student-accountsettings', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        });
  
        const data = await res.json();
  
        if (res.ok) {
          alert('Account settings updated successfully');
          router.push('/StudentPortal/student-dashboard'); // Redirect after success
        } else {
          setError(data.error || 'Failed to update account settings');
        }
      } catch (err) {
        setError('Failed to update account settings');
      }
    };
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    
  return (
    <div>
         {/* Sidebar */}
         <Sidebar
        className={styles1.container}
        studentNumber={studentData.studentnumber || ''}
      />
      <div className={styles.formContainer}>
      
        <form >
         <h1>NO RECORD FOUND</h1>
        </form>
      </div>
    </div>
  );
};

export default studentFees;
