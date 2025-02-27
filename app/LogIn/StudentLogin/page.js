"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // For displaying the logo
import styles from "../LoginPage.module.css"; // Assuming you use a CSS module for styling
import logo from "../school-logo.png"; // Ensure this path is correct

export default function StudentLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const normalizedUsername = username.trim().toLowerCase();
    const trimmedPassword = password.trim();
    const loginTimestamp = new Date().toISOString(); // Get the current timestamp

    try {
      const res = await fetch("/api/students/studentlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: normalizedUsername,
          password: trimmedPassword,
          loginTimestamp, // Send the timestamp
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store student number and token
        localStorage.setItem("studentNumber", data.studentNumber);
        localStorage.setItem("token", data.token);
        localStorage.setItem("loginTimestamp", loginTimestamp); // Save timestamp locally if needed

        // Redirect to dashboard
        router.push("/StudentPortal/student-dashboard");
      } else {
        setError(data.error || "An unexpected error occurred");
      }
    } catch (error) {
      setError("Network error, please try again later");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
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
              type={isPasswordVisible ? "text" : "password"}
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
}
