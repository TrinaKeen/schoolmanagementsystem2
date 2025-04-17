// lib/generateStudentNumber.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const generateEmployeeNumber = async () => {
  const prisma = new PrismaClient();
  let unique = false;
  let newNumber = "";

  while (!unique) {
    const random = Math.floor(100000 + Math.random() * 900000);
    newNumber = `EMP${random}`;

    const existing = await prisma.admin.findFirst({
      where: { employeeNumber: newNumber },
    });

    if (!existing) unique = true;
  }

  return newNumber;
};
