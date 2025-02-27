import { neon } from '@neondatabase/serverless';
import jwt from 'jsonwebtoken';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const studentNumber = req.query.studentNumber;

      console.log('Decoded token:', decoded);
      console.log('Received student number:', studentNumber);

      if (!studentNumber) {
        return res.status(400).json({ error: 'Student number is required' });
      }

      const result = await sql`
        SELECT 
          s.student_number,
          s.first_name,
          s.middle_name,
          s.last_name,
          s.dob,
          s.age,
          s.gender,
          s.nationality,
          s.place_of_birth,
          s.email,
          s.phone_number,
          s.home_address,
          s.emergency_contact_relationship,
          s.emergency_contact_name,
          s.emergency_contact_phone,
          s.previous_schools,
          s.year_of_graduation,
          s.gpa,
          s.program_id,
          s.diploma,
          s.form137,
          s.identification_card,
          s.photo,
          s.marriage_certificate,
          s.birth_certificate,
          s.good_moral,
          s.honorable_dismissal,
          s.report_card,
          s.terms_and_conditions,
          s.data_privacy_consent,
          s.application_submitted_at,
          a.approval_date,
          a.rejection_reason,
          a.reviewer_name,
          a.reviewer_comments,
          a.identity_proof,
          a.transcripts,
          a.letter_of_recommendation,
          a.resume
        FROM 
          students s
        LEFT JOIN 
          admin_approvals a ON s.student_number = a.student_number
        WHERE 
          s.student_number = ${studentNumber}
      `;

      if (result.length === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }

      const studentData = result[0];
      return res.status(200).json(studentData);
    } catch (error) {
      console.error('Error fetching student details:', error.message || error);
      return res.status(500).json({ error: 'An error occurred while fetching student details.' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
