"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import styles from "./StudentFees.module.css";
import LoadingSpinner from "../components/LoadingSpinner";

export default function StudentFeesPage() {
  const [fees, setFees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedFee, setSelectedFee] = useState(null); // for modal data
  const [showModal, setShowModal] = useState(false); // control modal
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFees() {
      try {
        setLoading(true);

        const res = await fetch("/api/admin/fetchStudentFees", {
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        setFees(data);
      } catch (err) {
        console.error("Failed to fetch student fees:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFees();
  }, []);

  const filteredFees = fees.filter((fee) => {
    const query = searchQuery.toLowerCase();
    return (
      fee.student_number?.toLowerCase().includes(query) ||
      fee.program_id?.toString().includes(query) ||
      fee.payment_status?.toLowerCase().includes(query)
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
    if (sortConfig.key === key && sortConfig.direction === "asc")
      direction = "desc";
    setSortConfig({ key, direction });
  };

  const handleViewClick = async (studentNumber) => {
    try {
      const res = await fetch(
        `/api/admin/fetchStudentFeeBreakdown?student_number=${studentNumber}`
      );
      const data = await res.json();
      setSelectedFee(data);
      setShowModal(true);
    } catch (err) {
      console.error("Failed to fetch breakdown:", err);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.contentWrapper}>
        <Sidebar />
        <div className={styles.mainContent}>
          <h1 className={styles.title}>All Fees Collection</h1>
          {/* <p className={styles.breadcrumb}>Home &gt; All Fees</p> */}

          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {[
                    "Student Number",
                    "Program ID",
                    "Total Fee",
                    "Payment Status",
                    "Action",
                  ].map((col) => (
                    <th
                      key={col}
                      onClick={() =>
                        col !== "Action" &&
                        handleSort(col.toLowerCase().replace(/ /g, "_"))
                      }
                      className={styles.sortableHeader}
                    >
                      {col.toUpperCase()}
                      {col !== "Action" && (
                        <span className={styles.sortIcon}>
                          {sortConfig.key ===
                          col.toLowerCase().replace(/ /g, "_")
                            ? sortConfig.direction === "asc"
                              ? " ▲"
                              : " ▼"
                            : " ⬍"}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedFees.length > 0 ? (
                  sortedFees.map((fee, index) => (
                    <tr key={index}>
                      <td>{fee.student_number}</td>
                      <td>{fee.program_id}</td>
                      <td>{Number(fee.total_fee).toFixed(2)}</td>
                      <td
                        className={
                          fee.payment_status === "Paid"
                            ? styles.paid
                            : styles.unpaid
                        }
                      >
                        {fee.payment_status}
                      </td>
                      <td>
                        <button
                          className={styles.viewButton}
                          onClick={() => handleViewClick(fee.student_number)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className={styles.noData}>
                      No matching student fees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Modal for Fee Breakdown */}
          {showModal && selectedFee && (
            <div className={styles.modalBackdrop}>
              <div className={styles.modalContent}>
                <h2 className={styles.modalTitle}>
                  Fee Breakdown for {selectedFee.student_number}
                </h2>

                <div className={styles.modalSection}>
                  <p>
                    <strong>Program ID:</strong> {selectedFee.program_id}
                  </p>
                  <p>
                    <strong>Payment Status:</strong>{" "}
                    {selectedFee.payment_status}
                  </p>
                </div>

                <hr />

                <div className={styles.modalSection}>
                  <h3>Course Fees</h3>
                  {selectedFee.course_fees?.length > 0 ? (
                    <table className={styles.modalTable}>
                      <thead>
                        <tr>
                          <th>Base Fee</th>
                          <th>Additional Fees</th>
                          <th>Total Fee</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedFee.course_fees.map((fee, index) => (
                          <tr key={index}>
                            <td>{fee.base_fee}</td>
                            <td>{fee.additional_fees}</td>
                            <td>{fee.total_fee}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No course fees available.</p>
                  )}
                </div>

                <hr />

                <div className={styles.modalSection}>
                  <h3>Miscellaneous Fees</h3>
                  {selectedFee.misc_fees?.length > 0 ? (
                    <table className={styles.modalTable}>
                      <thead>
                        <tr>
                          <th>Fee Name</th>
                          <th>Amount</th>
                          <th>Type</th>
                          <th>Due Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedFee.misc_fees.map((fee, index) => (
                          <tr key={index}>
                            <td>{fee.fee_name}</td>
                            <td>{fee.amount}</td>
                            <td>{fee.fee_type}</td>
                            <td>
                              {new Date(fee.due_date).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>No miscellaneous fees available.</p>
                  )}
                </div>

                <button
                  onClick={() => setShowModal(false)}
                  className={styles.closeButton}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
