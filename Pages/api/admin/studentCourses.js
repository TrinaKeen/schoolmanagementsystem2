import { neon } from "@neondatabase/serverless";
import { jwtVerify } from "jose"; // npm install jose
import { parse } from "cookie"; // npm install cookie

const sql = neon(process.env.DATABASE_URL);

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET); // Added by Martin

// middleware to verify token
const verifyToken = async (req) => {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.token;

  if (!token) {
    throw new Error("Unauthorized: no token provided.");
  }

  const { payload } = await jwtVerify(token, JWT_SECRET);
  return payload;
};

// get data based on type
const getResponseData = async (type) => {
  try {
    switch (type) {
      case "programs":
        return await sql`SELECT * FROM programs`;
      case "courses":
        const result = await sql`SELECT * FROM courses`;
        return result;
      case "subjects":
        return await sql`SELECT * FROM subjects`;
      case "instructors":
        return await sql`SELECT id, first_name, last_name FROM instructors`;
      default:
        throw new Error("Invalid type");
    }
  } catch (error) {
    console.error("Database Fetch Error:", error.message); // Log full error
    throw new Error(`Database Fetch Error: ${error.message}`);
  }
};

// insert data based on type
const postData = async (type, body) => {
  console.log("Received data for insertion:", body);

  if (!body) throw new Error("Invalid request body");

  try {
    switch (type) {
      case "programs":
        return await sql`
          INSERT INTO programs (program_type, program_name, major, program_code, duration)
          VALUES (${body.program_type}, ${body.program_name}, ${body.major}, ${body.program_code}, ${body.duration})
          RETURNING *;
        `;

      case "courses":
        if (
          !body.course_name ||
          !body.course_code ||
          !body.program_id ||
          !body.instructor_id ||
          !body.year
        ) {
          throw new Error("Missing required fields");
        }
        return await sql`
          INSERT INTO courses (course_name, course_code, program_id, instructor_id, year)
          VALUES (${body.course_name}, ${body.course_code}, ${body.program_id}, ${body.instructor_id}, ${body.year})
          RETURNING *;
        `;

      case "subjects":
        return await sql`
          INSERT INTO subjects (id, subject_name, credit_hours)
          VALUES (${body.id}, ${body.subject_name}, ${body.credit_hours})
          RETURNING *;
        `;

      default:
        throw new Error("Invalid type");
    }
  } catch (error) {
    console.error("Database Insertion Error:", error.message);
    throw new Error(`Database Error: ${error.message}`);
  }
};

const deleteDataFunc = async (type, id) => {
  console.log("Deleting record of type:", type, "with ID:", id);

  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    console.error("Invalid ID received:", id);
    throw new Error("Invalid ID");
  }

  try {
    switch (type) {
      case "courses":
        return await sql`DELETE FROM courses WHERE id = ${numericId}`;
      default:
        throw new Error("Invalid type");
    }
  } catch (error) {
    throw new Error("Error deleting data: " + error.message);
  }
};

const updateData = async (type, body) => {
  if (!body.id) {
    console.error("Error: Missing course ID for update"); // Debugging log
    throw new Error("Missing course ID for update");
  }

  console.log("Updating course:", body); // Debugging log

  try {
    switch (type) {
      case "courses":
        const result = await sql`
          UPDATE courses
          SET course_name = ${body.course_name},
              course_code = ${body.course_code},
              program_id = ${body.program_id},
              instructor_id = ${body.instructor_id},
              year = ${body.year}
          WHERE id = ${body.id}
          RETURNING *; 
        `;

        console.log("Update successful:", result); // Debugging log
        return result;

      default:
        throw new Error("Invalid type for update");
    }
  } catch (error) {
    console.error("Database Update Error:", error.message); // Log full error
    throw new Error(`Database Update Error: ${error.message}`);
  }
};

// API handler :>
export default async function handler(req, res) {
  try {
    await verifyToken(req); // Ensure token verification

    const { type } = req.query;
    let result;

    switch (req.method) {
      case "GET":
        result = await getResponseData(type);
        return res.status(200).json(result);

      case "POST":
        const body = req.body; // Extract body
        result = await postData(type, body);
        return res.status(201).json(result[0]);

      case "PUT":
        result = await updateData(type, req.body);
        return res.status(200).json(result[0]);

      case "DELETE":
        const { id } = req.query;
        await deleteDataFunc(type, id);
        return res.status(204).end();

      default:
        return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: error.message });
  }
}

// export utility functions for testing/reuse
export const fetchData = getResponseData;
export const createData = postData;
export const deleteData = deleteDataFunc;

// OpenAI. (2025, February 26). Response to the prompt "Can you fix this that it matches my schema: I want to create an API endpoint that allows me to fetch, create, and delete data for programs, courses, and subjects."
// ChatGPT (Version 4.0). Accessed and retrieved on Feb 24, 2025 from https://chat.openai.com
