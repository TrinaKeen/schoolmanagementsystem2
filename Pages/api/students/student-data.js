import { neon } from '@neondatabase/serverless';
import jwt from 'jsonwebtoken'; // Ensure jsonwebtoken is installed

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Get token from Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
      // Verify token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const username = decoded.username; // Extract username from the token

      // Fetch student data from the database
      const studentResult = await sql`
        SELECT student_number, last_login FROM student_logins WHERE username = ${username}
      `;

      if (studentResult.length === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }

      const studentData = studentResult[0];

      // Update last_login timestamp
      await sql`
        UPDATE student_logins
        SET last_login = NOW()
        WHERE username = ${username}
      `;

      res.status(200).json({
        studentNumber: studentData.student_number, // Ensure consistency in naming
        lastLogin: studentData.last_login,
      });
    } catch (error) {
      console.error('Error fetching student data:', error);

      // Handle specific JWT errors
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: 'Invalid token' });
      } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ error: 'Token expired' });
      }

      // Handle other errors
      res.status(500).json({ error: 'An error occurred while fetching student data.' });
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
