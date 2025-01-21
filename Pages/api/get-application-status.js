import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve('Database', 'studentsApp1.db');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { studentNumber } = req.query;  // Get student number from query parameters

    if (!studentNumber) {
      return res.status(400).json({ message: 'Student number is required.' });
    }

    try {
      const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          console.error('Database connection failed:', err.message);
          throw new Error('Database connection failed.');
        }
      });

      const query = `SELECT * FROM students WHERE studentNumber = ?`;

      db.get(query, [studentNumber], (err, row) => {
        if (err) {
          console.error('Error querying database:', err.message);
          return res.status(500).json({ message: 'Error querying database', error: err.message });
        }

        if (!row) {
          return res.status(404).json({ message: 'No application found for the provided student number.' });
        }

        res.status(200).json(row);  // Send all student data from the row
      });
    } catch (err) {
      console.error('Error:', err.message);
      res.status(500).json({ message: 'An error occurred while processing your request.', error: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
