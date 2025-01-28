import bcrypt from 'bcryptjs';
import { query } from '/Database/db.js'; // Import your database connection

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fullname, email, country, username, password } = req.body;

    try {
      // Generate student number
      const result = await query('SELECT studentnumber FROM login ORDER BY id DESC LIMIT 1');
      let studentNumber = 'SN-0000100001'; // Default first student number

      if (result.rows.length > 0) {
        const lastStudentNumber = result.rows[0].studentnumber;
        if (lastStudentNumber && lastStudentNumber.startsWith('SN-')) {
          const numberPart = parseInt(lastStudentNumber.split('-')[1]);
          studentNumber = `SN-${(numberPart + 1).toString().padStart(10, '0')}`;
        }
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user into database
      const queryText = `
        INSERT INTO login (fullname, email, country, username, password, studentnumber)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
      `;
      const queryParams = [fullname, email, country, username, hashedPassword, studentNumber];

      const insertResult = await query(queryText, queryParams);

      if (insertResult.rows.length > 0) {
        // Registration success, respond with student number
        res.status(201).json({ message: 'Student registered successfully', studentNumber });
      } else {
        res.status(400).json({ error: 'Registration failed' });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({ error: 'An error occurred while registering' });
    }
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
