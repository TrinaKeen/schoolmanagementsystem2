"use client";

import { useState } from "react";
import AdminHeader from "../components/page";
import { FaLock, FaUser, FaUserPlus, FaQuestionCircle } from "react-icons/fa";

export default function SchoolDepartment() {
    const [activeTab, setActiveTab] = useState("");

    const renderTab = () => {
        switch (activeTab) {
            case "grade11":
                return(
                    <div></div>
                );
            
            case "grade12":
                return(
                    <div></div>
                );
            case "science-bachelor":
                return(
                    <div></div>
                    );
            case "tech-bachelor":
                return(
                    <div></div>
                    );
        }
    };

    return (
        <div>
            <AdminHeader />
            <div>
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
        </div>
    )
};