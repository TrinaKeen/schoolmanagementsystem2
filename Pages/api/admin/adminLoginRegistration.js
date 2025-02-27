import bcrypt from "bcryptjs";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { fullName, email, username, password, role } = req.body;

      // Validate required fields
      if (!fullName || !email || !username || !password) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert admin into database
      const insertResult = await sql`
        INSERT INTO admins_logins (full_name, email, username, password, role)
        VALUES (${fullName}, ${email}, ${username}, ${hashedPassword}, ${
        role || "SuperAdmin"
      })
        RETURNING *
      `;

      if (insertResult.length > 0) {
        res
          .status(201)
          .json({
            message: "Admin registered successfully",
            admin: insertResult[0],
          });
      } else {
        res.status(400).json({ error: "Registration failed" });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ error: "An error occurred while registering" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
