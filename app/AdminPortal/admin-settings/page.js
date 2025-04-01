"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../components/AccountInformation.module.css";
import Sidebar from "../components/Sidebar";
import LoadingSpinner from "../components/LoadingSpinner";

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

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);

        const { data } = await axios.get("/api/admin/account-setting", {
          params: { type: "employees" },
          withCredentials: true,
        });

        setEmployees(data);
      } catch (error) {
        console.error(
          "Error fetching employees:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        // Send the PUT request with formData, ensuring employee_number is included
        await axios.put("/api/admin/addnewadmin-account", {
          ...formData,
          id: editId,
        });
      } else {
        // Send the POST request with formData, ensuring employee_number is included
        await axios.post("/api/admin/addnewadmin-account", formData);
      }

      setSuccessMessage(
        editMode
          ? "Employee updated successfully!"
          : "Employee added successfully!"
      );
      setTimeout(() => setSuccessMessage(""), 3000);

      // Reset form data and state
      setFormData(initialFormState); // Ensure initialFormState is defined
      setEditMode(false);
      setEditId(null);

      // Optionally, update the employees list without refetching all data
      const updatedEmployee = editMode ? { ...formData, id: editId } : formData;
      setEmployees((prevEmployees) =>
        editMode
          ? prevEmployees.map((emp) =>
              emp.id === editId ? updatedEmployee : emp
            )
          : [...prevEmployees, updatedEmployee]
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error adding/updating employee.";
      setErrorMessage(errorMessage);
      setTimeout(() => setErrorMessage(""), 3000);
      console.error("Error adding/updating employee:", error);
    }
  };

  console.log("Employees data:", employees);

  if (loading) return <LoadingSpinner />;

  return (
    <div className={styles.pageContainer}>
      <Sidebar />

      <div className={styles.contentContainer}>
        <div className={styles.mainContent}>
          <h1 className={styles.title}>Add New Account</h1>
          {/* <p className={styles.breadcrumb}>Home &gt; Add New Employees</p> */}

          {successMessage && (
            <div className={styles.popup}>{successMessage}</div>
          )}
          {errorMessage && <div className={styles.popup}>{errorMessage}</div>}

          <form className={styles.formContainer} onSubmit={handleSubmit}>
            <input
              name="employee_number"
              placeholder="Employee Number *"
              value={formData.employee_number}
              onChange={handleChange}
              required
            />
            <select
              name="user_type"
              value={formData.user_type}
              onChange={handleChange}
              required
            >
              <option value="">User Type</option>
              <option value="Admin">Admin</option>
              <option value="Instructor">Instructor</option>
              <option value="Others">Others</option>
            </select>

            <input
              name="first_name"
              placeholder="First Name *"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
            <input
              name="last_name"
              placeholder="Last Name *"
              value={formData.last_name}
              onChange={handleChange}
              required
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Prefer not to say</option>
              <option>Others</option>
            </select>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
            />

            <input
              name="father_name"
              placeholder="Father's Name"
              value={formData.father_name}
              onChange={handleChange}
            />
            <input
              name="mother_name"
              placeholder="Mother's Name"
              value={formData.mother_name}
              onChange={handleChange}
            />

            <select
              name="religion"
              value={formData.religion}
              onChange={handleChange}
              required
            >
              <option value="">Religion</option>
              <option>Islam</option>
              <option>Christian</option>
              <option>Hindu</option>
              <option>Buddhist</option>
              <option>Others</option>
            </select>
            <input
              type="date"
              name="joining_date"
              value={formData.joining_date}
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              name="contact_number"
              placeholder="Contact Number"
              value={formData.contact_number}
              onChange={handleChange}
            />

            <textarea
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className={styles.fullWidth}
            />

            <input
              name="program"
              placeholder="Program"
              value={formData.program}
              onChange={handleChange}
            />

            <input
              name="course"
              placeholder="Course"
              value={formData.course}
              onChange={handleChange}
            />
            <input
              name="section"
              placeholder="Section"
              value={formData.section}
              onChange={handleChange}
            />
            <input
              name="specification"
              placeholder="Specification"
              value={formData.specification}
              onChange={handleChange}
            />

            <input
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.saveButton}>
                {editMode ? "Update" : "Add"} Employee
              </button>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => {
                  setFormData(initialFormState);
                  setEditMode(false);
                  setEditId(null);
                }}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTable;
