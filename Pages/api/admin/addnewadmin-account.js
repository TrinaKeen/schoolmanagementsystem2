import { neon } from "@neondatabase/serverless";
import { jwtVerify } from "jose";
import { parse } from "cookie";
import bcrypt from "bcryptjs"; // Add bcryptjs for password hashing

const sql = neon(process.env.DATABASE_URL);
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const verifyToken = async (req) => {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.token;

  if (!token) throw new Error("Unauthorized: no token provided.");

  const { payload } = await jwtVerify(token, JWT_SECRET);
  return payload;
};

// Function to insert a new employee into the database
const addEmployee = async (employeeData) => {
    try {
      return await sql`
        INSERT INTO employees (
          employee_number, first_name, last_name, user_type, gender, father_name, mother_name,
          date_of_birth, religion, joining_date, email, contact_number,
          address, program, course, section, specification, username, password
        )
        VALUES (
          ${employeeData.employee_number}, ${employeeData.first_name}, ${employeeData.last_name}, ${employeeData.user_type}, ${employeeData.gender},
          ${employeeData.father_name}, ${employeeData.mother_name}, ${employeeData.date_of_birth},
          ${employeeData.religion}, ${employeeData.joining_date}, ${employeeData.email}, ${employeeData.contact_number},
          ${employeeData.address}, ${employeeData.program}, ${employeeData.course}, ${employeeData.section},
          ${employeeData.specification}, ${employeeData.username}, ${employeeData.password}
        )
        RETURNING *;
      `;
    } catch (error) {
      console.error("Error adding employee:", error.message);
      throw new Error(`Database Error: ${error.message}`);
    }
  };
  

export default async function handler(req, res) {
  try {
    // Verify token before proceeding
    await verifyToken(req);

    if (req.method === "POST") {
      const employeeData = req.body;

      // Validate required fields
      if (!employeeData || !employeeData.first_name || !employeeData.last_name || !employeeData.email || !employeeData.username || !employeeData.password) {
        return res.status(400).json({ message: "Missing required fields: first_name, last_name, email, username, password." });
      }

      // Optionally, you could add further validations like email format, password strength, etc.

      // Check if email or username already exists in the database
      const existingEmail = await sql`
        SELECT * FROM employees WHERE email = ${employeeData.email};
      `;
      const existingUsername = await sql`
        SELECT * FROM employees WHERE username = ${employeeData.username};
      `;

      if (existingEmail.length > 0) {
        return res.status(400).json({ message: "Email already in use." });
      }

      if (existingUsername.length > 0) {
        return res.status(400).json({ message: "Username already in use." });
      }

      // Insert new employee data into the database
      const result = await addEmployee(employeeData);
      return res.status(201).json(result[0]);
    } else {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("API Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
}
