import sql from '../../../../db';

export default async function handler(req, res) {
  try {
    const result = await sql`SELECT COUNT(*) FROM instructors`;
    const count = result[0]?.count || 0;

    res.status(200).json({ totalInstructors: parseInt(count) });
  } catch (error) {
    console.error("Error fetching instructor count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
