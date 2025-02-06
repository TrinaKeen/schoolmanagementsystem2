"use client";

import React, { useState } from "react";
import styles from "./teacherPage.module.css";
import AdminHeader from "../components/page";

export default function TeacherPage() {
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

  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [teacherList, setTeacherList] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newTeacherName, setNewTeacherName] = useState("");
  const [editTeacherName, setEditTeacherName] = useState("");
  const [editTeacherIndex, setEditTeacherIndex] = useState(null);
  const [deleteTeacherIndex, setDeleteTeacherIndex] = useState(null);

  // Handles grade selection
  const handleGradeClick = (grade) => {
    setSelectedGrade(grade);
    setSelectedYear(null);
    if (grade !== "College") {
      setTeacherList(teachers[grade]);
    } else {
      setTeacherList([]);
    }
  };

  // Handles college year selection
  const handleYearClick = (year) => {
    setSelectedYear(year);
    setTeacherList(teachers.College[year]);
  };

  // Open Add Teacher Modal
  const handleAddTeacher = () => {
    setNewTeacherName("");
    setShowAddModal(true);
  };

  // Add Teacher to List
  const submitAddTeacher = () => {
    if (!newTeacherName.trim()) return;

    setTeachers((prevTeachers) => {
      const updatedTeachers = { ...prevTeachers };
      if (selectedGrade === "College") {
        updatedTeachers.College[selectedYear] = [...updatedTeachers.College[selectedYear], newTeacherName];
      } else {
        updatedTeachers[selectedGrade] = [...updatedTeachers[selectedGrade], newTeacherName];
      }
      return updatedTeachers;
    });

    setTeacherList((prev) => [...prev, newTeacherName]);
    setShowAddModal(false);
  };

  // Open Edit Teacher Modal
  const handleEditTeacher = (teacher, index) => {
    setEditTeacherName(teacher);
    setEditTeacherIndex(index);
    setShowEditModal(true);
  };

  // Update Edited Teacher Name
  const submitEditTeacher = () => {
    if (!editTeacherName.trim()) return;

    setTeachers((prevTeachers) => {
      const updatedTeachers = { ...prevTeachers };
      if (selectedGrade === "College") {
        updatedTeachers.College[selectedYear][editTeacherIndex] = editTeacherName;
      } else {
        updatedTeachers[selectedGrade][editTeacherIndex] = editTeacherName;
      }
      return updatedTeachers;
    });

    setTeacherList((prev) => prev.map((t, i) => (i === editTeacherIndex ? editTeacherName : t)));
    setShowEditModal(false);
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

    setTeacherList((prev) => prev.filter((_, i) => i !== deleteTeacherIndex));
    setShowDeleteModal(false);
  };

  return (
    <div className="text-black">
      <AdminHeader />
      <div className={styles.container}>
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
