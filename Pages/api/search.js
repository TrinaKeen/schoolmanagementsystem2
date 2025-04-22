// File: /pages/api/students.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const students = await prisma.student.findMany({
        select: {
          id: true,
          studentNumber: true,
          firstName: true,
          lastName: true,
        },
        orderBy: {
          studentNumber: "asc",
        },
      });

      res.status(200).json(students);
    } catch (err) {
      console.error("Error fetching students:", err);
      res.status(500).json({ error: "Failed to fetch students" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
