import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { applicationId, userId } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    if (!applicationId || !userId) {
      return res.status(400).json({ message: "Missing applicationId or userId" });
    }

    // Fetch the application to check if it belongs to the user
    const application = await prisma.studentApplication.findUnique({
      where: { id: applicationId },
    });

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (application.studentId !== parseInt(userId)) {
      return res.status(403).json({ message: "You are not authorized to withdraw this application" });
    }

    // Update the status of the application to 'Withdrawn'
    const updatedApplication = await prisma.studentApplication.update({
      where: { id: applicationId },
      data: { status: "Withdrawn" },
    });

    res.status(200).json({ success: true, message: "Application withdrawn successfully", application: updatedApplication });
  } catch (error) {
    console.error("Failed to withdraw application:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
