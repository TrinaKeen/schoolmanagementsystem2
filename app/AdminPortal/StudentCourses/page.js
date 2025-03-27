"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import styles from "./studentCourses.module.css";
import Modal from "../components/Modal";

export default function StudentCourses() {
  const [programs, setPrograms] = useState([]);
  const [courses, setCourses] = useState([]);
  const [editCourse, setEditCourse] = useState(null);
  const [instructors, setInstructors] = useState([]);
  const [formVisible, setFormVisible] = useState(false); // Added by Martin
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
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

      const res = await fetch("/api/admin/studentCourses?type=courses");

      if (res.status === 401) {
        alert("Session expired. Please log in again.");
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

  const filterCourses = courses.filter((course) => {
    const query = searchQuery.toLowerCase();
    return (
      course.id.toString().includes(query) ||
      course.course_name.toLowerCase().includes(query) ||
      course.course_code.toLowerCase().includes(query) ||
      getProgramName(course.program_id).toLowerCase().includes(query) ||
      getInstructorName(course.instructor_id).toLowerCase().includes(query) ||
      course.year.toString().includes(query)
    );
  });

  const sortedCourses = [...filterCourses].sort((a, b) => a.id - b.id);
  if (sortConfig.key) {
    sortedCourses.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return -1;
      if (a[sortConfig.key] > b[sortConfig.key]) return 1;
      return 0;
    });
    if (sortConfig.direction === "desc") {
      sortedCourses.reverse();
    }
  }

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleChange = (e) => {
    setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
  };

  const handleEdit = (course) => {
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
    setCourseToDelete({ id, name: courseName });
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    if (!courseToDelete) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `/api/admin/studentCourses?type=courses&id=${courseToDelete.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to delete course: ${errorText}`);
      }

      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== courseToDelete.id)
      );

      setShowDeleteConfirmation(false);
      setCourseToDelete(null);
    } catch (error) {
      console.error("Error deleting course:", error);
      alert(`Error: ${error.message}`);
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

  const handleSave = (e) => {
    e.preventDefault();

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

    setShowConfirmation(true);
  };

  const confirmSave = async () => {
    setShowConfirmation(false); // hide modal

    const formattedCourse = {
      id: editCourse?.id ?? null,
      course_name: newCourse.course_name,
      course_code: newCourse.course_code,
      program_id: parseInt(newCourse.program_id, 10) || null,
      instructor_id: parseInt(newCourse.instructor_id, 10) || null,
      year: parseInt(newCourse.year, 10) || null,
    };

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`/api/admin/studentCourses?type=courses`, {
        method: editCourse ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedCourse),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error("Failed to save course");
      }

      let updatedCourseData = {};
      try {
        updatedCourseData = await res.json();
      } catch (error) {
        console.error("Error parsing response:", error);
      }

      // const updatedCourseData = await res.json();

      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === updatedCourseData.id
            ? { ...course, ...updatedCourseData }
            : course
        )
      );

      await fetchCourses();
      setEditCourse(null);
      setFormVisible(false);
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
      <Sidebar />
      <div className={styles.contentContainer}>
        <div className={styles.mainContent}>
          <h1 className={styles.title}>Course List</h1>
          {/* <p className={styles.breadcrumb}>Home &gt; Course List</p> */}

          {/* Add/Edit Course Form (shows if adding or editing) */}
          <Modal isOpen={formVisible} onClose={handCancel}>
            <form className={styles.formContainer}>
              <h1 className={styles.title2}>Edit Course</h1>

              <div className={styles.formGrid}>
                <input
                  type="text"
                  name="course_name"
                  placeholder="Course Name"
                  value={newCourse.course_name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="course_code"
                  placeholder="Course Code"
                  value={newCourse.course_code}
                  onChange={handleChange}
                />
              </div>

              {/* Dropdown for Program ID */}
              <div className={styles.formGrid}>
                <select
                  name="program_id"
                  className={styles.selectDropdown}
                  value={newCourse.program_id}
                  onChange={handleChange}
                >
                  <option value="">Select Program</option>
                  {programs.map((program) => (
                    <option key={program.id} value={program.id}>
                      {`${program.program_name} ${program.major}`}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGrid}>
                <select
                  name="instructor_id"
                  className={styles.selectDropdown}
                  value={newCourse.instructor_id}
                  onChange={handleChange}
                >
                  <option value="">Select Instructor</option>
                  {instructors.map((instructor) => (
                    <option key={instructor.id} value={instructor.id}>
                      {`${instructor.first_name} ${instructor.last_name}`}
                    </option>
                  ))}
                </select>
                <select
                  name="year"
                  className={styles.selectDropdown}
                  value={newCourse.year}
                  onChange={handleChange}
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
                  Save Changes
                </button>
                <button className={styles.cancelButton} onClick={handCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </Modal>

          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by ID, Name, or Code"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

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
                {sortedCourses.length > 0 ? (
                  sortedCourses.map((course) => (
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
                            onClick={(e) => {
                              e.preventDefault();
                              handleDelete(course.id, course.course_name);
                            }}
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
          {showConfirmation && (
            <div className={styles.popup}>
              <p>Do you want to save the changes?</p>
              <button onClick={() => confirmSave()}>Yes</button>
              <button onClick={() => setShowConfirmation(false)}>Cancel</button>
            </div>
          )}
          {showDeleteConfirmation && (
            <div className={styles.popup}>
              <p>
                Are you sure you want to delete{" "}
                <strong>{courseToDelete?.name}</strong>?
              </p>
              <button onClick={confirmDelete}>Yes</button>
              <button onClick={() => setShowDeleteConfirmation(false)}>
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// OpenAI. (2025). ChatGPT GPT-4o. Response to the question “Can you help me put edit and delete functions to the code and explain it to me?”. Accessed and retrieved on March 17, 2025 from https://chat.openai.com
