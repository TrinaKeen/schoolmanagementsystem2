import { neon } from "@neondatabase/serverless";
import { jwtVerify } from "jose"; // npm install jose
import { parse } from "cookie"; // npm install cookie

const sql = neon(process.env.DATABASE_URL);

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyToken(req) {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.token;

  if (!token) {
    throw new Error("Unauthorized: no token provided.");
  }

  const { payload } = await jwtVerify(token, JWT_SECRET);
  return payload;
} // get data based on type

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const user = await verifyToken(req);

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const schoolDept = await sql`
            SELECT id, program_type, program_name, major, program_code
            FROM programs
        `;

    const formattedSchoolDept = schoolDept.map((schoolDept) => ({
      ...schoolDept,
    }));

    res.status(200).json(formattedSchoolDept);
  } catch (error) {
    console.error("Error fetching schoolDept:", error);
    res.status(500).json({ error: "Failed to fetch schoolDept" });
  }
}

// I copied the same format as the fetchInstructors.js API since it has the same function by calling the verifyToken function to check if the user is authorized to access the data. The SQL query is different since it fetches the school department data from the programs table.
// The formattedSchoolDept variable is used to store the formatted data before sending it as a response. The error handling is also included to handle any errors that may occur during the database query. The response status is set to 200 if the data is successfully fetched, and the formatted data is sent as a JSON response.
// If an error occurs, the response status is set to 500, and an error message is sent as a JSON response. This API endpoint can be accessed by authorized users to fetch the school department data from the database.
