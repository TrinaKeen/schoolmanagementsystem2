"use client";

import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../components/header.module.css'; 
import logo from '/src/school-logo.png';
import { FaHome, FaEnvelope, FaBell, FaBars } from "react-icons/fa";

export default function AdminHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(null); // tracks which dropdown is opened

  // Toggle specific dropdown
  const toggleDropdown = (type) => {
    setIsDropdownOpen(isDropdownOpen === type ? null : type);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Evelyn E. Fabie College Inc.</title>
        <meta name="description" content="School Management System for efficient management" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <header className={styles.header}>
        <Link href={"/"} passHref>
          <div className={styles.logo}>
          <Image src={logo} alt="School Logo" width={100} height={100} />
            <h1>EEFCI Management System</h1>
          </div>
        </Link>

        <nav className={styles.navbar}>
          <Link href="../AdminPortal/admin-dashboard" passHref>
            <FaHome size={35} className={styles.icon} />
          </Link>

          <div className={styles.loginDropdown}>
            <button
              className={styles.dropdownButton}
              onClick={() => toggleDropdown("notifications")}
            >
              <FaBell size={35} className={styles.iconWhite} />
            </button>

            {isDropdownOpen === "notifications" && (
              <div className={styles.dropdownContent}>
                <p className="text-black flex justify-center">No new notifications</p>
              </div>
            )}
          </div>

          <div className={styles.loginDropdown}>
            <button
              className={styles.dropdownButton}
              onClick={() => toggleDropdown("messages")}
            >
              <FaEnvelope size={35} className={styles.iconWhite} />
            </button>

            {isDropdownOpen === "messages" && (
              <div className={styles.dropdownContent}>
                <p className="text-black flex justify-center">No new messages</p>
              </div>
            )}
          </div>

          <div className={styles.loginDropdown}>
            <button
              className={styles.dropdownButton}
              onClick={() => toggleDropdown("account")}
            >
              <FaBars size={35} className={styles.iconWhite} />
            </button>

            {isDropdownOpen === "account" && (
              <div className={styles.dropdownContent}>
                <Link href="/" passHref>Log Out</Link>
                <Link href="../AdminPortal/admin-settings" passHref>Account Settings</Link>
                <Link href="#" passHref>Help Centre</Link>
              </div>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}
