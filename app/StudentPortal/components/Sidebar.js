// components/Sidebar.js
import Image from 'next/image';
import Link from 'next/link';
import styles from './Sidebar.module.css'; // Adjust the path to your CSS module
import logo from '/src/school-logo.png'; // Adjust the path to your logo image

export default function Sidebar({ studentNumber }) {
  // Function to handle logout
  const handleLogout = () => {
    // Clear the token or session data from storage
    localStorage.removeItem('token');
    sessionStorage.clear();

    // Redirect to login page
    window.location.href = '/';
  };

  return (
    <div className={styles.sidebar}>
      {/* Logo Section */}
      <div className={styles.logo}>
        <Image src={logo} alt="School Logo" width={150} height={150} priority />
        
      </div>

      {/* Student Info Section */}
      <div className={styles.studentInfo}>
      <h1 className="text-center font-bold text-xl">Student Portal</h1>
      <br></br>
        <p>Logged in as:</p>
        {studentNumber ? (
          <p>
            <strong>Student Number:</strong> <br></br>{studentNumber}
          </p>
        ) : (
          <p>
            <strong>Student Number:</strong> Fetching...
          </p>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className={styles.navbar} aria-label="Sidebar navigation">
        <Link href="/StudentPortal/student-dashboard">
          Dashboard
        </Link>
        <Link href="/StudentPortal/StudentApplication">
         Apply for Admission
        </Link>
        <Link href="/StudentPortal/application-status">
          Track My Application
        </Link>
        <Link href="/StudentPortal/student-fees">
          Fees Payment
        </Link>
        <Link href="/StudentPortal/account-settings">
          Account Settings
        </Link>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Log out
        </button>
      </nav>
    </div>
  );
}
