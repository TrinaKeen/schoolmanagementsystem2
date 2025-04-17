import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient(); 
// Instantiate a Prisma client which will be used to send queries to the database.
// Only one Prisma Client instance will be created pre request

// Main API handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const fees = await prisma.fee.findMany();
      // Query the `fees` table and return all records as an array

      return res.status(200).json(fees);
    } catch (err) {
      console.error('GET /api/fees error:', err);
      return res.status(500).json({ error: 'Failed to fetch fees' });
    }
  }

  // Addin a new fee
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

  // Editing a fee
  if (req.method === 'PUT') {
    const {
      programId,
      feeType,
      amount,
      description,
    } = req.body;

    const { id } = req.query;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: 'Missing or invalid ID' });
    }

    try {
      const updatedFee = await prisma.fee.update({
        where: { id: Number(id) },
        data: {
          programId,
          feeType,
          amount, 
          description,
        },
      });

      return res.status(200).json(updatedFee);
    } catch (err) {
      console.error('PUT /api/fees error:', err);
      return res.status(500).json({ error: 'Failed to update fees' });
    }
  }


  // Fee deletion
  if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: 'Missing or invalid ID' });
    }

    try {
      await prisma.course.delete({
          where: { id: Number(id) },
      });

      return res.status(200).json({message: 'Fee deleted'});
    } catch (err) {
      console.error('DELETE /api/fees error:', err);
      return res.status(500).json({ error: 'Failed to delete fee' });
    }
  }


  return res.status(405).json({ error: 'Method not allowed' });
}
