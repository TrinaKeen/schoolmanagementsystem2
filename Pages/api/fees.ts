import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { number } from 'zod';

const prisma = new PrismaClient(); 
// Instantiate a Prisma client which will be used to send queries to the database.
// Only one Prisma Client instance will be created pre request

// Main API handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const fees = await prisma.fee.findMany();
      // Query the `instructor` table and return all records as an array

      return res.status(200).json(fees);
    } catch (err) {
      console.error('GET /api/fees error:', err);
      return res.status(500).json({ error: 'Failed to fetch instructors' });
    }
  }

  // Addin a new course
  // Values coming from the frontend form
  // Each field match a column in the prisma schema
  if (req.method === 'POST') {
    const {
      programId,
      feeType,
      amount,
      description,
    } = req.body;

    // Insert Into Database
    try {
      // Prisma function that inserts a new record into the fees table
      const newFee = await prisma.fee.create({
        data: {
          programId: Number(programId),
          feeType,
          amount: Number(amount), 
          description,
        },
      });

      // Error logging
      return res.status(201).json(newFee);
    } catch (err) {
      console.error('POST /api/fees error:', err);
      return res.status(500).json({ error: 'Failed to add fee' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
