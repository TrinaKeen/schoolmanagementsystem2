import sqlite3 from 'sqlite3';
import path from 'path';

// Constants
const dbPath = path.resolve('Database', 'studentsApp1.db');
console.log("Database path:", dbPath);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { studentNumber } = req.query;

      if (!studentNumber) {
        return res.status(400).json({ message: 'Student number is required' });
      }

      // Prepare database connection
      const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error('Database connection failed:', err.message);
          return res.status(500).json({ message: 'Database connection failed' });
        }
      });

      // Query to fetch student details by student number
      const query = `SELECT * FROM students WHERE studentNumber = ?`;

      db.get(query, [studentNumber], (err, row) => {
        if (err) {
          console.error('Error fetching data:', err.message);
          return res.status(500).json({ message: 'Error fetching student data' });
        }

        if (!row) {
          return res.status(404).json({ message: 'Student not found' });
        }

        // Return student data
        res.status(200).json({ student: row });
      });
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ message: 'An error occurred while fetching student details' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
