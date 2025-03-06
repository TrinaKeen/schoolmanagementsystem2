'use client';  // Makes it a Client Component to allow filtering (useState and useEffect)

import { useEffect, useState } from 'react';
import Header from '../components/header';
import styles from './StudentFees.module.css';

export default function StudentFeesPage() {
    const [fees, setFees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchFees() {
            const res = await fetch('/api/admin/fetchStudentFees', { cache: 'no-store' });

            if (!res.ok) {
                if (res.status === 401) {
                    // 🚀 Redirect to login page if token is missing or invalid
                    window.location.href = '/LogIn';  // Adjust this if your login page is in a different path
                    return;
                } else {
                    console.error('Failed to fetch student fees', res.status, res.statusText);
                    return;
                }
            }

            const data = await res.json();
            setFees(data);
        }

        fetchFees();
    }, []);

    // Filter fees based on search query
    const filteredFees = fees.filter((fee) => {
        const query = searchQuery.toLowerCase();
        return (
            fee.id.toString().includes(query) ||
            fee.student_number.toLowerCase().includes(query) ||
            fee.payment_status.toLowerCase().includes(query) ||
            (fee.program_id && fee.program_id.toString().includes(query))
        );
    });

    return (
        <div className={styles.pageContainer}>
            <Header />
            <div className={styles.contentContainer}>
                <h1 className={styles.title}>Student Fees</h1>

                {/* Search bar */}
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search by ID, Student Number, Program ID, or Payment Status"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                {/* Fees Table */}
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>ID</th>
                                <th className={styles.th}>Student Number</th>
                                <th className={styles.th}>Program ID</th>
                                <th className={styles.th}>Base Fee</th>
                                <th className={styles.th}>Additional Fees</th>
                                <th className={styles.th}>Total Fee</th>
                                <th className={styles.th}>Currency</th>
                                <th className={styles.th}>Due Date</th>
                                <th className={styles.th}>Payment Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFees.length > 0 ? (
                                filteredFees.map((fee) => (
                                    <tr key={fee.id}>
                                        <td className={styles.td}>{fee.id}</td>
                                        <td className={styles.td}>{fee.student_number}</td>
                                        <td className={styles.td}>{fee.program_id}</td>
                                        <td className={styles.td}>{fee.base_fee}</td>
                                        <td className={styles.td}>{fee.additional_fees}</td>
                                        <td className={styles.td}>{fee.total_fee}</td>
                                        <td className={styles.td}>{fee.currency}</td>
                                        <td className={styles.td}>{fee.due_date}</td>
                                        <td className={styles.td}>{fee.payment_status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className={styles.noData}>No matching student fees found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
