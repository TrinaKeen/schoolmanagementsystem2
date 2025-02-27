// uploaded mock up from the figma page and asked chatgpt to recreate it
// then asked it how to implement state change for adding a teacher,  editing and deleting
// The sidebar was included in the mock up picture as well
// Asked chatgpt to make a sidebar for grade 11-12 and a college section that also lets you select the year


"use client";

import React, { useState } from "react";
// React library and useState hook for state management
// React is a JavaScript library for building interactive user interfaces.
// `useState` is a React Hook that allows functional components to manage state.
// State refers to data that can change over time and cause the UI to re-render when updated.
// We use `useState` here to manage UI interactions, such as toggling edit mode, managing selected courses, and handling modal visibility.
import styles from "./teacherPage.module.css";
import AdminHeader from "../components/page";

export default function TeacherPage() {
  // useState to manage the list of teachers categorized by grade level and college year
  const [teachers, setTeachers] = useState({
    Grade11: ["Mr. Mike Lit", "Mr. Moe Lester", "Mrs. Liz Anya"],
    Grade12: [
      "Mr. Hugh Jass",
      "Ms. Crystal Shandy Leer",
      "Mrs. Taylor Marie Joy Batumbakal Swift",
    ],
    College: {
      "1st Year": ["Dr. Ben Dover", "Prof. Anita Mann"],
      "2nd Year": ["Dr. Bud Light", "Prof. Minnie Driver"],
      "3rd Year": ["Dr. Sid Bubblegum", "Prof. Ray Pits"],
      "4th Year": ["Dr. Peter File", "Prof. Pat Fenis"],
    },
  });

  // State variables for selected grade, selected college year, and the list of teachers to display
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [teacherList, setTeacherList] = useState([]);

  // State variables for modal visibility and input values
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newTeacherName, setNewTeacherName] = useState("");
  const [editTeacherName, setEditTeacherName] = useState("");
  const [editTeacherIndex, setEditTeacherIndex] = useState(null);
  const [deleteTeacherIndex, setDeleteTeacherIndex] = useState(null);

  // Handles grade selection and updates the teacher list accordingly
  const handleGradeClick = (grade) => {
    setSelectedGrade(grade);
    setSelectedYear(null); // Reset selected year if switching to non-college grades
    if (grade !== "College") {
      setTeacherList(teachers[grade]); // Update teacher list for selected grade
    } else {
      setTeacherList([]); // Reset teacher list if College is selected
    }
  };

  // Handles college year selection and updates the teacher list
  const handleYearClick = (year) => {
    setSelectedYear(year);
    setTeacherList(teachers.College[year]);
  };

  // Opens the Add Teacher Modal
  const handleAddTeacher = () => {
    setNewTeacherName("");
    setShowAddModal(true);
  };

  // Adds a new teacher to the selected grade/year
  const submitAddTeacher = () => {
    if (!newTeacherName.trim()) return; // Prevent empty input

    setTeachers((prevTeachers) => {
      const updatedTeachers = { ...prevTeachers }; // Copy previous state without modifying it directly
      if (selectedGrade === "College") {
        updatedTeachers.College[selectedYear] = [...updatedTeachers.College[selectedYear], newTeacherName]; // Copy the selected college year teachers and add a new teacher
      } else {
        updatedTeachers[selectedGrade] = [...updatedTeachers[selectedGrade], newTeacherName]; // Copy the selected grade teachers and add a new teacher
      }
      return updatedTeachers; // Return new updated teachers list
    });

    setTeacherList((prev) => [...prev, newTeacherName]); // Append the new teacher to the displayed list
    setShowAddModal(false); // Close modal after adding teacher
  };

  // Opens the Edit Teacher Modal with the selected teacher's name
  const handleEditTeacher = (teacher, index) => {
    setEditTeacherName(teacher);
    setEditTeacherIndex(index);
    setShowEditModal(true);
  };

  // Updates the teacher's name in the list
  const submitEditTeacher = () => {
    if (!editTeacherName.trim()) return; // Prevent empty input

    setTeachers((prevTeachers) => {
      const updatedTeachers = { ...prevTeachers };
      if (selectedGrade === "College") {
        updatedTeachers.College[selectedYear][editTeacherIndex] = editTeacherName;
      } else {
        updatedTeachers[selectedGrade][editTeacherIndex] = editTeacherName;
      }
      return updatedTeachers;
    });

    setTeacherList((prev) => prev.map((t, i) => (i === editTeacherIndex ? editTeacherName : t))); // Update UI
    setShowEditModal(false); // Close modal
  };

  // Open Delete Confirmation Modal
  const handleDeleteConfirmation = (index) => {
    setDeleteTeacherIndex(index);
    setShowDeleteModal(true);
  };

  // Delete Teacher
  const confirmDeleteTeacher = () => {
    setTeachers((prevTeachers) => {
      const updatedTeachers = { ...prevTeachers };
      if (selectedGrade === "College") {
        updatedTeachers.College[selectedYear] = updatedTeachers.College[selectedYear].filter((_, i) => i !== deleteTeacherIndex);
      } else {
        updatedTeachers[selectedGrade] = updatedTeachers[selectedGrade].filter((_, i) => i !== deleteTeacherIndex);
      }
      return updatedTeachers;
    });

    setTeacherList((prev) => prev.filter((_, i) => i !== deleteTeacherIndex)); // Update UI
    setShowDeleteModal(false); // Close modal
  };

  return (
    <div className="text-black">
      <AdminHeader />
      <div className={styles.container}>
        {/* sidebar */}
        <div className={styles.sidebar}>
          <h2>Grade Levels</h2>
          <ul>
            <li className={selectedGrade === "Grade11" ? styles.active : ""} onClick={() => handleGradeClick("Grade11")}>Grade 11</li>
            <li className={selectedGrade === "Grade12" ? styles.active : ""} onClick={() => handleGradeClick("Grade12")}>Grade 12</li>
            <li className={selectedGrade === "College" ? styles.active : ""} onClick={() => handleGradeClick("College")}>College</li>

            {selectedGrade === "College" && (
              <ul>
                {Object.keys(teachers.College).map((year) => (
                  <li key={year} className={selectedYear === year ? styles.active : ""} onClick={() => handleYearClick(year)}>{year}</li>
                ))}
              </ul>
            )}
          </ul>
        </div>

        <div className={styles.content}>
          <div className={styles.tabContent}>
            <h1>Teachers</h1>
            <button onClick={handleAddTeacher} className={styles.addButton}>Add Teacher</button>
          </div>

          {teacherList.length > 0 ? (
            <ul className={styles.teacherList}>
              {teacherList.map((teacher, index) => (
                <li key={index}>
                  <span className={styles.teacherName}>{teacher}</span>
                  <div className={styles.buttonContainer}>
                    <button onClick={() => handleEditTeacher(teacher, index)} className={styles.editButton}>Edit</button>
                    <button onClick={() => handleDeleteConfirmation(index)} className={styles.deleteButton}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Select a grade level and year to view the teachers</p>
          )}
        </div>
      </div>

      {/* Add Teacher Modal */}
      {showAddModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Add New Teacher</h2>
            <input type="text" placeholder="Full Name" value={newTeacherName} onChange={(e) => setNewTeacherName(e.target.value)} />
            <button className={styles.submitButton} onClick={submitAddTeacher}>Submit</button>
            <button className={styles.cancelButton} onClick={() => setShowAddModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Edit Teacher Modal */}
      {showEditModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Edit Teacher Name</h2>
            <input type="text" value={editTeacherName} onChange={(e) => setEditTeacherName(e.target.value)} />
            <button className={styles.submitButton} onClick={submitEditTeacher}>Save</button>
            <button className={styles.cancelButton} onClick={() => setShowEditModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Are you sure you want to delete this teacher?</h2>
            <button className={styles.submitButton} onClick={confirmDeleteTeacher}>Yes</button>
            <button className={styles.cancelButton} onClick={() => setShowDeleteModal(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}
