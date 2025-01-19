'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';  // Use router to handle navigation
import '../components/studentapplication.css'; // Import the CSS file

export default function StudentApplication() {
  const [step, setStep] = useState(1);  // Step for multi-page form
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    gender: '',
    age: '',
    nationality: '',
    placeOfBirth: '',

    // Contact Information
    email: '',
    phoneNumber: '',
    homeAddress: '',
    emergencyContactName: '',
    emergencyContactPhoneNumber: '',
    emergencyContactRelationship: '',

    // Educational History
    previousSchools: '',
    yearOfGraduation: '',
    gpa: '',
    extracurricularActivities: '',
    specialAchievements: '',

    // Program Information
    desiredProgram: '',
    modeOfStudy: '',
    startDate: '',
    preferredCampus: '',

    // Documents
    identityProof: null,
    transcripts: null,
    letterOfRecommendation: null,
    resume: null,
    photo: null,

    // Consent and Agreement
    termsAndConditions: false,
    dataPrivacyConsent: false,
  });

  const router = useRouter();

  // Handle input change for form fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  // Handle form submission (after final step)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);  // For now, log the data to console
    // Here you can submit the data to the backend or store it in a database
    router.push('/success');  // Navigate to a success page
  };

  return (
    <div className="form-container">
      <h1>Student Enrollment Application</h1>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="form-page">
            <h2>1. Personal Information</h2>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="middleName">Middle Name:</label>
              <input
                type="text"
                id="middleName"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender:</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="age">Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="nationality">Nationality:</label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="placeOfBirth">Place of Birth:</label>
              <input
                type="text"
                id="placeOfBirth"
                name="placeOfBirth"
                value={formData.placeOfBirth}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-buttons">
              <button type="button" onClick={() => setStep(2)}>
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-page">
            <h2>2. Contact Information</h2>
            <div className="form-group">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="homeAddress">Home Address:</label>
              <input
                type="text"
                id="homeAddress"
                name="homeAddress"
                value={formData.homeAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="emergencyContactName">Emergency Contact Name:</label>
              <input
                type="text"
                id="emergencyContactName"
                name="emergencyContactName"
                value={formData.emergencyContactName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="emergencyContactPhoneNumber">Emergency Contact Phone Number:</label>
              <input
                type="tel"
                id="emergencyContactPhoneNumber"
                name="emergencyContactPhoneNumber"
                value={formData.emergencyContactPhoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="emergencyContactRelationship">Emergency Contact Relationship:</label>
              <select
                id="emergencyContactRelationship"
                name="emergencyContactRelationship"
                value={formData.emergencyContactRelationship}
                onChange={handleChange}
                required
              >
                <option value="">Select Relationship</option>
                <option value="Parent">Parent</option>
                <option value="Sibling">Sibling</option>
                <option value="Relative">Relative</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-buttons">
              <button type="button" onClick={() => setStep(1)}>
                Back
              </button>
              <button type="button" onClick={() => setStep(3)}>
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-page">
            <h2>3. Educational History</h2>
            <div className="form-group">
              <label htmlFor="previousSchools">Previous Schools Attended:</label>
              <input
                type="text"
                id="previousSchools"
                name="previousSchools"
                value={formData.previousSchools}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="yearOfGraduation">Year of Graduation:</label>
              <input
                type="number"
                id="yearOfGraduation"
                name="yearOfGraduation"
                value={formData.yearOfGraduation}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="gpa">GPA/Grade Performance:</label>
              <input
                type="text"
                id="gpa"
                name="gpa"
                value={formData.gpa}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="extracurricularActivities">Extracurricular Activities:</label>
              <input
                type="text"
                id="extracurricularActivities"
                name="extracurricularActivities"
                value={formData.extracurricularActivities}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="specialAchievements">Special Achievements:</label>
              <input
                type="text"
                id="specialAchievements"
                name="specialAchievements"
                value={formData.specialAchievements}
                onChange={handleChange}
              />
            </div>
            <div className="form-buttons">
              <button type="button" onClick={() => setStep(2)}>
                Back
              </button>
              <button type="button" onClick={() => setStep(4)}>
                Next
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="form-page">
            <h2>4. Program Information</h2>
            <div className="form-group">
              <label htmlFor="desiredProgram">Desired Program of Study:</label>
              <input
                type="text"
                id="desiredProgram"
                name="desiredProgram"
                value={formData.desiredProgram}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="modeOfStudy">Mode of Study:</label>
              <select
                id="modeOfStudy"
                name="modeOfStudy"
                value={formData.modeOfStudy}
                onChange={handleChange}
                required
              >
                <option value="">Select Mode</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Online">Online</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="preferredCampus">Preferred Campus Location:</label>
              <input
                type="text"
                id="preferredCampus"
                name="preferredCampus"
                value={formData.preferredCampus}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-buttons">
              <button type="button" onClick={() => setStep(3)}>
                Back
              </button>
              <button type="button" onClick={() => setStep(5)}>
                Next
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="form-page">
            <h2>5. Documents</h2>
            <div className="form-group">
              <label htmlFor="identityProof">Proof of Identity:</label>
              <input
                type="file"
                id="identityProof"
                name="identityProof"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="transcripts">Transcripts:</label>
              <input
                type="file"
                id="transcripts"
                name="transcripts"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="letterOfRecommendation">Letter of Recommendation:</label>
              <input
                type="file"
                id="letterOfRecommendation"
                name="letterOfRecommendation"
                onChange={handleFileChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="resume">Resume:</label>
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={handleFileChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="photo">Photo:</label>
              <input
                type="file"
                id="photo"
                name="photo"
                onChange={handleFileChange}
              />
            </div>
            <div className="form-buttons">
              <button type="button" onClick={() => setStep(4)}>
                Back
              </button>
              <button type="button" onClick={() => setStep(6)}>
                Next
              </button>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="form-page">
            <h2>6. Consent and Agreement</h2>
            <div className="form-group">
              <label htmlFor="termsAndConditions">
                Do you agree to the terms and conditions?
              </label>
              <input
                type="checkbox"
                id="termsAndConditions"
                name="termsAndConditions"
                checked={formData.termsAndConditions}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dataPrivacyConsent">
                Do you consent to the collection and use of your data?
              </label>
              <input
                type="checkbox"
                id="dataPrivacyConsent"
                name="dataPrivacyConsent"
                checked={formData.dataPrivacyConsent}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-buttons">
              <button type="button" onClick={() => setStep(5)}>
                Back
              </button>
              <button type="submit">Submit</button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
