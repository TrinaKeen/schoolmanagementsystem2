'use client';

import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import styles from './StudentFees.module.css';

export default function StudentFeesPage() {
  const [fees, setFees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    async function fetchFees() {
      const res = await fetch('/api/admin/fetchStudentFees', { cache: 'no-store' });

      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = '/LogIn/AdminLogin';
        } else {
          console.error('Failed to fetch student fees', res.statusText);
        }
        return;
      }

      const data = await res.json();
      setFees(data);
    }

    fetchFees();
  }, []);

  const filteredFees = fees.filter((fee) => {
    const query = searchQuery.toLowerCase();
    return (
      fee.student_number?.toLowerCase().includes(query) ||
      fee.program_id?.toString().includes(query) ||
      fee.payment_status?.toLowerCase().includes(query)
    );
  });

  const sortedFees = [...filteredFees].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleViewClick = (studentNumber) => {
    alert(`Show fee breakdown for ${studentNumber}`);
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.contentWrapper}>
        <Sidebar />
        <div className={styles.mainContent}>
          <h1 className={styles.title}>All Fees Collection</h1>

          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by Student Number, Program ID, or Status"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button className={styles.searchButton}>Search</button>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {['Student Number', 'Program ID', 'Total Fee', 'Payment Status', 'Action'].map((col) => (
                    <th
                      key={col}
                      onClick={() =>
                        col !== 'Action' && handleSort(col.toLowerCase().replace(/ /g, '_'))
                      }
                      className={styles.sortableHeader}
                    >
                      {col.toUpperCase()}
                      {col !== 'Action' && (
                        <span className={styles.sortIcon}>
                          {sortConfig.key === col.toLowerCase().replace(/ /g, '_')
                            ? sortConfig.direction === 'asc'
                              ? ' ▲'
                              : ' ▼'
                            : ' ⬍'}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sortedFees.length > 0 ? (
                  sortedFees.map((fee, index) => (
                    <tr key={index}>
                      <td>{fee.student_number}</td>
                      <td>{fee.program_id}</td>
                      <td>{fee.total_fee}</td>
                      <td className={fee.payment_status === 'Paid' ? styles.paid : styles.unpaid}>
                        {fee.payment_status}
                      </td>
                      <td>
                        <button
                          className={styles.viewButton}
                          onClick={() => handleViewClick(fee.student_number)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className={styles.noData}>
                      No matching student fees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
