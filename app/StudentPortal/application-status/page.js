// app/StudentPortal/application-status/page.js
'use client';
import { useState, useEffect } from 'react';

const ApplicationStatus = () => {
  const [application, setApplication] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch application status when the component mounts
  useEffect(() => {
    const fetchApplicationStatus = async () => {
      try {
        const res = await fetch('/api/get-application-status');
        const data = await res.json();

        if (res.ok) {
          setApplication(data);
        } else {
          setError(data.message || 'Error fetching application status.');
        }
      } catch (err) {
        setError('An error occurred while fetching your application status.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationStatus();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Track My Application</h2>
      {application ? (
        <div>
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
  );
};

export default ApplicationStatus;
