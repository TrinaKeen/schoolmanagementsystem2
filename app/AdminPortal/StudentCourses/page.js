"use client";

import { useEffect, useState } from "react";
import Header from "../components/Header";
// import Sidebar from "../components/sidebar";
import Sidebar from "../components/Sidebar";
import styles from "./studentCourses.module.css";

export default function StudentCourses() {
  const [programs, setPrograms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [editCourse, setEditCourse] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [formVisible, setFormVisible] = useState(false); // Added by Martin
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

      // const data = await res.json();
      setCourses(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getProgramName = (programId) => {
    const program = programs.find((p) => p.id === programId);
    return program
      ? `${program.program_name} ${program.major}`
      : "Unknown Program";
  };

  const getInstructorName = (instructorId) => {
    const instructor = instructors.find((i) => i.id === instructorId);
    return instructor
      ? `${instructor.first_name} ${instructor.last_name}`
      : "Unknown Instructor";
  };

  const handleEdit = (course) => {
    // console.log("Editing course:", course);
    setEditCourse(course);
    setFormVisible(true); // Show form when editing - Added by Martin
    setNewCourse({
      course_name: course.course_name,
      course_code: course.course_code,
      program_id: course.program_id,
      instructor_id: course.instructor_id,
      year: course.year,
    });
  };

  const handleDelete = async (id, courseName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the course ${courseName}?`
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `/api/admin/studentCourses?type=courses&id=${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to delete course: ${errorText}`);
      }

      setCourses(courses.filter((course) => course.id !== id));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handCancel = () => {
    setEditCourse(null);
    setFormVisible(false); // Hide form when cancelling - Added by Martin
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

    try {
      console.log("Saving course:", newCourse);

      const res = await fetch(`/api/admin/studentCourses?type=courses`, {
        method: editCourse ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedCourse),
      });

      if (!res.ok) {
        throw new Error("Failed to save course");
      }

      const updatedCourseData = await res.json();

      setCourses((prevCourses) => {
        return prevCourses.map((course) =>
          course.id === updatedCourseData.id
            ? { ...course, ...updatedCourseData }
            : course
        );
      });

      await fetchCourses();

      setEditCourse(null);
      setFormVisible(false); // Hide form after saving
      setNewCourse({
        course_name: "",
        course_code: "",
        program_id: "",
        instructor_id: "",
        year: "",
      });
    } catch (error) {
      console.error("Error saving course:", error);
      alert(`Error: ${error.message}`);
    }
  };

  // Handle Add New Course - resets form and opens the form
  const handleAddNewCourse = () => {
    setEditCourse(null); // Clear edit state
    setFormVisible(true); // Show form for new course
    setNewCourse({
      course_name: "",
      course_code: "",
      program_id: "",
      instructor_id: "",
      year: "",
    });
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
          <h1 className={styles.title}>Course List</h1>
          <button className={styles.addButton} onClick={handleAddNewCourse}>
            Add New Course
          </button>
        </div>

        {/* Add/Edit Course Form (shows if adding or editing) */}
        {formVisible && (
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
              <input
                type="number"
                placeholder="Year"
                value={newCourse.year}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, year: e.target.value })
                }
              />
            </div>
            <div className={styles.buttonGroup}>
              <button className={styles.saveButton} onClick={handleSave}>
                {editCourse ? "Save Changes" : "Add Course"}
              </button>
              <button className={styles.cancelButton} onClick={handCancel}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Table of Courses */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.idColumn}>ID</th>
                <th>Course Name</th>
                <th>Course Code</th>
                <th className={styles.wideColumn}>Program Name</th>
                <th className={styles.wideColumn}>Instructor Name</th>
                <th className={styles.yearColumn}>Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <tr key={course.id}>
                    <td className={styles.idColumn}>{course.id}</td>
                    <td>{course.course_name}</td>
                    <td>{course.course_code}</td>
                    <td className={styles.wideColumn}>
                      {getProgramName(course.program_id)}
                    </td>
                    <td className={styles.wideColumn}>
                      {getInstructorName(course.instructor_id)}
                    </td>
                    <td className={styles.yearColumn}>{course.year}</td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          className={styles.editButton}
                          onClick={() => handleEdit(course)}
                        >
                          Edit
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() =>
                            handleDelete(course.id, course.course_name)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className={styles.noData}>
                    No courses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
