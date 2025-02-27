"use client";

import React from 'react';
import styles from './Home.module.css'; 
import WebsiteHeader from './SchoolWebsite2/components/WebsiteHeader';


export default function Home() {
  return (
    <div style={{ backgroundColor: 'white', height: '100vh' }}>
      <WebsiteHeader />
    
      <main className={styles.body}>
        {/* Cover Photo Section */}
        <section className={styles.coverPhoto}>
          <h1>Welcome to Our School</h1>
          <p>Your journey towards excellence begins here.</p>
          <br></br>
          <a href="/SchoolWebsite2/Applynow" className={styles.ctaButton}>Apply Now</a>
        </section>

        {/* Announcements Section */}
        <section className={styles.container}>
          <div className={styles.mainpage}>
            <h1 className={styles.announcement}>ANNOUNCEMENTS</h1>
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
         
            <h1 className={styles.events}>Upcoming Events</h1>
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
        </section>

        {/* Featured Programs Section */}
        <section className={styles.featuredPrograms}>
          <h1>Featured Programs</h1>
          <div className={styles.programs}>
            <div className={styles.card}>
              <h3>Science and Technology</h3>
              <p>Explore our innovative science curriculum designed to inspire future leaders.</p>
            </div>
            <div className={styles.card}>
              <h3>Arts and Humanities</h3>
              <p>Dive into creativity with our diverse arts programs and humanities courses.</p>
            </div>
            <div className={styles.card}>
              <h3>Sports and Fitness</h3>
              <p>Join our sports teams and fitness programs to stay active and healthy.</p>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className={styles.callToAction}>
          <h2>Get Involved!</h2>
          <p>Join clubs, participate in events, and be part of our vibrant community.</p>
          <br></br>
          <a href="/clubs" className={styles.ctaButton}>Learn More</a>
        </section>
      </main> 
     
    </div>  
  );
}
