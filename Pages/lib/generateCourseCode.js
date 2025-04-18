import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function generateCourseCode() {
  const lastCourse = await prisma.course.findFirst({
    orderBy: {
      courseCode: 'desc',
    },
    select: {
      courseCode: true,
    },
  });

  const lastNumber = lastCourse?.courseCode?.replace('CRS-', '') || '1000';
  const nextNumber = (parseInt(lastNumber) || 1000) + 1;

  return `CRS-${nextNumber.toString().padStart(4, '0')}`; // Example: CRS-1001
}
