"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image"; // Ensure to import Image from next/image
import styles from "../LoginPage.module.css"; // Assuming you use a CSS module for styling
import logo from "../school-logo.png"; // Ensure this path is correct

const AdminLogin = () => {
  // states for username, password, error, password visibility, and loading
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility toggle
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // handles form submission which is the admin login
  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload on form submission
    setLoading(true); // Set loading to true

    const normalizedUsername = username.trim().toLowerCase(); // Normalize username by removing whitespace and converting to lowercase for consistency
    const loginTimestamp = new Date().toISOString(); // Get the current timestamp

    try {
      // Make API request to login
      const res = await fetch("/api/admin/adminlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: normalizedUsername,
          password: password.trim(),
          loginTimestamp,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store admin username and token details in localStorage
        // Ensure to store the login timestamp if needed
        localStorage.setItem("adminUsername", data.username);
        localStorage.setItem("token", data.token);
        localStorage.setItem("loginTimestamp", loginTimestamp); // Save timestamp locally if needed

        router.push("/AdminPortal/admin-dashboard"); // Redirect to admin dashboard
      } else {
        setError(data.error || "An unexpected error occurred");
      }
    } catch (error) {
      setError("Network error, please try again later"); // Handle network errors
    } finally {
      setLoading(false); // hide loading indicator
    }
  };

  // handles password input change when typing
  const handleChange = (e) => {
    setPassword(e.target.value);
  };

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
              type={isPasswordVisible ? "text" : "password"} // Toggle between password and text
              id="password"
              value={password}
              onChange={handleChange}
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

        {loading ? (
          <div className={styles.loaderWrapper}>
            <div className={styles.loader}></div>
          </div>
        ) : (
          <button type="submit" className={styles.submitButton}>
            Log In
          </button>
        )}
      </form>
    </div>
  );
};

export default AdminLogin;
