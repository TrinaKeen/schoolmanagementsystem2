import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'asc' }
    });
    res.json(messages);
  } else if (req.method === 'POST') {
    const { text } = req.body;
    const message = await prisma.message.create({ data: { text } });
    res.status(201).json(message);
  }
}
