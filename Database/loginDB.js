import sqlite3 from 'sqlite3';
import path from 'path';
import bcrypt from 'bcrypt';  // For secure password hashing

// Path to the database
const dbPath = path.resolve('studentsLogin1.db'); // Adjust path if needed

// Initialize the database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to the database successfully!');
  }
});


