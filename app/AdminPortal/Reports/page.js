"use client";

import { useState } from "react";
import AdminHeader from "../components/page";
import { FaLock, FaUser, FaUserPlus, FaQuestionCircle } from "react-icons/fa";
import styles from "./Reports.module.css";

export default function SchoolDepartment() {
    const [activeTab, setActiveTab] = useState("studentfees");

    /*renderTab reference in admin-settings*/
    const renderTab = () => {
        switch (activeTab) {
            case "studentfees":
                return(
                    <div className={styles.tabContent}>
                        <h1>Student Fees Details</h1>
                        <button className={styles.editButton}>Edit Fees</button>
                        <table className={styles.Table1}>
                            <thead>
                                <tr>
                                    <th>Detail Code</th>
                                    <th>Description</th>
                                    <th>Charges</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                    <td>GAGAA01</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$1,500.00</td>
                                </tr>
                                <tr>
                                    <td>YAWA22</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$540.00</td>
                                </tr>
                                <tr>
                                    <td>HELP00</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$3,399.00</td>
                                </tr>
                                <tr>
                                    <td>HALO13</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$290.00</td>
                                </tr>
                                <tr>
                                    <td>GAGO10</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$129.00</td>
                                </tr>
                                <tr>
                                    <td>FFAII01</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$7,100.00</td>
                                </tr>
                                <tr>
                                    <td>HSHS17</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$1,580.00</td>
                                </tr>
                                <tr>
                                    <td>WEEH08</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$1,400.00</td>
                                </tr>
                            </tbody>
                            
                        </table>
                    </div>
                );
            
            case "courses":
                return(
                    <div className={styles.tabContent}>
                        <h1>Semester Course Details</h1>
                        <button className={styles.editButton}>Edit Courses</button>
                        <table className={styles.Table1}>
                            <thead>
                                <tr>
                                    <th>Detail Code</th>
                                    <th>Description</th>
                                    <th>Instructor</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                    <td>GAGAA01</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>John McDonald</td>
                                </tr>
                                <tr>
                                    <td>YAWA22</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>Laura Vincent</td>
                                </tr>
                                <tr>
                                    <td>HELP00</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>Laura Vincent</td>
                                </tr>
                                <tr>
                                    <td>HALO13</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>Laura Vincent</td>
                                </tr>
                                <tr>
                                    <td>GAGO10</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>John McDonald</td>
                                </tr>
                                <tr>
                                    <td>FFAII01</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>Laura Vincent</td>
                                </tr>
                                <tr>
                                    <td>HSHS17</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>John McDonald</td>
                                </tr>
                                <tr>
                                    <td>WEEH08</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>Laura Vincent</td>
                                </tr>
                            </tbody>
                            
                        </table>

                    </div>
                );
            case "semesterfees":
                return(
                    <div className={styles.tabContent}>
                        <h1>Semester Fees Details</h1>
                        <button className={styles.editButton}>Edit Fees</button>
                        <table className={styles.Table1}>
                            <thead>
                                <tr>
                                    <th>Detail Code</th>
                                    <th>Description</th>
                                    <th>Charges</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                    <td>GAGAA01</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$1,500.00</td>
                                </tr>
                                <tr>
                                    <td>YAWA22</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$540.00</td>
                                </tr>
                                <tr>
                                    <td>HELP00</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$3,399.00</td>
                                </tr>
                                <tr>
                                    <td>HALO13</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$290.00</td>
                                </tr>
                                <tr>
                                    <td>GAGO10</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$129.00</td>
                                </tr>
                                <tr>
                                    <td>FFAII01</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$7,100.00</td>
                                </tr>
                                <tr>
                                    <td>HSHS17</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$1,580.00</td>
                                </tr>
                                <tr>
                                    <td>WEEH08</td>
                                    <td>Nemo enim ipsam voluptatem</td>
                                    <td>$1,400.00</td>
                                </tr>
                            </tbody>
                            
                        </table>
                    </div>
                    );
            case "enrolled":
                return(
                    <div className={styles.tabContent}>
                        <h1>Student Enrollment Details</h1>
                        <button className={styles.editButton}>Edit Fees</button>
                        <table className={styles.Table1}>
                            <thead>
                                <tr>
                                    <th>Student ID</th>
                                    <th>Student Name</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                    <td>0000</td>
                                    <td>Melissa</td>
                                    <td>Active</td>
                                </tr>
                                <tr>
                                    <td>1111</td>
                                    <td>Finn</td>
                                    <td>Active</td>
                                </tr>
                                <tr>
                                    <td>2222</td>
                                    <td>Lana</td>
                                    <td>Active</td>
                                </tr>
                                <tr>
                                    <td>3333</td>
                                    <td>Derrick</td>
                                    <td>Active</td>
                                </tr>
                                <tr>
                                    <td>4444</td>
                                    <td>Eric</td>
                                    <td>Active</td>
                                </tr>
                                <tr>
                                    <td>5555</td>
                                    <td>Martha</td>
                                    <td>Active</td>
                                </tr>
                                <tr>
                                    <td>6666</td>
                                    <td>Vincent</td>
                                    <td>Active</td>
                                </tr>
                                <tr>
                                    <td>7777</td>
                                    <td>Jake</td>
                                    <td>Active</td>
                                </tr>
                            </tbody>
                            
                        </table>
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