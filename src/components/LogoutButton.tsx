"use client"
import { logout } from '../utils/auth';
import { useRouter } from 'next/router';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login'); // Redirect to login page after logout
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
