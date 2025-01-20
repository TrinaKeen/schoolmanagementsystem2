import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';

// Define the paths for the databases
const dbPath = path.resolve('Database', 'studentsApp.db');
const counterDbPath = path.resolve('Database', 'studentCounter.db');

// Ensure the database directory exists before proceeding
const createDatabaseDirectoryIfNotExists = () => {
  const dbDirectory = path.dirname(dbPath);
  if (!fs.existsSync(dbDirectory)) {
    fs.mkdirSync(dbDirectory, { recursive: true }); // Create the directory if it doesn't exist
    console.log('Database directory created:', dbDirectory);
  }
};

// Initialize counter database to store and increment the student number
const initializeCounterDatabase = () => {
  // Ensure the directory exists before proceeding
  createDatabaseDirectoryIfNotExists();

  // Open (or create) the counter database
  const counterDb = new sqlite3.Database(counterDbPath, (err) => {
    if (err) {
      console.error('Error opening counter database:', err.message);
      return;
    }
    console.log('Counter database opened successfully.');

    // Create counter table if it doesn't exist
    const createCounterTableQuery = `
      CREATE TABLE IF NOT EXISTS counter (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        currentNumber INTEGER NOT NULL
      );
    `;

    counterDb.run(createCounterTableQuery, (err) => {
      if (err) {
        console.error('Error creating counter table:', err.message);
      } else {
        console.log('Counter table created or already exists.');

        // Insert the initial counter value if it doesn't exist
        counterDb.get(`SELECT currentNumber FROM counter`, (err, row) => {
          if (err) {
            console.error('Error reading counter table:', err.message);
          } else if (!row) {
            counterDb.run(`INSERT INTO counter (currentNumber) VALUES (?)`, [20001], (err) => {
              if (err) {
                console.error('Error initializing counter:', err.message);
              } else {
                console.log('Counter initialized successfully.');
              }
            });
          } else {
            console.log('Counter already initialized with value:', row.currentNumber);
          }
        });
      }
    });

    // Ensure the counter database is closed after initialization
    counterDb.close((err) => {
      if (err) {
        console.error('Error closing counter database:', err.message);
      } else {
        console.log('Counter database closed successfully.');
      }
    });
  });
};

// Generate the next student number
const getNextStudentNumber = (callback) => {
  const counterDb = new sqlite3.Database(counterDbPath);

  counterDb.get(`SELECT currentNumber FROM counter`, (err, row) => {
    if (err) {
      console.error('Error retrieving current student number:', err.message);
      callback(null);
    } else {
      const nextNumber = row.currentNumber;
      const formattedNumber = `000${nextNumber}`.slice(-8); // Ensure it's 8 digits
      callback(formattedNumber);

      // Increment the counter after retrieving the current number
      counterDb.run(`UPDATE counter SET currentNumber = currentNumber + 1`, (updateErr) => {
        if (updateErr) {
          console.error('Error updating counter:', updateErr.message);
        } else {
          console.log('Counter incremented to:', nextNumber + 1);
        }
      });
    }
  });

  counterDb.close((err) => {
    if (err) {
      console.error('Error closing counter database:', err.message);
    } else {
      console.log('Counter database closed after incrementing.');
    }
  });
};

// Main function to initialize the student database
const initializeStudentDatabase = () => {
  // Ensure the directory exists before proceeding
  createDatabaseDirectoryIfNotExists();

  // Open (or create) the main student database
  const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error opening student database:', err.message);
      return;
    }
    console.log('Student database opened successfully.');

    // Create students table if it doesn't exist
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
        studentNumber TEXT UNIQUE NOT NULL,
        applicationStatus TEXT DEFAULT 'Pending',
        reviewerName TEXT,
        approvalDate TEXT,
        rejectionReason TEXT,
        reviewerComments TEXT,
        applicationSubmittedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        lastUpdatedAt TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `;

    db.run(createTableQuery, (err) => {
      if (err) {
        console.error('Error creating students table:', err.message);
      } else {
        console.log('Students table created or already exists.');

        // Example student data
        const studentData = [
          'Jane',
          'Middle',
          'Doe',
          '2000-01-01',
          'Female',
          23,
          'American',
          'New York',
          'jane.doe@example.com',
          '123-456-7890',
          '123 Main St, New York, NY 10001',
          'John Doe',
          '987-654-3210',
          'Father',
          'XYZ High School',
          2018,
          3.9,
          'Basketball, Music',
          'Honor Roll',
          'Computer Science',
          'Full-time',
          '2025-09-01',
          'Main Campus',
          'passport.jpg',
          'transcripts.pdf',
          'recommendation.pdf',
          'resume.pdf',
          'photo.jpg',
          true,
          true,
        ];

        // Generate student number and insert the record
        getNextStudentNumber((studentNumber) => {
          if (studentNumber) {
            const insertQuery = `
              INSERT INTO students (
                firstName, middleName, lastName, dob, gender, age, nationality, placeOfBirth, email,
                phoneNumber, homeAddress, emergencyContactName, emergencyContactPhoneNumber,
                emergencyContactRelationship, previousSchools, yearOfGraduation, gpa,
                extracurricularActivities, specialAchievements, desiredProgram, modeOfStudy, startDate,
                preferredCampus, identityProof, transcripts, letterOfRecommendation, resume, photo,
                termsAndConditions, dataPrivacyConsent, studentNumber
              )
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `;

            db.run(insertQuery, [...studentData, studentNumber], (err) => {
              if (err) {
                console.error('Error inserting student data:', err.message);
              } else {
                console.log('Student inserted with student number:', studentNumber);
              }
            });
          }
        });
      }
    });

    // Ensure the main database is closed after all operations
    db.close((err) => {
      if (err) {
        console.error('Error closing student database:', err.message);
      } else {
        console.log('Student database closed successfully.');
      }
    });
  });
};

// Initialize both the counter and student databases
initializeCounterDatabase();
initializeStudentDatabase();
