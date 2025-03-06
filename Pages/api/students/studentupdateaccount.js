import { neon } from '@neondatabase/serverless'; // Ensure sql is imported correctly
import bcrypt from 'bcrypt';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { studentNumber, currentPassword, newPassword } = req.body;

    // Validate the provided data
    if (!studentNumber || !currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      // Fetch the student from the database
      const student = await sql`
        SELECT password
        FROM student_logins
        WHERE student_number = ${studentNumber}
      `;

      if (student.length === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }

      // Log the fetched password for debugging
      console.log('Fetched student password from DB:', student[0].password);

      // Compare the current password with the stored hashed password
      const isMatch = await bcrypt.compare(currentPassword, student[0].password);

      console.log('Password match result:', isMatch); // Log the comparison result

      if (!isMatch) {
        return res.status(401).json({ error: 'Current password is incorrect' });
      }

      // Hash the new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      console.log('Hashed new password:', hashedNewPassword); // Log the hashed password

      // Update the password in the database
      const result = await sql`
        UPDATE student_logins
        SET password = ${hashedNewPassword}
        WHERE student_number = ${studentNumber}
      `;

      if (result.rowCount === 0) {
        return res.status(500).json({ error: 'Failed to update password' });
      }

      return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error changing password:', error.message);
      return res.status(500).json({ error: 'An error occurred while changing the password', details: error.message });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  
}
