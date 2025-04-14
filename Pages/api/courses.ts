import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient(); 
// Instantiate a Prisma client which will be used to send queries to the database.
// Only one Prisma Client instance will be created pre request

// Main API handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const courses = await prisma.course.findMany();
      // Query the `instructor` table and return all records as an array

      return res.status(200).json(courses);
    } catch (err) {
      console.error('GET /api/courses error:', err);
      return res.status(500).json({ error: 'Failed to fetch instructors' });
    }
  }

  // Addin a new course
  // Values coming from the frontend form
  // Each field match a column in the prisma schema
  if (req.method === 'POST') {
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
          instructorId: Number(instructorId),
          programId: programId ? Number(programId) : null,
        },
      });

      // Error logging
      return res.status(201).json(newCourse);
    } catch (err) {
      console.error('POST /api/instructors error:', err);
      return res.status(500).json({ error: 'Failed to add course' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
