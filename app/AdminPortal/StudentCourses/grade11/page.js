"use client";

// Import necessary libraries and components
import React, { useState } from 'react';
import styles from './Grade11.module.css';
import Sidebar from '../components/Sidebar';
import AdminHeader from '../../components/page';

const StudentCourses = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [courses, setCourses] = useState([
        { id: 1, title: "Mathematics", description: "Basic Algebra and Geometry", checked: false },
        { id: 2, title: "Science", description: "Introduction to Physics and Chemistry", checked: false },
        { id: 3, title: "English", description: "Literature and Composition", checked: false },
        { id: 4, title: "History", description: "World History Overview", checked: false },
        { id: 5, title: "Computer Science", description: "Introduction to Programming", checked: false }
    ]);
    const [deletedCourses, setDeletedCourses] = useState([]);
    const [newCourseTitle, setNewCourseTitle] = useState('');
    const [newCourseDescription, setNewCourseDescription] = useState('');
    const [editCourseId, setEditCourseId] = useState(null);
    const [showAddCourseModal, setShowAddCourseModal] = useState(false);
    const [showModifyCourseModal, setShowModifyCourseModal] = useState(false);
    
    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleAddCourse = () => {
        if (newCourseTitle.trim() && newCourseDescription.trim()) {
            const newId = courses.length > 0 ? Math.max(...courses.map(course => course.id)) + 1 : 1;
            setCourses(prevCourses => [...prevCourses, { id: newId, title: newCourseTitle, description: newCourseDescription, checked: false }]);
            setNewCourseTitle('');
            setNewCourseDescription('');
            setShowAddCourseModal(false);
        }
    };

    const handleModifyCourse = () => {
        const checkedCourses = courses.filter(course => course.checked);
        if (checkedCourses.length === 1) {
            const course = checkedCourses[0];
            setNewCourseTitle(course.title);
            setNewCourseDescription(course.description);
            setEditCourseId(course.id);
            setShowModifyCourseModal(true);
        }
    };

    const handleSubmitModification = () => {
        if (editCourseId) {
            setCourses(prevCourses => prevCourses.map(course => course.id === editCourseId ? { ...course, title: newCourseTitle, description: newCourseDescription } : course));
            setNewCourseTitle('');
            setNewCourseDescription('');
            setEditCourseId(null);
            setShowModifyCourseModal(false);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <AdminHeader />
            <div className={styles.contentArea}>
                <Sidebar />
                <div className={styles.mainContent}>
                    <main className={styles.courseContent}>
                        <div className={styles.mainHeader}>
                            <h2>Senior High School Grade 11 Courses</h2>
                            <button onClick={handleEditClick} className={styles.editButton}>
                                {isEditing ? 'Cancel' : 'Edit Courses'}
                            </button>
                        </div>
                        {isEditing ? (
                            <div>
                                <div className={styles.editActions}>
                                    <button onClick={() => setShowAddCourseModal(true)} className={styles.actionButton}>Add Course</button>
                                    <button onClick={handleModifyCourse} className={styles.actionButton}>Modify Course</button>
                                </div>
                                <div className={styles.courseList}>
                                    {courses.map((course) => (
                                        <div key={course.id} className={styles.courseItem}>
                                            <input type="checkbox" checked={course.checked} onChange={() => setCourses(prevCourses => prevCourses.map(c => c.id === course.id ? { ...c, checked: !c.checked } : c))} />
                                            <h3>{course.title}</h3>
                                            <p>{course.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className={styles.courseList}>
                                {courses.map((course) => (
                                    <div key={course.id} className={styles.courseItem}>
                                        <h3>{course.title}</h3>
                                        <p>{course.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
            {showAddCourseModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>Add Course</h3>
                        <input type="text" placeholder="Course Title" value={newCourseTitle} onChange={(e) => setNewCourseTitle(e.target.value)} className={styles.inputField} />
                        <input type="text" placeholder="Course Description" value={newCourseDescription} onChange={(e) => setNewCourseDescription(e.target.value)} className={styles.inputField} />
                        <button onClick={handleAddCourse} className={styles.actionButton}>Submit</button>
                        <button onClick={() => setShowAddCourseModal(false)} className={styles.actionButton}>Cancel</button>
                    </div>
                </div>
            )}
            {showModifyCourseModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>Modify Course</h3>
                        <input type="text" placeholder="Course Title" value={newCourseTitle} onChange={(e) => setNewCourseTitle(e.target.value)} className={styles.inputField} />
                        <input type="text" placeholder="Course Description" value={newCourseDescription} onChange={(e) => setNewCourseDescription(e.target.value)} className={styles.inputField} />
                        <button onClick={handleSubmitModification} className={styles.actionButton}>Submit</button>
                        <button onClick={() => setShowModifyCourseModal(false)} className={styles.actionButton}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudentCourses;
