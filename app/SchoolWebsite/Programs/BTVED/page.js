"use client";

import React from 'react';
import WebsiteHeader from '../../components/WebsiteHeader';
import styles from '../../components/Programs.module.css';
import Link from 'next/link'; // Import Link for navigation

export default function BTVED() {
  return (
    <div style={{ backgroundColor: 'white', height: '100vh' }}>
      <WebsiteHeader />

      <main className={styles.body}>
        <div className={styles.container}>
          

          <section className={styles.courseHeader}>
            <h1>Bachelor of Technical - Vocational Teacher Education</h1>
            <h2>Program Code: BTVED</h2>
            <h3>Specialization: Automotive Technology</h3>
          </section>

          <section className={styles.overview}>
            <h2>Course Overview</h2>
            <p>
              The Bachelor of Technical - Vocational Teacher Education (BTVED) with a specialization in Automotive Technology prepares future educators to teach and train students in the field of automotive repair and maintenance. The program combines theoretical knowledge with practical skills, ensuring that graduates are well-equipped to enter the workforce or further their studies.
            </p>
          </section>

          <section className={styles.curriculum}>
            <h2>Curriculum</h2>
            <ul>
              <li>Introduction to Automotive Technology</li>
              <li>Automotive Electrical Systems</li>
              <li>Engine Repair and Maintenance</li>
              <li>Automotive Diagnostics</li>
              <li>Vehicle Dynamics and Performance</li>
              <li>Teaching Methodologies for Vocational Education</li>
              <li>Practicum in Automotive Technology</li>
            </ul>
          </section>

          <section className={styles.admissionRequirements}>
            <h2>Admission Requirements</h2>
            <ul>
              <li>High School Diploma or equivalent</li>
              <li>Completion of an application form</li>
              <li>Personal essay detailing interest in the program</li>
              <li>Two letters of recommendation</li>
              <li>Interview (if required)</li>
            </ul>
          </section>

          <section className={styles.careerOpportunities}>
            <h2>Career Opportunities</h2>
            <p>
              Graduates of this program can pursue various careers, including:
            </p>
            <ul>
              <li>Automotive Technology Instructor</li>
              <li>Automotive Repair Technician</li>
              <li>Service Manager</li>
              <li>Automotive Consultant</li>
              <li>Technical Writer for Automotive Manuals</li>
            </ul>
          </section>

          <section className={styles.contact}>
            <h2>Contact Us</h2>
            <p>
              For more information, please contact our admissions office at:
            </p>
            <p>Email: admissions@example.com</p>
            <p>Phone: (123) 456-7890</p>
          </section>
          <section className={styles.buttonContainer}>
            <Link href="/SchoolWebsite/Applynow">
              <button className={styles.applyButton}>Apply Now</button>
            </Link>
            <Link href="/SchoolWebsite/AdminandPrograms">
              <button className={styles.backButton}>Back</button>
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}
