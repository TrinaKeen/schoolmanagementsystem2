"use client";

import { useState, useEffect, useRef } from "react";
import jwt from "jsonwebtoken";
import styles from "../../components/studentpage.module.css";
import Modal from "../../components/Modal";
import Sidebar from "../../components/Sidebar";
import LoadingSpinner from "../../components/LoadingSpinner";

const AdmissionApprovalPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [employee, setEmployee] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/admin/admin-approvals");
        const data = await res.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwt.decode(token);
      setEmployee({
        full_name: decoded.fullName,
        role: decoded.role,
        employee_number: decoded.employeeNumber || "N/A",
        loginTimestamp: new Date().toLocaleString(),
      });
    }
  }, []);

  const handleView = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const approvalStatus = event.target.approval_status.value;

    if (approvalStatus !== "Approved") {
      alert("Only Approved students will be saved for now.");
      return;
    }

    const payload = {
      student_number: selectedStudent.student_number,
      approval_status: approvalStatus,
      first_name: selectedStudent.first_name,
      last_name: selectedStudent.last_name,
      email: selectedStudent.email,
      dob: selectedStudent.dob,
      course: selectedStudent.program_name,
      enrollment_date: new Date().toISOString().split("T")[0],
      student_status: "Active",
      academic_year: "2024-2025",
      admin_id: 1,
    };

    try {
      const response = await fetch("/api/admin/update-approval", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Student approved successfully.");
        setStudents(prev => prev.filter(s => s.student_number !== selectedStudent.student_number));
        closeModal();
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        alert("Error: " + errorData.error);
      }
    } catch (err) {
      console.error("Update failed:", err.message);
      alert("Something went wrong. Check console logs.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("employeeNumber");
    localStorage.removeItem("loginTimestamp");
    window.location.href = "/";
  };

  const handleBack = () => {
    window.location.href = "/AdminPortal/admin-dashboard";
  };

  const filteredStudents = students.filter((student) => {
    const fullName = `${student.first_name} ${student.middle_name} ${student.last_name}`.toLowerCase();
    const studentNumber = String(student.student_number);
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || studentNumber.includes(query);
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <h1 className={styles.title}>List of Students for Admission Application</h1>
        <div className={styles.searchContainer}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search by name or student number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Student Number</th>
              <th>Name</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Program</th>
              <th>Approval Status</th>
              <th>Approval Date</th>
              <th>Rejection Reason</th>
              <th>Comments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.student_number}>
                <td>{student.student_number}</td>
                <td>{`${student.first_name} ${student.middle_name} ${student.last_name}`}</td>
                <td>{student.dob ? new Date(student.dob).toLocaleDateString() : "N/A"}</td>
                <td>{student.gender}</td>
                <td>{student.email}</td>
                <td>{student.phone_number}</td>
                <td>{student.program_name || "N/A"}</td>
                <td>{student.approval_status || "Pending"}</td>
                <td>{student.approval_date ? new Date(student.approval_date).toLocaleDateString() : "N/A"}</td>
                <td>{student.rejection_reason || "N/A"}</td>
                <td>{student.approval_comments || "N/A"}</td>
                <td>
                  <button
                    onClick={() => handleView(student)}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#0a9396",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "1rem",
                      transition: "background-color 0.3s ease",
                      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#005f73")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#0a9396")}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedStudent && (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <form onSubmit={handleUpdate}>
              <div>
                <h3><strong>Student Details</strong></h3>
                <p><strong>Student Number:</strong> {selectedStudent.student_number}</p>
                <p><strong>Full Name:</strong> {`${selectedStudent.first_name} ${selectedStudent.middle_name} ${selectedStudent.last_name}`}</p>
                <p><strong>Date of Birth:</strong> {selectedStudent.dob ? new Date(selectedStudent.dob).toLocaleDateString() : ""}</p>
                <p><strong>Gender:</strong> {selectedStudent.gender}</p>
                <p><strong>Email:</strong> {selectedStudent.email}</p>
                <p><strong>Phone Number:</strong> {selectedStudent.phone_number}</p>
                <p><strong>Program:</strong> {selectedStudent.program_name || "N/A"}</p>

                <h3><strong>Approval Details</strong></h3>
                <div>
                  <label>Approval Status:</label>
                  <select name="approval_status" defaultValue={selectedStudent.approval_status || "Pending"} required>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Waitlist">Waitlist</option>
                  </select>
                </div>

                <div>
                  <label>Approval Date:</label>
                  <input type="date" name="approval_date" defaultValue={new Date().toISOString().split("T")[0]} readOnly />
                </div>

                <div>
                  <label>Rejection Reason:</label>
                  <input type="text" name="rejection_reason" defaultValue={selectedStudent.rejection_reason} />
                </div>

                <div>
                  <label>Reviewer Comments:</label>
                  <input type="text" name="approval_comments" defaultValue={selectedStudent.approval_comments} />
                </div>
              </div>
              <button type="submit">Save Changes</button>
              <button type="button" onClick={closeModal}>Close</button>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AdmissionApprovalPage;
