"use client";
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [user, setUser] = useState<{ userId: string | null; name: string | null; role: string | null }>({
    userId: null,
    name: null,
    role: null,
  });

  // Fetch user details from localStorage
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');

    if (userId && name && role) {
      setUser({ userId, name, role });
    } else {
      // If no user data found in localStorage, redirect to login
      window.location.href = '/signin';
    }
  }, []);

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      
      {/* Display user information */}
      <div>
        <p><strong>User ID:</strong> {user.userId}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
      
      {/* Optional: Add other dashboard sections like a logout button */}
      <button
        onClick={() => {
          // Clear localStorage and redirect to login
          localStorage.clear();
          window.location.href = '/signin';
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;
