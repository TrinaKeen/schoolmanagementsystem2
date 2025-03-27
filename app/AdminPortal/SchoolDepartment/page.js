"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import styles from "./StudentDepartment.module.css"; // Ensure this CSS file exists

export default function SchoolDept() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/schoolDept");

      if (res.status === 401) {
        alert("Session expired. Please log in again.");
        window.location.href = "/login";
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to fetch programs");
      }

      const data = await res.json();
      setPrograms(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading programs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <div className={styles.contentContainer}>
        <div className={styles.mainContent}>
          <h1 className={styles.title}>Programs List</h1>
          {/* <p className={styles.breadcrumb}>Home &gt; Programs</p> */}

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Program ID</th>
                  <th>Program Type</th>
                  <th>Program Name</th>
                  <th>Major</th>
                  <th>Program Code</th>
                </tr>
              </thead>
              <tbody>
                {programs.length > 0 ? (
                  programs.map((program) => (
                    <tr key={program.id}>
                      <td>{program.id}</td>
                      <td>{program.program_type}</td>
                      <td>{program.program_name}</td>
                      <td>{program.major || "N/A"}</td>
                      <td>{program.program_code}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className={styles.noData}>
                      No programs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// OpenAI. (2025). ChatGPT GPT-4o. Response to the question “can you give me a code that fetches the data from an API and explain it to me?”. Accessed and retrieved on March 19, 2025 from https://chat.openai.com
