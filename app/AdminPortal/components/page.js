"use client";

import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../components/HomePage.module.css"; // Adjust this path if needed
import logo from "/src/school-logo.png";
import { FaHome, FaEnvelope, FaBell, FaBars } from "react-icons/fa";

export default function AdminHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Toggle dropdown visibility

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

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
        <div className={styles.logo}>
          <Image src={logo} alt="School Logo" width={100} height={100} />
          <h1>EEFCI Management System</h1>
        </div>

        <nav className={styles.navbar}>
          <Link href="/AdminPortal/admin-dashboard"><FaHome size={35} /></Link>
          <Link href="#"><FaBell size={35} /></Link>
          <Link href="#"><FaEnvelope size={35} /></Link>

          <div className={styles.loginDropdown}>
            {/* Button to toggle dropdown */}
            <button className={styles.dropdownButton} onClick={toggleDropdown}>
              <FaBars size={35} />
            </button>

            {/* Conditionally render the dropdown based on state */}
            {isDropdownOpen && (
              <div className={styles.dropdownContent}>
                <Link href="/">Log Out</Link>
                <Link href="../AdminPortal/admin-settings">
                  Account Setting
                </Link>
                <Link href="#">Help Centre</Link>
              </div>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}
