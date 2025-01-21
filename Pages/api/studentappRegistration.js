import sqlite3 from 'sqlite3';
import path from 'path';
import { promisify } from 'util';


// Constants
const dbPath = path.resolve('Database', 'studentsApp1.db');
console.log("Database path:", dbPath);

// API handler
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const formData = req.body;

      // Define required fields
      const requiredFields = [
        'studentNumber', 'firstName', 'lastName', 'dob', 'gender', 'age', 'nationality', 'placeOfBirth',
        'email', 'phoneNumber', 'homeAddress', 'emergencyContactName', 'emergencyContactPhoneNumber',
        'emergencyContactRelationship', 'previousSchools', 'yearOfGraduation', 'gpa', 'desiredProgram',
        'modeOfStudy', 'startDate', 'preferredCampus', 'termsAndConditions', 'dataPrivacyConsent'
      ];

      // Check for missing fields
      const missingFields = requiredFields.filter((field) => !formData[field]);
      if (missingFields.length > 0) {
        console.log('Missing fields:', missingFields);
        return res.status(400).json({
          message: 'Validation failed. Missing required fields.',
          missingFields,
        });
      }

      // Prepare database connection
      const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error('Database connection failed:', err.message);
          return res.status(500).json({ message: 'Database connection failed.' });
        }
      });

      const runQuery = promisify(db.run.bind(db));

      const insertQuery = `
        INSERT INTO students (
          studentNumber, firstName, middleName, lastName, dob, gender, age, nationality, placeOfBirth,
          email, phoneNumber, homeAddress, emergencyContactName, emergencyContactPhoneNumber,
          emergencyContactRelationship, previousSchools, yearOfGraduation, gpa, extracurricularActivities,
          specialAchievements, desiredProgram, modeOfStudy, startDate, preferredCampus,
          termsAndConditions, dataPrivacyConsent
        )
        VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
      `;

      const values = [
        formData.studentNumber, formData.firstName, formData.middleName || '', formData.lastName,
        formData.dob, formData.gender, formData.age, formData.nationality, formData.placeOfBirth,
        formData.email, formData.phoneNumber, formData.homeAddress, formData.emergencyContactName,
        formData.emergencyContactPhoneNumber, formData.emergencyContactRelationship,
        formData.previousSchools, formData.yearOfGraduation, formData.gpa,
        formData.extracurricularActivities || '', formData.specialAchievements || '',
        formData.desiredProgram, formData.modeOfStudy, formData.startDate, formData.preferredCampus,
        formData.termsAndConditions, formData.dataPrivacyConsent,
      ];

      await runQuery(insertQuery, values);

      res.status(201).json({ message: 'Student successfully registered.' });
    } catch (err) {
      console.error('Error:', err.message);
      res.status(500).json({ message: 'An error occurred.', error: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

