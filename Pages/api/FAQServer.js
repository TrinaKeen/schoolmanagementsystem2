// server.ts
import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();
app.use(cors());

app.get('/faqs', async (req, res) => {
  const faqs = await prisma.fAQ.findMany();
  res.json(faqs);
});

app.listen(3001, () => console.log('API running on http://localhost:3001'));

