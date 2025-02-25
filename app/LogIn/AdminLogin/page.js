"use client";
import { useState } from "react";
import Image from "next/image"; // Ensure to import Image from next/image
import styles from "../LoginPage.module.css"; // Assuming you use a CSS module for styling
import logo from "../school-logo.png"; // Ensure this path is correct

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility toggle

    const handleSubmit = async (e) => {
      e.preventDefault();

      // Example authentication logic
      if (username === "admin" && password === "password123") {
        alert("Logged in as Admin!");
        // Redirect to Admin Dashboard
        window.location.href = "../HomePage/admin-dashboard"; // Uncomment if needed
      } else {
        setError("Invalid credentials. Please try again.");
      }

      const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible); // Toggle password visibility
      };

      return (
        <div className={styles.loginContainer}>
          <div className={styles.logo}>
            {/* Ensure Image component is used correctly */}
            <Image src={logo} alt="School Logo" width={200} height={200} />
          </div>

          <h2 className={styles.loginTitle}>EMPLOYEE PORTAL</h2>

          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="username" className={styles.inputLabel}>
                Username
              </label>
              <label htmlFor="username" className={styles.inputLabel}>
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.inputField}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.inputLabel}>
                Password
              </label>
              <label htmlFor="password" className={styles.inputLabel}>
                Password
              </label>
              <div className={styles.passwordWrapper}>
                <input
                  type={isPasswordVisible ? "text" : "password"} // Toggle between password and text
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.inputField}
                  required
                />
                <button
                  type="button"
                  className={styles.showButton}
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? "Hide" : "Show"}
                  {isPasswordVisible ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.submitButton}>
              Log In
            </button>
            <button type="submit" className={styles.submitButton}>
              Log In
            </button>
          </form>
        </div>
      );
};

export default AdminLogin;
