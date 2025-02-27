// Credits for google.com and ChatGPT for guiding me step by step on how I can connect this API to my frontend
// These comments provide insights into how I can handle different HTTP methods (GET, PUT) and perform SQL queries securely.

import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // ChatGPT Command: "How do I query all records from a table in SQL with Node.js?"
      console.log("Fetching all student applications");
      const result = await sql`
        SELECT * FROM student_applications
      `;
      console.log("Student applications fetched successfully", result);
      return res.status(200).json(result); // Return fetched student applications
    } catch (error) {
      // Log and handle errors during fetching
      // ChatGPT Command: "How do I handle and log errors when fetching records from the database?"
      console.error("Error fetching student applications:", error);
      return res
        .status(500)
        .json({
          error: "An error occurred while fetching student applications",
        });
    }
  } else if (req.method === "PUT") {
    try {
      // Get the necessary fields from the request body for updating the application
      const {
        application_status,
        reviewer_name,
        approval_date,
        rejection_reason,
        reviewer_comments,
      } = req.body;

      const { id } = req.query;
      if (!id) {
        return res.status(400).json({ error: "Application ID is required" });
      }

      // ChatGPT Command: "How do I update a record in a SQL table with Node.js?"
      // Update the student application in the database
      const updateResult = await sql`
        UPDATE student_applications
        SET 
          application_status = ${application_status},
          reviewer_name = ${reviewer_name},
          approval_date = ${approval_date},
          rejection_reason = ${rejection_reason},
          reviewer_comments = ${reviewer_comments}
        WHERE id = ${id}
        RETURNING *;
      `;

      // Handle case when the application does not exist
      if (updateResult.length === 0) {
        return res.status(404).json({ error: "Application not found" });
      }

      console.log("Student application updated successfully", updateResult[0]);
      return res.status(200).json(updateResult[0]); // Return the updated application data
    } catch (error) {
      // Log and handle errors during the update process
      // ChatGPT Command: "How can I ensure my API responds properly when there is an issue updating a record?"
      console.error("Error updating student application:", error);
      return res
        .status(500)
        .json({
          error: "An error occurred while updating student application",
        });
    }
  } else {
    // Handle unsupported HTTP methods
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
