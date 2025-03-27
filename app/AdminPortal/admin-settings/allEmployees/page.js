"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Modal from "../../components/Modal";
import styles from "./employees.module.css";

const initialFormState = {
  employee_number: "",
  first_name: "",
  last_name: "",
  user_type: "",
  gender: "",
  father_name: "",
  mother_name: "",
  date_of_birth: "",
  religion: "",
  joining_date: "",
  email: "",
  contact_number: "",
  address: "",
  program: "",
  course: "",
  section: "",
  specification: "",
  username: "",
  password: "",
};

export default function AllEmployees() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formVisible, setFormVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = employees.filter((emp) =>
      `${emp.employee_number} ${emp.first_name} ${emp.last_name} ${emp.email}`
        .toLowerCase()
        .includes(query)
    );
    setFilteredEmployees(filtered);
  }, [searchQuery, employees]);

  const fetchEmployees = async () => {
    try {
      const res = await fetch("/api/admin/account-setting?type=employees");
      const data = await res.json();
      console.log("Fetched data:", data);

      if (!res.ok || !Array.isArray(data)) {
        console.warn("API returned error or invalid format.");
        setEmployees([]); // fallback to empty array
        return;
      }

      setEmployees(data);
    } catch (err) {
      console.error("Failed to fetch employees", err);
      setEmployees([]);
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setFormData({ ...employee });
    setFormVisible(true);
  };

  const handleDelete = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await fetch(
        `/api/admin/account-setting?type=employees&id=${employeeToDelete.employee_number}`,
        {
          method: "DELETE",
        }
      );
      fetchEmployees();
      setShowDeleteConfirmation(false);
      setEmployeeToDelete(null);
    } catch (err) {
      console.error("Failed to delete employee", err);
    }
  };

  const handleCancel = (e) => {
    e?.preventDefault();
    setFormVisible(false);
    setSelectedEmployee(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    const {
      first_name,
      last_name,
      email,
      contact_number,
      address,
      user_type,
      gender,
      course,
    } = formData;

    if (
      !first_name ||
      !last_name ||
      !email ||
      !contact_number ||
      !address ||
      !user_type ||
      !gender ||
      !course
    ) {
      alert("Please fill in all fields before saving.");
      return;
    }

    setShowConfirmation(true);
  };

  const confirmSave = async () => {
    setShowConfirmation(false);

    try {
      const response = await fetch(
        "/api/admin/account-setting?type=employees",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        console.error("Update failed:", errText);
        throw new Error("Failed to update employee");
      }

      await fetchEmployees();
      handleCancel();
    } catch (err) {
      console.error("Failed to save employee:", err.message);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <div className={styles.contentContainer}>
        <div className={styles.mainContent}>
          <h1 className={styles.title}>Employees List</h1>
          {/* <p className={styles.breadcrumb}>Home &gt; All Employees</p> */}

          {/* -------- Modal Form -------- */}
          <Modal isOpen={formVisible} onClose={handleCancel}>
            <form className={styles.formContainer}>
              <h1 className={styles.title2}>Edit Employee</h1>
              <div className={styles.formGrid}>
                <input
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>
              <div className={styles.formGrid}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="contact_number"
                  placeholder="Phone"
                  value={formData.contact_number}
                  onChange={handleChange}
                />
              </div>

              <textarea
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className={styles.textareaFullWidth}
              />

              <div className={styles.formGrid}>
                <select
                  name="user_type"
                  value={formData.user_type}
                  onChange={handleChange}
                  className={styles.selectDropdown}
                >
                  <option value="">User Type</option>
                  <option value="Admin">Admin</option>
                  <option value="Instructor">Instructor</option>
                  <option value="Others">Others</option>
                </select>

                <input
                  type="text"
                  name="specification"
                  placeholder="Specification"
                  value={formData.specification}
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

          {/* -------- Search -------- */}
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by ID, Name, or Email"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          {/* -------- Table -------- */}
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>User Type</th>
                  <th>Gender</th>
                  <th>Specification</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((emp) => (
                    <tr key={emp.employee_number}>
                      <td className={styles.td}>{emp.employee_number}</td>
                      <td className={styles.td}>{emp.first_name}</td>
                      <td className={styles.td}>{emp.last_name}</td>
                      <td className={styles.td}>{emp.email}</td>
                      <td className={styles.td}>{emp.contact_number}</td>
                      <td className={styles.td}>{emp.address}</td>
                      <td className={styles.td}>{emp.user_type}</td>
                      <td className={styles.td}>{emp.gender}</td>
                      <td className={styles.td}>{emp.specification}</td>
                      <td className={styles.td}>
                        <div className={styles.actions}>
                          <button
                            className={styles.editButton}
                            onClick={() => handleEdit(emp)}
                          >
                            Edit
                          </button>
                          <button
                            className={styles.deleteButton}
                            onClick={() => handleDelete(emp)}
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
                      No matching employees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* -------- Modals -------- */}
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
                Do you want to delete{" "}
                <strong>
                  {employeeToDelete?.first_name} {employeeToDelete?.last_name}
                </strong>
                ?
              </p>
              <button onClick={confirmDelete}>Yes</button>
              <button
                onClick={() => {
                  setShowDeleteConfirmation(false);
                  setEmployeeToDelete(null);
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
