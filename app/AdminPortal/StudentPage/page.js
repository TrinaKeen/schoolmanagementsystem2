"use client";
import { useState, useEffect, useRef } from 'react';
import '../components/studentpage.modules.css';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';
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
      admin_id: adminId, // Make sure adminId is correctly set
      approval_status: event.target.approval_status.value,
      approval_date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      rejection_reason: event.target.rejection_reason.value,
      approval_comments: event.target.approval_comments.value,
    };
  
    try {
      // Send the PUT request to update the approval data
      const response = await fetch('/api/admin/update-approval', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData), // Sending updated data in the body
      });
  
      // Check if the update was successful
      if (response.ok) {
        closeModal(); // Close the modal on success
        await fetchStudents(); // Optionally refresh the student list
      } else {
        // Handle the failure case
        console.error('Failed to update approval, status:', response.status);
        const errorResponse = await response.json(); // Get the error message from the response if available
        console.error('Error details:', errorResponse.error || 'No additional error details');
      }
    } catch (error) {
      // Log the error in case of a network issue or other unexpected problems
      console.error('Error updating approval:', error); // Log the entire error object
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

  if (loading) {
    return <p className="loading-message">Loading students...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!students.length) {
    return <p className="no-students-message">No students found.</p>;
  }

  return (
    <div style={{ backgroundColor: 'white', height: '100vh', color: 'black' }}>
      <Sidebar />

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

      <table>
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
          {students.map(student => (
            <tr key={student.student_number}>
              <td>{student.student_number}</td>
              <td>{`${student.first_name} ${student.middle_name} ${student.last_name}`}</td>
              <td>{student.dob ? new Date(student.dob).toLocaleDateString() : 'N/A'}</td>
              <td>{student.gender}</td>
              <td>{student.email}</td>
              <td>{student.phone_number}</td>
              <td>{student.program_name || 'N/A'}</td>
              <td>{student.approval_status || 'N/A'}</td>
              <td>{student.approval_date ? new Date(student.approval_date).toLocaleDateString() : 'N/A'}</td>
              <td>{student.rejection_reason || 'N/A'}</td>
              <td>{student.approval_comments || 'N/A'}</td>
              <td>
                <button onClick={() => handleView(student)}>View</button>
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
  <li>
    Diploma: {selectedStudent.diploma ? <a href={selectedStudent.diploma} target="_blank" rel="noopener noreferrer">Attached</a> : 'No attachment'}
  </li>
  <li>
    Form 137: {selectedStudent.form137 ? <a href={selectedStudent.form137} target="_blank" rel="noopener noreferrer">Attached</a> : 'No attachment'}
  </li>
  <li>
    Identification Card: {selectedStudent.identification_card ? <a href={selectedStudent.identification_card} target="_blank" rel="noopener noreferrer">Attached</a> : 'No attachment'}
  </li>
  <li>
    Photo: {selectedStudent.photo ? <a href={selectedStudent.photo} target="_blank" rel="noopener noreferrer">Attached</a> : 'No attachment'}
  </li>
  <li>
    Marriage Certificate: {selectedStudent.marriage_certificate ? <a href={selectedStudent.marriage_certificate} target="_blank" rel="noopener noreferrer">Attached</a> : 'No attachment'}
  </li>
  <li>
    Birth Certificate: {selectedStudent.birth_certificate ? <a href={selectedStudent.birth_certificate} target="_blank" rel="noopener noreferrer">Attached</a> : 'No attachment'}
  </li>
  <li>
    Good Moral Certificate: {selectedStudent.good_moral ? <a href={selectedStudent.good_moral} target="_blank" rel="noopener noreferrer">Attached</a> : 'No attachment'}
  </li>
  <li>
    Honorable Dismissal: {selectedStudent.honorable_dismissal ? <a href={selectedStudent.honorable_dismissal} target="_blank" rel="noopener noreferrer">Attached</a> : 'No attachment'}
  </li>
  <li>
    Report Card: {selectedStudent.report_card ? <a href={selectedStudent.report_card} target="_blank" rel="noopener noreferrer">Attached</a> : 'No attachment'}
  </li>
  <li>
    Terms and Conditions: {selectedStudent.terms_and_conditions ? <a href={selectedStudent.terms_and_conditions} target="_blank" rel="noopener noreferrer">Attached</a> : 'No attachment'}
  </li>
  <li>
    Data Privacy Consent: {selectedStudent.data_privacy_consent ? <a href={selectedStudent.data_privacy_consent} target="_blank" rel="noopener noreferrer">Attached</a> : 'No attachment'}
  </li>
</ul>


<br></br>
        <h3><strong>Approval Details</strong></h3>
        <div>
  <label>Approval Status:</label>
  <select 
    name="approval_status" 
    defaultValue={selectedStudent.approval_status} 
    onChange={(e) => {
      // Update the approval date when status changes
      const approvalDateInput = document.querySelector('input[name="approval_date"]');
      approvalDateInput.value = new Date().toISOString().split('T')[0]; // Set current date
    }} 
    required
  >
    <option value="Approved">Choose Option</option>
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
    readOnly // Make this read-only so it can't be manually changed
  />
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
      <button type="button" onClick={closeModal}>Cancel</button>
    </form>
  )}
</Modal>
    </div>
  );
};

export default AdminStudentList;
