import sqlite3 from 'sqlite3';
import path from 'path';
import { promisify } from 'util';

// Set the database path
const dbPath = path.resolve('Database', 'studentsApp.db'); // Adjust path as needed

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const {
    firstName,
    middleName,
    lastName,
    dob,
    gender,
    age,
    nationality,
    placeOfBirth,
    email,
    phoneNumber,
    homeAddress,
    emergencyContactName,
    emergencyContactPhoneNumber,
    emergencyContactRelationship,
    previousSchools,
    yearOfGraduation,
    gpa,
    extracurricularActivities,
    specialAchievements,
    desiredProgram,
    modeOfStudy,
    startDate,
    preferredCampus,
    identityProof,
    transcripts,
    letterOfRecommendation,
    resume,
    photo,
    termsAndConditions,
    dataPrivacyConsent,
  } = req.body;

  // Validate input fields
  if (
    !firstName || !lastName || !dob || !gender || !age || !nationality || !placeOfBirth ||
    !email || !phoneNumber || !homeAddress || !emergencyContactName || !emergencyContactPhoneNumber ||
    !emergencyContactRelationship || !previousSchools || !yearOfGraduation || !gpa ||
    !desiredProgram || !modeOfStudy || !startDate || !preferredCampus || !identityProof ||
    !transcripts || !letterOfRecommendation || !resume || !photo || !termsAndConditions || !dataPrivacyConsent
  ) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Initialize the database
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Failed to connect to the database:', err.message);
      return res.status(500).json({ message: 'Failed to connect to the database.', error: err.message });
    }
  });

  // Promisify the run function for easier async/await usage
  const runQuery = promisify(db.run.bind(db));

  const insertQuery = `
    INSERT INTO students (
      firstName, middleName, lastName, dob, gender, age, nationality, placeOfBirth,
      email, phoneNumber, homeAddress, emergencyContactName, emergencyContactPhoneNumber,
      emergencyContactRelationship, previousSchools, yearOfGraduation, gpa, extracurricularActivities,
      specialAchievements, desiredProgram, modeOfStudy, startDate, preferredCampus,
      identityProof, transcripts, letterOfRecommendation, resume, photo,
      termsAndConditions, dataPrivacyConsent
    )
    VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    )
  `;

  const values = [
    firstName, middleName, lastName, dob, gender, age, nationality, placeOfBirth,
    email, phoneNumber, homeAddress, emergencyContactName, emergencyContactPhoneNumber,
    emergencyContactRelationship, previousSchools, yearOfGraduation, gpa, extracurricularActivities,
    specialAchievements, desiredProgram, modeOfStudy, startDate, preferredCampus,
    identityProof, transcripts, letterOfRecommendation, resume, photo,
    termsAndConditions, dataPrivacyConsent
  ];

  try {
    // Insert data into the database
    await runQuery(insertQuery, values);

    // Get the last inserted row id to generate student number
    db.get('SELECT last_insert_rowid()', async (err, row) => {
      if (err) {
        console.error('Error fetching last inserted row id:', err.message);
        return res.status(500).json({ message: 'Failed to retrieve last inserted row id.' });
      }

      const studentNumber = `S${row['last_insert_rowid']}`;
      const updateQuery = 'UPDATE students SET studentNumber = ? WHERE id = ?';
      
      // Update the student number
      await runQuery(updateQuery, [studentNumber, row['last_insert_rowid']]);

      console.log('Student registered successfully');
      return res.status(201).json({ message: 'Student successfully registered.' });
    });

  } catch (err) {
    // Handle UNIQUE constraint violations for email or username
    if (err.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ message: 'Email already exists.' });
    }
    console.error('Error during database insertion:', err.message);
    return res.status(500).json({ message: 'Internal server error during database insertion.', error: err.message });
  } finally {
    // Close the database connection
    db.close((err) => {
      if (err) {
        console.error('Error closing the database:', err.message);
      }
    });
  }
}
