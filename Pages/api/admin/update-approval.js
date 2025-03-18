import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { student_number, admin_id, approval_status, approval_date, rejection_reason, approval_comments } = req.body;

    // Validate the required fields based on the approval status
    if (!student_number || !admin_id || !approval_status) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Validate that the approval status is one of the valid options
    const validStatuses = ['Approved', 'Waitlisted', 'Rejected'];
    if (!validStatuses.includes(approval_status)) {
      return res.status(400).json({ error: 'Invalid approval status.' });
    }

    // Check if rejection_reason and approval_comments are required for specific statuses
    if ((approval_status === 'Waitlisted' || approval_status === 'Rejected') && (!rejection_reason || !approval_comments)) {
      return res.status(400).json({ error: 'Rejection reason and comments are required for Waitlisted or Rejected status.' });
    }

    // Ensure that rejection_reason and approval_comments are not empty strings for Waitlisted/Rejected statuses
    if ((approval_status === 'Waitlisted' || approval_status === 'Rejected') && 
        (rejection_reason.trim() === '' || approval_comments.trim() === '')) {
      return res.status(400).json({ error: 'Rejection reason and comments cannot be empty for Waitlisted or Rejected status.' });
    }

    try {
      // Parameterized query
      const query = `
        UPDATE admin_approvals 
        SET 
          approval_status = $1,
          approval_date = $2,
          rejection_reason = $3,
          approval_comments = $4
        WHERE 
          student_number = $5 AND admin_id = $6
      `;

      // Prepare the values array for the query parameters
      const values = [
        approval_status, 
        approval_date || null, 
        rejection_reason || null, 
        approval_comments || null, 
        student_number, 
        admin_id
      ];

      // Execute the query
      const result = await sql(query, values);

      // Check if any record was updated
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'No records found to update.' });
      }

      return res.status(200).json({ message: 'Approval updated successfully.' });
    } catch (error) {
      console.error('Error updating approval:', error); // Log the error to the console for debugging
      return res.status(500).json({ error: 'An error occurred while updating approval.' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
