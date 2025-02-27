"use client";

import React, { useState, useEffect } from "react";
import styles from "./studentCourses.module.css";
import Sidebar from "./components/Sidebar";
import AdminHeader from "../components/page";

const StudentCourses = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(""); // Stores selected program
  const [newCourse, setNewCourse] = useState({
    course_name: "",
    course_code: "",
    program_id: "",
  });

  useEffect(() => {
    fetchPrograms();
    fetchCourses(selectedProgram);
  }, []);

  // Fetch Programs
  const fetchPrograms = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/studentCourses?type=programs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPrograms(data);
    } catch (error) {
      console.error("Error fetching programs: ", error);
    }
  };

  // Fetch Courses for Selected Program
  const fetchCourses = async (programId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `/api/admin/studentCourses?type=courses&program_id=${programId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses: ", error);
    }
  };

  // Handle Sidebar Click (Switching Programs)
  const handleSidebarClick = (programId) => {
    setSelectedProgram(programId);
    fetchCourses(programId);
  };

  // Handle Adding a New Course
  const handleAddCourse = async () => {
    if (!newCourse.course_name || !newCourse.course_code || !selectedProgram) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/admin/studentCourses?type=courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          course_name: newCourse.course_name,
          course_code: newCourse.course_code,
          program_id: selectedProgram,
          year: 1, // Default year for now
        }),
      });

      if (res.ok) {
        fetchCourses(selectedProgram);
        setNewCourse({ course_name: "", course_code: "", program_id: "" });
      } else {
        console.error("Failed to add course");
      }
    } catch (error) {
      console.error("Error adding course: ", error);
    }
  };

  // Handle Deleting a Course
  const handleDeleteCourse = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `/api/admin/studentCourses?type=courses&id=${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        fetchCourses();
      } else {
        console.error("Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course: ", error);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <AdminHeader />
      <div className={styles.contentArea}>
        <Sidebar onSelectView={handleSidebarClick} />
        <div className={styles.mainContent}>
          <main className={styles.courseContent}>
            <div className={styles.mainHeader}>
              <h2>
                {selectedProgram
                  ? `Courses for ${
                      programs.find((p) => p.id === selectedProgram)
                        ?.program_name
                    }`
                  : "Select a Program"}
              </h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={styles.editButton}
              >
                {isEditing ? "Cancel" : "Edit Courses"}
              </button>
            </div>

            {isEditing ? (
              <div>
                {/* Dropdown to Select Program */}
                <div className={styles.editActions}>
                  <select
                    className={styles.dropdown}
                    onChange={(e) => setSelectedProgram(e.target.value)}
                    value={selectedProgram}
                  >
                    <option value="">Select Program</option>
                    {programs.map((program) => (
                      <option key={program.id} value={program.id}>
                        {program.program_name}
                      </option>
                    ))}
                  </select>

                  {/* Add Course */}
                  <input
                    type="text"
                    placeholder="Course Name"
                    className={styles.inputField}
                    value={newCourse.course_name}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        course_name: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Course Code"
                    className={styles.inputField}
                    value={newCourse.course_code}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        course_code: e.target.value,
                      })
                    }
                  />
                  <button
                    className={styles.actionButton}
                    onClick={handleAddCourse}
                  >
                    Add Course
                  </button>
                </div>

                {/* Course List with Delete Options */}
                <div className={styles.courseList}>
                  {courses
                    .filter(
                      (course) =>
                        course.program_id === parseInt(selectedProgram)
                    )
                    .map((course) => (
                      <div key={course.id} className={styles.courseItem}>
                        <h3>{course.course_name}</h3>
                        <p>Code: {course.course_code}</p>
                        <button
                          className={styles.deleteButton}
                          onClick={() => handleDeleteCourse(course.id)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className={styles.courseList}>
                {courses.map((course) => (
                  <div key={course.id} className={styles.courseItem}>
                    <h1>{course.course_name}</h1>
                    <p>Code: {course.course_code}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Show Courses of Selected Program */}
            {selectedProgram && (
              <div>
                <h3>Courses</h3>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Course Name</th>
                      <th>Course Code</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course.id}>
                        <td>{course.id}</td>
                        <td>{course.course_name}</td>
                        <td>{course.course_code}</td>
                        <td>
                          <button onClick={() => handleDeleteCourse(course.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default StudentCourses;

//im about to cry
//i cant do this anymore
//i just want to sleep
//thanks copilot for auto generating this comments u feel me homie <33

// OpenAI. (2025, February 26). Response to the prompt "Can you fix this code so that it matches my schema: I want to create an API endpoint that allows me to fetch, create, and delete data for programs, courses, and subjects."
// ChatGPT (Version 4.0). Accessed and retrieved on Feb 24, 2025 from https://chat.openai.com
