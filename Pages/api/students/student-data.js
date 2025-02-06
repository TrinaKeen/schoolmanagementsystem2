import { query } from '/Database/db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: 'Authorization token missing' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const { userId } = decoded;

      // Fetch student data based on userId
      const result = await query('SELECT studentnumber, lastlogin FROM login WHERE id = $1', [userId]);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Student data not found' });
      }

      const studentData = result.rows[0];

      // Respond with studentNumber and lastlogin
      res.status(200).json({
        studentNumber: studentData.studentnumber,
        lastLogin: studentData.lastlogin,
      });
    } catch (error) {
      console.error('Error fetching student data:', error.message);
      res.status(500).json({ error: 'Failed to fetch student data' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
