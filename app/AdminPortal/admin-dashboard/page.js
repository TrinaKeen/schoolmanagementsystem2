"use client";

import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../HomePage.module.css";
import logo from "/src/school-logo.png";
import teacherlogo from "/src/teachericon.png";
import studentlogo from "/src/studentlogo.png";
import courseslogo from "/src/courseslogo.png";
import departmentslogo from "/src/departmentslogo.png";
import studentfeeslogo from "/src/studentfeeslogo.png";
import reportlogo from "/src/reportlogo.png";
import { FaHome, FaEnvelope, FaBell, FaBars } from "react-icons/fa";

export default function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null); // tracks which dropdown is opened

  // Toggle specific dropdown
  const toggleDropdown = (type) => {
    setIsDropdownOpen(isDropdownOpen === type ? null : type);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>School Management System</title>
        <meta
          name="description"
          content="School Management System for efficient management"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Link href={"/"}>
          <div className={styles.logo}>
            <Image src={logo} alt="School Logo" width={100} height={100} />
            <h1>EEFCI Management System</h1>
          </div>
        </Link>

        <nav className={styles.navbar}>
          <Link href="../AdminPortal/admin-dashboard">
            <FaHome size={35} />
          </Link>

          <div className={styles.loginDropdown}>
            <button
              className={styles.dropdownButton}
              onClick={() => toggleDropdown("notifications")}
            >
              <FaBell size={35} />
            </button>

            {isDropdownOpen === "notifications" && (
              <div className={styles.dropdownContent}>
                <p className="text-black flex justify-center">
                  No new notifications
                </p>
              </div>
            )}
          </div>
          <div className={styles.loginDropdown}>
            <button
              className={styles.dropdownButton}
              onClick={() => toggleDropdown("messages")}
            >
              <FaEnvelope size={35} />
            </button>

            {isDropdownOpen === "messages" && (
              <div className={styles.dropdownContent}>
                <p className="text-black flex justify-center">
                  No new messages
                </p>
              </div>
            )}
          </div>

          <div className={styles.loginDropdown}>
            {/* Button to toggle dropdown */}
            <button
              className={styles.dropdownButton}
              onClick={() => toggleDropdown("account")} // Toggle dropdown on button click
            >
              <FaBars size={35} />
            </button>

            {/* Conditionally render the dropdown based on state */}
            {isDropdownOpen === "account" && (
              <div className={styles.dropdownContent}>
                <Link href="/">Log Out</Link>
                <Link href="../AdminPortal/admin-settings">
                  Account Settings
                </Link>
                <Link href="#">Help Centre</Link>
              </div>
            )}
          </div>
        </nav>
      </header>

      <main className={styles.main}>
        <h2>Welcome to the Super Admin Account</h2>
        <p>
          Manage your school's daily activities, student records, teacher
          assignments, and more.
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <Image
              src={studentlogo}
              alt="Student Logo"
              width={200}
              height={200}
            />
            <h3>Student Management</h3>
            <p>Manage student records and progress.</p>
            <Link href="../AdminPortal/StudentPage">Go to Student Management</Link>
          </div>

          <div className={styles.card}>
            <Image
              src={teacherlogo}
              alt="Teacher Logo"
              width={200}
              height={200}
            />
            <h3>Teacher Management</h3>
            <p>Manage teacher assignments and performance.</p>
            <Link href="../AdminPortal/TeacherPage">
              Go to Teacher Management{" "}
            </Link>
          </div>

          <div className={styles.card}>
            <Image
              src={departmentslogo}
              alt="Departments Logo"
              width={200}
              height={200}
            />
            <h3>School Departments</h3>
            <p>Organize class schedules and attendance.</p>
            <Link href="../AdminPortal/SchoolDepartment">
              Go to Departments Management{" "}
            </Link>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <Image
              src={courseslogo}
              alt="Courses Logo"
              width={200}
              height={200}
            />
            <h3>Student Courses</h3>
            <p>Manage student records and progress.</p>
            <Link href="../AdminPortal/StudentCourses">
              Go to Student Courses Management{" "}
            </Link>
          </div>

          <div className={styles.card}>
            <Image
              src={studentfeeslogo}
              alt="Student Fees Logo"
              width={200}
              height={200}
            />
            <h3>Student Fees</h3>
            <p>Manage teacher assignments and performance.</p>
            <Link href="../AdminPortal/StudentFees">Go to Tuition Fees Management </Link>
          </div>

          <div className={styles.card}>
            <Image
              src={reportlogo}
              alt="Report Logo"
              width={200}
              height={200}
            />
            <h3>Reports</h3>
            <p>Organize class schedules and attendance.</p>
            <Link href="../AdminPortal/Reports">Go to Reports Management </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
