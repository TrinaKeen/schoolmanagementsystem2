import sqlite3 from 'sqlite3';
import path from 'path';

// Define the path for the database
const dbPath = path.resolve('studentsLogin.db');

// Open the database (it will create it if it doesn't exist)
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    return;
  }
  console.log('Database opened successfully!');

  // Create a new table with the required fields if it doesn't exist
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      fullName TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      country TEXT NOT NULL,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      studentNumber TEXT UNIQUE, -- Optional field to link with main database
      lastLogin TEXT,           -- Track the last login date
      role TEXT DEFAULT 'Student' -- Role-based access: 'Student' or 'Admin'
    );
  `;

  db.run(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating table:', err.message);
    } else {
      console.log('Table created or already exists.');
    }

    // Close the database after the operation
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err.message);
      } else {
        console.log('Database closed successfully.');
      }
    });
  });
});
