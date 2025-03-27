"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import styles from "./addIntructor.module.css";

export default function AddInstructorPage() {
  const [instructors, setInstructors] = useState([]);
  const [newInstructor, setNewInstructor] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    hire_date: "",
    specialization: "",
  });
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [selectedName, setSelectedName] = useState("");

  useEffect(() => {
    fetchInstructors();
  }, []);

  const handleChange = (e) => {
    setNewInstructor({ ...newInstructor, [e.target.name]: e.target.value });
  };

  const fetchInstructors = async () => {
    try {
      const res = await fetch("/api/admin/instructor?type=instructors", {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch instructors");
      }
      const data = await res.json();
      setInstructors(data);
    } catch (error) {
      setError("Error fetching instructors: " + error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
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

    setSelectedName(`${first_name} ${last_name}`);
    setShowConfirmation(true);

    const token = localStorage.getItem("token");
  };

  const confirmAddInstructor = async () => {
    setShowConfirmation(false);

    const res = await fetch(`/api/admin/instructor?type=instructors`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(newInstructor),
    });

    if (!res.ok) {
      const errorDetails = await res.json();
      console.error("Instructor Save Error:", errorDetails);
      throw new Error("Failed to save instructor");
    }

    await fetchInstructors();
    setShowSuccess(true);

    setNewInstructor({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      hire_date: "",
      specialization: "",
    });
  };

  if (loading) return <p>Loading instructors...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <div className={styles.contentContainer}>
        <div className={styles.mainContent}>
          <h1 className={styles.title}>Add New Instructor</h1>

          <form className={styles.formContainer} onSubmit={handleSave}>
            <div className={styles.formGrid}>
              <input
                type="text"
                name="first_name"
                placeholder="First Name *"
                value={newInstructor.first_name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name *"
                value={newInstructor.last_name}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGrid}>
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={newInstructor.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone *"
                value={newInstructor.phone}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGrid}>
              <input
                type="date"
                name="hire_date"
                placeholder="Hire Date *"
                value={newInstructor.hire_date}
                onChange={handleChange}
              />
              <input
                type="text"
                name="specialization"
                placeholder="Specialization *"
                value={newInstructor.specialization}
                onChange={handleChange}
              />
            </div>

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.saveButton}>
                Save
              </button>
              <button
                type="reset"
                className={styles.cancelButton}
                onClick={() =>
                  setNewInstructor({
                    first_name: "",
                    last_name: "",
                    email: "",
                    phone: "",
                    hire_date: "",
                    specialization: "",
                  })
                }
              >
                Reset
              </button>
            </div>

            {showConfirmation && (
              <div className={styles.popup}>
                <p>Are you sure you want to add {selectedName}?</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    confirmAddInstructor();
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowConfirmation(false)}>
                  Cancel
                </button>
              </div>
            )}

            {showSuccess && (
              <div className={styles.popup}>
                <p>{selectedName} Successfully added!</p>
                <button onClick={() => setShowSuccess(false)}>OK</button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
