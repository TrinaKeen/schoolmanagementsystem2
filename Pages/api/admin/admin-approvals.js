import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
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

      return res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching student data:', error.message || error);
      return res.status(500).json({ error: 'An error occurred while fetching student data.' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
