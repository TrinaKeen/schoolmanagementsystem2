"use client";
import { useState, useEffect, useRef } from 'react';
import '../../components/studentpage.modules.css';
import Modal from '../../components/Modal';
import AdminHeader from "../../components/header";
import styles from '../../components/Sidebar.module.css';
import logo from '/src/school-logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { HiChevronDown } from 'react-icons/hi';

const AdminStudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const adminId = 1; // Replace this with the actual admin ID from your context or state
  const dropdownRef = useRef(null); // For actions dropdown menu
  
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch('/api/admin/admin-approvals', {
          method: 'GET',
        });

        if (!res.ok) {
          const errorResponse = await res.json();
          throw new Error(errorResponse.error || 'Failed to fetch students');
        }

        const data = await res.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

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
      approval_date: new Date().toISOString().split('T')[0], // This will ensure the current date is passed
      rejection_reason: event.target.rejection_reason.value,
      approval_comments: event.target.approval_comments.value,
    };
  
    try {
      const response = await fetch('/api/admin/update-approval', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (response.ok) {
        closeModal();
        await fetchStudents(); // Ensure the list of students is refreshed after update
      } else {
        const errorData = await response.json();
        console.error('API Error:', errorData);
      }
    } catch (error) {
      console.error('Error updating approval:', error.message);
    }
  };
  
   

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  // Download logs function
  const handleDownloadLogs = () => {
    window.location.href = '/api/admin/downloadRegistrationLogs';
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

 

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!students.length) {
    return <p className="no-students-message">No students found.</p>;
  }

  const handleBack = () => {

    window.location.href = '/AdminPortal/admin-dashboard';
  };

  return (
    <div style={{ backgroundColor: 'white', height: '100vh', color: 'black' }}>
      <AdminHeader />


      <div className={styles.sidebar}>
      
  
      {/* Navigation Menu */}
      <nav className={styles.navbar} aria-label="Sidebar navigation">
        <Link href="/AdminPortal/StudentPage">
        Student Approvals 
        </Link>
        <Link href="/AdminPortal/StudentPage/studentList">
        List of Students 
        </Link>
        
        <Link href="/AdminPortal/StudentPage">
        Update Student Info
        </Link>
        <button onClick={handleBack} className={styles.logoutButton}>
          Back to Dashboard
        </button>
      </nav>
    </div>



      <div>
        
      <h1 style={{ paddingLeft: '300px', paddingTop: '50px', fontSize: '2rem' }}>
  List of Students for Admission Application
  </h1>
      <table>
        {/* Actions Dropdown for downloading logs */}
  <div className="actions-container" ref={dropdownRef}> {/* Allows user to click out of menu */}
  <button className="actions-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
    Actions
    <HiChevronDown size={20} />
  </button>
  {isDropdownOpen && (
    <ul className="actions-dropdown">
      <li onClick={handleDownloadLogs}>Download Registration Logs</li>
      <li>Export to Excel</li>
      <li>Bulk Update Status</li>
    </ul>
  )}
  </div>
      
        <thead >
          <tr >
            
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
          {students.map(student => (
            <tr key={student.student_number}>
              <td>{student.student_number}</td>
              <td>{`${student.first_name} ${student.middle_name} ${student.last_name}`}</td>
              <td>{student.dob ? new Date(student.dob).toLocaleDateString() : 'N/A'}</td>
              <td>{student.gender}</td>
              <td>{student.email}</td>
              <td>{student.phone_number}</td>
              <td>{student.program_name || 'N/A'}</td>
              <td>{student.approval_status || 'Approved'}</td>
              <td>
  <button 
    onClick={() => handleView(student)} 
    style={{
      padding: '8px 16px',
      backgroundColor: '#0a9396',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'background-color 0.3s ease',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)'
    }}
    onMouseOver={(e) => e.target.style.backgroundColor = '#005f73'}
    onMouseOut={(e) => e.target.style.backgroundColor = '#0a9396'}
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
        <h3><strong>Student Details</strong></h3>
        <p><strong>Student Number:</strong> {selectedStudent.student_number}</p>
        <p><strong>Full Name:</strong> {`${selectedStudent.first_name} ${selectedStudent.middle_name} ${selectedStudent.last_name}`}</p>
        <p><strong>Date of Birth:</strong> {selectedStudent.dob ? new Date(selectedStudent.dob).toLocaleDateString() : ''}</p>
        <p><strong>Gender:</strong> {selectedStudent.gender}</p>
        <p><strong>Email:</strong> {selectedStudent.email}</p>
        <p><strong>Phone Number:</strong> {selectedStudent.phone_number}</p>
        <p><strong>Home Address:</strong> {selectedStudent.home_address || ''}</p>
        <p><strong>Emergency Contact:</strong> {selectedStudent.emergency_contact_name} ({selectedStudent.emergency_contact_relationship})</p>
        <p><strong>Emergency Contact Phone:</strong> {selectedStudent.emergency_contact_phone}</p>
        <p><strong>Previous Schools:</strong> {selectedStudent.previous_schools || ''}</p>
        <p><strong>Year of Graduation:</strong> {selectedStudent.year_of_graduation || ''}</p>
        <p><strong>GPA:</strong> {selectedStudent.gpa || ''}</p>
        <p><strong>Program:</strong> {selectedStudent.program_name || ''}</p>
        <p><strong>Major:</strong> {selectedStudent.major || ''}</p>
        <p><strong>Application Submitted At:</strong> {selectedStudent.application_submitted_at ? new Date(selectedStudent.application_submitted_at).toLocaleDateString() : ''}</p>
        <br></br>
        <h3><strong>Documents</strong></h3>
<ul>
  <li><strong>
    Diploma: </strong>{selectedStudent.diploma ? <a href={selectedStudent.diploma} target="_blank" rel="noopener noreferrer">Attached</a> : 'No attachment'}
  </li>
  <li><strong>
    Form 137:</strong> {selectedStudent.form137 ? <a href={selectedStudent.form137} target="_blank" rel="noopener noreferrer">Attached</a> : 'No attachment'}
  </li>
  <li><strong>
    Identification Card:</strong>  {selectedStudent.identification_card ? <a href={selectedStudent.identification_card} target="_blank" rel="noopener noreferrer">Attached</a> : 'No attachment'}
  </li>
  <li><strong>
    Photo: </strong> {selectedStudent.photo ? <a href={selectedStudent.photo} target="_blank" rel="noopener noreferrer">Attached</a> : 'No attachment'}
  </li>
  <li><strong>
    Marriage Certificate: </strong> {selectedStudent.marriage_certificate ? <a href={selectedStudent.marriage_certificate} target="_blank" rel="noopener noreferrer">Attached</a> : 'No attachment'}
  </li>
  <li><strong>
    Birth Certificate:</strong> {selectedStudent.birth_certificate ? <a href={selectedStudent.birth_certificate} target="_blank" rel="noopener noreferrer">Attached</a> : 'No attachment'}
  </li>
  <li><strong>
    Good Moral Certificate:</strong> {selectedStudent.good_moral ? <a href={selectedStudent.good_moral} target="_blank" rel="noopener noreferrer">Attached</a> : 'No attachment'}
  </li>
  <li><strong>
    Honorable Dismissal:</strong> {selectedStudent.honorable_dismissal ? <a href={selectedStudent.honorable_dismissal} target="_blank" rel="noopener noreferrer">Attached</a> : 'No attachment'}
  </li>
  <li><strong>
    Report Card:</strong> {selectedStudent.report_card ? <a href={selectedStudent.report_card} target="_blank" rel="noopener noreferrer">Attached</a> : 'No attachment'}
  </li>
  <li> <strong>
    Terms and Conditions:</strong> {selectedStudent.terms_and_conditions ? <a href={selectedStudent.terms_and_conditions} target="_blank" rel="noopener noreferrer">Attached</a> : 'No attachment'}
  </li>
  <li><strong>
    Data Privacy Consent: </strong>{selectedStudent.data_privacy_consent ? <a href={selectedStudent.data_privacy_consent} target="_blank" rel="noopener noreferrer">Attached</a> : 'No attachment'}
  </li>
</ul>


<br></br>
        <h3><strong>Approval Details</strong></h3>
        <div>
  <label>Approval Status:</label>
  <div>
  <label>Approval Status:</label>
  <select name="approval_status" defaultValue="Approved" disabled>
    <option value="Approved">Approved</option>
  </select>
</div>
<div>
  <label>Approval Date:</label>
  <input 
    type="date" 
    name="approval_date" 
    defaultValue={new Date().toISOString().split('T')[0]} 
    readOnly 
  />
</div>
<div>
  <label>Rejection Reason:</label>
  <input 
    type="text" 
    name="rejection_reason" 
    defaultValue="N/A" 
    disabled 
  />
</div>

<div>
  <label>Reviewer Comments:</label>
  <input 
    type="text" 
    name="approval_comments" 
    defaultValue="Approved successfully." 
    disabled 
  />
</div>
</div>
      </div>
       <button type="button" onClick={closeModal}>Cancel</button>
    </form>
  )}
</Modal>
    </div>
    </div>
   
  );
};

export default AdminStudentList;
