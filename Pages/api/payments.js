import { PrismaClient } from "@prisma/client";
import { parse } from "path";

const prisma = new PrismaClient();

export default async function handler(req,res) {
    if (req.method === 'GET'){
        try {
            const payments = await prisma.course.findMany({
                include: {
                    student: true,
                    fee : true,
                },
            });
            res.status(200).json(payments);
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch payment'});
        }
    } else if (req.method === 'POST') {
        const {  studentId, amountPaid , paymentDate , paymentStatus  } = req.body;
        
        try {
            const newPayment = await prisma.course.create({
                data: {
                    studentId: parseInt(studentId),
                    amountPaid: parseFloat(amountPaid),
                    paymentDate,
                    paymentStatus
                },
            });
            res.status(201).json(newPayment);
        } catch (err) {
            res.status(500).json({ error: 'Failed to create payment'});
        }
    } else {
        res.status(405).json({ error: 'Method not allowed'});
    }
}