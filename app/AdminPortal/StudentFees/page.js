"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import styles from "./StudentFees.module.css";

export default function StudentFeesPage() {
  const [fees, setFees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  useEffect(() => {
    async function fetchFees() {
      const res = await fetch("/api/admin/fetchStudentFees", { cache: "no-store" });

      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = "/LogIn/AdminLogin";
          return;
        } else {
          console.error("Failed to fetch student fees", res.status, res.statusText);
          return;
        }
      }

      const data = await res.json();
      setFees(data);
    }

    fetchFees();
  }, []);

  const filteredFees = fees.filter((fee) => {
    const query = searchQuery.toLowerCase();
    return (
      fee.id.toString().includes(query) ||
      fee.student_number?.toLowerCase().includes(query) ||
      fee.payment_status?.toLowerCase().includes(query) ||
      (fee.program_id && fee.program_id.toString().includes(query))
    );
  });

  const sortedFees = [...filteredFees].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.contentWrapper}>
        <Sidebar />
        <div className={styles.mainContent}>
          <h1 className={styles.title}>All Fees Collection</h1>

          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by ID, Name, or Phone"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button className={styles.searchButton}>Search</button>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {[
                    "id",
                    "name",
                    "gender",
                    "class",
                    "section",
                    "expense",
                    "amount",
                    "status",
                    "phone",
                    "email",
                  ].map((key) => (
                    <th
                      key={key}
                      onClick={() => handleSort(key)}
                      className={styles.sortableHeader}
                    >
                      {key.toUpperCase()}
                      <span className={styles.sortIcon}>
                        {sortConfig.key === key
                          ? sortConfig.direction === "asc"
                            ? " ▲"
                            : " ▼"
                          : " ⬍"}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedFees.length > 0 ? (
                  sortedFees.map((fee) => (
                    <tr key={fee.id}>
                      <td>{fee.id}</td>
                      <td>{fee.name}</td>
                      <td>{fee.gender}</td>
                      <td>{fee.class}</td>
                      <td>{fee.section}</td>
                      <td>{fee.expense}</td>
                      <td>{fee.amount}</td>
                      <td>
                        <span
                          className={
                            fee.status === "Paid" ? styles.paid : styles.unpaid
                          }
                        >
                          {fee.status}
                        </span>
                      </td>
                      <td>{fee.phone}</td>
                      <td>{fee.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className={styles.noData}>
                      No matching student fees found.
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
