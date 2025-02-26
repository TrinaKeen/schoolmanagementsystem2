import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      console.log("Fetching all student applications");
      const result = await sql`
        SELECT * FROM student_applications
      `;
      console.log("Student applications fetched successfully", result);
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching student applications:", error);
      return res
        .status(500)
        .json({
          error: "An error occurred while fetching student applications",
        });
    }
  } else if (req.method === "PUT") {
    try {
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

      //Update the student application in the database :D
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

      if (result.length === 0) {
        return res.status(404).json({ error: "Application not found" });
      }

      console.log("Student application updated successfully", updateResult[0]);
      return res.status(200).json(updateResult[0]);
    } catch (error) {
      console.error("Error updating student application:", error);
      return res
        .status(500)
        .json({
          error: "An error occurred while updating student application",
        });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
