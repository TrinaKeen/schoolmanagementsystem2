"use client";

import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Home.module.css'; // If you're using a custom CSS module
import logo from '../src/school-logo.png';
import coverphoto from '../src/schoolcover.jpg';

export default function Home() {
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
          <Link href="/">ADMISSION</Link>
          <Link href="/">ABOUT US</Link>
          <Link href="/">REGISTRATION</Link>
          <div className={styles.loginDropdown}>
            <button className={styles.dropdownButton}>LOG IN</button>
            <div className={styles.dropdownContent}>
              <Link href="/LogIn/AdminLogin">Employee</Link>
              <Link href="/LogIn/StudentLogin">Student</Link>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <div className={styles.coverphoto}>
          <Image src={coverphoto} alt="Cover Photo" />
        </div>

        <div className={styles.mainpage}>
          <h1 className='announcement'>ANNOUNCEMENTS</h1>
          <div className={styles.announcement}>
            <div className={styles.card}>
              <h3>Important Announcement</h3>
              <p>Stay tuned for upcoming events and updates!</p>
            </div>
            <div className={styles.card}>
              <h3>Holiday Schedule</h3>
              <p>Our campus will be closed on December 25th for the Christmas holiday.</p>
            </div>
          </div>

          <h1 className='Events'>Upcoming Events</h1>
          <div className={styles.events}>
            <div className={styles.card}>
              <h3>Annual Sports Fest</h3>
              <p>Join us on January 10th for the Annual Sports Festival at the campus grounds.</p>
            </div>
            <div className={styles.card}>
              <h3>Parent-Teacher Conference</h3>
              <p>Scheduled for February 15th. Please mark your calendars.</p>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Evelyn E. Fabie College Inc. All rights reserved.</p>
      </footer>
    </div>
  );
}
