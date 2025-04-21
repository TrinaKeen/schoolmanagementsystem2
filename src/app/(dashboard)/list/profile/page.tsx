"use client";
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');

    if (!userId || !role) {
      window.location.href = '/signin';
      return;
    }

    // Fetch full user info
    fetch(`/api/profile?userId=${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        } else {
          alert(data.error || 'Failed to load profile');
        }
      })
      .catch(err => {
        console.error(err);
        alert("Something went wrong.");
      });
  }, []);

  const changePassword = async () => {
    const email = prompt("Enter your email:");
    const currentPassword = prompt("Enter your current password:");
    const newPassword = prompt("Enter your new password:");

    if (!email || !currentPassword || !newPassword) {
      alert("All fields are required.");
      return;
    }

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, currentPassword, newPassword }),
      });

      const data = await res.json();
      alert(res.ok ? data.message : `Error: ${data.error}`);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    }
  };

  const renderRoleDetails = () => {
    if (!user) return null;

    const { role, student, instructor, admin } = user;

    if (role === 'student' && student) {
      return (
        <div>
          <h3>Student Details</h3>
          <p><strong>Name:</strong> {student.firstName} {student.lastName}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Phone:</strong> {student.phoneNumber}</p>
          <p><strong>Address:</strong> {student.homeAddress}</p>
        </div>
      );
    }

    if (role === 'instructor' && instructor) {
      return (
        <div>
          <h3>Instructor Details</h3>
          <p><strong>Name:</strong> {instructor.firstName} {instructor.lastName}</p>
          <p><strong>Email:</strong> {instructor.email}</p>
          <p><strong>Department:</strong> {instructor.department}</p>
          <p><strong>Phone:</strong> {instructor.phoneNumber}</p>
        </div>
      );
    }

    if (role === 'admin' && admin) {
      return (
        <div>
          <h3>Admin Details</h3>
          <p><strong>Name:</strong> {admin.firstName} {admin.lastName}</p>
          <p><strong>Email:</strong> {admin.email}</p>
          <p><strong>Phone:</strong> {admin.phoneNumber}</p>
        </div>
      );
    }

    return <p>No additional details available.</p>;
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>My Profile</h1>
      <div style={{ marginTop: '1rem' }}>
        <p><strong>User ID:</strong> {user.id}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      <div style={{ marginTop: '2rem' }}>
        {renderRoleDetails()}
      </div>

      <button
        onClick={changePassword}
        style={{
          marginTop: '2rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Change Password
      </button>
    </div>
  );
};

export default Dashboard;
