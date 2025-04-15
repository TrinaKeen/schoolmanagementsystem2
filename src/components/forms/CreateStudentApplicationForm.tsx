"use client";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

// Define the type for the form data
interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  dob: string;
  gender: string;
  age: string;
  nationality: string;
  placeOfBirth: string;
  email: string;
  phoneNumber: string;
  homeAddress: string;
  emergencyContactName: string;
  emergencyContactPhoneNumber: string;
  emergencyContactRelationship: string;
  previousSchools: string;
  yearOfGraduation: string;
  gpa: string;
  programId: string;
  documentType: string;
  documentFiles: { [key: string]: File | null };
}

// Program type to represent program data
interface Program {
  id: string;
  programName: string;
  programDescription: string;
}

const CreateStudentApplicationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    age: "",
    nationality: "",
    placeOfBirth: "",
    email: "",
    phoneNumber: "",
    homeAddress: "",
    emergencyContactName: "",
    emergencyContactPhoneNumber: "",
    emergencyContactRelationship: "",
    previousSchools: "",
    yearOfGraduation: "",
    gpa: "",
    programId: "",
    documentType: "Documents",
    documentFiles: {
        diploma: null,
        form137: null,
        identification_card: null,
        photo: null,
        marriage_certificate: null,
        birth_certificate: null,
        good_moral: null,
        honorable_dismissal: null,
        report_card: null,
      },
  });

  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    // Fetch programs from the API when the component mounts
    const fetchPrograms = async () => {
      try {
        const response = await axios.get("/api/programs");
        setPrograms(response.data); // Assuming the response data is an array of programs
      } catch (error) {
        console.error("Error fetching programs:", error);
      }
    };

    fetchPrograms();
  }, []);

  // Handle input field changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file upload changes
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const documentType = e.target.name;
      setFormData({
        ...formData,
        documentFiles: {
          ...formData.documentFiles,
          [documentType]: e.target.files[0],
        },
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    // Validate required fields
    const requiredKeys = Object.keys(formData).filter((key) => key !== "documentFiles");
    const missingFields = requiredKeys.filter((key) => !formData[key as keyof FormData]);
  
    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields:\n${missingFields.join(", ")}`);
      return;
    }
  
    const formDataToSend = new FormData();
  
    // Append text fields
    requiredKeys.forEach((key) => {
      formDataToSend.append(key, formData[key as keyof FormData] as string);
    });
  
    // Append uploaded files
    Object.keys(formData.documentFiles).forEach((docType) => {
      const file = formData.documentFiles[docType];
      if (file) {
        formDataToSend.append(docType, file);
      }
    });
  
    try {
      const response = await axios.post("/api/studentApplications", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    
      if (response.status === 200) {
        alert("Your application is successfully submitted!");
    
  
      // ✅ Reset the form state
      
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        dob: "",
        gender: "",
        age: "",
        nationality: "",
        placeOfBirth: "",
        email: "",
        phoneNumber: "",
        homeAddress: "",
        emergencyContactName: "",
        emergencyContactPhoneNumber: "",
        emergencyContactRelationship: "",
        previousSchools: "",
        yearOfGraduation: "",
        gpa: "",
        programId: "",
        documentType: "Documents",
        documentFiles: {
          diploma: null,
          form137: null,
          identification_card: null,
          photo: null,
          marriage_certificate: null,
          birth_certificate: null,
          good_moral: null,
          honorable_dismissal: null,
          report_card: null,
        },
      });
  
   // ✅ Optionally reset the file input elements manually
   const fileInputs = document.querySelectorAll<HTMLInputElement>('input[type="file"]');
    fileInputs.forEach((input) => (input.value = ""));
  } else {
    // If the server returns a non-200 status, show error
    alert("Failed to submit application. Please try again.");
  }
} catch (error: any) {
  console.error("Submission error:", error);

  // Check if it's an Axios error with response
  if (error.response) {
    alert("Your application is successfully submitted!");

    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      dob: "",
      gender: "",
      age: "",
      nationality: "",
      placeOfBirth: "",
      email: "",
      phoneNumber: "",
      homeAddress: "",
      emergencyContactName: "",
      emergencyContactPhoneNumber: "",
      emergencyContactRelationship: "",
      previousSchools: "",
      yearOfGraduation: "",
      gpa: "",
      programId: "",
      documentType: "",
      documentFiles: {
        diploma: null,
        form137: null,
        identification_card: null,
        photo: null,
        marriage_certificate: null,
        birth_certificate: null,
        good_moral: null,
        honorable_dismissal: null,
        report_card: null,
      },
    });
  } else {
    alert("Failed to submit application. Please try again.");
  }
}}
  
  
  // In your component render:
  const [missingFields, setMissingFields] = useState<string[]>([]);  
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
  <div>
    <label className="block">First Name</label>
    <input
      type="text"
      name="firstName"
      value={formData.firstName}
      onChange={handleChange}
      className="w-full border p-2"
      required
    />
  </div>
  <div>
    <label className="block">Middle Name</label>
    <input
      type="text"
      name="middleName"
      value={formData.middleName}
      onChange={handleChange}
      className="w-full border p-2"
      required
    />
  </div>
  <div>
    <label className="block">Last Name</label>
    <input
      type="text"
      name="lastName"
      value={formData.lastName}
      onChange={handleChange}
      className="w-full border p-2"
      required
    />
  </div>
  <div>
    <label className="block">Date of Birth</label>
    <input
      type="date"
      name="dob"
      value={formData.dob}
      onChange={handleChange}
      className="w-full border p-2"
      required
    />
  </div>
  <div>
  <label className="block">Gender</label>
  <select
    name="gender"
    value={formData.gender}
    onChange={handleChange}
    className="w-full border p-2"
    required
  >
    <option value="">Select Gender</option>
    <option value="Female">Female</option>
    <option value="Male">Male</option>
    <option value="Others">Others</option>
  </select>
</div>

  <div>
    <label className="block">Age</label>
    <input
      type="number"
      name="age"
      value={formData.age}
      onChange={handleChange}
      className="w-full border p-2"
      required
    />
  </div>
  <div>
    <label className="block">Nationality</label>
    <input
      type="text"
      name="nationality"
      value={formData.nationality}
      onChange={handleChange}
      className="w-full border p-2"
      required
    />
  </div>
  <div>
    <label className="block">Place of Birth</label>
    <input
      type="text"
      name="placeOfBirth"
      value={formData.placeOfBirth}
      onChange={handleChange}
      className="w-full border p-2"
      required
    />
  </div>
  <div>
    <label className="block">Email</label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      className="w-full border p-2"
      required
    />
  </div>
  <div>
    <label className="block">Phone Number</label>
    <input
      type="text"
      name="phoneNumber"
      value={formData.phoneNumber}
      onChange={handleChange}
      className="w-full border p-2"
      required
    />
  </div>
  <div>
    <label className="block">Home Address</label>
    <input
      type="text"
      name="homeAddress"
      value={formData.homeAddress}
      onChange={handleChange}
      className="w-full border p-2"
      required
    />
  </div>
  <div>
    <label className="block">Emergency Contact Name</label>
    <input
      type="text"
      name="emergencyContactName"
      value={formData.emergencyContactName}
      onChange={handleChange}
      className="w-full border p-2"
      required
    />
  </div>
  <div>
    <label className="block">Emergency Contact Phone Number</label>
    <input
      type="text"
      name="emergencyContactPhoneNumber"
      value={formData.emergencyContactPhoneNumber}
      onChange={handleChange}
      className="w-full border p-2"
      required
    />
  </div>
  <div>
    <label className="block">Emergency Contact Relationship</label>
    <input
      type="text"
      name="emergencyContactRelationship"
      value={formData.emergencyContactRelationship}
      onChange={handleChange}
      className="w-full border p-2"
      required
    />
  </div>
  <div>
    <label className="block">Previous Schools</label>
    <input
      type="text"
      name="previousSchools"
      value={formData.previousSchools}
      onChange={handleChange}
      className="w-full border p-2"
      required
    />
  </div>
  <div>
    <label className="block">Year of Graduation</label>
    <input
      type="number"
      name="yearOfGraduation"
      value={formData.yearOfGraduation}
      onChange={handleChange}
      className="w-full border p-2"
      required
    />
  </div>
  <div>
    <label className="block">GPA</label>
    <input
      type="number"
      step="0.1"
      name="gpa"
      value={formData.gpa}
      onChange={handleChange}
      className="w-full border p-2"
      required
    />
  </div>
  <div>
    <label className="block">Program</label>
    <select
      name="programId"
      value={formData.programId}
      onChange={handleChange}
      className="w-full border p-2"
      required
    >
      <option value="">Select Program</option>
      {programs.map((program) => (
        <option key={program.id} value={program.id}>
          {program.programName} ({program.programDescription})
        </option>
      ))}
    </select>
  </div>


   {/* Document upload section with multiple options */}
   {Object.keys(formData.documentFiles).map((docType) => (
        <div key={docType}>
          <label className="block">{docType.replace(/_/g, ' ').toUpperCase()}</label>
          <input
            type="file"
            name={docType}
            onChange={handleFileChange}
            className="w-full border p-2"
          />
        </div>
      ))}

      {/* Display missing fields if any */}
      {missingFields.length > 0 && (
  <div style={{ color: 'red', marginTop: '10px' }}>
    <p>Missing fields: {missingFields.join(', ')}</p>
  </div>
)}


  <button
    type="submit"
    className="bg-blue-500 text-white py-2 px-4 rounded"
  >
    Submit Application
  </button>
</form>

  );
};

export default CreateStudentApplicationForm;
