// Chatgpt uploaded a picture of the figma mockup of the page. Asked it to try and recreate it
// Once created asked it how to create a state change where you can modify the blocks (add, modify, delete, undo) and submit

"use client"; // Enables client-side rendering in Next.js

// Import necessary libraries and components
import React, { useState } from 'react';
// React library and useState hook for state management
// React is a JavaScript library for building interactive user interfaces.
// `useState` is a React Hook that allows functional components to manage state.
// State refers to data that can change over time and cause the UI to re-render when updated.
// We use `useState` here to manage UI interactions, such as toggling edit mode, managing selected courses, and handling modal visibility.
import styles from './Grade11.module.css'; // Imports CSS module for styling
import Sidebar from '../components/Sidebar'; // Sidebar component for navigation
import AdminHeader from '../../components/page'; // Admin header component for layout structure

// Component to manage student courses with state-based editing
const StudentCourses = () => {
    // State to manage edit mode
    const [isEditing, setIsEditing] = useState(false);
    // `isEditing` determines if the page is in edit mode.
    // `setIsEditing` is the function used to update the state.
    // `useState(false)` initializes the state with `false`, meaning editing is disabled by default.
    
    // State to store the list of courses
    const [courses, setCourses] = useState([
        { id: 1, title: "Mathematics", description: "Basic Algebra and Geometry", checked: false },
        { id: 2, title: "Science", description: "Introduction to Physics and Chemistry", checked: false },
        { id: 3, title: "English", description: "Literature and Composition", checked: false },
        { id: 4, title: "History", description: "World History Overview", checked: false },
        { id: 5, title: "Computer Science", description: "Introduction to Programming", checked: false }
    ]);
    // `courses` holds the list of available courses.
    // `setCourses` is used to update the courses list dynamically.
    
    // State to track deleted courses (for undo functionality)
    // `deletedCourses` stores the courses that have been marked for deletion.
    // `setDeletedCourses` updates the state to restore courses when needed (undo action).
    // `useState([])` initializes an empty array because no courses are deleted initially.
    const [deletedCourses, setDeletedCourses] = useState([]);
    
    // State for handling new course inputs
    // `newCourseDescription` stores the input value for the course description before adding it to the list.
    // `setNewCourseDescription` updates the state whenever the input changes.
    // `useState('')` initializes with an empty string, meaning no description is pre-filled.
    const [newCourseTitle, setNewCourseTitle] = useState(''); // Holds new course title
    const [newCourseDescription, setNewCourseDescription] = useState(''); // Holds new course description
    
    // State for modifying existing courses
    const [editCourseId, setEditCourseId] = useState(null); // Stores the ID of the course being edited
    const [showAddCourseModal, setShowAddCourseModal] = useState(false); // Controls visibility of add course modal
    const [showModifyCourseModal, setShowModifyCourseModal] = useState(false); // Controls visibility of modify course modal
    // Modals are pop-up windows used to display additional information or receive user input.
    // Modals allow users to add, modify, or confirm deletions of courses.
    // `useState` is used to track if a modal is open (`true`) or closed (`false`).

    // Function to toggle edit mode
    // `editCourseId` stores the ID of the course that is being modified.
    // `setEditCourseId` updates the state when a course is selected for modification.
    // `useState(null)` initializes with `null`, meaning no course is selected initially.
    const handleEditClick = () => {
        setIsEditing(!isEditing); // Toggles `isEditing` state between true and false
    };

    // Function to add a new course
    const handleAddCourse = () => {
        if (newCourseTitle.trim() && newCourseDescription.trim()) { // Ensures input fields are not empty
            
            // Generate a new unique ID for the course
            const newId = courses.length > 0 ? Math.max(...courses.map(course => course.id)) + 1 : 1;
            // The .map() function is a JavaScript array method that creates a new array by applying a function to each element of the original array.
            // map(course => course.id) extracts only the id values from the courses array.
            // ... (spread operator) is used to pass all the extracted IDs as separate arguments to Math.max().
            // Without ..., Math.max() would receive one array, not multiple numbers, and wouldn't work correctly.
            // Uses Math.max to get the highest ID currently in `courses` and increments it by 1
            // If `courses` is empty, the first course will have an ID of 1
            
            // Add new course to the courses list
            setCourses(prevCourses => [...prevCourses, { 
                id: newId, 
                title: newCourseTitle, 
                description: newCourseDescription, 
                checked: false // Default state for the new course's checkbox
            }]);
            
            // Clear input fields after adding a course
            setNewCourseTitle('');
            setNewCourseDescription('');
            
            // Close the Add Course modal
            setShowAddCourseModal(false); 
        }
    };


    // Function to modify a selected course
    const handleModifyCourse = () => {
        const checkedCourses = courses.filter(course => course.checked);
        // Filters out only the checked courses, meaning courses selected by the user

        if (checkedCourses.length === 1) { // Ensures only one course is selected for modification
            const course = checkedCourses[0]; // Retrieves the first (and only) checked course
            setNewCourseTitle(course.title); // Pre-fills the title input field with the selected course's title
            setNewCourseDescription(course.description); // Pre-fills the description input field with the selected course's description
            setEditCourseId(course.id); // Stores the course ID being modified
            setShowModifyCourseModal(true); // Opens the modify course modal
        }
    };

    // Function to submit course modifications
    const handleSubmitModification = () => {
        if (editCourseId) { // Ensures a course is selected before proceeding
            setCourses(prevCourses => prevCourses.map(course => 
                course.id === editCourseId 
                ? { ...course, title: newCourseTitle, description: newCourseDescription } // Updates course title and description
                : course // Keeps other courses unchanged
            ));
            
            setNewCourseTitle(''); // Clears the title input field after updating
            setNewCourseDescription(''); // Clears the description input field after updating
            setEditCourseId(null); // Resets the editCourseId after modification
            setShowModifyCourseModal(false); // Closes the modify course modal
        }
    };

    // Function to delete selected courses
    const handleDeleteCourse = () => {
        const checkedCourses = courses.filter(course => course.checked);
        // Filters out the checked courses to be deleted

        if (checkedCourses.length > 0) { // Ensures that at least one course is selected for deletion
            setDeletedCourses(checkedCourses); // Stores deleted courses in case undo is needed
            setCourses(prevCourses => prevCourses.filter(course => !course.checked)); // Removes checked courses from the list
        }
    };

    // Function to undo last deletion
    const handleUndoDelete = () => {
        setCourses(prevCourses => [...prevCourses, ...deletedCourses]); // Restores deleted courses to the courses list
        setDeletedCourses([]); // Clears deleted courses list to prevent multiple undo actions
    };

    return (
        /* Main container for the page layout, styled with CSS module */
        <div className={styles.pageContainer}> 
            
            {/* Displays the admin header at the top of the page */}
            <AdminHeader /> 
            
            {/* Wrapper for the main content, including sidebar and course management area */}
            <div className={styles.contentArea}> 
                
                {/* Sidebar navigation component for quick access to other sections */}
                <Sidebar /> 
                
                {/* Container for the main content of the page */}
                <div className={styles.mainContent}> 
                    
                    {/* Main section where courses are displayed and managed */}
                    <main className={styles.courseContent}> 
                        
                        {/* Header section for course management */}
                        <div className={styles.mainHeader}> 
                            <h2>Senior High School Grade 11 Courses</h2> 
                            
                            {/* Button to toggle edit mode */}
                            <button onClick={handleEditClick} className={styles.editButton}> 
                                {isEditing ? 'Cancel' : 'Edit Courses'} {/* Displays 'Cancel' when editing, otherwise 'Edit Courses' */}
                            </button>
                        </div>
                        
                        {/* Conditional rendering: shows editing tools if in edit mode */}
                        {isEditing ? ( 
                            <div>
                                
                                {/* Section containing course management buttons */}
                                <div className={styles.editActions}> 
                                    <button onClick={() => setShowAddCourseModal(true)} className={styles.actionButton}>Add Course</button> {/* Opens modal to add a course */}
                                    <button onClick={handleModifyCourse} className={styles.actionButton}>Modify Course</button> {/* Allows modification of selected course */}
                                    <button onClick={handleDeleteCourse} className={styles.actionButton}>Delete Course</button> {/* Deletes selected courses */}
                                    
                                    {/* Shows 'Undo Delete' button only if courses have been deleted */}
                                    {deletedCourses.length > 0 && ( 
                                        <button onClick={handleUndoDelete} className={styles.actionButton}>Undo Delete</button>
                                    )}
                                </div>
                                
                                {/* Displays list of courses with checkboxes for selection */}
                                <div className={styles.courseList}> 
                                    {courses.map((course) => (
                                        <div key={course.id} className={styles.courseItem}> 
                                            {/* Checkbox to select/deselect courses */}
                                            <input type="checkbox" checked={course.checked} onChange={() => setCourses(prevCourses => prevCourses.map(c => c.id === course.id ? { ...c, checked: !c.checked } : c))} /> 
                                            {/* If the course ID matches, toggle the checked state */}
                                            {/* Otherwise, return the course unchanged */}
                                            <h3>{course.title}</h3> {/* Course title */}
                                            <p>{course.description}</p> {/* Course description */}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : ( 
                            /* Displays courses normally when not in edit mode */
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
        </div>
    );

};

export default StudentCourses;
