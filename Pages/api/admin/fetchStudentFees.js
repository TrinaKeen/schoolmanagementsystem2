import sql from '../../../db';
import { jwtVerify } from 'jose';
import { parse } from 'cookie';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

async function verifyToken(req) {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.token;

    if (!token) return null;

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET);
        return payload;
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
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const tuitionFees = await sql`SELECT * FROM tuition_fees`;
        const miscellaneousFees = await sql`SELECT * FROM miscellaneous_fees`;

        const formattedFees = [...tuitionFees, ...miscellaneousFees].map(fee => ({
            ...fee,
            due_date: fee.due_date ? new Date(fee.due_date).toLocaleDateString() : 'N/A',
        }));

        res.status(200).json(formattedFees);
    } catch (error) {
        console.error('Error fetching student fees:', error);
        res.status(500).json({ error: 'Failed to fetch student fees' });
    }
}
