"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import styles from "./studentCourses.module.css";

export default function StudentCourses() {
  const [programs, setPrograms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [editCourse, setEditCourse] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCourseName, setSelectedCourseName] = useState("");
  const [newCourse, setNewCourse] = useState({
    course_name: "",
    course_code: "",
    program_id: "",
    instructor_id: "",
    year: "",
  });

  useEffect(() => {
    fetchPrograms();
    fetchCourses();
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const res = await fetch("/api/admin/studentCourses?type=instructors");
      if (!res.ok) {
        throw new Error("Failed to fetch instructors");
      }
      const data = await res.json();
      setInstructors(data);
    } catch (error) {
      setError("Error fetching instructors: " + error);
    }
  };

  const fetchPrograms = async () => {
    try {
      const res = await fetch("/api/admin/studentCourses?type=programs");
      if (!res.ok) {
        throw new Error("Failed to fetch programs");
      }
      const data = await res.json();
      setPrograms(data);
    } catch (error) {
      setError("Error fetching programs: " + error);
    }
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);
      // const token = localStorage.getItem("token"); Not necessary anymore - Martin

      const res = await fetch("/api/admin/studentCourses?type=courses");

      if (res.status === 401) {
        alert("Session expired. Please log in again.");
        // localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to fetch courses");
      }

      let data = await res.json();
      data.sort((a, b) => a.id - b.id);

      setCourses(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handCancel = () => {
    setEditCourse(null);
    setNewCourse({
      course_name: "",
      course_code: "",
      program_id: "",
      instructor_id: "",
      year: "",
    });
  };

  const handleSave = async () => {
    if (
      !newCourse.course_name ||
      !newCourse.course_code ||
      !newCourse.program_id ||
      !newCourse.instructor_id ||
      !newCourse.year
    ) {
      alert("Please fill in all fields before saving.");
      return;
    }
    setSelectedCourseName(newCourse.course_name);
    setShowConfirmation(true);

    const formattedCourse = {
      id: editCourse?.id ?? null, // If editing, include ID
      course_name: newCourse.course_name,
      course_code: newCourse.course_code,
      program_id: parseInt(newCourse.program_id, 10) || null,
      instructor_id: parseInt(newCourse.instructor_id, 10) || null,
      year: parseInt(newCourse.year, 10) || null,
    };

    console.log("Saving formatted course:", formattedCourse);

    const token = localStorage.getItem("token");
  };

  const confirmAddCourse = async () => {
    setShowConfirmation(false);
    try {
      const res = await fetch(`/api/admin/studentCourses?type=courses`, {
        method: editCourse ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      });
      if (!res.ok) throw new Error("Failed to save course");
      await fetchCourses();
      setShowSuccess(true);
    } catch (error) {
      console.error("Error saving course:", error);
      alert(`Error: ${error.message}`);
    }
  };

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log("Course data:", courses);

  return (
    <div className={styles.pageContainer}>
      <Sidebar className={styles.sidebar} />
      <div className={styles.contentContainer}>
        {/* Title and Add New Course Button */}
        <div className={styles.headerRow}>
          <h1 className={styles.title}>Add New Course</h1>
        </div>

        {/* Add/Edit Course Form (shows if adding or editing) */}
        <div className={styles.formContainer}>
          <h2>{editCourse ? "Edit Course" : "Add New Course"}</h2>
          <div className={styles.formGrid}>
            <input
              type="text"
              placeholder="Course Name"
              value={newCourse.course_name}
              onChange={(e) =>
                setNewCourse({ ...newCourse, course_name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Course Code"
              value={newCourse.course_code}
              onChange={(e) =>
                setNewCourse({ ...newCourse, course_code: e.target.value })
              }
            />
            {/* Dropdown for Program ID */}
            <select
              name="program_id"
              className={styles.selectDropdown}
              value={newCourse.program_id}
              onChange={(e) =>
                setNewCourse({ ...newCourse, program_id: e.target.value })
              }
            >
              <option value="">Select Program</option>
              {programs.map((program) => (
                <option key={program.id} value={program.id}>
                  {`${program.program_name} ${program.major}`}
                </option>
              ))}
            </select>
            <select
              name="instructor_id"
              className={styles.selectDropdown}
              value={newCourse.instructor_id}
              onChange={(e) =>
                setNewCourse({ ...newCourse, instructor_id: e.target.value })
              }
            >
              <option value="">Select Instructor</option>
              {instructors.map((instructor) => (
                <option key={instructor.id} value={instructor.id}>
                  {`${instructor.first_name} ${instructor.last_name}`}
                </option>
              ))}
            </select>
            <select
              name="number"
              className={styles.selectDropdown}
              value={newCourse.year}
              onChange={(e) =>
                setNewCourse({ ...newCourse, year: e.target.value })
              }
            >
              <option value="">Select Year</option>
              {[1, 2, 3, 4].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.buttonGroup}>
            <button className={styles.saveButton} onClick={handleSave}>
              {editCourse ? "Save Changes" : "Add Course"}
            </button>
            <button className={styles.cancelButton} onClick={handCancel}>
              Cancel
            </button>
          </div>

          {/* Confirmation Modal */}
          {showConfirmation && (
            <div className={styles.popup}>
              <p>Are you sure you want to add {selectedCourseName}?</p>
              <button onClick={confirmAddCourse}>Yes</button>
              <button onClick={() => setShowConfirmation(false)}>Cancel</button>
            </div>
          )}
          {showSuccess && (
            <div className={styles.popup}>
              <p>{selectedCourseName} successfully added!</p>
              <button onClick={() => setShowSuccess(false)}>OK</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
