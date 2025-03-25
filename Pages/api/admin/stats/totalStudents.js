import sql from '../../../../db';

export default async function handler(req, res) {
  try {
    const result = await sql`SELECT COUNT(*) FROM students`;
    const count = result[0]?.count || 0;

    res.status(200).json({ totalStudents: parseInt(count) });
  } catch (error) {
    console.error("Error fetching student count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
