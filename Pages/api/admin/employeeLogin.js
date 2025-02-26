import bcrypt from "bcryptjs";
import { neon } from "@neondatabase/serverless";
import jwt from "jsonwebtoken";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      // Fetch user from the database
      const employeeResult = await sql`
            SELECT * FROM employee_logins WHERE username = ${email}
        `;

      if (employeeResult.length === 0) {
        return res.status(401).json({ error: "Invalid username or password." });
      }

      const employee = employeeResult[0];

      // Check password
      const isPasswordValid = await bcrypt.compare(password, employee.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid username or password." });
      }

      // Update last_login timestamp
      await sql`
            UPDATE employee_logins 
            SET last_login = NOW() 
            WHERE email = ${email}
        `;

      // Generate JWT token
      const token = jwt.sign(
        { email: employee.email, employeeNumber: employee.employee_number },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h", // Set token expiration
        }
      );

      // Successful login
      res.status(200).json({
        message: "Login successful",
        user: {
          fullName: instructor.full_name,
          email: instructor.email,
          phoneNumber: instructor.phone_number,
          department: instructor.department,
          instructorNumber: instructor.instructor_number,
          role: instructor.role,
        },
        token, // Include the token in the response
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "An error occurred while logging in." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
