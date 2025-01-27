import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Ensure this is imported correctly
import { query } from '/Database/db.js';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      // Fetch the user by username
      const result = await query('SELECT * FROM login WHERE username = $1', [username]);

      if (result.rows.length === 0) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(404).json({ error: 'User not found' });
      }

      const user = result.rows[0];

      // Check if the password matches
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        res.setHeader('Content-Type', 'application/json');
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Update lastlogin timestamp
      const timestamp = new Date();
      await query('UPDATE login SET lastlogin = $1 WHERE username = $2', [timestamp, username]);

      // Check if the JWT_SECRET is available in the environment
      if (!process.env.JWT_SECRET) {
        console.error('Error: JWT_SECRET is not set in environment variables');
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({ error: 'Internal server error' });
      }

      // Generate JWT token with user info and student number
      const token = jwt.sign(
        { userId: user.id, studentNumber: user.studentnumber, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Respond with the token and student number
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json({ token, studentNumber: user.studentnumber });

    } catch (error) {
      console.error('Error during login:', error);
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({ error: 'An error occurred while logging in' });
    }
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
