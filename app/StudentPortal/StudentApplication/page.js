// This React component allows users to register student information, upload documents, and select a program.
// ChatGPT's assistance in handling state management, file uploads, form data handling, and program selection.

"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/studentapplication.css'
import Sidebar from '../components/Sidebar'; 
import styles1 from '../components/Sidebar.module.css';

const StudentRegistration = () => {
  // Set up initial state using React hooks
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [programs, setPrograms] = useState([]); // Store fetched program data
  const [formData, setFormData] = useState({
    student_number: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    dob: '',
    gender: '',
    age: '',
    nationality: '',
    place_of_birth: '',
    email: '',
    phone_number: '',
    home_address: '',
    emergency_contact_name: '',
    emergency_contact_phone: '',
    emergency_contact_relationship: '',
    previous_schools: '',
    year_of_graduation: '',
    gpa: '',
    program_id: '',
    diploma: null,
    form137: null,
    identification_card: null,
    photo: null,
    marriage_certificate: null,
    birth_certificate: null,
    good_moral: null,
    honorable_dismissal: null,
    report_card: null,
    terms_and_conditions: false,
    data_privacy_consent: false,
  });

  // Fetch student data when the component is mounted
  useEffect(() => {
    fetchStudentData();
  }, []); 

  const fetchStudentData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found');

      const res = await fetch('/api/students/student-data', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to fetch student data');
      }

      const data = await res.json();
      console.log('Fetched student data:', data); // Log the data

      // Update studentData and formData state with the fetched data
      setStudentData(data);
      setFormData((prev) => ({
        ...prev,
        student_number: data.studentNumber || '', // Ensure this matches the API response
      }));
    } catch (err) {
      console.error('Error fetching student data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch available programs (e.g., degree programs) from the API
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get('/api/students/student-registration');
        setPrograms(response.data);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    fetchPrograms();
  }, []);

  // Handle input field changes (text and checkboxes)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle file input changes (for documents)
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0], // Store the first file selected by the user
    }));
  };

  // Handle form submission to register the student
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the form data to the backend API for registration
      await axios.post('/api/students/student-registration', formData);
      alert('Student registered successfully!');
      router.push('/StudentPortal/student-dashboard'); // Navigate to the student dashboard after successful registration
    } catch (error) {
      console.error('Error registering student:', error);
      alert('Failed to register student.'); // Alert user on failure
    }
  };

  return (
    <div>
      {/* Sidebar Component - Displays student information in the sidebar */}
      <Sidebar
        className={styles1.container}
        studentNumber={studentData?.studentNumber || ''} // Display student number from state
      />
    
      {/* Student Registration Form */}
      <form onSubmit={handleSubmit}>
        <h2>Student Registration</h2>

        {/* Student Number Input */}
        <label>
          Student Number:
          <input 
            type="text" 
            name="student_number" 
            value={formData?.student_number || ''} // Use optional chaining and provide fallback value
            readOnly 
          />
        </label>

        {/* Input fields for student details */}
        <input type="text" name="first_name" placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="middle_name" placeholder="Middle Name" onChange={handleChange} />
        <input type="text" name="last_name" placeholder="Last Name" onChange={handleChange} required />
        <input type="date" name="dob" onChange={handleChange} required />
        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
        <input type="text" name="nationality" placeholder="Nationality" onChange={handleChange} required />
        <input type="text" name="place_of_birth" placeholder="Place of Birth" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="tel" name="phone_number" placeholder="Phone Number" onChange={handleChange} required />
        <input type="text" name="home_address" placeholder="Home Address" onChange={handleChange} required />
        <input type="text" name="emergency_contact_name" placeholder="Emergency Contact Name" onChange={handleChange} required />
        <input type="tel" name="emergency_contact_phone" placeholder="Emergency Contact Phone" onChange={handleChange} required />
        <input type="text" name="emergency_contact_relationship" placeholder="Relationship" onChange={handleChange} required />
        <input type="text" name="previous_schools" placeholder="Previous Schools" onChange={handleChange} />
        <input type="number" name="year_of_graduation" placeholder="Year of Graduation" onChange={handleChange} />
        <input type="number" name="gpa" placeholder="GPA" onChange={handleChange} />

        {/* Program selection dropdown */}
        <select name="program_id" onChange={handleChange}>
          <option value="">Select Program</option>
          {programs.map((program) => (
            <option key={program.id} value={program.id}>
              {`${program.program_name} ${program.major}`}
            </option>
          ))}
        </select>

        {/* File upload inputs for various documents */}
        <label>Form 137   <input type="file" name="form137" onChange={handleFileChange} /></label>
        <label>Diploma    <input type="file" name="diploma" onChange={handleFileChange} /></label>
        <label>Identification Card  <input type="file" name="identification_card" onChange={handleFileChange} /></label>
        <label>Photo  <input type="file" name="photo" onChange={handleFileChange} /></label>
        <label>Marriage Certificate <input type="file" name="marriage_certificate" onChange={handleFileChange} /></label>
        <label>Birth Certificate  <input type="file" name="birth_certificate" onChange={handleFileChange} /></label>
        <label>Good Moral Certificate  <input type="file" name="good_moral" onChange={handleFileChange} /></label>
        <label>Honorable Dismissal  <input type="file" name="honorable_dismissal" onChange={handleFileChange} /></label>
        <label>Report Card  <input type="file" name="report_card" onChange={handleFileChange} /></label>

        {/* Terms and conditions checkboxes */}
        <label>
          <input type="checkbox" name="terms_and_conditions" onChange={handleChange} required />
          I agree to the terms and conditions
        </label>
        
        <label>
          <input type="checkbox" name="data_privacy_consent" onChange={handleChange} required />
          I consent to data privacy terms
        </label>

        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default StudentRegistration;
