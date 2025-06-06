import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const { status } = req.query;

        const whereClause = status ? { status: { equals: status } } : {};

        const applications = await prisma.studentApplication.findMany({
          where: whereClause,
          include: {
            student: {
              include: {
                documentUpload: true,
              },
            },
            program: true,
            admin: true,
          },
        });

        return res.status(200).json(applications);
      } catch (error) {
        console.error("GET Error:", error);
        return res.status(500).json({ error: "Failed to fetch applications!" });
      }

    case "POST":
      try {
        const {
          studentId,
          programId,
          status = "pending",
          rejectionReason,
          approvalDate,

        } = req.body;

        if (!studentId || !programId) {
          return res
            .status(400)
            .json({ error: "Student ID and Program ID are required!" });
        }

        const newApplication = await prisma.studentApplication.create({
          data: {
            studentId,
            programId,
            status,
            rejectionReason,
            approvalDate: approvalDate ? new Date(approvalDate) : undefined,
            
          },
        });

        return res.status(201).json(newApplication);
      } catch (error) {
        console.error("POST Error:", error);
        return res.status(500).json({ error: "Failed to create application!" });
      }

    // pages/api/studentApproval.js
    case "PUT":
      try {
        const { id, status, rejectionReason, approvalDate } = req.body;
    
        if (!id || !status) {
          return res.status(400).json({ error: "ID and status are required!" });
        }
    
        const validStatuses = ["pending", "approved", "rejected"];
        if (!validStatuses.includes(status)) {
          return res.status(400).json({ error: "Invalid status value!" });
        }
    
        const updateData = {
          status,
          rejectionReason: status === "rejected" ? rejectionReason : null,
        };
    
        if (status === "approved") {
          updateData.approvalDate = approvalDate
            ? new Date(approvalDate)
            : new Date();
        }
    
        const updatedApplication = await prisma.studentApplication.update({
          where: { id: Number(id) },
          data: updateData,
          include: {
            student: {
              include: {
                documentUpload: true,
              },
            },
            program: true,
          },
        });
    
        return res.status(200).json(updatedApplication);
      } catch (error) {
        console.error("PUT Error:", error);
        return res.status(500).json({
          error: "Failed to update application!",
          details: error.message,
        });
      }
    
    
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
