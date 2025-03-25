// Generated using ChatGPT
// Can you generate a Next.js API route (/api/admin/fetchStudentFees)
// that retrieves student fee records from a neon PostgreSQL database?
// Use a GET endpoint that returns student fees data from the student fees tables (listing every fees table from the database).
// Use JWT authentication to protect access, verifying the token from cookies before fetching data.

// OpenAI. (2025). ChatGPT GPT-4o. Accessed and retrieved on March 14, 2025, from https://chat.openai.com

import sql from '../../../db';
import { jwtVerify } from 'jose';
import { parse } from 'cookie';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET); // Encoding JWT Secret for verification

// Function to verify JWT token from cookies
async function verifyToken(req) {
    const cookies = parse(req.headers.cookie || ''); // Parse cookies from the request
    const token = cookies.token; // Extract JWT token

    if (!token) return null; // If no token, return null (unauthorized)

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET); // Verify token
        return payload; // Return user data from the token
    } catch (error) {
        console.error('Invalid token:', error);
        return null; // Return null if token is invalid
    }
}

// API Handler for Fetching Student Fees
export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' }); // Allow only GET requests
    }

    const user = await verifyToken(req); // Verify the user's authentication
    if (!user) return res.status(401).json({ error: 'Unauthorized' }); // Return 401 if unauthorized

    try {
        // Fetch tuition fees and miscellaneous fees separately
        const tuitionFees = await sql`SELECT * FROM tuition_fees`;
        const miscellaneousFees = await sql`SELECT * FROM miscellaneous_fees`;

        // Combine and format the fees data
        const formattedFees = [...tuitionFees, ...miscellaneousFees].map(fee => ({
            ...fee,
            due_date: fee.due_date ? new Date(fee.due_date).toLocaleDateString() : 'N/A',
        }));

        res.status(200).json(formattedFees); // Return the formatted data as JSON
    } catch (error) {
        console.error('Error fetching student fees:', error);
        res.status(500).json({ error: 'Failed to fetch student fees' }); // Handle errors
    }
}
