// Credits for google.com and ChatGPT for guiding me step by step on how I can connect this API to my frontend
// These comments offer insights into best practices for querying databases, handling errors, and structuring an API.

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch student data, including their personal information and program details
      // ChatGPT Command: "How do I query multiple tables using LEFT JOIN in SQL with Node.js?"
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
          p.program_name,
          p.major,
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
          a.approval_status,
          a.approval_date,
          a.rejection_reason,
          a.reviewer_name,
          a.reviewer_comments
        FROM 
          students s
        LEFT JOIN 
          programs p ON s.program_id = p.id
        LEFT JOIN 
          admin_approvals a ON s.student_number = a.student_number
      `;

      // Return the fetched student data
      res.status(200).json(result);
    } catch (error) {
      // Log and handle errors during data fetching
      // ChatGPT Command: "How should I handle and log errors in a Node.js API when querying a database?"
      console.error('Error fetching student data:', error.message || error);
      res.status(500).json({ error: 'An error occurred while fetching student data.' });
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
