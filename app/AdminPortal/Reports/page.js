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
                        <h1>Student Fees Details</h1>
                        <div className={styles.Table1}>
                            <ul>
                                <label>Detail Code</label>
                                <li>GAGAA01</li>
                                <li>YAWA22</li>
                                <li>HELP00</li>
                                <li>HALO13</li>
                                <li>GAGO10</li>
                                <li>FFAII01</li>
                                <li>HSHS17</li>
                                <li>WEEH08</li>
                            </ul>
                        </div>

                        <div className={styles.Table2}>
                            <ul>
                                <label>Description</label>
                                <li>Nemo enim ipsam voluptatem</li>
                                <li>Nemo enim ipsam voluptatem</li>
                                <li>Nemo enim ipsam voluptatem</li>
                                <li>Nemo enim ipsam voluptatem</li>
                                <li>Nemo enim ipsam voluptatem</li>
                                <li>Nemo enim ipsam voluptatem</li>
                                <li>Nemo enim ipsam voluptatem</li>
                                <li>Nemo enim ipsam voluptatem</li>
                            </ul>
                        </div>

                        <div className={styles.Table3}>
                            <ul>
                                <label>Charges</label>
                                <li>$1,500.00</li>
                                <li>$540.00</li>
                                <li>$3,399.00</li>
                                <li>$290.00</li>
                                <li>$129.00</li>
                                <li>$7,100.00</li>
                                <li>$1,580.00</li>
                                <li>$1,400.00</li>
                            </ul>
                        </div>
                    </div>
                );
            
            case "courses":
                return(
                    <div className={styles.tabContent}>
                        <h1>Semester Course Details</h1>
                        <div className={styles.Table1}>
                            <ul>
                                <label>Detail Code</label>
                                <li>GAGAA01</li>
                                <li>YAWA22</li>
                                <li>HELP00</li>
                                <li>HALO13</li>
                                <li>GAGO10</li>
                                <li>FFAII01</li>
                                <li>HSHS17</li>
                                <li>WEEH08</li>
                            </ul>
                        </div>

                        <div className={styles.Table2}>
                            <ul>
                                <label>Description</label>
                                <li>Nemo enim ipsam voluptatem</li>
                                <li>Nemo enim ipsam voluptatem</li>
                                <li>Nemo enim ipsam voluptatem</li>
                                <li>Nemo enim ipsam voluptatem</li>
                                <li>Nemo enim ipsam voluptatem</li>
                                <li>Nemo enim ipsam voluptatem</li>
                                <li>Nemo enim ipsam voluptatem</li>
                                <li>Nemo enim ipsam voluptatem</li>
                            </ul>
                        </div>

                        <div className={styles.Table3}>
                            <ul>
                                <label>Instructor</label>
                                <li>John McDonald</li>
                                <li>Laura Vincent</li>
                                <li>John McDonald</li>
                                <li>Laura Vincent</li>
                                <li>John McDonald</li>
                                <li>Laura Vincent</li>
                                <li>John McDonald</li>
                                <li>Laura Vincent</li>
                            </ul>
                        </div>
                    </div>
                );
            case "semesterfees":
                return(
                    <div className={styles.tabContent}>
                        <h1>Semester Fees Details</h1>
                        <div className={styles.Table1}>
                            <ul>
                                <label>Detail Code</label>
                                <li>GAGAA01</li>
                                <li>YAWA22</li>
                                <li>HELP00</li>
                                <li>HALO13</li>
                                <li>GAGO10</li>
                                <li>FFAII01</li>
                                <li>HSHS17</li>
                                <li>WEEH08</li>
                            </ul>
                        </div>

                        <div className={styles.Table2}>
                            <ul>
                                <label>Description</label>
                                <li>Nemo enim ipsam voluptatem</li>
                                <li>Nemo enim ipsam voluptatem</li>
                                <li>Nemo enim ipsam voluptatem</li>
                                <li>Nemo enim ipsam voluptatem</li>
                                <li>Nemo enim ipsam voluptatem</li>
                                <li>Nemo enim ipsam voluptatem</li>
                                <li>Nemo enim ipsam voluptatem</li>
                                <li>Nemo enim ipsam voluptatem</li>
                            </ul>
                        </div>

                        <div className={styles.Table3}>
                            <ul>
                                <label>Charges</label>
                                <li>$1,500.00</li>
                                <li>$540.00</li>
                                <li>$3,399.00</li>
                                <li>$290.00</li>
                                <li>$129.00</li>
                                <li>$7,100.00</li>
                                <li>$1,580.00</li>
                                <li>$1,400.00</li>
                            </ul>
                        </div>
                    </div>
                    );
            case "enrolled":
                return(
                    <div className={styles.tabContent}>
                        <h1>Student Enrollment Details</h1>
                        <div className={styles.Table1}>
                            <ul>
                                <label>Student ID</label>
                                <li>0000</li>
                                <li>1111</li>
                                <li>2222</li>
                                <li>3333</li>
                                <li>4444</li>
                                <li>5555</li>
                                <li>6666</li>
                                <li>7777</li>
                            </ul>
                        </div>

                        <div className={styles.Table2}>
                            <ul>
                                <label>Student Name</label>
                                <li>Jake</li>
                                <li>Vincent</li>
                                <li>Martha</li>
                                <li>Eric</li>
                                <li>Derrick</li>
                                <li>Lana</li>
                                <li>Finn</li>
                                <li>Melissa</li>
                            </ul>
                        </div>

                        <div className={styles.Table3}>
                            <ul>
                                <label>Status</label>
                                <li>Active</li>
                                <li>Active</li>
                                <li>Active</li>
                                <li>Active</li>
                                <li>Active</li>
                                <li>Active</li>
                                <li>Active</li>
                                <li>Active</li>
                            </ul>
                        </div>
                    </div>
                    );
        }
    };


    return (
        <div>
            <AdminHeader />
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <h2>Reports</h2>
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