// pages/api/register.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, username, password, role } = req.body;

    try {
      // Check if the email or username already exists
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email: email },
            { username: username }
          ]
        }
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Email or username already exists' });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user with the hashed password and provided details
      const user = await prisma.user.create({
        data: {
          email,
          username,
          password: hashedPassword, // Store hashed password
          role: role || 'student',   // Default to 'student' if no role is provided
        },
      });

      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
