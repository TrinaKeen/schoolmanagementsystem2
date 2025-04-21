import { PrismaClient, PaymentStatus } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
    try {
      const payments = await prisma.payment.findMany({
        include: {
          student: true,
          fee: true,
        },
      });
      res.status(200).json(payments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch payments" });
    }
  } else if (method === "POST") {
    const { studentId, amountPaid, paymentDate, paymentStatus } = req.body;

    console.log("API received:", {
      studentId,
      amountPaid,
      paymentDate,
      paymentStatus,
    });

    try {
      const newPayment = await prisma.payment.create({
        data: {
          studentId: parseInt(studentId),
          amountPaid: parseFloat(amountPaid),
          paymentDate: new Date(paymentDate),
          paymentStatus: PaymentStatus[paymentStatus.toUpperCase()],
        },
      });
      res.status(201).json(newPayment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to create payment" });
    }
  } else if (method === "PUT") {
    const { id } = req.query;
    const { studentId, amountPaid, paymentDate, paymentStatus } = req.body;

    console.log("PUT request received for ID:", id, {
      studentId,
      amountPaid,
      paymentDate,
      paymentStatus,
    });

    if (!id) return res.status(400).json({ error: "Payment ID is required" });

    try {
      const updatedPayment = await prisma.payment.update({
        where: { id: parseInt(id) },
        data: {
          studentId: parseInt(studentId),
          amountPaid: parseFloat(amountPaid),
          paymentDate: new Date(paymentDate),
          paymentStatus: PaymentStatus[paymentStatus.toUpperCase()],
        },
      });
      res.status(200).json(updatedPayment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to update payment" });
    }
  } else if (method === "DELETE") {
    const { id } = req.query;

    if (!id) return res.status(400).json({ error: "Payment ID is required" });

    try {
      await prisma.payment.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({ message: "Payment deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete payment" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }

}
