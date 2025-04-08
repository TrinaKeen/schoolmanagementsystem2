// lib/generateStudentNumber.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function generateStudentNumber() {
  const lastStudent = await prisma.student.findFirst({
    orderBy: {
      studentNumber: 'desc',
    },
    select: {
      studentNumber: true,
    },
  });

  const lastNumber = lastStudent?.studentNumber || 'SN-10000000000';
  const nextNumber = parseInt(lastNumber.replace('SN-', '')) + 1;

  return `SN-${nextNumber.toString().padStart(10, '0')}`;
}
