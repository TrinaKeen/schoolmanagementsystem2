"use client";

import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "./AccountInformation.module.css"; // Ensure this path is correct
import logo from "/src/school-logo.png"; // Replace with your correct logo path
import { FaBars } from "react-icons/fa";

export default function AccountInformation() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Toggle dropdown visibility
  const [activeTab, setActiveTab] = useState("update"); // Active tab state

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const renderTabContent = () => {
    switch (activeTab) {
      case "update":
        return (
          <div className={styles.tabContent}>
            <h3>Update Information</h3>
            <form>
              <div className={styles.formGroup}>
                <label>Name:</label>
                <input type="text" placeholder="Enter your name" />
              </div>
              <div className={styles.formGroup}>
                <label>Email:</label>
                <input type="email" placeholder="Enter your email" />
              </div>
              <button type="submit">Save Changes</button>
            </form>
          </div>
        );
      case "password":
        return (
          <div className={styles.tabContent}>
            <h3>Change Password</h3>
            <form>
              <div className={styles.formGroup}>
                <label>Current Password:</label>
                <input type="password" placeholder="Enter current password" />
              </div>
              <div className={styles.formGroup}>
                <label>New Password:</label>
                <input type="password" placeholder="Enter new password" />
              </div>
              <button type="submit">Change Password</button>
            </form>
          </div>
        );
      case "add":
        return (
          <div className={styles.tabContent}>
            <h3>Add New Account</h3>
            <form>
              <div className={styles.formGroup}>
                <label>Username:</label>
                <input type="text" placeholder="Enter new username" />
              </div>
              <div className={styles.formGroup}>
                <label>Password:</label>
                <input type="password" placeholder="Enter password" />
              </div>
              <button type="submit">Create Account</button>
            </form>
          </div>
        );
      case "help":
        return (
          <div className={styles.tabContent}>
            <h3>Help and Support</h3>
            <p>If you need help, please contact our support team at support@company.com</p>
          </div>
        );
      default:
        return <div className={styles.tabContent}>Please select a tab to view the content.</div>;
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Account Information</title>
        <meta name="description" content="Manage your account settings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src={logo} alt="School Logo" width={100} height={100} />
          <h1>EEFCI Management System</h1>
        </div>

        <nav className={styles.navbar}>
          <div className={styles.loginDropdown}>
            {/* Button to toggle dropdown */}
            <button className={styles.dropdownButton} onClick={toggleDropdown}>
              <FaBars size={35} />
            </button>

            {/* Conditionally render the dropdown based on state */}
            {isDropdownOpen && (
              <div className={styles.dropdownContent}>
                <Link href="/">Log Out</Link>
                <Link href="../HomePage/admin-settings">Account Settings</Link>
                <Link href="#">Help Centre</Link>
              </div>
            )}
          </div>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.sidebar}>
          <h2>Account Options</h2>
          <ul>
            <li
              className={activeTab === "update" ? styles.active : ""}
              onClick={() => setActiveTab("update")}
            >
              Update Information
            </li>
            <li
              className={activeTab === "password" ? styles.active : ""}
              onClick={() => setActiveTab("password")}
            >
              Change Password
            </li>
            <li
              className={activeTab === "add" ? styles.active : ""}
              onClick={() => setActiveTab("add")}
            >
              Add New Account
            </li>
            <li
              className={activeTab === "help" ? styles.active : ""}
              onClick={() => setActiveTab("help")}
            >
              Help and Support
            </li>
          </ul>
        </div>

        <div className={styles.content}>{renderTabContent()}</div>
      </main>
    </div>
  );
}
