"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./studentList.module.css";
import Modal from "../../components/Modal";
import Sidebar from "../../components/Sidebar";
import { HiChevronDown } from "react-icons/hi";
import LoadingSpinner from "../../components/LoadingSpinner";

const ApprovedStudentPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const adminId = 1;
  const dropdownRef = useRef(null);

  const fetchStudents = async () => {
    try {
      const res = await fetch("/api/admin/admin-approvals");
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

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleView = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const updatedData = {
      student_number: selectedStudent.student_number,
      admin_id: adminId,
      approval_status: event.target.approval_status.value,
      approval_date: new Date().toISOString().split("T")[0],
      rejection_reason: event.target.rejection_reason.value,
      approval_comments: event.target.approval_comments.value,
    };

    try {
      const response = await fetch("/api/admin/update-approval", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        closeModal();
        await fetchStudents();
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData);
      }
    } catch (error) {
      console.error("Error updating approval:", error.message);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleDownloadLogs = () => {
    window.location.href = "/api/admin/downloadRegistrationLogs";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleApproveStudent = async (student_number) => {
    try {
      const response = await fetch("/api/admin/update-approval", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_number,
          approval_status: "Approved",
          approval_date: new Date().toISOString(),
        }),
      });

      let data;
      try {
        data = await response.json(); // Ensure JSON response
      } catch (jsonError) {
        data = await response.text(); // Fallback to text if JSON fails
      }

      console.log("API Response:", response.status, response.statusText, data);

      if (!response.ok) {
        console.error("Failed to approve student. Server response:", data);
        return;
      }

      console.log("Student approved successfully:", data);
      fetchStudents(); // Refresh list
    } catch (error) {
      console.error("⚠️ Error approving student:", error.message);
    }
  };

  const filteredStudents = students.filter((student) => {
    const fullName =
      `${student.first_name} ${student.middle_name} ${student.last_name}`.toLowerCase();
    const studentNumber = String(student.student_number);
    const query = searchQuery.toLowerCase();

    return fullName.includes(query) || studentNumber.includes(query);
  });

  if (loading) return <LoadingSpinner />;
  if (error) return <LoadingSpinner />;
  if (!students.length)
    return <p className="no-students-message">No students found.</p>;

  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <div className={styles.contentContainer}>
        <div className={styles.mainContent}>
          <h1 className={styles.title}>Student List</h1>
          {/* <p className={styles.breadcrumb}>Home &gt; All Students</p> */}

          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search by name or student number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Modal isOpen={isModalOpen} onClose={closeModal}>
            {selectedStudent && (
              <form className={styles.formContainer} onSubmit={handleUpdate}>
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
                  <strong>Home Address:</strong>{" "}
                  {selectedStudent.home_address || ""}
                </p>

                <h3>
                  <strong>Emergency Contact</strong>
                </h3>
                <p>
                  <strong>Name:</strong>{" "}
                  {selectedStudent.emergency_contact_name}
                </p>
                <p>
                  <strong>Relationship:</strong>{" "}
                  {selectedStudent.emergency_contact_relationship}
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  {selectedStudent.emergency_contact_phone}
                </p>

                <h3>
                  <strong>Academic Information</strong>
                </h3>
                <p>
                  <strong>Previous Schools:</strong>{" "}
                  {selectedStudent.previous_schools || ""}
                </p>
                <p>
                  <strong>Year of Graduation:</strong>{" "}
                  {selectedStudent.year_of_graduation || ""}
                </p>
                <p>
                  <strong>GPA:</strong> {selectedStudent.gpa || ""}
                </p>
                <p>
                  <strong>Program:</strong> {selectedStudent.program_name || ""}
                </p>
                <p>
                  <strong>Major:</strong> {selectedStudent.major || ""}
                </p>

                <div className={styles.buttonGroup}>
                  <button
                    type="button"
                    className={styles.cancelButton}
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </Modal>

          <div className={styles.tableWrapper}>
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
                    <td>
                      {student.dob
                        ? new Date(student.dob).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>{student.gender}</td>
                    <td>{student.email}</td>
                    <td>{student.phone_number}</td>
                    <td>{student.program_name || "N/A"}</td>
                    <td>{student.approval_status || "Active"}</td>
                    <td>
                      <button
                        onClick={() => handleView(student)}
                        className={styles.viewButton}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovedStudentPage;
