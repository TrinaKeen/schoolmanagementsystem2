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
      <div>
      <h1>Welcome to your account {user.name} !</h1>
      <h2>We're happy you're here!</h2>
      <h2>This is your home page. From here you can apply for a program, apply for courrses, see your schedule and more.</h2>
      </div>

      <div>
        <h1>My Application</h1>

      </div>

    <div>
      <h1>My Profile</h1>
      <h2>Name: </h2>
      <h2>Email: </h2>

    </div>

      {/* Display user information */}
      <div>
        <p><strong>User ID:</strong> {user.userId}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
      
      
    </div>
  );
};

export default Dashboard;
