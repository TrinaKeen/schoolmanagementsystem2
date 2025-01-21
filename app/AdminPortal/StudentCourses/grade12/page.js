"use client";

// Import necessary libraries and components
import React, { useState } from 'react';
import styles from './Grade12.module.css';
import Sidebar from '../components/Sidebar';
import Banner from '../components/Banner';

const StudentCourses = () => {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    return (
        <div className={styles.appContainer}>
            <Sidebar />
            <div className={styles.mainContent}>
                <Banner title="Evelyn E. Fabie College, Inc." />

                <main>
                    <div className={styles.mainHeader}>
                        <h2>Senior High School Grade 12 Courses</h2>
                        <button onClick={handleEditClick}>{isEditing ? 'Cancel' : 'Edit Courses'}</button>
                    </div>

                    {isEditing ? (
                        <div>
                            <div className={styles.editActions}>
                                <select>
                                    <option>Track/Strand</option>
                                    <option>STEM</option>
                                    <option>HUMSS</option>
                                    <option>ABM</option>
                                </select>
                                <button>Add Course</button>
                                <button>Delete Course</button>
                                <button>Modify Course</button>
                                <button>Submit</button>
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
