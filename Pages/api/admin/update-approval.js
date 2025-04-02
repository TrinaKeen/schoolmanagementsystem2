import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    student_number,
    approval_status,
    first_name,
    last_name,
    email,
    dob,
    course,
    enrollment_date,
    student_status,
    academic_year,
    admin_id
  } = req.body;

  if (
    !student_number ||
    !approval_status ||
    approval_status !== "Approved"
  ) {
    return res.status(400).json({ error: 'Invalid or missing approval status' });
  }

  if (
    !first_name || !last_name || !email || !dob || !course ||
    !enrollment_date || !student_status || !academic_year || !admin_id
  ) {
    return res.status(400).json({ error: 'Missing required student fields' });
  }

  try {
    const insertQuery = `
      INSERT INTO approved_students (
        student_number, first_name, last_name, email,
        dob, course, enrollment_date, student_status,
        academic_year, admin_id
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *;
    `;

    const values = [
      student_number, first_name, last_name, email,
      dob, course, enrollment_date, student_status,
      academic_year, admin_id
    ];

    const result = await sql(insertQuery, values);

    if (result.length === 0) {
      return res.status(500).json({ error: 'Failed to insert approved student' });
    }

    return res.status(200).json({ approvedStudent: result[0] });
  } catch (error) {
    console.error('Insert error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
