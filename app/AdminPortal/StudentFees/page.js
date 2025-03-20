// Generated using ChatGPT
// Can you generate a Next.js Student Fees page that fetches student fee records from a backend API?
// The page should display student fees using their respective ID showing name, gender, class, section, expense, amount, payment status, phone and email.
// Allow searching by ID, name, or phone.
// Include sorting functionality when clicking column headers
// Use an endpoint to fetch data.
// Ensure the API is protected with JWT authentication and fetches student fee records from a PostgreSQL database containing tuition_fees and miscellaneous_fees tables.

// OpenAI. (2025). ChatGPT GPT-4o. Accessed and retrieved on March 14, 2025, from https://chat.openai.com
 
"use client"; // Required for using state, effects, and interactivity in Next.js

import { useEffect, useState } from "react"; // React hooks for managing state and effects
import Sidebar from "../components/Sidebar"; // Import Sidebar
import Header from "../components/Header";
import styles from "./StudentFees.module.css";

export default function StudentFeesPage() {
    // State variables
    const [fees, setFees] = useState([]); // Stores the list of student fees
    const [searchQuery, setSearchQuery] = useState(""); // Stores the search input value
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" }); // Stores sorting configuration

    // Fetch student fees when the component loads
    useEffect(() => {
        async function fetchFees() {
            const res = await fetch("/api/admin/fetchStudentFees", { cache: "no-store" });

            // Handle errors in fetching
            if (!res.ok) {
                if (res.status === 401) {
                    window.location.href = "/LogIn/AdminLogin";
                    return;
                } else {
                    console.error("Failed to fetch student fees", res.status, res.statusText);
                    return;
                }
            }

            const data = await res.json(); // Parse JSON response
            setFees(data); // Store data in state
        }

        fetchFees(); // Empty dependency array ensures it runs only on the first render
    }, []);

    // Filter Fees Based on Search Query
    const filteredFees = fees.filter((fee) => {
        const query = searchQuery.toLowerCase();
        return (
            fee.id.toString().includes(query) || // Search by ID
            fee.student_number.toLowerCase().includes(query) || // Search by student number
            fee.payment_status.toLowerCase().includes(query) || // Search by payment status
            (fee.program_id && fee.program_id.toString().includes(query)) // Search by program ID (if exists)
        );
    });

    // Sorting Functionality Ascending/Descending
    const sortedFees = [...filteredFees].sort((a, b) => {
        if (!sortConfig.key) return 0;

        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
    });

    // Function to Handle Sorting
    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc"; // Toggle sorting order if already sorted
        }
        setSortConfig({ key, direction }); 
    };

    return (
        <div className={styles.dashboardContainer}>
            {/* Fixed Header */}
            <Header />

            <div className={styles.contentWrapper}>
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className={styles.mainContent}>
                    <h1 className={styles.title}>All Fees Collection</h1>

                    {/* Search Bar */}
                    <div className={styles.searchContainer}>
                        <input
                            type="text"
                            placeholder="Search by ID, Name, or Phone"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={styles.searchInput}
                        />
                        <button className={styles.searchButton}>Search</button>
                    </div>

                    {/* Fees Table */}
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    {[
                                        "id",
                                        "photo",
                                        "name",
                                        "gender",
                                        "class",
                                        "section",
                                        "expense",
                                        "amount",
                                        "status",
                                        "phone",
                                        "email",
                                    ].map((key) => (
                                        <th
                                            key={key}
                                            onClick={() => handleSort(key)}
                                            className={styles.sortableHeader}
                                        >
                                            {key.toUpperCase()}
                                            <span className={styles.sortIcon}>
                                                {sortConfig.key === key
                                                    ? sortConfig.direction === "asc"
                                                        ? " ▲"
                                                        : " ▼"
                                                    : " ⬍"}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {sortedFees.length > 0 ? (
                                    sortedFees.map((fee) => (
                                        <tr key={fee.id}>
                                            <td>{fee.id}</td>
                                            <td>
                                                <img
                                                    src={fee.photo || "/default-avatar.png"}
                                                    alt="Profile"
                                                    className={styles.profileImage}
                                                />
                                            </td>
                                            <td>{fee.name}</td>
                                            <td>{fee.gender}</td>
                                            <td>{fee.class}</td>
                                            <td>{fee.section}</td>
                                            <td>{fee.expense}</td>
                                            <td>{fee.amount}</td>
                                            <td>
                                                <span
                                                    className={
                                                        fee.status === "Paid"
                                                            ? styles.paid
                                                            : styles.unpaid
                                                    }
                                                >
                                                    {fee.status}
                                                </span>
                                            </td>
                                            <td>{fee.phone}</td>
                                            <td>{fee.email}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="11" className={styles.noData}>
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
