"use client";

import { useEffect, useState } from "react";
import Header from "../components/header";
// import Sidebar from "../components/sidebar";
import styles from "./studentCourses.module.css";

export default function StudentCourses() {
  const [courses, setCourses] = useState([]);
  const [editCourse, setEditCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({
    course_name: "",
    course_code: "",
    program_id: "",
    instructor_id: "",
    year: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await fetch("/api/admin/studentCourses?type=courses", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to fetch courses");
      }

      const data = await res.json();
      setCourses(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (course) => {
    console.log("Editing course:", course);
    setEditCourse(course);
    setNewCourse({
      course_name: course.course_name,
      course_code: course.course_code,
      program_id: course.program_id,
      instructor_id: course.instructor_id,
      year: course.year,
    });
  };

  const handleDelete = async (id) => {
    console.log("Attempting to delete course with ID:", id);
    if (!id) {
      console.error("Error: Invalid ID (undefined or null)");
      return;
    }

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

      fetchCourses();
      setEditCourse(null);
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

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log("Course data:", courses);

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.contentContainer}>
        <h1 className={styles.title}>Course List</h1>

        {/* Table */}
        <div className={styles.tableWrapper}>
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
              {courses.length > 0 ? (
                courses.map((course, index) => (
                  <tr key={course?.id || `temp-key-${index}`}>
                    <td>{course.id}</td>
                    <td>{course.course_name}</td>
                    <td>{course.course_code}</td>
                    <td>{course.program_id}</td>
                    <td>{course.instructor_id}</td>
                    <td>{course.year}</td>
                    <td className={styles.actions}>
                      <button
                        className={styles.editBtn}
                        onClick={() => handleEdit(course)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(course.id)}
                      >
                        Delete
                      </button>
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

        {/* Add/Edit Course Form */}
        <div className={styles.formContainer}>
          <h1>{editCourse ? "Edit Course" : "Add New Course"}</h1>
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
            <input
              type="number"
              placeholder="Program ID"
              value={newCourse.program_id}
              onChange={(e) =>
                setNewCourse({
                  ...newCourse,
                  program_id: parseInt(e.target.value, 10) || "",
                })
              }
            />
            <input
              type="number"
              placeholder="Instructor ID"
              value={newCourse.instructor_id}
              onChange={(e) =>
                setNewCourse({
                  ...newCourse,
                  instructor_id: parseInt(e.target.value, 10) || "",
                })
              }
            />
            <input
              type="number"
              placeholder="Year"
              value={newCourse.year}
              onChange={(e) =>
                setNewCourse({
                  ...newCourse,
                  year: parseInt(e.target.value, 10) || "",
                })
              }
            />
          </div>
          <button className={styles.saveBtn} onClick={handleSave}>
            {editCourse ? "Save" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
