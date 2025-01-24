import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs'; // Using bcryptjs for Node.js
import path from 'path';

// Define the path for the database
const dbPath = path.resolve('Database', 'studentsLogin1.db');
console.log("Database path:", dbPath); // Log the database path

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('Error opening database:', err.message); // Log error if there's an issue opening the database
  } else {
    console.log('Database opened successfully!');
  }
});

const loginUser = async (req, res) => {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('Missing email or password'); // Log missing credentials
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    console.log('Executing query to find user with email:', email); // Log query execution

    // Check if user exists in the database using email
    db.get('SELECT * FROM students WHERE email = ?', [email], (err, row) => {
      if (err) {
        console.error('Database query error:', err.message);
        return res.status(500).json({ message: 'Database error. Please try again later.' });
      }
    
      console.log('Query result:', row); // Log the result of the query
      
      if (!row) {
        console.log(`User not found with email: ${email}`);
        return res.status(400).json({ message: 'Invalid email or password.' });
      }
    
      bcrypt.compare(password, row.password, (err, result) => {
        if (err) {
          console.error('Error comparing password:', err.message);
          return res.status(500).json({ message: 'Error verifying password. Please try again later.' });
        }
    
        if (!result) {
          console.log(`Password mismatch for email: ${email}`);
          return res.status(400).json({ message: 'Invalid email or password.' });
        }
    
        console.log(`Login successful for email: ${email}`);
        return res.status(200).json({
          message: 'Login successful!',
          studentNumber: row.studentNumber,
        });
      });
    });
    
  } else {
    console.log('Invalid HTTP method'); // Log invalid method error
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default loginUser;
