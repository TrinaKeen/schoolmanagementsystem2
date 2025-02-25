"use client";

import React from 'react';
import WebsiteHeader from '../../components/WebsiteHeader';
import styles from '../../components/Programs.module.css';
import Link from 'next/link'; // Import Link for navigation

export default function TVED() {
  return (
    <div style={{ backgroundColor: 'white', height: '100vh' }}>
      <WebsiteHeader />

      <main className={styles.body}>
        <div className={styles.container}>
         
          <section className={styles.courseHeader}>
            <h1>Bachelor of Technical - Vocational Teacher Education</h1>
            <h2>Program Code: TVED</h2>
            <h3>Specialization: Food and Services Management</h3>
          </section>

          <section className={styles.overview}>
            <h2>Course Overview</h2>
            <p>
              The Bachelor of Technical - Vocational Teacher Education (TVED) with a specialization in Food and Services Management prepares future educators to teach and train students in the culinary arts and hospitality management. The program focuses on both theoretical knowledge and practical skills, ensuring graduates are ready for diverse roles in the food service industry.
            </p>
          </section>

          <section className={styles.curriculum}>
            <h2>Curriculum</h2>
            <ul>
              <li>Introduction to Food and Beverage Service</li>
              <li>Culinary Techniques</li>
              <li>Food Safety and Sanitation</li>
              <li>Menu Planning and Cost Control</li>
              <li>Hospitality Management Principles</li>
              <li>Teaching Methodologies for Vocational Education</li>
              <li>Practicum in Food and Services Management</li>
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
              <li>Culinary Arts Instructor</li>
              <li>Food Service Manager</li>
              <li>Catering Coordinator</li>
              <li>Restaurant Manager</li>
              <li>Food and Beverage Consultant</li>
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
            <Link href="#">
              <button className={styles.applyButton}>Apply Now</button>
            </Link>
            <Link href="/SchoolWebsite2/AdminandPrograms">
              <button className={styles.backButton}>Back</button>
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}
