"use client";


import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../components/HomePage.module.css";
import teacherlogo from "/src/teachericon.png";
import studentlogo from "/src/studentlogo.png";
import courseslogo from "/src/courseslogo.png";
import departmentslogo from "/src/departmentslogo.png";
import studentfeeslogo from "/src/studentfeeslogo.png";
import reportlogo from "/src/reportlogo.png";
import AdminHeader from "../components/header";


export default function Home() {
 
  return (
    <div style={{ backgroundColor: 'white', height: '100vh', color: 'black'}}>

    <AdminHeader/>
    <div className={styles.container}>
      

      

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
            <Link href="../AdminPortal/StudentCourses/grade11">
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
            <Link href="../AdminPortal/StudentFees">
              Go to Tuition Fees Management{" "}
            </Link>
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
            <Link href="../AdminPortal/Reports">
              Go to Reports Management{" "}
            </Link>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}
