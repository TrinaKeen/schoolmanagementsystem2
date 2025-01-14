"use client";

import { useState } from "react";
import styles from "./AccountInformation.module.css"; // Ensure this path is correct
import AdminHeader from "../components/page";
import { FaLock, FaUser, FaUserPlus, FaQuestionCircle } from "react-icons/fa";

export default function AccountInformation() {
  const [activeTab, setActiveTab] = useState("update");

  const renderTabContent = () => {
    switch (activeTab) {
      case "update":
        return (
          <div className={styles.tabContent}>
            <h1>Account Information</h1>
            <form>
              <div className={styles.formGroup}>
                <label>Admin UID:</label>
                <input type="text" placeholder="123456" disabled />
              </div>
              <div className={styles.formGroup}>
                <label>First Name:</label>
                <input type="text" placeholder="Diego" disabled />
              </div>
              <div className={styles.formGroup}>
                <label>Last Name:</label>
                <input type="text" placeholder="San Pedro" disabled />
              </div>
              <div className={styles.formGroup}>
                <label>Email:</label>
                <input type="email" placeholder="dsanpedro@gmail.com" disabled />
              </div>
              <div className={styles.formGroup}>
                <label>Phone Number:</label>
                <input type="tel" placeholder="+14031234556" disabled />
              </div>
              <div className={styles.formGroup}>
                <label>Date of Birth:</label>
                <input type="date" placeholder="09/09/1990" disabled />
              </div>
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
              <button type="submit" className={styles.button}>
                Change Password
              </button>
            </form>
          </div>
        );
        case "add":
          return (
            <div className={styles.tabContent}>
              <h3>Add New Account</h3>
              <form>
                {/* Admin UID */}
                <div className={styles.formGroup}>
                  <label>Admin UID:</label>
                  <input type="text" placeholder="Enter new UID" />
                </div>
        
                {/* First Name */}
                <div className={styles.formGroup}>
                  <label>First Name:</label>
                  <input type="text" placeholder="Enter first name" />
                </div>
        
                {/* Last Name */}
                <div className={styles.formGroup}>
                  <label>Last Name:</label>
                  <input type="text" placeholder="Enter last name" />
                </div>
        
                {/* Email */}
                <div className={styles.formGroup}>
                  <label>Email:</label>
                  <input type="email" placeholder="Enter email" />
                </div>
        
                {/* Phone Number */}
                <div className={styles.formGroup}>
                  <label>Phone Number:</label>
                  <input type="tel" placeholder="Enter phone number" />
                </div>
        
                {/* Date of Birth */}
                <div className={styles.formGroup}>
                  <label>Date of Birth:</label>
                  <input type="date" placeholder="Enter DOB" />
                </div>
        
                {/* Role Selection */}
                <div className={styles.formGroup}>
                  <label>Role:</label>
                  <select>
                    <option value="admin">Admin</option>
                    <option value="superAdmin">Super Admin</option>
                  </select>
                </div>
        
                {/* Submit Button */}
                <button type="submit" className={styles.button}>
                  Create Account
                </button>
              </form>
            </div>
          );
        
      case "help":
        return (
          <div className={styles.tabContent}>
            <h3>Help and Support</h3>
            <p>
              If you need help, please contact our support team at{" "}
              <a href="mailto:support@company.com">support@company.com</a>
            </p>
          </div>
        );
      default:
        return (
          <div className={styles.tabContent}>
            <p>Please select a tab to view the content.</p>
          </div>
        );
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <h2>Account Settings</h2>
          <ul>
            <li
              className={activeTab === "update" ? styles.active : ""}
              onClick={() => setActiveTab("update")}
            >
              <FaUser size={20} /> Account Information
            </li>
            <li
              className={activeTab === "password" ? styles.active : ""}
              onClick={() => setActiveTab("password")}
            >
              <FaLock size={20} /> Change Password
            </li>
            <li
              className={activeTab === "add" ? styles.active : ""}
              onClick={() => setActiveTab("add")}
            >
              <FaUserPlus size={20} /> Add New Account
            </li>
            <li
              className={activeTab === "help" ? styles.active : ""}
              onClick={() => setActiveTab("help")}
            >
              <FaQuestionCircle size={20} /> Help and Support
            </li>
          </ul>
        </div>

        <div className={styles.content}>{renderTabContent()}</div>
      </div>
    </div>
  );
}
