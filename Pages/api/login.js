import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Fetch user by email
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      // Compare password
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Invalid email or password' });
      }

      // Create JWT token with userId, role, and name
      const token = jwt.sign(
        { userId: user.id, role: user.role, name: user.name }, // Include name in the token
        process.env.JWT_SECRET, // Store this in .env
        { expiresIn: '1h' }
      );

      // Return token along with user info (userId, name, role)
      return res.status(200).json({
        token,
        user: {
          userId: user.id,
          name: user.name,
          role: user.role,
        }
      });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
