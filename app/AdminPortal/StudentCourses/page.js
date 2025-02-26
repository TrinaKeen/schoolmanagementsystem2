import { neon } from '@neondatabase/serverless';
import jwt from 'jsonwebtoken';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  try {
    const decoded = verifyToken(req); // Validate the token
    // Add your existing logic here (GET, POST, DELETE, etc.)
  } catch (error) {
    console.error('Error:', error);
    if (error.message.includes('Unauthorized')) {
      return res.status(401).json({ error: error.message });
    }
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
}




// Fetch data based on type
const getResponseData = async (type) => {
  switch (type) {
    case 'programs':
      return await sql`SELECT * FROM programs;`;
    case 'courses':
      return await sql`SELECT * FROM courses;`;
    case 'fees':
      return await sql`SELECT * FROM fees;`;
    default:
      throw new Error('Invalid type parameter');
  }
};

// Post data based on type
const postData = async (type, body) => {
  switch (type) {
    case 'programs':
      return await sql`
        INSERT INTO programs (program_type, program_name, major, program_code)
        VALUES (${body.program_type}, ${body.program_name}, ${body.major}, ${body.program_code})
        RETURNING *;
      `;
    case 'courses':
      return await sql`
        INSERT INTO courses (course_name, course_code, program_id)
        VALUES (${body.course_name}, ${body.course_code}, ${body.program_id})
        RETURNING *;
      `;
    case 'fees':
      return await sql`
        INSERT INTO fees (course_id, base_fee, additional_fees)
        VALUES (${body.course_id}, ${body.base_fee}, ${body.additional_fees})
        RETURNING *;
      `;
    default:
      throw new Error('Invalid type parameter');
  }
};

// Delete data based on type
const deleteDataFunc = async (type, id) => {
  switch (type) {
    case 'programs':
      await sql`DELETE FROM programs WHERE id = ${id};`;
      break;
    case 'courses':
      await sql`DELETE FROM courses WHERE id = ${id};`;
      break;
    case 'fees':
      await sql`DELETE FROM fees WHERE id = ${id};`;
      break;
    default:
      throw new Error('Invalid type parameter');
  }
};

// API handler
export default async function handler(req, res) {
  try {
    verifyToken(req); // Validate the token
    const { type } = req.query;
    let result;

    switch (req.method) {
      case 'GET':
        result = await getResponseData(type);
        return res.status(200).json(result);
      case 'POST':
        result = await postData(type, req.body);
        return res.status(201).json(result[0]);
      case 'DELETE':
        const { id } = req.query;
        await deleteDataFunc(type, id);
        return res.sendStatus(204);
      default:
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
}

// Export utility functions for reuse
export const fetchData = getResponseData;
export const createData = postData;
export const deleteData = deleteDataFunc; // Rename the function here
