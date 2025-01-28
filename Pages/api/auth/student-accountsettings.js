import { query } from '/Database/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Authorization token missing' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { studentNumber } = decoded;

      // Fetch student data
      const result = await query('SELECT * FROM login WHERE studentnumber = $1', [studentNumber]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch student data' });
    }
  } else if (req.method === 'PUT') {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Authorization token missing' });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { studentNumber } = decoded;

      const { fullname, email, country, username, currentPassword, newPassword } = req.body;

      // Fetch current student data
      const result = await query('SELECT * FROM login WHERE studentnumber = $1', [studentNumber]);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }

      const student = result.rows[0];

      // Verify the current password
      const passwordMatch = await bcrypt.compare(currentPassword, student.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Incorrect current password' });
      }

      // Hash new password if provided
      let hashedPassword = student.password;
      if (newPassword) {
        hashedPassword = await bcrypt.hash(newPassword, 10);
      }

      // Update student details in the database
      const updateQuery = `
        UPDATE login
        SET fullname = $1, email = $2, country = $3, username = $4, password = $5
        WHERE studentnumber = $6
        RETURNING *;
      `;
      const values = [fullname, email, country, username, hashedPassword, studentNumber];
      const updateResult = await query(updateQuery, values);

      res.status(200).json(updateResult.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update account settings' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
