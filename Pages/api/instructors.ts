import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const instructors = await prisma.instructor.findMany();
      return res.status(200).json(instructors);
    } catch (err) {
      console.error('GET /api/instructors error:', err);
      return res.status(500).json({ error: 'Failed to fetch instructors' });
    }
  }

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

    try {
      const newInstructor = await prisma.instructor.create({
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

      return res.status(201).json(newInstructor);
    } catch (err) {
      console.error('POST /api/instructors error:', err);
      return res.status(500).json({ error: 'Failed to add instructor' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
