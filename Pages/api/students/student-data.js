// Credits for google.com and ChatGPT for guiding me step by step on how I can connect this API to my frontend
// These comments provide references for auditing security, database practices, error handling, and compliance.

// ChatGPT Command: "Can you generate a reference for auditing JWT token authentication in a Node.js application? Include best practices for token signing, validation, and error handling."
// ChatGPT Reference: Best practices for JWT token verification, expiration handling, and secure token storage.

import { neon } from '@neondatabase/serverless';
import jwt from 'jsonwebtoken'; // Ensure jsonwebtoken is installed

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Get token from Authorization header
    // ChatGPT Command: "How do I extract a token from the Authorization header in a Node.js API?"
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
      // Verify token using the secret key
      // ChatGPT Command: "What are the best practices for verifying JWT tokens securely in Node.js?"
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const username = decoded.username; // Extract username from the token

      // Fetch student data from the database
      // ChatGPT Command: "How can I securely query a database in Node.js using parameterized queries?"
      const studentResult = await sql`
        SELECT student_number, last_login FROM student_logins WHERE username = ${username}
      `;

      if (studentResult.length === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }

      const studentData = studentResult[0];

      // Update last_login timestamp
      // ChatGPT Command: "What are the best practices for updating records in a SQL database using Node.js?"
      await sql`
        UPDATE student_logins
        SET last_login = NOW()
        WHERE username = ${username}
      `;

      // Return the student data
      res.status(200).json({
        studentNumber: studentData.student_number, // Ensure consistency in naming
        lastLogin: studentData.last_login,
      });
    } catch (error) {
      console.error('Error fetching student data:', error);

      // Handle specific JWT errors
      if (error.name === 'JsonWebTokenError') {
        // ChatGPT Command: "What should I do when a JWT is invalid or malformed?"
        return res.status(401).json({ error: 'Invalid token' });
      } else if (error.name === 'TokenExpiredError') {
        // ChatGPT Command: "How should I handle expired JWT tokens?"
        return res.status(401).json({ error: 'Token expired' });
      }

      // Handle other errors
      // ChatGPT Command: "What is the best way to handle generic errors in Node.js APIs without exposing sensitive information?"
      res.status(500).json({ error: 'An error occurred while fetching student data.' });
    }
  } else {
    // Handle unsupported HTTP methods
    // ChatGPT Command: "How should I handle unsupported HTTP methods in a Node.js API?"
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
