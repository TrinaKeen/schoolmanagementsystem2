import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient(); 
// Instantiate a Prisma client which will be used to send queries to the database.
// Only one Prisma Client instance will be created pre request

// Main API handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const instructors = await prisma.instructor.findMany();
      // Query the `instructor` table and return all records as an array

      return res.status(200).json(instructors);
    } catch (err) {
      console.error('GET /api/instructors error:', err);
      return res.status(500).json({ error: 'Failed to fetch instructors' });
    }
  }

  // Addin a new instructor
  // Values coming from the frontend form
  // Each field match a column in the prisma schema
  if (req.method === 'POST') {
    const {
      employeeNumber,
      firstName,
      middleName,
      lastName,
      department,
      email,
      phoneNumber,
      dateHired,
      dob,
    } = req.body;

    // Insert Into Database
    try {
      // Prisma function that inserts a new record into the instructors table
      const newInstructor = await prisma.instructor.create({
        data: {
          employeeNumber,
          firstName,
          middleName, // Optional
          lastName,
          department, // Optional
          email,
          phoneNumber,
          dateHired: new Date(dateHired), // This is a string that is then created into a date object
          dob: new Date(dob), // This is a string that is then created into a date object
        },
      });

      // Error logging
      return res.status(201).json(newInstructor);
    } catch (err) {
      console.error('POST /api/instructors error:', err);
      return res.status(500).json({ error: 'Failed to add instructor' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
