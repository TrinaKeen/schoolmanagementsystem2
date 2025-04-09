import { getSession } from 'next-auth/react';  // Import the getSession function from next-auth
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Handler for the Student Application Status API
export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Get the session from the request
      const session = await getSession({ req });

      // Check if the user is logged in
      if (!session || !session.user) {
        return res.status(401).json({ error: 'Unauthorized. User not logged in.' });
      }

      // Fetch student applications associated with the logged-in user
      const studentApplications = await prisma.studentApplication.findMany({
        where: {
          studentId: session.user.id, // Use the logged-in user's ID
        },
        include: {
          student: true,  // Optionally, include student details if needed
          program: true,  // Optionally, include program details if needed
        },
      });

      // Return the fetched student applications as a response
      res.status(200).json(studentApplications);
    } catch (error) {
      console.error('Error fetching student applications:', error);
      res.status(500).json({ error: 'Failed to fetch student applications' });
    }
  } else {
    // If the method is not GET, return a 405 Method Not Allowed
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
