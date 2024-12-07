import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from './../HomePage.module.css'; // If you're using a custom CSS module
import logo from '/src/school-logo.png';
import teacherlogo from '/src/teachericon.png';
import studentlogo from '/src/studentlogo.png';
import courseslogo from '/src/courseslogo.png';
import departmentslogo from '/src/departmentslogo.png';
import studentfeeslogo from '/src/studentfeeslogo.png';
import reportlogo from '/src/reportlogo.png';
import { FaHome, FaUsers, FaBars , FaEnvelope, FaBell } from 'react-icons/fa';

export default function Home() {
  return (
    <div className={styles.container}>
    <Head>
      <title>School Management System</title>
      <meta name="description" content="School Management System for efficient management" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <header className={styles.header}>
        <div className={styles.logo}>
          <Image src={logo} alt="School Logo" width={100} height={100} />
          <h1>Evelyn E. Fabie College Inc.</h1>
        </div>
        
        <nav className={styles.navbar}>
          <Link href="/"><FaHome size={24} /> Dashboard</Link>
          <Link href="/"><FaBell size={24} /> Notification</Link>
          <Link href="/students"><FaEnvelope size={24} /> Messages</Link>
          <Link href="/teachers"><FaBars  size={24} /> Settings</Link>

        </nav>
        
      </header>
 
      <main className={styles.main}>
        <h2>Welcome to the Super Admin</h2>
        <p>
          Manage your school's daily activities, student records, teacher assignments, and more.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
          <Image src={studentlogo} alt="Teacher Logo" width={200} height={200} />
            <h3>Student Management</h3>
            <p>Manage student records and progress.</p>
            <Link href="/">Go to Student Management</Link>
          </div>

          <div className={styles.card}>
          <Image src={teacherlogo} alt="Teacher Logo" width={200} height={200} />
            <h3>Teacher Management</h3>
            <p>Manage teacher assignments and performance.</p>
            <Link href="/">Go to Teacher Management </Link>
          </div>

          <div className={styles.card}>
          <Image src={departmentslogo} alt="Teacher Logo" width={200} height={200} />
            <h3>School Departments</h3>
            <p>Organize class schedules and attendance.</p>
            <Link href="/">Go to Departments Management </Link>
          </div>

        </div>
        <div className={styles.grid}>
          <div className={styles.card}>
          <Image src={courseslogo} alt="Teacher Logo" width={200} height={200} />
            <h3>Student Courses</h3>
            <p>Manage student records and progress.</p>
            <Link href="/">Go to Student Courses Management </Link>
          </div>

          <div className={styles.card}>
          <Image src={studentfeeslogo} alt="Teacher Logo" width={200} height={200} />
            <h3>Student Fees</h3>
            <p>Manage teacher assignments and performance.</p>
            <Link href="/">Go to Tuition Fees Management </Link>
          </div>

          <div className={styles.card}>
          <Image src={reportlogo} alt="Report Logo" width={200} height={200} />
            <h3>Reports</h3>
            <p>Organize class schedules and attendance.</p>
            <Link href="/">Go to Reports Management </Link>
          </div>

        </div>
      </main>
    </div>
  );
}