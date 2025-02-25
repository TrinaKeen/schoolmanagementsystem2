import bcrypt from 'bcryptjs';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fullName, email, country, username, password } = req.body; // Use fullName here

    try {
      // Generate student number
      const lastStudent = await sql`SELECT student_number FROM student_logins ORDER BY id DESC LIMIT 1`;
      let studentNumber = 'SN-0000100001'; // Default first student number

      if (lastStudent.length > 0) {
        const lastStudentNumber = lastStudent[0].student_number; // Ensure you're accessing the correct property
        if (lastStudentNumber && lastStudentNumber.startsWith('SN-')) {
          const numberPart = parseInt(lastStudentNumber.split('-')[1]);
          studentNumber = `SN-${(numberPart + 1).toString().padStart(10, '0')}`;
        }
      }

      // Hash password
      const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

      // Insert user into database
      const insertResult = await sql`
        INSERT INTO student_logins (full_name, email, country, username, password, student_number)
        VALUES (${fullName}, ${email || null}, ${country || null}, ${username || null}, ${hashedPassword}, ${studentNumber})
        RETURNING *
      `;

      if (insertResult.length > 0) {
        res.status(201).json({ message: 'Student registered successfully', studentNumber });
      } else {
        res.status(400).json({ error: 'Registration failed' });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ error: 'An error occurred while registering' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
