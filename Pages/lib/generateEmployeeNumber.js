// lib/generateStudentNumber.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function generateEmployeeNumber() {
  const lastEmployee = await prisma.admin.findFirst({
    orderBy: {
        employeeNumber: 'desc',
    },
    select: {
        employeeNumber: true,
    },
  });

  const lastNumber = lastEmployee?.employeeNumber || 'EN-10000000000';
  const nextNumber = parseInt(lastNumber.replace('EN-', '')) + 1;

  return `EN-${nextNumber.toString().padStart(10, '0')}`;
}
