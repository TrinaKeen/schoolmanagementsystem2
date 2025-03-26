"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

export default function AddStudent() {
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    dob: "",
    age: "",
    gender: "",
    nationality: "",
    email: "",
    phone_number: "",
    home_address: "",
    emergency_contact_relationship: "",
    emergency_contact_name: "",
    emergency_contact_phone: "",
    previous_schools: "",
    year_of_graduation: "",
    gpa: "",
    program_id: "",
    diploma: "",
    form137: "",
    identification_card: "",
    photo: "",
    marriage_certificate: "",
    birth_certificate: "",
    good_moral: "",
    honorable_dismissal: "",
    report_card: "",
    terms_and_conditions: false,
    data_privacy_consent: false,
    application_submitted_at: new Date().toISOString(),
  });

  const [programs, setPrograms] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0], // Save only the first file selected
    }));
  };

  // Fetch available programs from the API
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get('/api/admin/add-student'); // Ensure the API endpoint is correct
        setPrograms(response.data);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    fetchPrograms();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a FormData object to send the files
    const formDataToSend = new FormData();
  
    // Append form data fields to the FormData object
    for (const key in formData) {
      if (formData[key] instanceof File) {
        // If the field is a file, append it as a file
        formDataToSend.append(key, formData[key]);
      } else {
        // Otherwise, append the value as text
        formDataToSend.append(key, formData[key]);
      }
    }
  
    try {
      const response = await fetch("/api/admin/add-student", {
        method: "POST",
        body: formDataToSend, // Send FormData instead of JSON
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Show success popup message
        setPopupMessage("Student added successfully!");
        setShowPopup(true);
  
        // Reset form data after submission
        setFormData({
          first_name: "",
          middle_name: "",
          last_name: "",
          dob: "",
          age: "",
          gender: "",
          nationality: "",
          email: "",
          phone_number: "",
          home_address: "",
          emergency_contact_relationship: "",
          emergency_contact_name: "",
          emergency_contact_phone: "",
          previous_schools: "",
          year_of_graduation: "",
          gpa: "",
          program_id: "",
          diploma: "",
          form137: "",
          identification_card: "",
          photo: "",
          marriage_certificate: "",
          birth_certificate: "",
          good_moral: "",
          honorable_dismissal: "",
          report_card: "",
          terms_and_conditions: false,
          data_privacy_consent: false,
          application_submitted_at: new Date().toISOString(),
        });
      } else {
        // Handle specific error messages
        if (data.error && data.error.includes("Email is already in use")) {
          setPopupMessage("The email you entered is already associated with an existing student. Please use a different email.");
          setShowPopup(true);
        } else {
          setPopupMessage(`Error: ${data.error}`);
          setShowPopup(true);
        }
      }
    } catch (error) {
      console.error("Failed to add student", error);
      setPopupMessage("Something went wrong!");
      setShowPopup(true);
    }
  };
  

  // Close popup when the user clicks close button
  const closePopup = () => setShowPopup(false);

  return (
    <div>
      <Sidebar/>
      <br></br>
    
    <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-lg">
      
      <h2 className="text-2xl font-bold mb-4">Add New Student</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
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
        <input  type="text"  name="place_of_birth"  placeholder="Place of Birth"  onChange={handleChange}  required />
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
        <select name="program_id" onChange={handleChange} required>
          <option value="">Select Program</option>
          {programs.length > 0 ? (
            programs.map((program) => (
              <option key={program.id} value={program.id}>
                {`${program.program_name} ${program.major}`}
              </option>
            ))
          ) : (
            <option disabled>No programs available</option>
          )}
        </select>

        {/* File upload inputs for various documents */}
        <label>Form 137 <input type="file" name="form137" onChange={handleFileChange} /></label>
        <label>Diploma <input type="file" name="diploma" onChange={handleFileChange} /></label>
        <label>Identification Card <input type="file" name="identification_card" onChange={handleFileChange} /></label>
        <label>Photo  <br></br><input type="file" name="photo" onChange={handleFileChange} /></label>
        <label>Marriage Certificate <input type="file" name="marriage_certificate" onChange={handleFileChange} /></label>
        <label>Birth Certificate <input type="file" name="birth_certificate" onChange={handleFileChange} /></label>
        <label>Good Moral Certificate <input type="file" name="good_moral" onChange={handleFileChange} /></label>
        <label>Honorable Dismissal <input type="file" name="honorable_dismissal" onChange={handleFileChange} /></label>
        <label>Report Card <input type="file" name="report_card" onChange={handleFileChange} /></label>
        <br></br>
        {/* Terms and conditions checkboxes */}

        
        <label>
          <input type="checkbox" name="data_privacy_consent" onChange={handleChange} required />
          I consent to data privacy terms
        </label>
        <label>
          <input type="checkbox" name="terms_and_conditions" onChange={handleChange} required />
          I agree to the terms and conditions
        </label>

        <button type="submit">Submit Application</button>
      </form>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>{popupMessage}</p>
            <button onClick={closePopup} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
