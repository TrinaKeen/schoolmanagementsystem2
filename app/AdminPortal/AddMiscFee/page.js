"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import styles from "./AddMiscFee.module.css";

export default function AddMiscellaneousFeePage() {
  const [formData, setFormData] = useState({
    student_number: "",
    fee_name: "",
    amount: "",
    currency: "PHP",
    fee_type: "",
    due_date: "",
    payment_status: "Unpaid",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting miscellaneous fee:", formData);

    try {
      const res = await fetch("/api/admin/addMiscFee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Miscellaneous fee added successfully");
        setFormData({
          student_number: "",
          fee_name: "",
          amount: "",
          currency: "PHP",
          fee_type: "",
          due_date: "",
          payment_status: "Unpaid",
        });
      } else {
        alert(result.error || "Failed to add fee.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error occurred while submitting the form.");
    }
  };

  return (
    <div className={styles.dashboardWrapper}>
      <Sidebar />
      <div className={styles.pageContainer}>
        <div className={styles.contentContainer}>
          <h1 className={styles.title}>Add Miscellaneous Fee</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                type="text"
                name="student_number"
                placeholder="Student Number *"
                value={formData.student_number}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="fee_name"
                placeholder="Fee Name *"
                value={formData.fee_name}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="amount"
                placeholder="Amount *"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <input
                type="text"
                name="currency"
                placeholder="Currency"
                value={formData.currency}
                onChange={handleChange}
              />
              <input
                type="text"
                name="fee_type"
                placeholder="Fee Type (e.g., one-time)"
                value={formData.fee_type}
                onChange={handleChange}
              />
              <input
                type="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleChange}
              />
            </div>

            <div className={styles.formGroup}>
              <select
                name="payment_status"
                value={formData.payment_status}
                onChange={handleChange}
              >
                <option value="Unpaid">Unpaid</option>
                <option value="Paid">Paid</option>
              </select>
            </div>

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.saveButton}>
                Save
              </button>
              <button
                type="reset"
                className={styles.resetButton}
                onClick={() =>
                  setFormData({
                    student_number: "",
                    fee_name: "",
                    amount: "",
                    currency: "PHP",
                    fee_type: "",
                    due_date: "",
                    payment_status: "Unpaid",
                  })
                }
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
