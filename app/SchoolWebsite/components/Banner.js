// Import necessary libraries and components
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import styles from './components.module.css';
import logo from '../../../src/school-logo.png';

// Banner Component
const Banner = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Evelyn E. Fabie College Inc.</title>
        <meta name="description" content="School Management System for efficient management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src={logo} alt="School Logo" width={100} height={100} />
          <h1>Evelyn E. Fabie College Inc.</h1>
        </div>
        <nav className={styles.navbar}>
          <Link href="/">HOME</Link>
          <Link href="/SchoolWebsite/Admission">ADMISSION</Link>
          <Link href="/SchoolWebsite/AboutUs">ABOUT US</Link>
          <Link href="/SchoolWebsite/StudentRegistration">REGISTRATION</Link>
          <div className={styles.loginDropdown}>
            <button className={styles.dropdownButton}>LOG IN</button>
            <div className={styles.dropdownContent}>
              <Link href="/LogIn/AdminLogin">Employee</Link>
              <Link href="/LogIn/StudentLogin">Student</Link>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Banner;
