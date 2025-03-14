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
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const user = await verifyToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const { student_number, program_id, base_fee, additional_fees, currency, due_date, payment_status } = req.body;

        if (!student_number || !program_id || !base_fee) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

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
