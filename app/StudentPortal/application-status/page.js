'use client';
import { useState, useEffect } from 'react';
import '../components/applicationstatus.css';
import Sidebar from '../components/Sidebar'; 

const StudentDetails = () => {
  const [studentNumber, setStudentNumber] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedStudentNumber = localStorage.getItem('studentNumber');
    setStudentNumber(storedStudentNumber);

    const fetchStudentData = async () => {
      if (!storedStudentNumber) {
        setError('Student number is missing');
        setLoading(false);
        return;
      }

      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authorization token is missing');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/students/student-admissiondata?studentNumber=${storedStudentNumber}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const errorResponse = await res.json();
          setError(errorResponse.error || 'An error occurred');
          setStudentData(null);
        } else {
          const data = await res.json();
          setStudentData(data);
          setError(null);
        }
      } catch (err) {
        setError('Failed to fetch student data');
        setStudentData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
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
            <td>{getFieldValue(studentData.studentnumber)}</td>
          </tr>
          <tr>
            <td><strong>Name:</strong></td>
            <td>{getFieldValue(studentData.firstname)} {getFieldValue(studentData.middlename)} {getFieldValue(studentData.lastname)}</td>
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
            <td>{getFieldValue(studentData.placeofbirth)}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td>{getFieldValue(studentData.email)}</td>
          </tr>
          <tr>
            <td><strong>Phone Number:</strong></td>
            <td>{getFieldValue(studentData.phonenumber)}</td>
          </tr>
          <tr>
            <td><strong>Home Address:</strong></td>
            <td>{getFieldValue(studentData.homeaddress)}</td>
          </tr>
          <tr>
            <td><strong>Emergency Contact:</strong></td>
            <td>{getFieldValue(studentData.emergencycontactrelationship)}</td>
          </tr>
          <tr>
            <td><strong></strong></td>
            <td>{getFieldValue(studentData.emergencycontactname)}</td>
          </tr>
          <tr>
            <td><strong></strong></td>
            <td>{getFieldValue(studentData.emergencycontactphonenumber)}</td>
          </tr>

          <tr>
            <td><strong>previousschools</strong></td>
            <td>{getFieldValue(studentData.previousschools)}</td>
          </tr>
          <tr>
            <td><strong>desiredprogram</strong></td>
            <td>{getFieldValue(studentData.desiredprogram)}</td>
          </tr>
          <tr>
            <td><strong>modeofstudy</strong></td>
            <td>{getFieldValue(studentData.modeofstudy)}</td>
          </tr>
          <tr>
            <td><strong>startdate</strong></td>
            <td>{getFieldValue(studentData.startdate)}</td>
          </tr>
          <tr>
            <td><strong>preferredcampus</strong></td>
            <td>{getFieldValue(studentData.preferredcampus)}</td>
          </tr>
          <tr>
            <td><strong>Application Submitted</strong></td>
            <td>{getFieldValue(studentData.applicationsubmittedat)}</td>
          </tr>
          {/* Add other fields similarly */}
          <tr>
            <td><strong>Application Status:</strong></td>
            <td>{getFieldValue(studentData.applicationstatus)}</td>
          </tr>
          {studentData.rejectionreason && (
            <tr>
              <td><strong>Reviewer Name:</strong></td>
              <td>{getFieldValue(studentData.reviewername)}</td>
            </tr>
          )}
          {studentData.rejectionreason && (
            <tr>
              <td><strong>Approval Date:</strong></td>
              <td>{getFieldValue(studentData.approvaldate)}</td>
            </tr>
          )}
          {studentData.rejectionreason && (
            <tr>
              <td><strong>Rejection Reason:</strong></td>
              <td>{getFieldValue(studentData.rejectionreason)}</td>
            </tr>
          )}
          {studentData.reviewercomments && (
            <tr>
              <td><strong>Reviewer Comments:</strong></td>
              <td>{getFieldValue(studentData.reviewercomments)}</td>
            </tr>
          )}
          {studentData.identityproof && (
            <tr>
              <td><strong>Identity Proof:</strong></td>
              <td><a href={studentData.identityproof} target="_blank" rel="noopener noreferrer">View   /  Download</a></td>
            </tr>
          )}
          {studentData.photo && (
            <tr>
              <td><strong>Transcript:</strong></td>
              <td><a href={studentData.transcripts} target="_blank" rel="noopener noreferrer">View   /  Download</a></td>
            </tr>
          )}
          {studentData.photo && (
            <tr>
              <td><strong>Letter of Recommendation:</strong></td>
              <td><a href={studentData.letterofrecommendation} target="_blank" rel="noopener noreferrer">View   /  Download</a></td>
            </tr>
          )}
          {studentData.photo && (
            <tr>
              <td><strong>Resume:</strong></td>
              <td><a href={studentData.resume} target="_blank" rel="noopener noreferrer">View   /  Download</a></td>
            </tr>
          )}
          {studentData.photo && (
            <tr>
              <td><strong>Photo:</strong></td>
              <td><a href={studentData.photo} target="_blank" rel="noopener noreferrer">View   /  Download</a></td>
            </tr>
          )}
         
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default StudentDetails;
