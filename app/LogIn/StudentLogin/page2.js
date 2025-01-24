"use client";

import { useState } from "react";
import Image from "next/image"; // For displaying the logo
import styles from "../LoginPage.module.css"; // Assuming you use a CSS module for styling
import logo from "../school-logo.png"; // Ensure this path is correct

const StudentLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Password visibility toggle

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
  
    try {
      const response = await fetch("/api/studentlogin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      // Log the full response data for debugging
      const data = await response.json();
      console.log("API Response Data:", data); // Log the raw response
  
      // Check if the response status is okay
      if (response.ok) {
        alert("Logged in successfully!");
        // Redirect to student's dashboard
        window.location.href = "../HomePage/student-dashboard"; // Redirect here
      } else {
        const errorMessage = data?.message || "Invalid credentials. Please try again.";
        console.error("API Error:", errorMessage); // Log the error message
        
        // If no message is present in the response, log the entire raw response for better debugging
        if (!data?.message) {
          console.error("Raw response from API:", data);
        }
        
        setError(errorMessage); // Show the error message to the user
      }
    } catch (error) {
      // Log any unexpected errors that occur during the fetch
      console.error("Unexpected error during login:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };
  
  

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Toggle password visibility
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.logo}>
        <Image src={logo} alt="School Logo" width={200} height={200} />
      </div>

      <h2 className={styles.loginTitle}>STUDENT PORTAL</h2>

      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.inputGroup}>
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
          <div className={styles.passwordWrapper}>
            <input
              type={isPasswordVisible ? "text" : "password"} // Toggle password visibility
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
            </button>
          </div>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.submitButton}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default StudentLogin;
