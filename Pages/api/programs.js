import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch all programs from the database
      const programs = await prisma.program.findMany({
        select: {
          id: true,
          programName: true,
          programCode: true,
          programDescription: true,
          
        },
      });
      res.status(200).json(programs); // Return the programs as a JSON response
    } catch (error) {
      console.error("Error fetching programs:", error);
      res.status(500).json({ message: "Error fetching programs" });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
