"use client";

import { useState } from "react";
import AdminHeader from "../components/page";
import { FaLock, FaUser, FaUserPlus, FaQuestionCircle } from "react-icons/fa";
import styles from "./Reports.module.css";

export default function SchoolDepartment() {
    const [activeTab, setActiveTab] = useState("studentfees");

    const renderTab = () => {
        switch (activeTab) {
            case "studentfees":
                return(
                    <div className={styles.tabContent}>
                        <h1>Semester Course Details</h1>
                        <p>Test 1</p>
                    </div>
                );
            
            case "courses":
                return(
                    <div className={styles.tabContent}>
                        <h1>Semester Course Details</h1>
                        <p>Test 2</p>
                    </div>
                );
            case "semesterfees":
                return(
                    <div className={styles.tabContent}>
                        <h1>Semester Course Details</h1>
                        <p>Test 3</p>
                    </div>
                    );
            case "enrolled":
                return(
                    <div className={styles.tabContent}>
                        <h1>Semester Course Details</h1>
                        <p>Test 4</p>
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
                        <li className={activeTab === "studentfees" ? styles.active : ""}
                        onClick={() => setActiveTab("studentfees")}> Student Fees </li>

                        <li className={activeTab === "courses" ? styles.active : ""}
                        onClick={() => setActiveTab("courses")}> Semester Courses </li>

                        <li className={activeTab === "semesterfees" ? styles.active : ""}
                        onClick={() => setActiveTab("semesterfees")}> Semester Fees </li>

                        <li className={activeTab === "enrolled" ? styles.active : ""}
                        onClick={() => setActiveTab("enrolled")}> Students Enrolled</li>
                    </ul>
                </div>
                <div className={styles.content}>{renderTab()}</div>
            </div>
            
        </div>
    );
};