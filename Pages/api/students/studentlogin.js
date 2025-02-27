// Credits for google.com and ChatGPT for guiding me step by step on how I can connect this API to my frontend
// These comments provide references for auditing security, password handling, JWT management, and database practices.

import bcrypt from 'bcryptjs';
import { neon } from '@neondatabase/serverless';
import jwt from 'jsonwebtoken'; // Make sure to install jsonwebtoken

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      // Fetch user from the database
      // ChatGPT Command: "How do I securely fetch user data from the database while preventing SQL injection?"
      const userResult = await sql`
        SELECT * FROM student_logins WHERE username = ${username}
      `;

      if (userResult.length === 0) {
        return res.status(401).json({ error: 'Invalid username or password.' });
      }

      const user = userResult[0];

      // Check password validity
      // ChatGPT Command: "How do I securely compare passwords using bcrypt in Node.js?"
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid username or password.' });
      }

      // Update last login timestamp for the user
      // ChatGPT Command: "What is the best practice for updating a user’s last login timestamp securely?"
      await sql`
        UPDATE student_logins 
        SET last_login = NOW() 
        WHERE username = ${username}
      `;

      // Generate JWT token for authenticated user
      // ChatGPT Command: "What is the best practice for generating and securing JWT tokens in a Node.js API?"
      const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Set token expiration to 1 hour
      });

      // Successful login, return user info along with the JWT token
      res.status(200).json({
        message: 'Login successful',
        user: {
          username: user.username,
          fullName: user.full_name,
        },
        token, // Include JWT token in the response for further use
      });
    } catch (error) {
      // Handle errors during login process
      // ChatGPT Command: "How should I handle errors during login, especially when working with database operations and JWT?"
      console.error('Error during login:', error);
      res.status(500).json({ error: 'An error occurred while logging in.' });
    }
  } else {
    // Handle unsupported HTTP methods
    // ChatGPT Command: "How do I handle unsupported HTTP methods in a Node.js API?"
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
