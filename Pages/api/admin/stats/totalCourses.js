import sql from '../../../../db';

export default async function handler(req, res) {
  try {
    const result = await sql`SELECT COUNT(*) FROM courses`;
    const totalCourses = parseInt(result[0].count, 10);
    res.status(200).json({ totalCourses });
  } catch (err) {
    console.error("Failed to fetch total courses", err);
    res.status(500).json({ error: 'Failed to fetch total courses.' });
  }
}
