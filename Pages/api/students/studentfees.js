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
    console.error('JWT error', err);
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
    const results = await sql`
      SELECT 
        stf.student_number,
        MAX(stf.program_id) AS program_id,
        MAX(stf.payment_status) AS payment_status,
        MAX(stf.currency) AS currency,
        COALESCE(SUM(f.total_fee), 0) AS course_total,
        COALESCE((
          SELECT SUM(mf.amount)
          FROM miscellaneous_fees mf
          WHERE mf.student_number = stf.student_number
        ), 0) AS misc_total,
        COALESCE(SUM(f.total_fee), 0) + COALESCE((
          SELECT SUM(mf.amount)
          FROM miscellaneous_fees mf
          WHERE mf.student_number = stf.student_number
        ), 0) AS total_fee
      FROM student_tuition_fees stf
      LEFT JOIN fees f ON stf.fees_id = f.id
      GROUP BY stf.student_number
    `;

    res.status(200).json(results);
  } catch (err) {
    console.error('Failed to fetch fees:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
