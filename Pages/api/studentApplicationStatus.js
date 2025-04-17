import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken"; // To decode the JWT token

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(" ")[1]; // Get the token from the Authorization header

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // If no token is provided, return 401 Unauthorized error
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    let decoded;
    try {
      // Verify and decode the token
      decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is set in .env
    } catch (error) {
      // Handle JWT verification errors (e.g., expired token, invalid token)
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const userId = decoded.userId; // Extract userId from the token
    const role = decoded.role; // Extract role from the token if needed

    // If no userId or role in the token, respond with error
    if (!userId) {
      return res.status(400).json({ message: "Missing userId in token" });
    }

    // You can also check the role here if needed
    if (!role) {
      return res.status(400).json({ message: "Missing role in token" });
    }

    // Fetch applications for the authenticated user
    const applications = await prisma.studentApplication.findMany({
      where: {
        studentId: userId, // Use userId from token to fetch applications
      },
      include: {
        program: true, // Include program name from the associated program table
      },
      orderBy: {
        submissionDate: 'desc', // Order by submission date in descending order
      },
    });

    // If no applications are found, return a 404 error
    if (applications.length === 0) {
      return res.status(404).json({ message: "No applications found" });
    }

    // Format applications before sending them to the client
    const formattedApplications = applications.map((app) => ({
      id: app.id,
      studentId: app.studentId,
      programName: app.program.name, // Convert programId to program name
      status: app.status,
      submittedAt: app.submissionDate.toISOString().split("T")[0], // Format date to YYYY-MM-DD
    }));

    // Send the formatted applications data as a JSON response
    res.status(200).json(formattedApplications);
  } catch (error) {
    console.error("Failed to fetch student applications:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
