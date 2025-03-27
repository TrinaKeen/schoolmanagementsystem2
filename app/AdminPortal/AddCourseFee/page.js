"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import styles from "./AddCourseFee.module.css";

export default function AddCourseFeePage() {
  const [formData, setFormData] = useState({
    course_id: "",
    base_fee: "",
    additional_fees: "",
  });

  const [fees, setFees] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      const res = await fetch("/api/admin/fetchCourseFees");
      const data = await res.json();
      setFees(data);
    } catch (error) {
      console.error("Error fetching fees:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/admin/addCourseFee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Course fee added successfully!");
        setFormData({
          course_id: "",
          base_fee: "",
          additional_fees: "",
        });
        fetchFees(); // Refresh table
      } else {
        alert(result.error || "Failed to add fee.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error occurred while submitting the form.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/deleteCourseFee?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchFees();
      } else {
        alert("Failed to delete fee.");
      }
    } catch (error) {
      console.error("Error deleting fee:", error);
      alert("Error occurred while deleting.");
    }
  };

  return (
    <div className={styles.dashboardWrapper}>
      <Sidebar />
      <div className={styles.pageContainer}>
        <div className={styles.contentContainer}>
          <h1 className={styles.title}>Add Course Fee</h1>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="course_id"
                placeholder="Course ID *"
                value={formData.course_id}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="base_fee"
                placeholder="Base Fee *"
                value={formData.base_fee}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="additional_fees"
                placeholder="Additional Fees"
                value={formData.additional_fees}
                onChange={handleChange}
              />
            </div>

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.saveButton}>
                Save
              </button>
              <button
                type="reset"
                className={styles.resetButton}
                onClick={() =>
                  setFormData({ course_id: "", base_fee: "", additional_fees: "" })
                }
              >
                Reset
              </button>
            </div>
          </form>

          {showTable && (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Course ID</th>
                    <th>Base Fee</th>
                    <th>Additional Fees</th>
                    <th>Total Fee</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {fees.map((fee) => (
                    <tr key={fee.id}>
                      <td>{fee.course_id}</td>
                      <td>{fee.base_fee}</td>
                      <td>{fee.additional_fees}</td>
                      <td>{fee.total_fee}</td>
                      <td>
                        <button
                          onClick={() => handleDelete(fee.id)}
                          className={styles.deleteButton}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button
            onClick={() => setShowTable(!showTable)}
            className={styles.toggleButton}
          >
            {showTable ? "Hide Table" : "View Table"}
          </button>
        </div>
      </div>
    </div>
  );
}
