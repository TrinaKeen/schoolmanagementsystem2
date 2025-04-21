// server.ts
import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();
app.use(cors());

app.get('/faqs', async (req, res) => {
  try {
    const faqs = await prisma.fAQ.findMany();
    res.json(faqs);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Failed to fetch FAQs' });
  }
});

app.listen(3001, () => console.log('API running on http://localhost:3001'));

