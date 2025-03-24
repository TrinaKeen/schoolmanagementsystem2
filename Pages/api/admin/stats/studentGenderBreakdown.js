import sql from '../../../../db';

export default async function handler(req, res) {
  try {
    const result = await sql`
      SELECT gender, COUNT(*) as count
      FROM students
      GROUP BY gender
    `;

    const genderStats = result.map(row => ({
      label: row.gender,
      value: parseInt(row.count)
    }));

    res.status(200).json({ genderStats });
  } catch (err) {
    res.status(500).json({ error: 'Gender data fetch failed.' });
  }
}
