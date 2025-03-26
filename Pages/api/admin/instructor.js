import { neon } from "@neondatabase/serverless";
import { jwtVerify } from "jose";
import { parse } from "cookie";

const sql = neon(process.env.DATABASE_URL);

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const verifyToken = async (req) => {
  const cookies = parse(req.headers.cookie || "");
  const token = cookies.token;

  if (!token) throw new Error("Unauthorized: no token provided.");

  const { payload } = await jwtVerify(token, JWT_SECRET);
  return payload;
};

const getResponseData = async (type) => {
  try {
    switch (type) {
      case "instructors":
        return await sql`SELECT id, first_name, last_name, email, phone, hire_date, specialization FROM instructors`;
      default:
        throw new Error("Invalid type");
    }
  } catch (error) {
    console.error("Database Fetch Error:", error.message);
    throw new Error(`Database Fetch Error: ${error.message}`);
  }
};

const postData = async (type, body) => {
  if (!body) throw new Error("Invalid request body");

  try {
    switch (type) {
      case "instructors":
        return await sql`
          INSERT INTO instructors (first_name, last_name, email, phone, hire_date, specialization)
          VALUES (${body.first_name}, ${body.last_name}, ${body.email}, ${body.phone}, ${body.hire_date}, ${body.specialization})
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
  const numericId = parseInt(id, 10);
  if (isNaN(numericId)) throw new Error("Invalid ID");

  try {
    switch (type) {
      case "instructors":
        return await sql`DELETE FROM instructors WHERE id = ${numericId}`;
      default:
        throw new Error("Invalid type");
    }
  } catch (error) {
    throw new Error("Error deleting data: " + error.message);
  }
};

const updateData = async (type, body) => {
  if (!body.id) throw new Error("Missing ID for update");

  try {
    switch (type) {
      case "instructors":
        const result = await sql`
          UPDATE instructors
          SET first_name = ${body.first_name},
              last_name = ${body.last_name},
              email = ${body.email},
              phone = ${body.phone},
              hire_date = ${body.hire_date},
              specialization = ${body.specialization}
          WHERE id = ${body.id}
          RETURNING *;
        `;
      default:
        throw new Error("Invalid type for update");
    }
  } catch (error) {
    console.error("Database Update Error:", error.message);
    throw new Error(`Database Update Error: ${error.message}`);
  }
};

export default async function handler(req, res) {
  try {
    await verifyToken(req);

    const { type } = req.query;
    if (!type)
      return res.status(400).json({ message: "Missing type in query" });

    let result;

    switch (req.method) {
      case "GET":
        result = await getResponseData(type);
        return res.status(200).json(result);

      case "POST":
        result = await postData(type, req.body);
        return res.status(201).json(result[0]);

      case "PUT":
        result = await updateData(type, req.body);
        return res.status(200).json(result[0]);

      case "DELETE":
        await deleteDataFunc(type, req.query.id);
        return res.status(204).end();

      default:
        return res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("API Error:", error.message, error.stack);
    return res.status(500).json({ message: error.message });
  }
}

export const fetchData = getResponseData;
export const createData = postData;
export const deleteData = deleteDataFunc;
