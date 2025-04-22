import { PrismaClient } from '@prisma/client';
import { generateEmployeeNumber } from "../lib/generateEmployeeNumber";

const prisma = new PrismaClient(); 
// Instantiate a Prisma client which will be used to send queries to the database.
// Only one Prisma Client instance will be created pre request

// Main API handler
export default async function handler(req, res) {
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
      const employeeNumber = await generateEmployeeNumber(); // auto generate employee number
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

  // Editing an instructor
  // Instructors API - PUT and DELETE protection
if (req.method === 'PUT' || req.method === 'DELETE') {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Missing or invalid ID' });
  }

  // Fetch the instructor by ID
  const instructor = await prisma.instructor.findUnique({
    where: { id: parseInt(id) },
  });

  if (instructor?.employeeNumber === 'UNASSIGNED') {
    return res
      .status(403)
      .json({ error: 'This placeholder instructor cannot be modified or deleted.' });
  }
}

  if (req.method === 'PUT') {
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

    const { id } = req.query;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: 'Missing or invalid ID' });
    }

    try {
      const updatedInstructor = await prisma.instructor.update({
        where: { id: Number(id) },
        data: {
          employeeNumber,
          firstName,
          middleName,
          lastName,
          department,
          email,
          phoneNumber,
          dateHired: new Date(dateHired),
          dob: new Date(dob),
        },
      });

      return res.status(200).json(updatedInstructor);
    } catch (err) {
      console.error('PUT /api/instructors error:', err);
      return res.status(500).json({ error: 'Failed to update instructor' });
    }
  }

  // Instructor deletion
  // Instructor deletion
// Instructors API - PUT and DELETE protection
if (req.method === 'PUT' || req.method === 'DELETE') {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Missing or invalid ID' });
  }

  // Fetch the instructor by ID
  const instructor = await prisma.instructor.findUnique({
    where: { id: parseInt(id) },
  });

  if (instructor?.employeeNumber === 'UNASSIGNED') {
    return res
      .status(403)
      .json({ error: 'This placeholder instructor cannot be modified or deleted.' });
  }
}


  if (req.method === 'DELETE') {
  const { id } = req.query;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: 'Missing or invalid ID' });
  }

  try {
    await prisma.instructor.delete({
      where: { id: Number(id) },
    });

    return res.status(200).json({ message: 'Instructor deleted' });

  } catch (err) {
    console.error('DELETE /api/instructors error:', err);

    // 👇 Check for Prisma foreign key constraint violation (P2003)
    if (err.code === 'P2003') {
      return res.status(400).json({
        error: 'Foreign key constraint failed – instructor is still linked to a course or schedule.',
      });
    }

    return res.status(500).json({ error: 'Failed to delete instructor' });
  }
}
}

