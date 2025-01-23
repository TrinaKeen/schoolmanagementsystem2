"use client";

// Import necessary libraries and components
import React, { useState } from 'react';
import styles from './BachelorEducation.module.css';
import Sidebar from '../components/Sidebar';
import Banner from '../components/Banner';

const StudentCourses = () => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className={styles.pageContainer}>
            <Sidebar />
            <div className={styles.mainContent}>
                <Banner title="Evelyn E. Fabie College, Inc." />

                <main className={styles.courseContent}>
                    <div className={styles.mainHeader}>
                        <h2>Bachelor of Technical-Vocational Teacher Education</h2>
                        <button onClick={handleEditClick} className={styles.editButton}>
                            {isEditing ? 'Cancel' : 'Edit Courses'}
                        </button>
                    </div>

                    {isEditing ? (
                        <div>
                            <div className={styles.editActions}>
                                <select className={styles.dropdown}>
                                    <option>Year Level</option>
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
    );
};

export default StudentCourses;
