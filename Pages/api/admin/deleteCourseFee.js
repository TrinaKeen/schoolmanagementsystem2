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
    return null;
  }
}

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const user = await verifyToken(req);
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const id = req.query.id;
  if (!id) return res.status(400).json({ error: "Missing fee ID" });

  try {
    await sql`DELETE FROM fees WHERE id = ${id}`;
    res.status(200).json({ message: "Fee deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete fee" });
  }
}
