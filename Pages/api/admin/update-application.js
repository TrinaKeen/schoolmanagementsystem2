import { query } from '/Database/db.js'; // Import your database query function

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Fetching pending applications
    try {
      console.log('Fetching pending applications...');
      const result = await query(`
        SELECT * FROM students WHERE applicationstatus = 'Pending'
      `);
      console.log('Fetched applications:', result.rows);
      return res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error fetching applications:', error);
      return res.status(500).json({ error: 'Failed to fetch pending applications' });
    }
  } else if (req.method === 'PUT') {
    // Updating an application
    try {
      const {
        applicationstatus,
        reviewername,
        approvaldate,
        rejectionreason,
        reviewercomments,
      } = req.body; // Destructure the necessary fields from the request body

      const { id } = req.query; // Get the application ID from the URL query parameters

      if (!id) {
        return res.status(400).json({ error: 'Application ID is required' });
      }

      // Update the application in the database
      const result = await query(`
        UPDATE students 
        SET 
          applicationstatus = $1,
          reviewername = $2,
          approvaldate = $3,
          rejectionreason = $4,
          reviewercomments = $5
        WHERE id = $6
        RETURNING *;
      `, [
        applicationstatus,
        reviewername,
        approvaldate,
        rejectionreason,
        reviewercomments,
        id,
      ]);

      console.log('Updated application:', result.rows[0]);

      // Respond with the updated application data
      return res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error updating application:', error);
      return res.status(500).json({ error: 'Failed to update application' });
    }
  } else {
    // Method not allowed for any other HTTP methods
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
