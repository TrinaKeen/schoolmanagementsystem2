// components/Sidebar.js
import Image from 'next/image';
import Link from 'next/link';
import styles from './Sidebar.module.css'; // Adjust the path to your CSS module
import logo from '/src/school-logo.png'; // Adjust the path to your logo image

export default function Sidebar({ studentNumber }) {
  // Function to handle logout
  const handleBack = () => {

    window.location.href = '/AdminPortal/admin-dashboard';
  };

  return (
    <div className={styles.sidebar}>
      {/* Logo Section */}
      <div className={styles.logo}>
        <Image src={logo} alt="School Logo" width={100} height={100} priority />
        <h1>Admin Portal</h1>
      </div>



      {/* Navigation Menu */}
      <nav className={styles.navbar} aria-label="Sidebar navigation">
        <Link href="/AdminPortal/StudentPage">
          Application Approvals
        </Link>
        <Link href="/AdminPortal/StudentPage">
        Students List 
        </Link>
        
        <Link href="/AdminPortal/StudentPage">
          Students Account Settings
        </Link>
        <button onClick={handleBack} className={styles.logoutButton}>
          Back to Dashboard
        </button>
      </nav>
    </div>
  );
}
