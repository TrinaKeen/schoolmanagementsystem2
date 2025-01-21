'use client';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import styles from '../components/Home.module.css';

const ApplicationStatus = () => {
  const [application, setApplication] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentNumber, setStudentNumber] = useState(null); // Default to null instead of 'Unknown'

  // Fetch student number from localStorage when the component mounts
  useEffect(() => {
    const storedStudentNumber = localStorage.getItem('studentNumber');

    if (storedStudentNumber) {
      setStudentNumber(storedStudentNumber); // Set student number from localStorage
    } else {
      setError('Student number is unavailable. Please ensure you have logged in or submitted your application.');
    }

    setLoading(false); // Set loading to false after checking
  }, []); // This will run only once when the component is mounted

  useEffect(() => {
    if (studentNumber && studentNumber !== 'Unavailable') {
      const fetchApplicationStatus = async () => {
        try {
          const res = await fetch(`/api/get-application-status?studentNumber=${studentNumber}`);
          const data = await res.json();
      
          if (res.ok) {
            setApplication(data);
          } else {
            setError(data.message || 'Error fetching application status.');
            console.error('API error:', data.message); // Log the API error message
          }
        } catch (err) {
          setError('An error occurred while fetching your application status.');
          console.error('Error fetching application status:', err); // Log the detailed error
        } finally {
          setLoading(false);
        }
      };

      fetchApplicationStatus();
    }
  }, [studentNumber]); // Fetch application status when student number is set

  if (loading) return <p>Loading...</p>;

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      {/* Sidebar */}
      <Sidebar studentNumber={studentNumber} />
      <div className={styles.content}>
        <h2>Track My Application</h2>
        {application ? (
          <div>
            <p><strong>Student Number:</strong> {application.studentNumber}</p>
            <p><strong>First Name:</strong> {application.firstName}</p>
            <p><strong>Last Name:</strong> {application.lastName}</p>
            <p><strong>Date of Birth:</strong> {new Date(application.dob).toLocaleDateString()}</p>
            <p><strong>Gender:</strong> {application.gender}</p>
            
            {/* Add more fields based on your table structure */}
            <p><strong>Email:</strong> {application.email}</p>
            <p><strong>Phone Number:</strong> {application.phoneNumber}</p>
            <p><strong>Home Address:</strong> {application.homeAddress}</p>
            <p><strong>Emergency Contact Name:</strong> {application.emergencyContactName}</p>
            <p><strong>Emergency Contact Phone:</strong> {application.emergencyContactPhoneNumber}</p>
            <p><strong>Emergency Contact Relationship:</strong> {application.emergencyContactRelationship}</p>
            <p><strong>Previous Schools:</strong> {application.previousSchools}</p>
            <p><strong>Year of Graduation:</strong> {application.yearOfGraduation}</p>
            <p><strong>GPA:</strong> {application.gpa}</p>
            <p><strong>Desired Program:</strong> {application.desiredProgram}</p>
            <p><strong>Mode of Study:</strong> {application.modeOfStudy}</p>
            <p><strong>Start Date:</strong> {new Date(application.startDate).toLocaleDateString()}</p>
            <p><strong>Preferred Campus:</strong> {application.preferredCampus}</p>
            <p><strong>Terms and Conditions:</strong> {application.termsAndConditions ? 'Accepted' : 'Not Accepted'}</p>
            <p><strong>Data Privacy Consent:</strong> {application.dataPrivacyConsent ? 'Granted' : 'Not Granted'}</p>
            <p><strong>Status:</strong> {application.status}</p>
            <p><strong>Submitted On:</strong> {new Date(application.submissionDate).toLocaleDateString()}</p>
            {application.approvalDate && (
              <p><strong>Approval Date:</strong> {new Date(application.approvalDate).toLocaleDateString()}</p>
            )}
            {application.documentsStatus && (
              <p><strong>Documents Status:</strong> {application.documentsStatus}</p>
            )}          
          
          </div>
        ) : (
          <p>No application found.</p>
        )}
      </div>
    </div>
  );
};

export default ApplicationStatus;
