import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve('Database', 'studentsLogin1.db');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ success: false, message: 'Username is required.' });
    }

    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error opening database:', err.message);
        return res.status(500).json({ error: 'Database connection failed' });
      }
    });

    db.get(
      'SELECT studentNumber FROM students WHERE username = ?',
      [username],
      (err, row) => {
        if (err) {
          console.error('Error fetching student number:', err.message);
          return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
        if (!row) {
          return res.status(404).json({ success: false, message: 'Student not found.' });
        }

        return res.status(200).json({
          success: true,
          studentNumber: row.studentNumber,
        });
      }
    );

    db.close((err) => {
      if (err) {
        console.error('Error closing database connection:', err.message);
      }
    });
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
