"use client";

import { useState, useEffect, useRef } from "react";
import jwt from "jsonwebtoken"; // Make sure to import jwt for decoding
import styles from "../../components/studentpage.module.css"; // Adjust the path if necessary
import Modal from "../../components/Modal";
import Sidebar from "../../components/Sidebar";

const AdmissionApprovalPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employee, setEmployee] = useState(null); // Store admin details from localStorage
  const dropdownRef = useRef(null); // For actions dropdown menu

  // Fetch students data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/admin/admin-approvals", {
          method: "GET",
        });

        if (!res.ok) {
          const errorResponse = await res.json();
          throw new Error(errorResponse.error || "Failed to fetch students");
        }

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

  // Fetch admin details from localStorage (via JWT)
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwt.decode(token); // Decode token to get user data
      console.log("Received Employee Name:", decoded.fullName);
      console.log("Received Role:", decoded.role);
      console.log("Received Employee Number:", decoded.employeeNumber || "N/A");

      setEmployee({
        full_name: decoded.fullName,
        role: decoded.role,
        employee_number: decoded.employeeNumber || "N/A",
        loginTimestamp: new Date().toLocaleString(), // You can replace this with a real login timestamp if needed
      });
    }
  }, []);

  const handleView = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const updatedData = {
      student_number: selectedStudent.student_number,
      approval_status: event.target.approval_status.value,
      approval_date: new Date().toISOString().split("T")[0],
      rejection_reason: event.target.rejection_reason.value,
      approval_comments: event.target.approval_comments.value,
    };

    if (
      (updatedData.approval_status === "Rejected" ||
        updatedData.approval_status === "Waitlist") &&
      (!updatedData.rejection_reason || !updatedData.approval_comments)
    ) {
      alert(
        "Rejection Reason and Comments are required for Rejected or Waitlist status."
      );
      return;
    }

    try {
      const response = await fetch("/api/admin/update-approval", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        closeModal();
        const updatedStudent = await response.json();
        setStudents((prevStudents) =>
          prevStudents.map((student) =>
            student.student_number === updatedStudent.student.student_number
              ? updatedStudent.student
              : student
          )
        );
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData);
      }
    } catch (error) {
      if (error && error instanceof Error) {
        // Log the error message if it's an instance of Error
        console.error("Error updating approval:", error.message);
      } else if (error && typeof error === "object" && error.message) {
        // Handle non-Error objects that have a `message` property
        console.error("Error updating approval:", error.message);
      } else {
        // Fallback for unexpected error types (e.g., string or other object)
        console.error("Unexpected error updating approval:", error);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  // Download logs function
  const handleDownloadLogs = () => {
    window.location.href = "/api/admin/downloadRegistrationLogs";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("employeeNumber"); // Remove employee ID on logout
    localStorage.removeItem("loginTimestamp");
    // Redirect to the home page or login page
    window.location.href = "/";
  };

  if (loading) {
    return <p className="loading-message">Loading students...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!students.length) {
    return <p className="no-students-message">No students found.</p>;
  }

  const handleBack = () => {
    window.location.href = "/AdminPortal/admin-dashboard";
  };

  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <h1 className={styles.title}>
          List of Students for Admission Application
        </h1>
        {/* <p className={styles.breadcrumb}>Home &gt; Admission Request</p> */}

        <div className={styles.searchContainer}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search..."
          />
          <button className={styles.searchButton}>Search</button>
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
            {students.map((student) => (
              <tr key={student.student_number}>
                <td>{student.student_number}</td>
                <td>{`${student.first_name} ${student.middle_name} ${student.last_name}`}</td>
                <td>
                  {student.dob
                    ? new Date(student.dob).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>{student.gender}</td>
                <td>{student.email}</td>
                <td>{student.phone_number}</td>
                <td>{student.program_name || "N/A"}</td>
                <td>{student.approval_status || "Pending"}</td>
                <td>
                  {student.approval_date
                    ? new Date(student.approval_date).toLocaleDateString()
                    : "N/A"}
                </td>
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
                    onMouseOver={(e) =>
                      (e.target.style.backgroundColor = "#005f73")
                    }
                    onMouseOut={(e) =>
                      (e.target.style.backgroundColor = "#0a9396")
                    }
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal for viewing/updating student details */}
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          {selectedStudent && (
            <form onSubmit={handleUpdate}>
              <div>
                <h3>
                  <strong>Student Details</strong>
                </h3>
                <p>
                  <strong>Student Number:</strong>{" "}
                  {selectedStudent.student_number}
                </p>
                <p>
                  <strong>Full Name:</strong>{" "}
                  {`${selectedStudent.first_name} ${selectedStudent.middle_name} ${selectedStudent.last_name}`}
                </p>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {selectedStudent.dob
                    ? new Date(selectedStudent.dob).toLocaleDateString()
                    : ""}
                </p>
                <p>
                  <strong>Gender:</strong> {selectedStudent.gender}
                </p>
                <p>
                  <strong>Email:</strong> {selectedStudent.email}
                </p>
                <p>
                  <strong>Phone Number:</strong> {selectedStudent.phone_number}
                </p>
                <p>
                  <strong>Program:</strong>{" "}
                  {selectedStudent.program_name || "N/A"}
                </p>

                <h3>
                  <strong>Approval Details</strong>
                </h3>
                <div>
                  <label>Approval Status:</label>
                  <select
                    name="approval_status"
                    defaultValue={selectedStudent.approval_status}
                    onChange={(e) => {
                      const approvalDateInput = document.querySelector(
                        'input[name="approval_date"]'
                      );
                      approvalDateInput.value = new Date()
                        .toISOString()
                        .split("T")[0]; // Set current date
                    }}
                    required
                  >
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Waitlist">Waitlist</option>
                  </select>
                </div>
                <div>
                  <label>Approval Date:</label>
                  <input
                    type="date"
                    name="approval_date"
                    defaultValue={selectedStudent.approval_date}
                    readOnly
                  />
                </div>
                <div>
                  <label>Rejection Reason:</label>
                  <input
                    type="text"
                    name="rejection_reason"
                    defaultValue={selectedStudent.rejection_reason}
                    required={
                      selectedStudent.approval_status === "Rejected" ||
                      selectedStudent.approval_status === "Waitlist"
                    }
                  />
                </div>
                <div>
                  <label>Reviewer Comments:</label>
                  <input
                    type="text"
                    name="approval_comments"
                    defaultValue={selectedStudent.approval_comments}
                    required={
                      selectedStudent.approval_status === "Rejected" ||
                      selectedStudent.approval_status === "Waitlist"
                    }
                  />
                </div>

                {/* Admin Details */}
                <div>
                  <label>Admin: </label>
                  <span>
                    {employee
                      ? `${employee.employee_number} - ${employee.full_name}`
                      : "Loading admin details..."}
                  </span>
                </div>
              </div>
              <button type="submit">Save Changes</button>
              <button type="button" onClick={closeModal}>
                Close
              </button>
            </form>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default AdmissionApprovalPage;
