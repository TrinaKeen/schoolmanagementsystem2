"use client";

import { useState, useEffect } from "react";

const ApprovedStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchApprovedStudents();
    }, []);

    const fetchApprovedStudents = async () => {
        try {
            const res = await fetch("/api/admin/approved-students");
            if (!res.ok) throw new Error("Failed to fetch approved students");

            const data = await res.json();
            setStudents(data);
        } catch (error) {
            console.error("Error fetching students:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (studentNumber, newStatus) => {
        try {
            const res = await fetch("/api/admin/approved-students", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ student_number: studentNumber, student_status: newStatus }),
            });

            if (res.ok) {
                fetchApprovedStudents();
            } else {
                console.error("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating student status:", error);
        }
    };

    if (loading) return <p>Loading approved students...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div>
            <h2>Approved Students</h2>
            <table>
                <thead>
                    <tr>
                        <th>Student Number</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Course</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.student_number}>
                            <td>{student.student_number}</td>
                            <td>{student.first_name} {student.last_name}</td>
                            <td>{student.email}</td>
                            <td>{student.course}</td>
                            <td>{student.student_status}</td>
                            <td>
                                <select
                                    value={student.student_status}
                                    onChange={(e) => handleStatusChange(student.student_number, e.target.value)}
                                >
                                    <option value="Active">Active</option>
                                    <option value="Graduated">Graduated</option>
                                    <option value="Dropped">Dropped</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApprovedStudents;
