import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { studentNumber } = req.query; // Fetch student number from URL query

    if (!studentNumber) {
      return res.status(400).json({ error: 'Student number is missing' });
    }

    try {
      // Fetch student details using student number
      const studentDetails = await sql`
        SELECT student_number, full_name, email, country, username
        FROM student_logins
        WHERE student_number = ${studentNumber}
      `;

      if (studentDetails.length === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }

      // Return student details
      return res.status(200).json({
        student_number: studentDetails[0].student_number,
        full_name: studentDetails[0].full_name,
        email: studentDetails[0].email,
        country: studentDetails[0].country,
        username: studentDetails[0].username,
      });
    } catch (error) {
      console.error('Error fetching student details:', error);
      return res.status(500).json({ error: 'An error occurred while fetching student details' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
