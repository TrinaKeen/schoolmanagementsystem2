import { neon } from "@neondatabase/serverless";
import jwt from "jsonwebtoken";

const sql = neon(process.env.DATABASE_URL);

// middleware to verify token
const verifyToken = async (req) => {
  if (!req.headers.authorization) {
    throw new Error("Unauthorized: no token provided.");
  }

  const token = req.headers.authorization.split(" ")[1]; // extract token from Authorization header

  if (!token) {
    throw new Error("Unauthorized: no token provided.");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};

// get data based on type
const getResponseData = async (type) => {
  switch (type) {
    case "programs":
      return await sql`SELECT * FROM programs`;
    case "courses":
      return await sql`SELECT * FROM courses`;
    case "subjects":
      return await sql`SELECT * FROM subjects`;
    default:
      throw new Error("Invalid type");
  }
};

// insert data based on type
const postData = async (type, body) => {
  try {
    switch (type) {
      case "programs":
        return await sql`INSERT INTO programs (program_type, program_name, major, program_code, duration)
                VALUES (${body.program_type}, ${body.program_name}, ${body.major}, ${body.program_code}, ${body.duration})
                RETURNING *;`;
      case "courses":
        return await sql`INSERT INTO courses (course_name, course_code, program_id, instructor_id, year)
                VALUES (${body.course_name}, ${body.course_code}, ${body.program_id}, ${body.instructor_id}, ${body.year})
                RETURNING *;`;
      case "subjects":
        return await sql`INSERT INTO fees (course_id, base_fee, additional_fees)
                VALUES (${body.course_id}, ${body.base_fee}, ${body.additional_fees})
                RETURNING *;`;
      default:
        throw new Error("Invalid type");
    }
  } catch (error) {
    throw new Error("Invalid data");
  }
};

const deleteDataFunc = async (type, id) => {
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) {
    throw new Error("Invalid ID");
  }

  switch (type) {
    case "programs":
      return await sql`DELETE FROM programs WHERE program_id = ${numericId}`;
    case "courses":
      return await sql`DELETE FROM courses WHERE course_id = ${numericId}`;
    case "subjects":
      return await sql`DELETE FROM subjects WHERE subject_id = ${numericId}`;
    default:
      throw new Error("Invalid type");
  }
};

// API handler :>
export default async function handler(req, res) {
  try {
    verifyToken(req); // verify token before proceeding
    const { type } = req.query;
    let result;

    switch (req.method) {
      case "GET":
        result = await getResponseData(type);
        return res.status(200).json(result);
      case "POST":
        result = await postData(type, body);
        return res.status(201).json(result[0]);
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
