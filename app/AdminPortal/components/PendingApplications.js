'use client'
import { useState, useEffect } from 'react';
import AdminHeader from "../components/page";
import styles from "../components/styles.module.css";



const PendingApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null); // For selected application details
  const [successMessage, setSuccessMessage] = useState(null);
const [errorMessage, setErrorMessage] = useState(null);


  useEffect(() => {
    const fetchPendingApplications = async () => {
      try {
        const res = await fetch('/api/admin/update-application');
        if (res.ok) {
          const data = await res.json();
          setApplications(data);
        } else {
          setError('Failed to fetch pending applications');
        }
      } catch (err) {
        setError('Error fetching applications');
      } finally {
        setLoading(false);
      }
    };

    fetchPendingApplications();
  }, []);

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
  };

  const handleUpdateApplication = async (event) => {
    event.preventDefault(); // Prevent the default form submit behavior
  
    try {
      const response = await fetch(`/api/admin/update-application?id=${selectedApplication.id}`, {
        method: 'PUT', // or 'PATCH' if you're only updating part of the resource
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          applicationstatus: selectedApplication.applicationstatus,
          reviewername: selectedApplication.reviewername,
          approvaldate: selectedApplication.approvaldate,
          rejectionreason: selectedApplication.rejectionreason,
          reviewercomments: selectedApplication.reviewercomments,
        }),
      });
  
      if (response.ok) {
        console.log('Application updated successfully');
        
        // Show success message in a modal or popup
        setSuccessMessage('Application updated successfully!');
        
        // Optionally, you can also refresh data or close the modal
        setSelectedApplication(null); // Close the application modal (if any)
        
      } else {
        const errorData = await response.json();
        console.error('Failed to update application:', errorData);
        setErrorMessage('Failed to update application');
      }
    } catch (error) {
      // If the error is a standard JavaScript error with a message property
      if (error instanceof Error) {
        console.error('Error during update:', error.message);
      } else {
        console.error('Error during update:', error);
      }
    }
  };
  
  {successMessage && (
    <div className="popup success">
      <p>{successMessage}</p>
      <button onClick={() => setSuccessMessage(null)}>Close</button>
    </div>
  )}
  
  {errorMessage && (
    <div className="popup error">
      <p>{errorMessage}</p>
      <button onClick={() => setErrorMessage(null)}>Close</button>
    </div>
  )}
  
  
  
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ backgroundColor: 'white', height: '100vh' }}>
    
    <AdminHeader />
    <div className={styles.container}>
      <h1>Pending Student Applications</h1>
      {applications.length === 0 ? (
        <p>No pending applications found</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Student Number</th>
              <th>Application Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id}>
                <td>{application.firstname}</td>
                <td>{application.lastname}</td>
                <td>{application.email}</td>
                <td>{application.studentnumber}</td>
                <td>{application.applicationstatus}</td>
                <td>
                  <button className="view-btn" onClick={() => handleViewDetails(application)}>View</button>
                </td>
                <td>
               
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
  
      {selectedApplication && (
        <>
          {/* Modal Overlay */}
          <div className="modal-overlay" onClick={() => setSelectedApplication(null)}></div>
  
          {/* Modal */}
          <div className="modal">
            <h2>Application Details</h2>
            <form onSubmit={handleUpdateApplication}>
              {/* Application form fields */}
              <div>
                <label>First Name</label>
                <input type="text" value={selectedApplication.firstname} readOnly />
              </div>
  
              <div>
                <label>Last Name</label>
                <input type="text" value={selectedApplication.lastname} readOnly />
              </div>
  
              <div>
                <label>Email</label>
                <input type="email" value={selectedApplication.email} readOnly />
              </div>
  
              <div>
                <label>Student Number</label>
                <input type="text" value={selectedApplication.studentnumber} readOnly />
              </div>
  
              <div>
                <label>Desired Program</label>
                <input type="text" value={selectedApplication.desiredprogram} readOnly />
              </div>
  
              <div>
                <label>Mode of Study</label>
                <input type="text" value={selectedApplication.modeofstudy} readOnly />
              </div>
  
              <div>
                <label>Country</label>
                <input type="text" value={selectedApplication.nationality} readOnly />
              </div>
  
              <div>
                <label>Application Status</label>
                <select
                  value={selectedApplication.applicationstatus}
                  onChange={(e) =>
                    setSelectedApplication((prev) => ({
                      ...prev,
                      applicationstatus: e.target.value,
                    }))
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Waitlisted</option>
                  <option value="Approved">Under Review</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
  
              <div>
                <label>Reviewer Name</label>
                <input
                  type="text"
                  value={selectedApplication.reviewername || ''}
                  onChange={(e) =>
                    setSelectedApplication((prev) => ({
                      ...prev,
                      reviewername: e.target.value,
                    }))
                  }
                />
              </div>
  
              <div>
                <label>Approval Date</label>
                <input
                  type="date"
                  value={selectedApplication.approvaldate || ''}
                  onChange={(e) =>
                    setSelectedApplication((prev) => ({
                      ...prev,
                      approvaldate: e.target.value,
                    }))
                  }
                />
              </div>
  
              <div>
                <label>Rejection Reason</label>
                <textarea
                  value={selectedApplication.rejectionreason || ''}
                  onChange={(e) =>
                    setSelectedApplication((prev) => ({
                      ...prev,
                      rejectionreason: e.target.value,
                    }))
                  }
                />
              </div>
  
              <div>
                <label>Reviewer Comments</label>
                <textarea
                  value={selectedApplication.reviewercomments || ''}
                  onChange={(e) =>
                    setSelectedApplication((prev) => ({
                      ...prev,
                      reviewercomments: e.target.value,
                    }))
                  }
                />
              </div>
  
              <button type="submit">Update Application</button>
              <button type="button" className="close-btn" onClick={() => setSelectedApplication(null)}>
                Close
              </button>
              
            </form>
          </div>
        </>
      )}
    </div>
  </div>
  
  );
};

export default PendingApplications;
