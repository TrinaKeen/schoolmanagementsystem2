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
            
            case "grade12":
                return(
                    <div className={styles.tabContent}>
                        <h1>Department Details</h1>
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
            case "science-bachelor":
                return(
                    <div className={styles.tabContent}>
                        <h1>Department Details</h1>
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
            case "tech-bachelor":
                return(
                    <div className={styles.tabContent}>
                        <h1>Department Details</h1>
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

                        <li className={activeTab === "tech-bachelor" ? styles.active : ""}
                        onClick={() => setActiveTab("tech-bachelor")}> Bachelor of Technical-Vocational Teacher Education </li>
                    </ul>
                </div>
                <div className={styles.content}>{renderTab()}</div>
            </div>
            
        </div>
    );
};