import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const [username, setUsername] = useState<string>(""); // To store the username
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push('/login'); // Redirect to login page if no token found
    } else {
      try {
        const payload = token.split('.')[1]; // Extract the payload (middle part of JWT)
        const decoded: any = JSON.parse(atob(payload)); // Decode and parse the payload
        setUsername(decoded.username); // Set the username from decoded token

        const userRole = decoded.role;
        // If you want to restrict access to specific roles:
        if (userRole !== "Admin") {
          router.push('/'); // Redirect if the role is not 'Admin'
        }
      } catch (error) {
        router.push('/login'); // In case token is invalid
      }
    }
  }, []);

  return (
    <div>
      <h1>Welcome, {username}</h1> {/* Displaying the username */}
      <h2>Admin Dashboard</h2>
      {/* Add your dashboard content */}
    </div>
  );
};

export default Dashboard;
