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
  } catch (err) {
    console.error('Token verification failed:', err);
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const user = await verifyToken(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  const { course_id, base_fee, additional_fees } = req.body;

  if (!course_id || !base_fee) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await sql`
      INSERT INTO fees (course_id, base_fee, additional_fees)
      VALUES (${course_id}, ${base_fee}, ${additional_fees || 0})
    `;
    res.status(201).json({ message: 'Course fee added successfully' });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ error: 'Failed to add course fee' });
  }
}
