import sql from '../../../db';
import { jwtVerify } from 'jose';
import { parse } from 'cookie';

// Use the JWT secret from your .env file
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// Function to verify the token from the request cookies
async function verifyToken(req) {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.token;

    if (!token) {
        return null;  // No token present
    }

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload;  // This could contain user data if you added it to the token at login
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
}

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // ✅ Verify the token before fetching data
    const user = await verifyToken(req);

    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const fees = await sql`
            SELECT id, student_number, program_id, base_fee, additional_fees, total_fee, currency, due_date, payment_status
            FROM tuition_fees
        `;

        const formattedFees = fees.map((fee) => ({
            ...fee,
            due_date: fee.due_date ? new Date(fee.due_date).toLocaleDateString() : 'N/A',
        }));

        res.status(200).json(formattedFees);
    } catch (error) {
        console.error('Error fetching student fees:', error);
        res.status(500).json({ error: 'Failed to fetch student fees' });
    }
}
