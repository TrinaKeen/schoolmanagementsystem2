// pages/api/student-label.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "Missing id" });

  const student = await prisma.student.findUnique({ where: { id: parseInt(id) } });
  if (!student) return res.status(404).json({ error: "Student not found" });

  const label = `${student.studentNumber} | ${student.firstName} ${student.lastName}`;
  return res.status(200).json({ label });
}
