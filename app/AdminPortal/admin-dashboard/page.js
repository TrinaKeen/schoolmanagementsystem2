"use client";

import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../HomePage.module.css'
import logo from '/src/school-logo.png';
import teacherlogo from '/src/teachericon.png';
import studentlogo from '/src/studentlogo.png';
import courseslogo from '/src/courseslogo.png';
import departmentslogo from '/src/departmentslogo.png';
import studentfeeslogo from '/src/studentfeeslogo.png';
import reportlogo from '/src/reportlogo.png';
import { FaHome, FaEnvelope, FaBell, FaBars } from 'react-icons/fa';

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);  // Toggle dropdown visibility

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

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
          <h1>EEFCI Management System</h1>
        </div>

        <nav className={styles.navbar}>
          <Link href="#"><FaHome size={35} /></Link>
          <Link href="#"><FaBell size={35} /></Link>
          <Link href="#"><FaEnvelope size={35} /></Link>
          
          <div className={styles.loginDropdown}>
            {/* Button to toggle dropdown */}
            <button 
              className={styles.dropdownButton} 
              onClick={toggleDropdown}  // Toggle dropdown on button click
            >
              <FaBars size={35} />
            </button>

            {/* Conditionally render the dropdown based on state */}
            {isDropdownOpen && (
              <div className={styles.dropdownContent}>
                <Link href="/">Log Out</Link>
                <Link href="../AdminPortal/admin-settings">Account Setting</Link>
                <Link href="#">Help Centre</Link>
              </div>
            )}
          </div>
        </nav>
      </header>

      <main className={styles.main}>
        <h2>Welcome to the Super Admin Account</h2>
        <p>Manage your school's daily activities, student records, teacher assignments, and more.</p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <Image src={studentlogo} alt="Student Logo" width={200} height={200} />
            <h3>Student Management</h3>
            <p>Manage student records and progress.</p>
            <Link href="../AdminPortal/StudentPage">Go to Student Management</Link>
          </div>

          <div className={styles.card}>
            <Image src={teacherlogo} alt="Teacher Logo" width={200} height={200} />
            <h3>Teacher Management</h3>
            <p>Manage teacher assignments and performance.</p>
            <Link href="#">Go to Teacher Management </Link>
          </div>

          <div className={styles.card}>
            <Image src={departmentslogo} alt="Departments Logo" width={200} height={200} />
            <h3>School Departments</h3>
            <p>Organize class schedules and attendance.</p>
            <Link href="#">Go to Departments Management </Link>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <Image src={courseslogo} alt="Courses Logo" width={200} height={200} />
            <h3>Student Courses</h3>
            <p>Manage student records and progress.</p>
            <Link href="#">Go to Student Courses Management </Link>
          </div>

          <div className={styles.card}>
            <Image src={studentfeeslogo} alt="Student Fees Logo" width={200} height={200} />
            <h3>Student Fees</h3>
            <p>Manage teacher assignments and performance.</p>
            <Link href="#">Go to Tuition Fees Management </Link>
          </div>

          <div className={styles.card}>
            <Image src={reportlogo} alt="Report Logo" width={200} height={200} />
            <h3>Reports</h3>
            <p>Organize class schedules and attendance.</p>
            <Link href="#">Go to Reports Management </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
