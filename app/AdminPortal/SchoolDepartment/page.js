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
            
            case "grade12":
                return(
                    <div className={styles.tabContent}>
                        <h1>Department Details</h1>
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
            case "science-bachelor":
                return(
                    <div className={styles.tabContent}>
                        <h1>Department Details</h1>
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
            case "tech-bachelor":
                return(
                    <div className={styles.tabContent}>
                        <h1>Department Details</h1>
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