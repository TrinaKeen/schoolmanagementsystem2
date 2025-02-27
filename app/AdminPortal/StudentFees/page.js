"use client";

import { useState } from "react";
import AdminHeader from "../components/header";
import styles from "./StudentFees.module.css";

export default function SchoolDepartment() {
    const [activeTab, setActiveTab] = useState("grade11");

    const feeData = [
        { id: "GAGA01", description: "Nemo enim ipsam voluptatem", charge: "₱1,500.00" },
        { id: "YAWA22", description: "Nemo enim ipsam voluptatem", charge: "₱540.00" },
        { id: "HELP00", description: "Nemo enim ipsam voluptatem", charge: "₱3,399.00" },
        { id: "HALO13", description: "Nemo enim ipsam voluptatem", charge: "₱290.00" },
        { id: "GAGO10", description: "Nemo enim ipsam voluptatem", charge: "₱129.00" },
        { id: "FFAI01", description: "Nemo enim ipsam voluptatem", charge: "₱7,100.00" },
        { id: "HSHS17", description: "Nemo enim ipsam voluptatem", charge: "₱1,580.00" },
        { id: "WEEH08", description: "Nemo enim ipsam voluptatem", charge: "₱1,400.00" },
    ];

    const renderFeesTable = () => (
        <>
            <div className={styles.dropdownContainer}>
                <select className={styles.dropdown}>
                    <option value="">Track/Strand</option>
                    <option value="academic">Academic</option>
                    <option value="technical">Technical-Vocational</option>
                    <option value="sports">Sports</option>
                    <option value="arts">Arts & Design</option>
                </select>
                <button className={styles.editButton}>Edit Fee</button>
            </div>

            {[1, 2, 3].map((semester) => (
                <div key={semester} className={styles.semester}>
                    <h2>{semester}st Semester</h2>
                    <table className={styles.feesTable}>
                        <thead>
                            <tr>
                                <th>Detail Code</th>
                                <th>Description</th>
                                <th>Charge</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feeData.map((fee) => (
                                <tr key={fee.id}>
                                    <td>{fee.id}</td>
                                    <td>{fee.description}</td>
                                    <td>{fee.charge}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className={styles.totalCharges}><strong>Total Charges:</strong> ₱17,338.00</p>
                </div>
            ))}
        </>
    );

    const renderTab = () => {
        switch (activeTab) {
            case "grade11":
                return (
                    <div className={styles.tabContent}>
                        <h1>SHS Grade 11 Tuition Fees</h1>
                        {renderFeesTable()}
                    </div>
                );
            case "grade12":
                return (
                    <div className={styles.tabContent}>
                        <h1>SHS Grade 12 Tuition Fees</h1>
                        {renderFeesTable()}
                    </div>
                );
            case "science-bachelor":
                return (
                    <div className={styles.tabContent}>
                        <h1>Bachelor of Science in Midwifery Fees</h1>
                        {renderFeesTable()}
                    </div>
                );
            case "tech-bachelor":
                return (
                    <div className={styles.tabContent}>
                        <h1>Bachelor of Technical-Vocational Teacher Education Fees</h1>
                        {renderFeesTable()}
                    </div>
                );
        }
    };

    return (
        <div>
            <AdminHeader />
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <h2>Student Fees</h2>
                    <ul>
                        <li className={activeTab === "grade11" ? styles.active : ""}
                            onClick={() => setActiveTab("grade11")}>Senior High School Grade 11</li>

                        <li className={activeTab === "grade12" ? styles.active : ""}
                            onClick={() => setActiveTab("grade12")}>Senior High School Grade 12</li>

                        <li className={activeTab === "science-bachelor" ? styles.active : ""}
                            onClick={() => setActiveTab("science-bachelor")}>Bachelor of Science in Midwifery</li>

                        <li className={activeTab === "tech-bachelor" ? styles.active : ""}
                            onClick={() => setActiveTab("tech-bachelor")}>Bachelor of Technical-Vocational Teacher Education</li>
                    </ul>
                </div>
                <div className={styles.content}>{renderTab()}</div>
            </div>
        </div>
    );
}
