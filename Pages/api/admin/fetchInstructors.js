import sql from '../../../db';
import { jwtVerify } from 'jose';
import { parse } from 'cookie';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);  // Same secret from your .env

async function verifyToken(req) {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.token;

    if (!token) {
        return null;
    }

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload;  // Contains user info if you added it when signing the token
    } catch (error) {
        console.error('Invalid token:', error);
        return null;
    }
}

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const user = await verifyToken(req);

    if (!user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const instructors = await sql`
            SELECT id, first_name, last_name, email, phone, hire_date, specialization
            FROM instructors
        `;

        const formattedInstructors = instructors.map((instructor) => ({
            ...instructor,
            hire_date: instructor.hire_date ? new Date(instructor.hire_date).toLocaleDateString() : 'N/A',
        }));

        res.status(200).json(formattedInstructors);
    } catch (error) {
        console.error('Error fetching instructors:', error);
        res.status(500).json({ error: 'Failed to fetch instructors' });
    }
}
