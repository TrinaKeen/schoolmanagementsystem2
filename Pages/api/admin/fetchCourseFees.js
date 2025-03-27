import sql from '../../../db';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const fees = await sql`SELECT * FROM fees ORDER BY id DESC`;
    res.status(200).json(fees);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch course fees' });
  }
}
