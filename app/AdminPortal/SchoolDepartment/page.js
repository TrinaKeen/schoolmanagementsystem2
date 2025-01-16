"use client";

import { useState } from "react";
import AdminHeader from "../components/page";
import { FaLock, FaUser, FaUserPlus, FaQuestionCircle } from "react-icons/fa";
import styles from "./StudentDepartment.module.css";

export default function SchoolDepartment() {
    const [activeTab, setActiveTab] = useState("grade11");

    const renderTab = () => {
        switch (activeTab) {
            case "grade11":
                return(
                    <div className={styles.tabContent}>
                        <h1>Department Details</h1>
                    </div>
                );
            
            case "grade12":
                return(
                    <div className={styles.tabContent}>
                        <h1>Department Details</h1>
                    </div>
                );
            case "science-bachelor":
                return(
                    <div className={styles.tabContent}>
                        <h1>Department Details</h1>
                    </div>
                    );
            case "tech-bachelor":
                return(
                    <div className={styles.tabContent}>
                        <h1>Department Details</h1>
                    </div>
                    );
        }
    };

    return (
        <div>
            <AdminHeader />
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <h2>School Department</h2>
                    <ul>
                        <li className={activeTab === "grade11" ? styles.active : ""}
                        onClick={() => setActiveTab("grade11")}> Senior Highschool Grade 11 </li>

                        <li className={activeTab === "grade12" ? styles.active : ""}
                        onClick={() => setActiveTab("grade12")}> Senior Highschool Grade 12 </li>

                        <li className={activeTab === "science-bachelor" ? styles.active : ""}
                        onClick={() => setActiveTab("science-bachelor")}> Bachelor of Science in Midwifery </li>

                        <li className={activeTab === "science-bachelor" ? styles.active : ""}
                        onClick={() => setActiveTab("science-bachelor")}> Bachelor of Technical-Vocational Teacher Education </li>
                    </ul>
                </div>
                <div className={styles.content}>{renderTab()}</div>
            </div>
            
        </div>
    );
};