import { prisma } from '@/lib/prisma'; // Adjust path to your prisma client

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      include: {
        student: true,
      },
    });

    if (!user || !user.student) {
      return res.status(404).json({ error: 'Student record not found for this user' });
    }

    const studentApplications = await prisma.studentApplication.findMany({
      where: {
        studentId: user.student.id,
      },
      include: {
        program: true,
        admin: true,
      },
      orderBy: {
        submissionDate: 'desc',
      },
    });

    res.status(200).json({ applications: studentApplications });
  } catch (error) {
    console.error('Error fetching student applications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
