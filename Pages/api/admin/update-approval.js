// pages/api/admin/update-approval.js
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { student_number, admin_id, approval_status, approval_date, rejection_reason, approval_comments } = req.body;

    // Validate the required fields
    if (!student_number || !admin_id || !approval_status) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    try {
      const result = await sql`
        UPDATE admin_approvals 
        SET 
          approval_status = ${approval_status},
          approval_date = ${approval_date ? approval_date : null},
          rejection_reason = ${rejection_reason || null},
          approval_comments = ${approval_comments || null}
        WHERE 
          student_number = ${student_number} AND admin_id = ${admin_id}
      `;

      return res.status(200).json({ message: 'Approval updated successfully.' });
    } catch (error) {
      console.error('Error updating approval:', error); // Log the entire error object
      return res.status(500).json({ error: 'An error occurred while updating approval.' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
