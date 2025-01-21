import sqlite3 from 'sqlite3';
import path from 'path';
import bcrypt from 'bcrypt';  // For secure password hashing

// Path to the database
const dbPath = path.resolve('studentsApp.db'); // Adjust path if needed

// Initialize the database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to the database successfully!');
  }
});

// Function to verify student credentials during login
const loginStudent = (email, password) => {
  const query = `
    SELECT * FROM students
    WHERE email = ?
  `;

  db.get(query, [email], (err, row) => {
    if (err) {
      console.error('Error fetching data:', err.message);
      return;
    }

    if (row) {
      // Compare the hashed password stored in the database with the provided password
      bcrypt.compare(password, row.password, (err, result) => {
        if (err) {
          console.error('Error comparing passwords:', err.message);
          return;
        }

        if (result) {
          console.log('Login successful');
          console.log('Student Data:', row); // Process the student's data
        } else {
          console.log('Invalid email or password');
        }
      });
    } 
  });
};

// Example usage
const email = 'john.doe@example.com';
const password = 'password123';  // Example password to check

loginStudent(email, password);

// Function to close the database connection
const closeDatabase = () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing the database:', err.message);
    } else {
      console.log('Database closed successfully');
    }
  });
};

// Close the database after a delay to ensure login checks are done
setTimeout(closeDatabase, 1000);
