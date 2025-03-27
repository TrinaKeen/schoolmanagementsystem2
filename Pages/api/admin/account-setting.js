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
      case "employees":
        return await sql`
          SELECT employee_number, first_name, last_name, user_type, gender, father_name, mother_name, date_of_birth, religion, joining_date, email, contact_number, address, program, course, section, specification, username
          FROM employees
        `;
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
      case "employees":
        return await sql`
          INSERT INTO employees (
            first_name, last_name, user_type, gender, father_name, mother_name,
            date_of_birth, religion, joining_date, email, contact_number,
            address, program, course, section, specification, username, password
          )
          VALUES (
            ${body.first_name}, ${body.last_name}, ${body.user_type}, ${body.gender},
            ${body.father_name}, ${body.mother_name}, ${body.date_of_birth},
            ${body.religion}, ${body.joining_date}, ${body.email}, ${body.contact_number},
            ${body.address}, ${body.program}, ${body.course}, ${body.section},
            ${body.specification}, ${body.username}, ${body.password}
          )
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
  if (!id) throw new Error("Missing ID");

  try {
    switch (type) {
      case "employees":
        return await sql`DELETE FROM employees WHERE employee_number = ${id}`;
      default:
        throw new Error("Invalid type");
    }
  } catch (error) {
    throw new Error("Error deleting data: " + error.message);
  }
};

const updateData = async (type, body) => {
  if (!body.employee_number)
    throw new Error("Missing employee_number for update");

  try {
    switch (type) {
      case "employees":
        return await sql`
          UPDATE employees
          SET
            first_name = ${body.first_name},
            last_name = ${body.last_name},
            email = ${body.email},
            contact_number = ${body.contact_number},
            address = ${body.address},
            user_type = ${body.user_type},
            specification = ${body.specification}
          WHERE employee_number = ${body.employee_number}
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
