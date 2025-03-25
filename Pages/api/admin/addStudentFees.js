// Generated using ChatGPT
// Can you create a Next.js API route (/api/admin/addStudentFee) to store student fees in a PostgreSQL database?
// Use a POST method to insert a new student fee record into the tuition_fees table.
// Require authentication using JWT, verifying the token from cookies before inserting data.
// Validate that student_number, program_id, and base_fee are provided, returning an error if missing.
// Allow optional fields such as additional_fees, currency, due_date, and payment_status (defaulting to Unpaid).
// Allow error handling as well

// OpenAI. (2025). ChatGPT GPT-4o. Accessed and retrieved on March 14, 2025, from https://chat.openai.com

import sql from '../../../db'; // Importing database connection
import { jwtVerify } from 'jose'; // Importing JWT verification library
import { parse } from 'cookie';

// Encoding JWT Secret from environment variables for security
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// Function to verify JWT token from cookies.
// req - The incoming HTTP request object.
// Returns decoded user data if valid, otherwise null. 
async function verifyToken(req) {
    const cookies = parse(req.headers.cookie || ''); // Parse cookies from the request headers
    const token = cookies.token; // Extract JWT token from cookies

    if (!token) return null; // If no token is found, return null (unauthorized)

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET); // Verify the token using the secret key
        return payload; // Return the decoded user data from the token
    } catch (error) {
        console.error('Invalid token:', error); // Log token verification errors
        return null; // Return null if verification fails
    }
}

// API handler to add a new student fee to the database.
// req - The incoming HTTP request object.
// res - The response object to send the response.
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' }); // Only allow POST requests
    }

    const user = await verifyToken(req); // Verify user authentication
    if (!user) return res.status(401).json({ error: 'Unauthorized' }); // If unauthorized, return 401

    try {
        // Extracting fields from the request body
        const { student_number, program_id, base_fee, additional_fees, currency, due_date, payment_status } = req.body;

        // Check if required fields are present
        if (!student_number || !program_id || !base_fee) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Insert the fee data into the tuition_fees table
        await sql`
            INSERT INTO tuition_fees (student_number, program_id, base_fee, additional_fees, currency, due_date, payment_status)
            VALUES (${student_number}, ${program_id}, ${base_fee}, ${additional_fees || 0}, ${currency}, ${due_date || null}, ${payment_status || 'Unpaid'})
        `;

        res.status(201).json({ message: 'Fee added successfully' });
    } catch (error) {
        console.error('Error adding student fee:', error);
        res.status(500).json({ error: 'Failed to add student fee' });
    }
}
