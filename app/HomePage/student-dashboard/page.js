import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Home.module.css'; // If you're using a custom CSS module
import logo from './school-logo.png';

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
          <h1>School Management System</h1>
        </div>
        
        <nav className={styles.navbar}>
          <Link href="/">Home</Link>
          <Link href="/students">Students</Link>
          <Link href="/teachers">Teachers</Link>
          <Link href="/classes">Classes</Link>
          <Link href="/settings">Settings</Link>
        </nav>
      </header>

      <main className={styles.main}>
        <h2>Welcome to the School Management System</h2>
        <p>
          Manage your school's daily activities, student records, teacher assignments, and more.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Student Management</h3>
            <p>Manage student records and progress.</p>
            <Link href="/">Go to Student Management &rarr;</Link>
          </div>

          <div className={styles.card}>
            <h3>Teacher Management</h3>
            <p>Manage teacher assignments and performance.</p>
            <Link href="/">Go to Teacher Management &rarr;</Link>
          </div>

          <div className={styles.card}>
            <h3>Class Management</h3>
            <p>Organize class schedules and attendance.</p>
            <Link href="/">Go to Class Management &rarr;</Link>
          </div>

          <div className={styles.card}>
            <h3>Settings</h3>
            <p>Customize the system settings.</p>
            <Link href="/">Go to Settings &rarr;</Link>
          </div>
        </div>
      </main><footer className={styles.footer}>
        <p>&copy; 2024 School Management System</p>
      </footer>
    </div>
  );
}