import sqlite3 from 'sqlite3';
import path from 'path';

// Define the path for the database
const dbPath = path.resolve('studentsLogin1.db');

// Open the database (it will create it if it doesn't exist)
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    return;
  }
  console.log('Database opened successfully!');

  // Create the students table if it doesn't exist
  const createStudentsTableQuery = `
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      country TEXT NOT NULL,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      studentNumber TEXT UNIQUE, -- Student number field
      lastLogin TEXT,           -- Track the last login date
      role TEXT DEFAULT 'Student' -- Role-based access: 'Student' or 'Admin'
    );
  `;

  // Create the student_meta table to track the last student number
  const createStudentMetaTableQuery = `
    CREATE TABLE IF NOT EXISTS student_meta (
      id INTEGER PRIMARY KEY,
      latest_student_number TEXT NOT NULL
    );
  `;

  // Run the queries to create the tables
  db.run(createStudentsTableQuery, (err) => {
    if (err) {
      console.error('Error creating students table:', err.message);
    } else {
      console.log('Students table created or already exists.');
    }
  });

  db.run(createStudentMetaTableQuery, (err) => {
    if (err) {
      console.error('Error creating student_meta table:', err.message);
    } else {
      console.log('Student_meta table created or already exists.');
    }
  });

  // Initialize the latest student number if it's the first time
  const initializeStudentNumber = () => {
    const query = 'SELECT COUNT(*) AS count FROM student_meta';
    db.get(query, (err, row) => {
      if (err) {
        console.error('Error checking student_meta:', err.message);
      } else if (row.count === 0) {
        // Insert the first student number into the student_meta table
        db.run('INSERT INTO student_meta (id, latest_student_number) VALUES (1, "SN-0000010001")', (err) => {
          if (err) {
            console.error('Error initializing student number:', err.message);
          } else {
            console.log('Student number initialized to SN-0000010001');
          }
        });
      }
    });
  };

  // Initialize student number if it's the first time
  initializeStudentNumber();

  // Function to get the latest student number
  const getLatestStudentNumber = () => {
    return new Promise((resolve, reject) => {
      db.get('SELECT latest_student_number FROM student_meta WHERE id = 1', (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row ? row.latest_student_number : 'SN-0000010001'); // Default if no record
        }
      });
    });
  };

  // Function to update the student number
  const updateLatestStudentNumber = (newStudentNumber) => {
    return new Promise((resolve, reject) => {
      db.run('UPDATE student_meta SET latest_student_number = ? WHERE id = 1', [newStudentNumber], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  // Function to generate a new student number by incrementing the previous one
  const generateNewStudentNumber = async () => {
    const latestStudentNumber = await getLatestStudentNumber();
    const numberPart = parseInt(latestStudentNumber.split('-')[1], 10); // Extract the numeric part
    const incrementedNumber = numberPart + 1;

    // Format the number to be 10 digits long
    const formattedNumber = incrementedNumber.toString().padStart(10, '0');
    
    return `SN-${formattedNumber}`;
  };

  // Example of adding a new student and updating the student number
  const addStudent = async (newStudentData) => {
    try {
      const newStudentNumber = await generateNewStudentNumber();
      console.log('Generated new student number:', newStudentNumber);

      // Insert the student data into the students table
      db.run(
        'INSERT INTO students (fullName, email, country, username, password, studentNumber) VALUES (?, ?, ?, ?, ?, ?)',
        [
          newStudentData.fullName,
          newStudentData.email,
          newStudentData.country,
          newStudentData.username,
          newStudentData.password,
          newStudentNumber
        ],
        function (err) {
          if (err) {
            console.error('Error inserting student:', err.message);
            return;
          }

          // Update the latest student number in the student_meta table
          updateLatestStudentNumber(newStudentNumber).then(() => {
            console.log('New student added with student number:', newStudentNumber);
          }).catch((updateError) => {
            console.error('Error updating student meta:', updateError.message);
          });
        }
      );
    } catch (error) {
      console.error('Error adding student:', error.message);
    }
  };

  // Example Usage:
  addStudent({
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    country: 'USA',
    username: 'john_doe',
    password: 'hashed_password_here'
  });
  
  // Close the database after the operations
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    } else {
      console.log('Database closed successfully.');
    }
  });
});
