'use client';
import { useState, useEffect } from 'react';
import '../components/applicationstatus.css';
import Sidebar from '../components/Sidebar'; 
import '../components/studentapplication.css';

const StudentDetails = () => {
    const [studentNumber, setStudentNumber] = useState(null);
    const [loading, setLoading] = useState(true);
    const [studentData, setStudentData] = useState(null);
    const [error, setError] = useState(null);

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
                setStudentNumber(data.studentNumber); // Save the student number

                // Now fetch student details with the student number
                await fetchStudentData(data.studentNumber);
            } catch (error) {
                console.error('Error fetching student number:', error);
                setError('Failed to fetch student number');
            } finally {
                setLoading(false);
            }
        };

        const fetchStudentData = async (number) => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Authorization token is missing');
                return;
            }

            try {
                const res = await fetch(`/api/students/application-admissiondata?studentNumber=${number}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    const errorResponse = await res.json();
                    setError(errorResponse.error || 'Failed to fetch student data');
                    setStudentData(null);
                } else {
                    const data = await res.json();
                    setStudentData(data);
                    setError(null); // Clear any previous errors
                }
            } catch (error) {
                console.error('Error fetching student data:', error);
                setError('Failed to fetch student data');
            }
        };

        fetchStudentNumber();
    }, []);

    const getFieldValue = (field) => {
        if (typeof field === 'boolean') {
            return field ? 'Yes' : 'No';
        }
        return field ? field : 'Pending';
    };

    const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : 'N/A');

    if (loading) {
        return <p>Loading student data...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!studentData) {
        return <p>No student data found.</p>;
    }

 

  return (
    <div>
    {/* Sidebar */}
    <Sidebar studentNumber={studentNumber} />
      
  <div className="form-container">
    <h2>Student Application Details</h2>
    <table className="details-table">
    <tbody>
            <tr>
            <td><strong>Student Number:</strong></td>
              <td>{getFieldValue(studentData.student_number)}</td>
            </tr>
        <tr>
          <td><strong>Name:</strong></td>
          <td>{getFieldValue(studentData.first_name)} {getFieldValue(studentData.middle_name)} {getFieldValue(studentData.last_name)}</td>
        </tr>
        <tr>
          <td><strong>Date of Birth:</strong></td>
          <td>{formatDate(studentData.dob)}</td>
        </tr>
        <tr>
          <td><strong>Age:</strong></td>
          <td>{getFieldValue(studentData.age)}</td>
        </tr>
        <tr>
          <td><strong>Gender:</strong></td>
          <td>{getFieldValue(studentData.gender)}</td>
        </tr>
        <tr>
          <td><strong>Nationality:</strong></td>
          <td>{getFieldValue(studentData.nationality)}</td>
        </tr>
        <tr>
          <td><strong>Place of Birth:</strong></td>
          <td>{getFieldValue(studentData.place_of_birth)}</td>
        </tr>
        <tr>
          <td><strong>Email:</strong></td>
          <td>{getFieldValue(studentData.email)}</td>
        </tr>
        <tr>
          <td><strong>Phone Number:</strong></td>
          <td>{getFieldValue(studentData.phone_number)}</td>
        </tr>
        <tr>
          <td><strong>Home Address:</strong></td>
          <td>{getFieldValue(studentData.home_address)}</td>
        </tr>
        <tr>
          <td><strong>Emergency Contact:</strong></td>
          <td>{getFieldValue(studentData.emergency_contact_relationship)}</td>
        </tr>
        <tr>
          <td><strong></strong></td>
          <td>{getFieldValue(studentData.emergency_contact_name)}</td>
        </tr>
        <tr>
          <td><strong></strong></td>
          <td>{getFieldValue(studentData.emergency_contact_phone)}</td>
        </tr>

        <tr>
          <td><strong>Previous Schools:</strong></td>
          <td>{getFieldValue(studentData.previous_schools)}</td>
        </tr>
        <tr>
          <td><strong>Year of Graduation:</strong></td>
          <td>{getFieldValue(studentData.year_of_graduation)}</td>
        </tr>
        <tr>
          <td><strong>GPA:</strong></td>
          <td>{getFieldValue(studentData.gpa)}</td>
        </tr>
        <tr>
          <td><strong>Program ID:</strong></td>
          <td>{getFieldValue(studentData.program_id)}</td>
        </tr>
        <tr>
          <td><strong>Diploma:</strong></td>
          <td>{getFieldValue(studentData.diploma)}</td>
        </tr>
        <tr>
          <td><strong>Form 137:</strong></td>
          <td>{getFieldValue(studentData.form137)}</td>
        </tr>
        <tr>
          <td><strong>Identification Card:</strong></td>
          <td>{getFieldValue(studentData.identification_card)}</td>
        </tr>
        <tr>
          <td><strong>Photo:</strong></td>
          <td>{getFieldValue(studentData.photo)}</td>
        </tr>
        <tr>
          <td><strong>Marriage Certificate:</strong></td>
          <td>{getFieldValue(studentData.marriage_certificate)}</td>
        </tr>
        <tr>
          <td><strong>Birth Certificate:</strong></td>
          <td>{getFieldValue(studentData.birth_certificate)}</td>
        </tr>
        <tr>
          <td><strong>Good Moral:</strong></td>
          <td>{getFieldValue(studentData.good_moral)}</td>
        </tr>
        <tr>
          <td><strong>Honorable Dismissal:</strong></td>
          <td>{getFieldValue(studentData.honorable_dismissal)}</td>
        </tr>
        <tr>
          <td><strong>Report Card:</strong></td>
          <td>{getFieldValue(studentData.report_card)}</td>
        </tr>
        <tr>
          <td><strong>Terms and Conditions:</strong></td>
          <td>{getFieldValue(studentData.terms_and_conditions)}</td>
        </tr>
        <tr>
          <td><strong>Data Privacy Consent:</strong></td>
          <td>{getFieldValue(studentData.data_privacy_consent)}</td>
        </tr>
        <tr>
          <td><strong>Application Submitted:</strong></td>
          <td>{formatDate(studentData.application_submitted_at)}</td>
        </tr>
        <tr>
          <td><strong>Application Status:</strong></td>
          <td>{getFieldValue(studentData.application_status)}</td>
        </tr>
        {studentData.rejection_reason && (
          <tr>
            <td><strong>Reviewer Name:</strong></td>
            <td>{getFieldValue(studentData.reviewer_name)}</td>
          </tr>
        )}
        {studentData.rejection_reason && (
          <tr>
            <td><strong>Approval Date:</strong></td>
            <td>{formatDate(studentData.approval_date)}</td>
          </tr>
        )}
        {studentData.rejection_reason && (
          <tr>
            <td><strong>Rejection Reason:</strong></td>
            <td>{getFieldValue(studentData.rejection_reason)}</td>
          </tr>
        )}
        {studentData.reviewer_comments && (
          <tr>
            <td><strong>Reviewer Comments:</strong></td>
            <td>{getFieldValue(studentData.reviewer_comments)}</td>
          </tr>
        )}
        {studentData.identity_proof && (
          <tr>
            <td><strong>Identity Proof:</strong></td>
            <td><a href={studentData.identity_proof} target="_blank" rel="noopener noreferrer">View / Download</a></td>
          </tr>
        )}
        {studentData.transcripts && (
          <tr>
            <td><strong>Transcript:</strong></td>
            <td><a href={studentData.transcripts} target="_blank" rel="noopener noreferrer">View / Download</a></td>
          </tr>
        )}
        {studentData.letter_of_recommendation && (
          <tr>
            <td><strong>Letter of Recommendation:</strong></td>
            <td><a href={studentData.letter_of_recommendation} target="_blank" rel="noopener noreferrer">View / Download</a></td>
          </tr>
        )}
        {studentData.resume && (
          <tr>
            <td><strong>Resume:</strong></td>
            <td><a href={studentData.resume} target="_blank" rel="noopener noreferrer">View / Download</a></td>
          </tr>
        )}
        {studentData.photo && (
          <tr>
            <td><strong>Photo:</strong></td>
            <td><a href={studentData.photo} target="_blank" rel="noopener noreferrer">View / Download</a></td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default StudentDetails;
