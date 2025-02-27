// Credits for google.com and ChatGPT for guiding me step by step on how I can connect this API to my frontend
// These comments provide references for auditing security, database practices, error handling, and compliance.

// ChatGPT Command: "Can you guide me on securely registering a student and generating a unique student number in a Node.js API?"
import bcrypt from 'bcryptjs';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Extract necessary data from request body
    const { fullName, email, country, username, password } = req.body; // Use fullName here

    try {
      // Generate student number - ensure unique student number generation
      // ChatGPT Command: "How do I safely generate and ensure uniqueness of student numbers in a Node.js API?"
      const lastStudent = await sql`SELECT student_number FROM student_logins ORDER BY id DESC LIMIT 1`;
      let studentNumber = 'SN-0000100001'; // Default first student number

      if (lastStudent.length > 0) {
        const lastStudentNumber = lastStudent[0].student_number; // Ensure you're accessing the correct property
        if (lastStudentNumber && lastStudentNumber.startsWith('SN-')) {
          const numberPart = parseInt(lastStudentNumber.split('-')[1]);
          studentNumber = `SN-${(numberPart + 1).toString().padStart(10, '0')}`;
        }
      }

      // Hash password using bcrypt for secure storage
      // ChatGPT Command: "What are the best practices for securely hashing passwords in a Node.js API?"
      const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

      // Insert user data into database
      // ChatGPT Command: "How do I securely insert user data into a database while ensuring data integrity and avoiding SQL injection?"
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
      // Handle registration errors
      // ChatGPT Command: "How should I handle errors when inserting new user data into the database?"
      console.error('Error during registration:', error);
      res.status(500).json({ error: 'An error occurred while registering' });
    }
  } else {
    // Handle unsupported HTTP methods
    // ChatGPT Command: "How do I handle unsupported HTTP methods in a Node.js API?"
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
