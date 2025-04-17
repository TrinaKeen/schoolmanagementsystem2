import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch all programs from the database
      const programs = await prisma.program.findMany();
      return res.status(200).json(programs); // Return the programs as a JSON response
    } catch (error) {
      console.error("Error fetching programs:", error);
      return res.status(500).json({ message: "Error fetching programs" });
    }
  }
  
  if (req.method === 'POST') {
    const {
      programCode,
      programName,
      programDescription,
      duration,
      tuitionFee,
    } = req.body;

    try {
      const newProgram = await prisma.program.create({
        data: {
          programCode,
          programName,
          programDescription,
          duration: parseInt(duration),
          tuitionFee: tuitionFee ? parseFloat(tuitionFee) : null,
        },
      });

            // Error logging
            return res.status(201).json(newProgram);
          } catch (err) {
            console.error('POST /api/programs error:', err);
            return res.status(500).json({ error: 'Failed to add program' });
          }
        }

        // Editing a program
  if (req.method === 'PUT') {
    const {
      programCode,
      programName,
      programDescription,
      duration,
      tuitionFee,
    } = req.body;

    const { id } = req.query;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: 'Missing or invalid ID' });
    }

    try {
      const updatedProgram = await prisma.program.update({
        where: { id: Number(id) },
        data: {
          programCode,
          programName,
          programDescription,
          duration: parseInt(duration),
          tuitionFee: tuitionFee ? parseFloat(tuitionFee) : null,
        },
      });

      return res.status(200).json(updatedProgram);
    } catch (err) {
      console.error('PUT /api/program error:', err);
      return res.status(500).json({ error: 'Failed to update programs' });
    }
  }


  // Program deletion
  if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: 'Missing or invalid ID' });
    }

    try {
      await prisma.program.delete({
          where: { id: Number(id) },
      });

      return res.status(200).json({message: 'Program deleted'});
    } catch (err) {
      console.error('DELETE /api/programs error:', err);
      return res.status(500).json({ error: 'Failed to delete program' });
    }
  }


  return res.status(405).json({ error: 'Method not allowed' });
}