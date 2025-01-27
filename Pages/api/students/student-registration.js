import { query } from '/Database/db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      firstname,
      middlename,
      lastname,
      dob,
      gender,
      age,
      nationality,
      placeofbirth,
      email,
      phonenumber,
      homeaddress,
      emergencycontactname,
      emergencycontactphonenumber,
      emergencycontactrelationship,
      previousschools,
      yearofgraduation,
      gpa,
      extracurricularactivities,
      specialachievements,
      desiredprogram,
      modeofstudy,
      startdate,
      preferredcampus,
      identityproof,
      transcripts,
      letterofrecommendation,
      resume,
      photo,
      termsandconditions,
      dataprivacyconsent,
      studentnumber,
    } = req.body;

    // Validate required fields
    if (!studentnumber || !firstname || !lastname || !email || !termsandconditions) {
      console.error('Validation Error: Missing required fields!', req.body);
      return res.status(400).json({ message: 'Missing required fields!' });
    }

    // Check if the student already exists
    const checkStudentQuery = 'SELECT * FROM students WHERE email = $1';
    const existingStudent = await query(checkStudentQuery, [email]);

    if (existingStudent.length > 0) {
      return res.status(400).json({ message: 'Student with this email already exists.' });
    }

    // Insert the new student into the database
    const insertQuery = `
      INSERT INTO students (
        firstname, middlename, lastname, dob, gender, age, nationality, placeofbirth, 
        email, phonenumber, homeaddress, emergencycontactname, emergencycontactphonenumber, 
        emergencycontactrelationship, previousschools, yearofgraduation, gpa, extracurricularactivities, 
        specialachievements, desiredprogram, modeofstudy, startdate, preferredcampus, identityproof, 
        transcripts, letterofrecommendation, resume, photo, termsandconditions, dataprivacyconsent, studentnumber
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, 
        $23, $24, $25, $26, $27, $28, $29, $30
      )`;
    
    const values = [
      firstname,
      middlename,
      lastname,
      dob,
      gender,
      age,
      nationality,
      placeofbirth,
      email,
      phonenumber,
      homeaddress,
      emergencycontactname,
      emergencycontactphonenumber,
      emergencycontactrelationship,
      previousschools,
      yearofgraduation,
      gpa,
      extracurricularactivities,
      specialachievements,
      desiredprogram,
      modeofstudy,
      startdate,
      preferredcampus,
      identityproof,
      transcripts,
      letterofrecommendation,
      resume,
      photo,
      termsandconditions,
      dataprivacyconsent,
      studentnumber,
    ];

    try {
      const result = await query(insertQuery, values);
      
      // Generate a JWT token
      const token = jwt.sign(
        { email, studentnumber },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Respond with success message and the JWT token
      res.status(200).json({ success: true, message: 'Student added successfully', token, result });
    } catch (dbError) {
      console.error('Database Error:', dbError);
      return res.status(500).json({ success: false, message: 'Database error occurred', error: dbError.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
