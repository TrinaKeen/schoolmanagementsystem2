"use client";
import React, { useState, useEffect } from "react";
import styles from "./studentCourses.module.css";
import Sidebar from "./components/Sidebar";
import AdminHeader from "../components/page";

const StudentCourses = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [programs, setPrograms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedView, setSelectedView] = useState("programs");

  useEffect(() => {
    fetchPrograms();
    fetchCourses();
  }, []);

  // Fetch programs
  const fetchPrograms = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from storage
      const res = await fetch("/api/admin/studentCourses?type=programs", {
        headers: { Authorization: `Bearer ${token}` }, // Send token
      });
      const data = await res.json();
      setPrograms(data);
    } catch (error) {
      console.error("Error fetching programs: ", error);
    }
  };

  // Fetch courses
  const fetchCourses = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from storage
      const res = await fetch("/api/admin/studentCourses?type=courses", {
        headers: { Authorization: `Bearer ${token}` }, // Send token
      });
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses: ", error);
    }
  };

  // handle adding new courses
  const handleAddCourse = async () => {
    if (!newCourse.course_name || !newCourse.course_code || !selectedProgram) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Retrieve token from storage
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
          instructor_id: newCourse.instructor_id || null,
          year: 1,
        }),
      });

      if (res.ok) {
        fetchCourses(); // re-fetch courses
        setNewCourse({
          course_name: "",
          course_code: "",
          program_id: "",
        });
      } else {
        console.error("Failed to add course");
      }
    } catch (error) {
      console.error("Error adding course: ", error);
    }
  };

  // handle deleting courses
  const handleDeleteCourse = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from storage
      const res = await fetch(
        `/api/admin/studentCourses?type=courses&id=${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }, // Send token
        }
      );

      if (res.ok) {
        fetchCourses(); // re-fetch courses
      } else {
        console.error("Failed to delete course");
      }
    } catch (error) {
      console.error("Error deleting course: ", error);
    }
  };

  const handleSidebarClick = (view) => {
    setSelectedView(view);
  };

  return (
    <div className={styles.pageContainer}>
      <AdminHeader />
      <div className={styles.contentArea}>
        {/* ✅ Sidebar Click Handlers */}
        <Sidebar onClick={handleSidebarClick} />
        <div className={styles.mainContent}>
          <main className={styles.courseContent}>
            <div className={styles.mainHeader}>
              <h2>Student Courses</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={styles.editButton}
              >
                {isEditing ? "Cancel" : "Edit Courses"}
              </button>
            </div>

            {/* ✅ Display Different Tables Based on Sidebar Selection */}
            {selectedView === "programs" && (
              <div>
                <h3>Programs</h3>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Program Name</th>
                      <th>Type</th>
                      <th>Major</th>
                      <th>Code</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {programs.map((program) => (
                      <tr key={program.id}>
                        <td>{program.id}</td>
                        <td>{program.program_name}</td>
                        <td>{program.program_type}</td>
                        <td>{program.major || "N/A"}</td>
                        <td>{program.program_code}</td>
                        <td>{program.duration} months</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {selectedView === "courses" && (
              <div>
                <h3>Courses</h3>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Course Name</th>
                      <th>Course Code</th>
                      <th>Program ID</th>
                      <th>Instructor ID</th>
                      <th>Year</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course.id}>
                        <td>{course.id}</td>
                        <td>{course.course_name}</td>
                        <td>{course.course_code}</td>
                        <td>{course.program_id}</td>
                        <td>{course.instructor_id || "N/A"}</td>
                        <td>{course.year}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {selectedView === "subjects" && (
              <div>
                <h3>Subjects (Placeholder)</h3>
                <p>Subjects are not yet implemented in the schema.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
export default StudentCourses;
