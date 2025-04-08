// Generated using ChatGPT
// Build a React (Next.js) admin page called AdmissionApprovalPage that:
// Fetches a list of student applications from an API,
// Displays them in a searchable table,
// Uses a modal to view and edit approval status,
// Allows approving a student,
// Removes approved students from the page after submission,
// Also decodes a JWT stored in localStorage to display admin details

// Create the rejection function
// Similar to the approval function
// Rejected students are to be removed upon update of their status

"use client";

import { useState, useEffect, useRef } from "react";
import jwt from "jsonwebtoken";
import styles from "../../components/studentpage.module.css";
import Modal from "../../components/Modal";
import Sidebar from "../../components/Sidebar";
import LoadingSpinner from "../../components/LoadingSpinner";

// Admin page for managing student admission approvals or rejections
const AdmissionApprovalPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [employee, setEmployee] = useState(null);
  const dropdownRef = useRef(null);

  // Fetch all pending student applications from backend
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

  // Decode admin info from token
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

  // Approve or reject student and update state
  const handleUpdate = async (event) => {
    event.preventDefault();
  
    const approval_status = event.target.approval_status.value;
    const rejection_reason = event.target.rejection_reason.value.trim();
    const approval_comments = event.target.approval_comments.value.trim();
  
    if (approval_status === "Rejected") {
      if (!rejection_reason || !approval_comments) {
        alert("Rejection reason and comments are required for rejected status.");
        return;
      }
    }
  
    if (approval_status !== "Approved" && approval_status !== "Rejected") {
      alert("Only Approved or Rejected status is supported right now.");
      return;
    }
  
    const payload = {
      student_number: selectedStudent.student_number,
      approval_status,
      first_name: selectedStudent.first_name,
      last_name: selectedStudent.last_name,
      email: selectedStudent.email,
      dob: selectedStudent.dob,
      course: selectedStudent.program_name,
      enrollment_date: new Date().toISOString().split("T")[0],
      student_status: "Active",
      academic_year: "2024-2025",
      admin_id: 1,
      rejection_reason,
      approval_comments
    };
  
    try {
      const response = await fetch("/api/admin/update-approval", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        alert(`Student ${approval_status.toLowerCase()} successfully.`);
        setStudents((prev) =>
          prev.filter((s) => s.student_number !== selectedStudent.student_number)
        );
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
              <th>Status</th>
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
                <td>
                  <button
                    onClick={() => handleView(student)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
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
            <form onSubmit={handleUpdate} className="space-y-4">
              <h3 className="text-lg font-bold">Student Review</h3>
              <p><strong>Student Number:</strong> {selectedStudent.student_number}</p>
              <p><strong>Full Name:</strong> {`${selectedStudent.first_name} ${selectedStudent.middle_name} ${selectedStudent.last_name}`}</p>
              <p><strong>DOB:</strong> {selectedStudent.dob ? new Date(selectedStudent.dob).toLocaleDateString() : "N/A"}</p>
              <p><strong>Program:</strong> {selectedStudent.program_name || "N/A"}</p>

              <label>
                Approval Status:
                <select name="approval_status" className="block w-full border p-2 rounded" defaultValue={selectedStudent.approval_status || "Pending"} required>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </label>

              <label>
                Rejection Reason:
                <input name="rejection_reason" type="text" className="block w-full border p-2 rounded" placeholder="Reason if rejected" />
              </label>

              <label>
                Reviewer Comments:
                <input name="approval_comments" type="text" className="block w-full border p-2 rounded" placeholder="Optional comments" />
              </label>

              <div className="flex justify-end gap-4">
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
                <button type="button" onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
              </div>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AdmissionApprovalPage;
