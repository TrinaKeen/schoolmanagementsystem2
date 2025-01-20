import sqlite3 from 'sqlite3';
import path from 'path';
import bcrypt from 'bcryptjs';

const dbPath = path.resolve('Database', 'studentsLogin.db');  // Adjust the path as needed

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // Open the database connection
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error opening database:', err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    // Convert db.get to a promise to use async/await
    const checkUserExistence = async (username) => {
      return new Promise((resolve, reject) => {
        db.get('SELECT * FROM students WHERE username = ?', [username], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });
    };

    try {
      // Step 1: Check if the username exists
      const user = await checkUserExistence(username);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Invalid username or password.',
        });
      }

      // Step 2: Compare the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          message: 'Invalid username or password.',
        });
      }

      // Step 3: Return success
      return res.status(200).json({ success: true, message: 'Login successful!' });
    } catch (error) {
      console.error('Error during login:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      // Close the database connection
      db.close((err) => {
        if (err) {
          console.error('Error closing database connection:', err.message);
        }
      });
    }
  } else {
    // Method not allowed for non-POST requests
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
