// In /api/studentlogin.js
import sqlite3 from 'sqlite3';
import path from 'path';
import bcrypt from 'bcryptjs'; // You are already using bcryptjs in your login code

const dbPath = path.resolve('Database', 'studentsLogin.db');  // Adjust the path as needed

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Open the database connection using a promise wrapper for async/await
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error opening database:', err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    try {
      // Step 1: Check if the user exists in the database
      const student = await new Promise((resolve, reject) => {
        db.get('SELECT * FROM students WHERE username = ?', [username], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });

      if (!student) {
        return res.status(400).json({ success: false, message: 'Invalid username or password' });
      }

      // Step 2: Compare the entered password with the hashed password in the database
      const isPasswordValid = await bcrypt.compare(password, student.password);

      if (!isPasswordValid) {
        return res.status(400).json({ success: false, message: 'Invalid username or password' });
      }

      res.status(200).json({ success: true, message: 'Login successful' });
    } catch (error) {
      console.error('Error during login:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      db.close();
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
