import { neon } from "@neondatabase/serverless";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      // Fetch user details from both admins_logins and employees tables
      const userResult = await sql`
        SELECT username, password, full_name, 'admin' AS role, NULL AS employee_number 
        FROM admins_logins WHERE LOWER(username) = LOWER(${username})
        UNION
        SELECT username, password, CONCAT(first_name, ' ', last_name) AS full_name, user_type AS role, employee_number 
        FROM employees WHERE LOWER(username) = LOWER(${username})
      `;

      if (userResult.length === 0) {
        return res.status(401).json({ error: "Invalid username or password." });
      }

      const user = userResult[0];

      // Debugging logs
      console.log("Received Employee Name:", user.full_name);
      console.log("Received Role:", user.role);
      console.log("Received Employee Number:", user.employee_number || "N/A");
      console.log("Stored password in DB:", user.password);
      console.log("Received password from login attempt:", password);

      // Simple password validation (NO HASHING)
      if (password !== user.password) {
        console.log("Password mismatch! Login failed.");
        return res.status(401).json({ error: "Invalid username or password." });
      }

      console.log("Password match! Login successful.");

      // Determine the table to update last_login timestamp
      const tableName = user.role === "admin" ? "admins_logins" : "employees";

      // Fix: Use template literals for table name interpolation
      await sql(`
        UPDATE ${tableName}
        SET last_login = CURRENT_TIMESTAMP
        WHERE username = '${username}'
      `);

      // Generate JWT token
      const token = jwt.sign(
        { username: user.username, fullName: user.full_name, role: user.role, employeeNumber: user.employee_number },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // Set authentication cookie
      res.setHeader(
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: 3600,
        })
      );

      res.status(200).json({
        message: "Login successful",
        user: {
          username: user.username,
          fullName: user.full_name,
          role: user.role,
          employeeNumber: user.employee_number || "N/A",
        },
        token,
      });

    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "An error occurred while logging in." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
