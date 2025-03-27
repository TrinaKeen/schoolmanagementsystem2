"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import styles from "./StudentFees.module.css";

export default function StudentFees() {
  const [fees, setFees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [selectedFee, setSelectedFee] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [studentNumber, setStudentNumber] = useState(null);

  useEffect(() => {
    const fetchStudentNumber = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authorization token is missing');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/students/student-data', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorResponse = await res.json();
          setError(errorResponse.error || 'Failed to fetch student number');
          setLoading(false);
          return;
        }

        const data = await res.json();
        const studentNumber = data.studentNumber;
        setStudentNumber(studentNumber); // Save the student number
        fetchStudentDetails(studentNumber);
      } catch (error) {
        console.error('Error fetching student number:', error);
        setError('Failed to fetch student number');
        setLoading(false);
      }
    };

    const fetchStudentDetails = async (studentNumber) => {
      try {
        const res = await fetch(`/api/students/studentlogindetails?studentNumber=${studentNumber}`, {
          method: 'GET',
        });
    
        if (!res.ok) {
          const errorResponse = await res.json();
          setError(errorResponse.error || 'Failed to fetch student details');
          setLoading(false);
          return;
        }
    
        const data = await res.json();
        setStudentData(data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch student details');
        setLoading(false);
      }
    };

    fetchStudentNumber();
  }, []);

  useEffect(() => {
    async function fetchFees() {
      try {
        const res = await fetch("/api/students/studentfees", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const data = await res.json();
        setFees(data);
      } catch (err) {
        console.error("Failed to fetch student fees:", err);
      }
    }
    fetchFees();
  }, []);

  const filteredFees = fees.filter((fee) => fee.student_number === studentNumber); // Only show fees for the fetched studentNumber

  const sortedFees = [...filteredFees].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    let direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });
  };

  const handleViewClick = async (studentNumber) => {
    try {
      const res = await fetch(`/api/students/fetchStudentFeeBreakdown?student_number=${studentNumber}`);
      const data = await res.json();
      setSelectedFee(data);
      setShowModal(true);
    } catch (err) {
      console.error("Failed to fetch breakdown:", err);
    }
  };


  return (
    <div style={{ backgroundColor: 'white', height: '100vh'}}>
      {/* Pass studentNumber to Sidebar */}
      <Sidebar studentNumber={studentNumber} />

      <div className={styles.dashboardContainer}>
        <div className={styles.contentWrapper}>
          <div className={styles.mainContent}>
            <h1 className={styles.title}>All Fees Collection</h1>

            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
              <button className={styles.searchButton}>Search</button>
            </div>

            {loading ? (
              <p>Loading student number...</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : (
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {["Student Number", "Program ID", "Total Fee", "Payment Status", "Action"].map((col) => (
                        <th
                          key={col}
                          onClick={() => col !== "Action" && handleSort(col.toLowerCase().replace(/ /g, "_"))}
                          className={styles.sortableHeader}
                        >
                          {col.toUpperCase()}
                          {col !== "Action" && (
                            <span className={styles.sortIcon}>
                              {sortConfig.key === col.toLowerCase().replace(/ /g, "_")
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
                          <td className={fee.payment_status === "Paid" ? styles.paid : styles.unpaid}>
                            {fee.payment_status}
                          </td>
                          <td>
                            <button className={styles.viewButton} onClick={() => handleViewClick(fee.student_number)}>
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
            )}

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
    </div>
  );
}
