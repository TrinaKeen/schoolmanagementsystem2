import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { userId, applicationId } = req.query;

  if (req.method === 'POST' && applicationId) {
    try {
      const updatedApplication = await prisma.studentApplication.update({
        where: { id: Number(applicationId) },
        data: { status: 'withdrawn' },
      });

      return res.status(200).json({
        message: 'Application withdrawn successfully',
        application: updatedApplication,
      });
    } catch (error) {
      console.error('Error withdrawing application:', error);
      return res.status(500).json({ error: 'Failed to withdraw the application' });
    }
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const student = await prisma.student.findUnique({
      where: { userId: Number(userId) },
    });

    if (!student) {
      return res.status(404).json({ error: 'Student record not found for this user' });
    }

    const studentApplications = await prisma.studentApplication.findMany({
      where: { studentId: student.id },
      include: {
        student: { select: { studentNumber: true } },
        program: { select: { programName: true, programDescription: true } },
      },
      orderBy: { submissionDate: 'desc' },
    });

    res.status(200).json({ applications: studentApplications });
  } catch (error) {
    console.error('Error fetching student applications:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
