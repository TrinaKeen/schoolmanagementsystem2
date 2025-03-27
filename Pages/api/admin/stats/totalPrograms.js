import sql from '../../../../db';

export default async function handler(req, res) {
  try {
    const result = await sql`SELECT COUNT(*) FROM programs`;
    const totalPrograms = parseInt(result[0].count, 10);
    res.status(200).json({ totalPrograms });
  } catch (err) {
    console.error("Failed to fetch total programs", err);
    res.status(500).json({ error: 'Failed to fetch total programs.' });
  }
}
