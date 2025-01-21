// components/Sidebar.js
import Image from 'next/image';
import Link from 'next/link';
import styles from './Sidebar.module.css'; // Adjust the path to your CSS module
import logo from '/src/school-logo.png'; // Adjust the path to your logo image

export default function Sidebar({ studentNumber }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <Image src={logo} alt="School Logo" width={100} height={100} />
        <h1>Student Portal</h1>
      </div>

      <div className={styles.studentInfo}>
        <p>Logged in as:</p>
        <p>
          <strong>Student Number:</strong> {studentNumber ?? 'Fetching...'}
        </p>
      </div>

      <nav className={styles.navbar}>
        <Link href="/StudentPortal/student-dashboard">Dashboard</Link>
        <Link href="/StudentPortal/StudentApplication">Apply for Admission</Link>
        <Link href="/StudentPortal/application-status">Track My Application</Link>
        <Link href="/StudentPortal/payment">Fees Payment</Link>
        <Link href="/StudentPortal/settings">Profile Settings</Link>
        <Link href="/">Log out</Link>
      </nav>
    </div>
  );
}
