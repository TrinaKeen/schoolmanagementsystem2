"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../components/AccountInformation.module.css"; 
import Sidebar from "../components/Sidebar";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employee_number: '',
    first_name: '',
    last_name: '',
    user_type: '',
    gender: '',
    father_name: '',
    mother_name: '',
    date_of_birth: '',
    religion: '',
    joining_date: '',
    email: '',
    contact_number: '',
    address: '',
    program: '',
    course: '',
    section: '',
    specification: '',
    username: '',
    password: '',
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await axios.get("/api/admin/account-setting");
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
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
        await axios.put("/api/admin/account-setting", { ...formData, id: editId });
      } else {
        await axios.post("/api/admin/account-setting", formData);
      }
      setSuccessMessage("Employee added successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      setFormData({
        employee_number: '',
        first_name: '',
        last_name: '',
        user_type: '',
        gender: '',
        father_name: '',
        mother_name: '',
        date_of_birth: '',
        religion: '',
        joining_date: '',
        email: '',
        contact_number: '',
        address: '',
        program: '',
        course: '',
        section: '',
        specification: '',
        username: '',
        password: '',
      });
      setEditMode(false);
      setEditId(null);
      // Reload employees
      const { data } = await axios.get("/api/admin/account-setting");
      setEmployees(data);
    } catch (error) {
      setErrorMessage("Error adding/updating employee. Please check the employee number.");
      setTimeout(() => setErrorMessage(""), 3000);
      console.error("Error adding/updating employee:", error);
    }
  };

  const handleEdit = (employee) => {
    setFormData(employee);
    setEditMode(true);
    setEditId(employee.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/admin/account-setting?id=${id}`);
    // Reload employees
    const { data } = await axios.get("/api/admin/account-setting");
    setEmployees(data);
  };

  return (
    <div  style={{ backgroundColor: 'white', height: '100vh', color: 'black' }}>
       <Sidebar/>
    
    <div className={styles.pageContainer}>
     
      <div className={styles.contentContainer}>
        <div className={styles.employeeContainer}>
        <h2 className={styles.employeeHeading}>Add New Account</h2>

        {/* Success message display */}
        {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

        {/* Error message display */}
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}

        <form className={styles.employeeForm} onSubmit={handleSubmit}>
          <input
            type="text"
            name="employee_number"
            placeholder="Employee Number"
            value={formData.employee_number}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
          <select name="user_type" value={formData.user_type} onChange={handleChange} required>
            <option value="">User Type</option>
            <option value="Admin">Admin</option>
            <option value="Instructor">Instructor</option>
            <option value="Others">Others</option>
          </select>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
          <input
            type="text"
            name="father_name"
            placeholder="Father's Name"
            value={formData.father_name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="mother_name"
            placeholder="Mother's Name"
            value={formData.mother_name}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleChange}
          />
          <select name="religion" value={formData.religion} onChange={handleChange} required>
            <option value="">Religion</option>
            <option value="Islam">Islam</option>
            <option value="Christian">Christian</option>
            <option value="Hindu">Hindu</option>
            <option value="Buddhist">Buddhist</option>
            <option value="Others">Others</option>
          </select>
          <input
            type="date"
            name="joining_date"
            value={formData.joining_date}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
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
          />
          <input
            type="text"
            name="program"
            placeholder="Program"
            value={formData.program}
            onChange={handleChange}
          />
          <input
            type="text"
            name="course"
            placeholder="Course"
            value={formData.course}
            onChange={handleChange}
          />
          <input
            type="text"
            name="section"
            placeholder="Section"
            value={formData.section}
            onChange={handleChange}
          />
          <input
            type="text"
            name="specification"
            placeholder="Specification"
            value={formData.specification}
            onChange={handleChange}
          />
          <input
            type="text"
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
          <button type="submit">{editMode ? "Update" : "Add"} Employee</button>
        </form>
        </div>

        <div className={styles.employeeCardContainer}>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <div key={employee.id} className={styles.employeeCard}>
                <h3>{employee.first_name} {employee.last_name}</h3>
                <p><strong>Employee Number:</strong> {employee.employee_number}</p>
                <p><strong>Email:</strong> {employee.email}</p>
                <div>
                  <button onClick={() => handleEdit(employee)}>Edit</button>
                  <button className={styles.delete} onClick={() => handleDelete(employee.id)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <div>No employees found.</div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default EmployeeTable;
