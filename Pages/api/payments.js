import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Fetch approved students along with their related fees
      const approvedStudentsWithFees = await prisma.studentApplication.findMany({
        where: {
          status: "approved",  // Filter by approved status
        },
        include: {
          student: true,  // Include student details
          program: {
            include: {
              fees: true,  // Include fees related to the program
            },
          },
        },
      });

      // Map the approved students to get studentId and feeIds
      const studentFeeMap = approvedStudentsWithFees.map(application => {
        return {
          studentId: application.studentId,
          feeIds: application.program.fees.map(fee => fee.id),
        };
      });

      return res.status(200).json(studentFeeMap);  // Send the mapped data to the client
    } catch (error) {
      console.error("Error fetching approved students with fees:", error);
      return res.status(500).json({ message: "Error fetching approved students with fees" });
    }
  }

  if (req.method === 'POST') {
    const { studentId, feeId, amountPaid, paymentStatus } = req.body;

    try {
      const newPayment = await prisma.payment.create({
        data: {
          studentId: Number(studentId),
          feeId: feeId ? Number(feeId) : null,
          amountPaid: parseFloat(amountPaid),
          paymentStatus: paymentStatus || 'PENDING',
        },
      });

      return res.status(201).json(newPayment);
    } catch (err) {
      console.error('POST /api/payments error:', err);
      return res.status(500).json({ error: 'Failed to add payment' });
    }
  }

  if (req.method === 'PUT') {
    const { id } = req.query;
    const { studentId, feeId, amountPaid, paymentStatus } = req.body;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: 'Missing or invalid ID' });
    }

    try {
      const updatedPayment = await prisma.payment.update({
        where: { id: Number(id) },
        data: {
          studentId: Number(studentId),
          feeId: feeId ? Number(feeId) : null,
          amountPaid: parseFloat(amountPaid),
          paymentStatus,
        },
      });

      return res.status(200).json(updatedPayment);
    } catch (err) {
      console.error('PUT /api/payments error:', err);
      return res.status(500).json({ error: 'Failed to update payment' });
    }
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: 'Missing or invalid ID' });
    }

    try {
      await prisma.payment.delete({
        where: { id: Number(id) },
      });

      return res.status(200).json({ message: 'Payment deleted' });
    } catch (err) {
      console.error('DELETE /api/payments error:', err);
      return res.status(500).json({ error: 'Failed to delete payment' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
