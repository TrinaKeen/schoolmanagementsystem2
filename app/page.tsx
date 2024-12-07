"use client"

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
      <title>Evelyn E. Fabie College Inc. </title>
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
          <Link href="/LogIn/AdminLogin">Admin Portal</Link>
          <Link href="/AdminLogin">Student Portal</Link>
          </div>
          </div>
          
        </nav>
      </header>
     <main>
     <div className={styles.coverphoto} >
          <Image src={coverphoto} alt="Cover Photo" />
      </div> 
      <div className={styles.mainpage}>
      <h1>ANNOUNCEMENT</h1>
      </div> 
      
      </main> 
    </div>
  );
}