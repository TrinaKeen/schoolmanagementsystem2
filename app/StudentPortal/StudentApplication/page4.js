"use client"
import { useState, useEffect } from 'react';
import '../components/studentapplication.css';
import Sidebar from '../components/Sidebar'; 
import styles1 from '../components/Sidebar.module.css';

export default function CreateStudent() {
    const [studentData, setStudentData] = useState(null); 
    const [formData, setFormData] = useState({
      studentnumber: '',
      firstname: '',
      middlename: '',
      lastname: '',
      dob: '',
      gender: '',
      age: '',
      nationality: '',
      placeofbirth: '',
      email: '',
      phonenumber: '',
      homeaddress: '',
      emergencycontactname: '',
      emergencycontactphonenumber: '',
      emergencycontactrelationship: '',
      previousschools: '',
      yearofgraduation: '',
      gpa: '',
      extracurricularactivities: '',
      specialachievements: '',
      desiredprogram: '',
      modeofstudy: '',
      startdate: '',
      preferredcampus: '',
      identityproof: '',
      transcripts: '',
      letterofrecommendation: '',
      resume: '',
      photo: '',
      termsandconditions: false,
      dataprivacyconsent: false,
      applicationstatus: 'Pending',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchStudentData();
      }, []);
    
      const fetchStudentData = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) throw new Error('Token not found');
    
          console.log('Fetching student data with token:', token); // Log the token for debugging
    
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
          setStudentData(data);
        } catch (err) {
          console.error('Error fetching student data:', err); // Log the error
          setError(err.message || 'An unexpected error occurred');
        } finally {
          setLoading(false);
        }
      };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch('/api/auth/student-registration', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
          });

          if (response.ok) {
              alert('Admission application submitted successfully!');
          } else {
              const errorData = await response.json();
              alert(errorData.error || 'Failed to submit admission application');
          }
      } catch (error) {
          console.error('Error submitting admission application:', error);
          alert('An unexpected error occurred. Please try again later.');
      }
    };
  

    return (
      <div>
        {/* Sidebar */}
        <Sidebar
        className={styles1.container}
        studentNumber={studentData?.studentNumber || ''}
      />

     

      <div className="form-container">
      <h1>Student Registration for Admission</h1>
        <form onSubmit={handleSubmit}>
        <label>
    Student Number:
    <input type="text" name="studentnumber" value={formData.studentnumber} onChange={handleChange} readOnly />
</label>

           
            <label>
                First Name:
                <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
            </label>
            <label>
                Middle Name:
                <input type="text" name="middlename" value={formData.middlename} onChange={handleChange} />
            </label>
            <label>
                Last Name:
                <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
            </label>
            <label>
                Date of Birth:
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
            </label>
            <label>
                Gender:
                <input type="text" name="gender" value={formData.gender} onChange={handleChange} />
            </label>
            <label>
                Age:
                <input type="number" name="age" value={formData.age} onChange={handleChange} />
            </label>
            <label>
                Nationality:
                <input type="text" name="nationality" value={formData.nationality} onChange={handleChange} />
            </label>
            <label>
                Place of Birth:
                <input type="text" name="placeofbirth" value={formData.placeofbirth} onChange={handleChange} />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>
            <label>
                Phone Number:
                <input type="text" name="phonenumber" value={formData.phonenumber} onChange={handleChange} />
            </label>
            <label>
                Home Address:
                <input type="text" name="homeaddress" value={formData.homeaddress} onChange={handleChange} />
            </label>
            <label>
                Emergency Contact Name:
                <input type="text" name="emergencycontactname" value={formData.emergencycontactname} onChange={handleChange} />
            </label>
            <label>
                Emergency Contact Phone Number:
                <input type="text" name="emergencycontactphonenumber" value={formData.emergencycontactphonenumber} onChange={handleChange} />
            </label>
            <label>
                Emergency Contact Relationship:
                <input type="text" name="emergencycontactrelationship" value={formData.emergencycontactrelationship} onChange={handleChange} />
            </label>
            <label>
                Previous Schools:
                <input type="text" name="previousschools" value={formData.previousschools} onChange={handleChange} />
            </label>
            <label>
                Year of Graduation:
                <input type="number" name="yearofgraduation" value={formData.yearofgraduation} onChange={handleChange} />
            </label>
            <label>
                GPA:
                <input type="number" step="0.1" name="gpa" value={formData.gpa} onChange={handleChange} />
            </label>
            <label>
                Extracurricular Activities:
                <input type="text" name="extracurricularactivities" value={formData.extracurricularactivities} onChange={handleChange} />
            </label>
            <label>
                Special Achievements:
                <input type="text" name="specialachievements" value={formData.specialachievements} onChange={handleChange} />
            </label>
            <label>
                Desired Program:
                <input type="text" name="desiredprogram" value={formData.desiredprogram} onChange={handleChange} />
            </label>
            <label>
                Mode of Study:
                <input type="text" name="modeofstudy" value={formData.modeofstudy} onChange={handleChange} />
            </label>
            <label>
                Start Date:
                <input type="date" name="startdate" value={formData.startdate} onChange={handleChange} />
            </label>
            <label>
                Preferred Campus:
                <input type="text" name="preferredcampus" value={formData.preferredcampus} onChange={handleChange} />
            </label>
            <label>
                Identity Proof:
                <input type="file" name="identityproof" onChange={handleChange} />
            </label>
            <label>
                Transcripts:
                <input type="file" name="transcripts" onChange={handleChange} />
            </label>
            <label>
                Letter of Recommendation:
                <input type="file" name="letterofrecommendation" onChange={handleChange} />
            </label>
            <label>
                Resume:
                <input type="file" name="resume" onChange={handleChange} />
            </label>
            <label>
                Photo:
                <input type="file" name="photo" onChange={handleChange} />
            </label>
            <label>
                Terms and Conditions:
                <input type="checkbox" name="termsandconditions" checked={formData.termsandconditions} onChange={handleChange} />
            </label>
            <label>
                Data Privacy Consent:
                <input type="checkbox" name="dataprivacyconsent" checked={formData.dataprivacyconsent} onChange={handleChange} />
            </label>
            

            <button type="submit">Create Student</button>
        </form>
        </div>
        </div>
    );
}
