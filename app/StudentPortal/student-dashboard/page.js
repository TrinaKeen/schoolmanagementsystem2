import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../components/Home.module.css'; // If you're using a custom CSS module
import logo from '/src/school-logo.png';

export default function Home() {
  return (
    
    <div className={styles.container}>
      <Head>
        <title>School Management System</title>
        <meta name="description" content="School Management System for efficient management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      

      {/* Sidebar */}
      <div className={styles.sidebar}>
        
        <div className={styles.logo}>
          <Image src={logo} alt="School Logo" width={100} height={100} />
          <h1>Student Portal</h1>
        </div>
        
        <nav className={styles.navbar}>
          <Link href="/StudentPortal/student-dashboard">Dashboard</Link>
          <Link href="/StudentPortal/StudentApplication">Apply for Admission</Link>
          <Link href="/StudentPortal/application-status">Track My Application</Link>
          <Link href="/StudentPortal/payment">Fees Payment</Link>
          <Link href="/StudentPortal/settings">Profile Settings</Link>
          <Link href="/settings">Log out</Link>
        </nav>
      </div>

      {/* Main content */}
      <div className={styles.content}>
        {/* Header */}
        <header className={styles.header}>
          
            <h1>Student Portal</h1>
          
        </header>
        

        <main className={styles.main}>
          <h2>Welcome to the School Management System</h2>
          <p>
            Manage your school's admission, fees, and applications.
          </p>

          <div className={styles.grid}>
            <div className={styles.card}>
              <h3>Dashboard Overview</h3>
              <p>View your application progress and upcoming deadlines.</p>
              <Link href="/StudentPortal/student-dashboard">Go to Dashboard &rarr;</Link>
            </div>

            <div className={styles.card}>
              <h3>Apply for Admission</h3>
              <p>Start your admission application and submit required documents.</p>
              <Link href="/apply-for-admission">Apply Now &rarr;</Link>
            </div>

            <div className={styles.card}>
              <h3>Track My Application</h3>
              <p>Check the status of your application and required actions.</p>
              <Link href="/StudentPortal/application-status">Check Status &rarr;</Link>
            </div>

            <div className={styles.card}>
              <h3>Fees Payment</h3>
              <p>Make payments for your application and admission fees.</p>
              <Link href="/StudentPortal/payment">Go to Fees Payment &rarr;</Link>
            </div>

            <div className={styles.card}>
              <h3>Profile Settings</h3>
              <p>Customize your profile and account settings.</p>
              <Link href="/StudentPortal/settings">Go to Profile Settings &rarr;</Link>
            </div>
          </div>
          
        </main>

        {/* Footer */}
        <footer className={styles.footer}>
          <p>&copy; 2024 School Management System</p>
        </footer>
      </div>
    </div>
  );
}
