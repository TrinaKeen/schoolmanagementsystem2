import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  // Check for the correct HTTP method
  if (req.method !== "PUT") {
    console.error("Invalid request method:", req.method);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  // Verify the content type of the incoming request
  if (req.headers['content-type'] !== 'application/json') {
    console.error("Invalid content type:", req.headers['content-type']);
    return res.status(400).json({ error: "Invalid Content Type. Expected 'application/json'" });
  }

  const { student_number, approval_status, approval_date, rejection_reason, approval_comments } = req.body;

  // Ensure all required fields are provided
  if (!student_number || !approval_status || !approval_date) {
    console.error("Missing required fields in request body:", req.body);
    return res.status(400).json({ error: "Missing required fields: student_number, approval_status, approval_date" });
  }

  try {
    // Begin a transaction to ensure both updates are atomic
    await sql.begin();

    // Update the students table
    const updateStudentQuery = `
      UPDATE students
      SET approval_status = $1,
          approval_date = $2,
          rejection_reason = $3,
          approval_comments = $4
      WHERE student_number = $5
      RETURNING *;
    `;
    const studentValues = [approval_status, approval_date, rejection_reason, approval_comments, student_number];
    
    const studentResult = await sql.query(updateStudentQuery, studentValues);

    if (studentResult.rows.length === 0) {
      console.error(`Student not found with student_number: ${student_number}`);
      await sql.rollback(); // Rollback if student not found
      return res.status(404).json({ error: "Student not found." });
    }

    // Update the admin_approvals table
    const updateApprovalQuery = `
      UPDATE admin_approvals
      SET approval_status = $1,
          approval_date = $2,
          rejection_reason = $3,
          approval_comments = $4
      WHERE student_number = $5
      RETURNING *;
    `;
    const approvalValues = [approval_status, approval_date, rejection_reason, approval_comments, student_number];
    
    const approvalResult = await sql.query(updateApprovalQuery, approvalValues);

    if (approvalResult.rows.length === 0) {
      console.error(`No approval record found for student_number: ${student_number}`);
      await sql.rollback(); // Rollback if no approval record is found
      return res.status(404).json({ error: "Approval record not found." });
    }

    // Commit the transaction if both updates are successful
    await sql.commit();

    // Respond with the updated student and approval data
    res.status(200).json({ student: studentResult.rows[0], approval: approvalResult.rows[0] });
  } catch (error) {
    console.error("Error updating student approval:", error);  // Log detailed error for debugging
    await sql.rollback();  // Ensure rollback on error
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
