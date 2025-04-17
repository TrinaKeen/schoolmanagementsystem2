import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
// Instantiate a Prisma client which will be used to send queries to the database.
// Only one Prisma Client instance will be created pre request

// Main API handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const courses = await prisma.course.findMany({
        include: {
          instructor: true, // include the instructor
          program: true, // include the program
        },
      });
      // Query the `courses` table and return all records as an array

      return res.status(200).json(courses);
    } catch (err) {
      console.error("GET /api/courses error:", err);
      return res.status(500).json({ error: "Failed to fetch courses" });
    }
  }

  // Addin a new course
  // Values coming from the frontend form
  // Each field match a column in the prisma schema
  if (req.method === "POST") {
    const {
      courseCode,
      courseName,
      courseDescription,
      instructorId,
      programId,
    } = req.body;

    // Insert Into Database
    try {
      // Prisma function that inserts a new record into the courses table
      const newCourse = await prisma.course.create({
        data: {
          courseCode,
          courseName,
          courseDescription,
          instructorId: parseInt(instructorId),
          programId: parseInt(programId),
        },
      });

      // Error logging
      return res.status(201).json(newCourse);
    } catch (err) {
      console.error("POST /api/courses error:", err);
      return res.status(500).json({ error: "Failed to add course" });
    }
  }

  // Editing a course
  if (req.method === "PUT") {
    const {
      courseCode,
      courseName,
      courseDescription,
      instructorId,
      programId,
    } = req.body;

    const { id } = req.query;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: "Missing or invalid ID" });
    }

    try {
      const updatedCourse = await prisma.course.update({
        where: { id: Number(id) },
        data: {
          courseCode,
          courseName,
          courseDescription,
          instructorId: parseInt(instructorId),
          programId: parseInt(programId),
        },
      });

      return res.status(200).json(updatedCourse);
    } catch (err) {
      console.error("PUT /api/courses error:", err);
      return res.status(500).json({ error: "Failed to update courses" });
    }
  }

  // Course deletion
  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: "Missing or invalid ID" });
    }

    try {
      await prisma.course.delete({
        where: { id: Number(id) },
      });

      return res.status(200).json({ message: "Course deleted" });
    } catch (err) {
      console.error("DELETE /api/courses error:", err);
      return res.status(500).json({ error: "Failed to delete course" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
