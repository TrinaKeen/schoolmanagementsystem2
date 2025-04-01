"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import styles from "./teacherPage.module.css";
import Modal from "../components/Modal";
import LoadingSpinner from "../components/LoadingSpinner";

export default function TeacherPage() {
  const [instructors, setInstructors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editInstructor, setEditInstructor] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [instructorToDelete, setInstructorToDelete] = useState(null);
  const [sortKey, setSortKey] = useState("last_name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [newInstructor, setNewInstructor] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    hire_date: "",
    specialization: "",
  });

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const res = await fetch("/api/admin/fetchInstructors", {
        cache: "no-store",
      });

      if (!res.ok) {
        console.error(
          "Failed to fetch instructors",
          res.status,
          res.statusText
        );
        return;
      }

      const data = await res.json();
      setInstructors(data);
    } catch (error) {
      console.error("Error fetching instructors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (instructor) => {
    setInstructorToDelete(instructor);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    const id = instructorToDelete?.id;

    if (!id || isNaN(Number(id))) {
      alert("Invalid instructor ID.");
      return;
    }

    try {
      const res = await fetch(
        `/api/admin/instructor?type=instructors&id=${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to delete instructor: ${errorText}`);
      }

      setInstructors((prev) =>
        prev.map((inst) =>
          inst.id !== updatedInstructor.id ? updatedInstructor : inst
        )
      );

      setShowDeleteConfirmation(false);
      setInstructorToDelete(null);
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.message);
    }
  };

  const handleEdit = (instructor) => {
    setEditInstructor(instructor);
    setFormVisible(true);
    setNewInstructor({
      first_name: instructor.first_name,
      last_name: instructor.last_name,
      email: instructor.email,
      phone: instructor.phone,
      hire_date: instructor.hire_date,
      specialization: instructor.specialization,
    });
  };

  const handleChange = (e) => {
    setNewInstructor({ ...newInstructor, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const { first_name, last_name, email, phone, hire_date, specialization } =
      newInstructor;
    if (
      !first_name ||
      !last_name ||
      !email ||
      !phone ||
      !hire_date ||
      !specialization
    ) {
      alert("Please fill in all fields before saving.");
      return;
    }

    setShowConfirmation(true);
  };

  const confirmSave = async () => {
    setShowConfirmation(false);

    const isEditing = Boolean(editInstructor);
    const formattedInstructor = {
      ...(isEditing && { id: editInstructor.id }),
      ...newInstructor,
    };

    try {
      const res = await fetch(`/api/admin/instructor?type=instructors`, {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formattedInstructor),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to save instructor");
      }

      let data = null;
      if (res.status !== 204) {
        try {
          data = await res.json();
          console.log("Saved instructor:", data);
        } catch {
          console.warn("No JSON response body.");
        }
      }

      setInstructors(
        (prev) =>
          isEditing
            ? prev.map((inst) =>
                inst.id === editInstructor.id
                  ? { ...inst, ...newInstructor }
                  : inst
              )
            : [...prev, data] // For new instructors
      );

      setFormVisible(false);
      setEditInstructor(null);
      setNewInstructor({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        hire_date: "",
        specialization: "",
      });
    } catch (error) {
      console.error("Save error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleCancel = () => {
    setFormVisible(false);
    setEditInstructor(null);
    setNewInstructor({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      hire_date: "",
      specialization: "",
    });
  };

  const filteredInstructors = instructors.filter((instructor) => {
    const query = searchQuery.toLowerCase();
    return (
      instructor.id.toString().includes(query) ||
      instructor.first_name.toLowerCase().includes(query) ||
      instructor.last_name.toLowerCase().includes(query) ||
      (instructor.specialization?.toLowerCase() || "").includes(query)
    );
  });

  const sortedInstructors = [...filteredInstructors].sort((a, b) => {
    if (a[sortKey] < b[sortKey]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortKey] > b[sortKey]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  if (loading) return <LoadingSpinner />;

  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <div className={styles.contentContainer}>
        <div className={styles.mainContent}>
          <h1 className={styles.title}>Instructors List</h1>
          {/* <p className={styles.breadcrumb}>Home &gt; Instructor List</p> */}

          <Modal isOpen={formVisible} onClose={handleCancel}>
            <form className={styles.formContainer}>
              <h1 className={styles.title2}>Edit Instructor</h1>
              <div className={styles.formGrid}>
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={newInstructor.first_name ?? ""}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={newInstructor.last_name ?? ""}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGrid}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={newInstructor.email ?? ""}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  value={newInstructor.phone ?? ""}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGrid}>
                <input
                  type="date"
                  name="hire_date"
                  value={newInstructor.hire_date ?? ""}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="specialization"
                  placeholder="Specialization"
                  value={newInstructor.specialization ?? ""}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.buttonGroup}>
                <button className={styles.saveButton} onClick={handleSave}>
                  Save
                </button>
                <button className={styles.cancelButton} onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </form>
          </Modal>

          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by ID, Name, or Specialization"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>ID</th>
                  <th className={styles.th}>First Name</th>
                  <th className={styles.th}>Last Name</th>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>Phone</th>
                  <th className={styles.th}>Hire Date</th>
                  <th className={styles.th}>Specialization</th>
                  <th className={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInstructors.length > 0 ? (
                  filteredInstructors.map((instructor) => (
                    <tr key={instructor.id}>
                      <td className={styles.td}>{instructor.id}</td>
                      <td className={styles.td}>{instructor.first_name}</td>
                      <td className={styles.td}>{instructor.last_name}</td>
                      <td className={styles.td}>{instructor.email}</td>
                      <td className={styles.td}>{instructor.phone || "N/A"}</td>
                      <td className={styles.td}>{instructor.hire_date}</td>
                      <td className={styles.td}>
                        {instructor.specialization || "N/A"}
                      </td>
                      <td className={styles.td}>
                        <div className={styles.actions}>
                          <button
                            className={styles.editButton}
                            onClick={() => handleEdit(instructor)}
                          >
                            Edit
                          </button>
                          <button
                            className={styles.deleteButton}
                            onClick={() => handleDelete(instructor)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className={styles.noData}>
                      No matching instructors found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {showConfirmation && (
            <div className={styles.popup}>
              <p>Do you want to save the changes?</p>
              <button onClick={confirmSave}>Yes</button>
              <button onClick={() => setShowConfirmation(false)}>Cancel</button>
            </div>
          )}
          {showDeleteConfirmation && (
            <div className={styles.popup}>
              <p>
                Do you want to delete this{" "}
                <strong>
                  {instructorToDelete.first_name} {instructorToDelete.last_name}
                </strong>
                ?
              </p>
              <button onClick={confirmDelete}>Yes</button>
              <button
                onClick={() => {
                  setInstructorToDelete(null);
                  setShowDeleteConfirmation(false);
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
