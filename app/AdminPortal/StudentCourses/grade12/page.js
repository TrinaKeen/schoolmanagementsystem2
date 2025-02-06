"use client";

// Import necessary libraries and components
import React, { useState } from 'react';
import styles from './Grade12.module.css';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../../components/page';

const StudentCourses = () => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className={styles.pageContainer}>
            <AdminHeader />
            <div className={styles.contentArea}>
                <Sidebar />
                <div className={styles.mainContent}>
                    <main className={styles.courseContent}>
                        <div className={styles.mainHeader}>
                            <h2>Senior High School Grade 12 Courses</h2>
                            <button onClick={handleEditClick} className={styles.editButton}>
                                {isEditing ? 'Cancel' : 'Edit Courses'}
                            </button>
                        </div>

                        {isEditing ? (
                            <div>
                                <div className={styles.editActions}>
                                    <select className={styles.dropdown}>
                                        <option>Track/Strand</option>
                                    </select>
                                    <button className={styles.actionButton}>Add Course</button>
                                    <button className={styles.actionButton}>Delete Course</button>
                                    <button className={styles.actionButton}>Modify Course</button>
                                    <button className={styles.actionButton}>Submit</button>
                                </div>
                                <div className={styles.courseList}>
                                    {[...Array(21)].map((_, index) => (
                                        <div key={index} className={styles.courseItem}>
                                            <input type="checkbox" id={`subject-${index + 1}`} />
                                            <h3>Subject {index + 1}</h3>
                                            <ul>
                                                <li>Sed ut perspiciatis unde omnis iste natus error</li>
                                                <li>Nemo enim ipsam voluptatem quia voluptas</li>
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className={styles.courseList}>
                                {[...Array(21)].map((_, index) => (
                                    <div key={index} className={styles.courseItem}>
                                        <h3>Subject {index + 1}</h3>
                                        <ul>
                                            <li>Sed ut perspiciatis unde omnis iste natus error</li>
                                            <li>Nemo enim ipsam voluptatem quia voluptas</li>
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default StudentCourses;
