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
    admin_id,
    rejection_reason,
    approval_comments,
  } = req.body;

  if (!student_number || !approval_status) {
    return res.status(400).json({ error: 'Missing required fields: student_number or approval_status' });
  }

  try {
    let query = "";
    let values = [];

    if (approval_status === "Approved") {
      // Insert into approved_students table
      query = `
        INSERT INTO approved_students (
          student_number, first_name, last_name, email,
          dob, course, enrollment_date, student_status,
          academic_year, admin_id
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        RETURNING *;
      `;
      values = [
        student_number,
        first_name,
        last_name,
        email,
        dob,
        course,
        enrollment_date,
        student_status,
        academic_year,
        admin_id
      ];
    } else if (approval_status === "Rejected") {
      // Insert into rejected_students table
      if (!rejection_reason || !approval_comments) {
        return res.status(400).json({ error: 'Rejection reason and comments are required for rejected students.' });
      }

      query = `
        INSERT INTO rejected_students (
          student_number, first_name, last_name, email,
          dob, course, enrollment_date, rejection_reason,
          approval_comments, academic_year, admin_id
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
        RETURNING *;
      `;
      values = [
        student_number,
        first_name,
        last_name,
        email,
        dob,
        course,
        enrollment_date,
        rejection_reason,
        approval_comments,
        academic_year,
        admin_id
      ];
    } else {
      return res.status(400).json({ error: 'Only "Approved" or "Rejected" statuses are supported.' });
    }

    const result = await sql(query, values);

    if (result.length === 0) {
      return res.status(500).json({ error: 'Failed to insert student record.' });
    }

    return res.status(200).json({ success: true, record: result[0] });

  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
