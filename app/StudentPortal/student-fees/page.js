'use client';
import { useState, useEffect } from 'react';
import '../components/studentfees.css';
import Sidebar from '../components/Sidebar'; 


const StudentFees = () => {
  const [studentNumber, setStudentNumber] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fees, setFees] = useState([]);
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
      } catch (error) {
        console.error('Error fetching student number:', error);
        setError('Failed to fetch student number');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentNumber();
  }, []);

  // Static fees data for testing (simulating database response)
  const staticFeesData = [
    {
      id: 1,
      feeType: 'Tuition Fee',
      amount: 5000,
      status: 'Unpaid',
      dueDate: '2025-04-30',
    },
    {
      id: 2,
      feeType: 'Laboratory Fee',
      amount: 200,
      status: 'Paid',
      dueDate: '2025-03-10',
    },
    {
      id: 3,
      feeType: 'Activity Fee',
      amount: 100,
      status: 'Unpaid',
      dueDate: '2025-05-15',
    },
  ];

  useEffect(() => {
    // Simulate a delay for fetching data (like calling an API)
    setTimeout(() => {
      try {
        setFees(staticFeesData); // Set the static fees data
      } catch (err) {
        setError('An error occurred while fetching fees');
      } finally {
        setLoading(false);
      }
    }, 1000);
  }, []);

  return (
    <div>
      {/* Sidebar */}
      <Sidebar studentNumber={studentNumber} />

      <div className="form-container">
      <h1 style={{ textAlign: 'left', fontSize: '24px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
  Outstanding Fees and Payment Status
</h1>


        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Fee Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {fees.length > 0 ? (
                fees.map((fee) => (
                  <tr key={fee.id}>
                    <td>{fee.feeType}</td>
                    <td>Php {fee.amount.toFixed(2).toLocaleString()}</td>
                    <td>{fee.status}</td>
                    <td>{fee.dueDate}</td>
                    <td>
                      <button
                        onClick={() => alert(`Proceeding to pay fee: ${fee.feeType}`)}
                        disabled={fee.status === 'Paid'}
                      >
                        {fee.status === 'Paid' ? 'Paid' : 'Pay Now'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No fees found</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StudentFees;
