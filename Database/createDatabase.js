import sqlite3 from 'sqlite3';
import path from 'path';

// Define the path for the database
const dbPath = path.resolve('Database', 'studentsApp.db'); // Adjust the folder and name as needed

// Open the database (it will create it if it doesn't exist)
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    return;
  }
  console.log('Database opened successfully:', dbPath);

  // Create a new table with all required fields if it doesn't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT NOT NULL,
      middleName TEXT,
      lastName TEXT NOT NULL,
      dob TEXT NOT NULL,
      gender TEXT NOT NULL,
      age INTEGER NOT NULL,
      nationality TEXT NOT NULL,
      placeOfBirth TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phoneNumber TEXT NOT NULL,
      homeAddress TEXT NOT NULL,
      emergencyContactName TEXT NOT NULL,
      emergencyContactPhoneNumber TEXT NOT NULL,
      emergencyContactRelationship TEXT NOT NULL,
      previousSchools TEXT,
      yearOfGraduation INTEGER,
      gpa REAL,
      extracurricularActivities TEXT,
      specialAchievements TEXT,
      desiredProgram TEXT NOT NULL,
      modeOfStudy TEXT NOT NULL,
      startDate TEXT NOT NULL,
      preferredCampus TEXT NOT NULL,
      identityProof TEXT,
      transcripts TEXT,
      letterOfRecommendation TEXT,
      resume TEXT,
      photo TEXT,
      termsAndConditions BOOLEAN NOT NULL,
      dataPrivacyConsent BOOLEAN NOT NULL,
      studentNumber TEXT
    );
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table created or already exists.');

      // Insert example data only after confirming the table exists
      const insertQuery = `
        INSERT INTO students (
          firstName, middleName, lastName, dob, gender, age, nationality, placeOfBirth,
          email, phoneNumber, homeAddress, emergencyContactName, emergencyContactPhoneNumber,
          emergencyContactRelationship, previousSchools, yearOfGraduation, gpa, extracurricularActivities,
          specialAchievements, desiredProgram, modeOfStudy, startDate, preferredCampus,
          identityProof, transcripts, letterOfRecommendation, resume, photo,
          termsAndConditions, dataPrivacyConsent
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        );
      `;

      // Example data
      const exampleStudentData = [
        'John', 'Doe', 'Smith', '2000-01-01', 'Male', 25, 'American', 'New York',
        'john.doe@example.com', '123-456-7890', '123 Main St, New York, NY 10001',
        'Jane Doe', '987-654-3210', 'Mother', 'XYZ High School', 2018, 3.8,
        'Basketball, Music', 'Honor Roll', 'Computer Science', 'Full-time',
        '2025-09-01', 'Main Campus', 'passport.jpg', 'transcripts.pdf',
        'recommendation.pdf', 'resume.pdf', 'photo.jpg', true, true
      ];

      db.run(insertQuery, exampleStudentData, function (err) {
        if (err) {
          console.error('Error inserting data:', err.message);
        } else {
          const studentId = this.lastID;
          console.log('Data inserted successfully with ID:', studentId);

          // Generate the student number and update the record
          const studentNumber = `S${studentId}`;
          const updateQuery = 'UPDATE students SET studentNumber = ? WHERE id = ?';

          db.run(updateQuery, [studentNumber, studentId], (updateErr) => {
            if (updateErr) {
              console.error('Error updating student number:', updateErr.message);
            } else {
              console.log('Student number assigned successfully:', studentNumber);
            }
          });
        }
      });
    }

    // Close the database after all operations are completed
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        console.log('Database closed successfully.');
      }
    });
  });
});
