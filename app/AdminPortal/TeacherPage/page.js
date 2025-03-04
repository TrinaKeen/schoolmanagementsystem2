'use client';  // This makes the component a Client Component to allow filtering (state management)

import { useEffect, useState } from 'react';
import Header from '../components/header';
import styles from './teacherPage.module.css';

export default function TeacherPage() {
    const [instructors, setInstructors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchInstructors() {
            const res = await fetch('/api/admin/fetchInstructors', { cache: 'no-store' });

            if (!res.ok) {
                console.error('Failed to fetch instructors');
                return;
            }

            const data = await res.json();
            setInstructors(data);
        }

        fetchInstructors();
    }, []);

    // Filter instructors based on search query (by ID, name, or specialization)
    const filteredInstructors = instructors.filter((instructor) => {
        const query = searchQuery.toLowerCase();
        return (
            instructor.id.toString().includes(query) ||
            instructor.first_name.toLowerCase().includes(query) ||
            instructor.last_name.toLowerCase().includes(query) ||
            (instructor.specialization?.toLowerCase() || '').includes(query)
        );
    });

    return (
        <div className={styles.pageContainer}>
            <Header /> {/* Keeps the top header bar exactly like your Admin Dashboard */}
            <div className={styles.contentContainer}>
                <h1 className={styles.title}>Instructors List</h1>

                {/* Search Input */}
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search by ID, Name, or Specialization"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>

                {/* Table */}
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>ID</th>
                                <th className={styles.th}>First Name</th>
                                <th className={styles.th}>Last Name</th>
                                <th className={styles.th}>Email</th>
                                <th className={styles.th}>Phone</th>
                                <th className={styles.th}>Hire Date</th>
                                <th className={styles.th}>Specialization</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInstructors.length > 0 ? (
                                filteredInstructors.map((instructor) => (
                                    <tr key={instructor.id}>
                                        <td className={styles.td}>{instructor.id}</td>
                                        <td className={styles.td}>{instructor.first_name}</td>
                                        <td className={styles.td}>{instructor.last_name}</td>
                                        <td className={styles.td}>{instructor.email}</td>
                                        <td className={styles.td}>{instructor.phone || 'N/A'}</td>
                                        <td className={styles.td}>{instructor.hire_date}</td>
                                        <td className={styles.td}>{instructor.specialization || 'N/A'}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className={styles.noData}>No matching instructors found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
