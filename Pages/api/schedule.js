import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const schedules = await prisma.schedule.findMany({
        include: {
          course: true,
          instructor: true,
        },
      });

      res.status(200).json(schedules);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch schedule" });
    }
  } else if (req.method === "POST") {
    const { courseId, instructorId, startTime, endTime } = req.body;

    try {
      const newSchedule = await prisma.schedule.create({
        data: {
          courseId: parseInt(courseId),
          instructorId: parseInt(instructorId),
          startTime: new Date(startTime),
          endTime: new Date(endTime),
        },
      });
      res.status(201).json(newSchedule);
    } catch (err) {
      res.status(500).json({ error: "Failed to create schedule" });
    }
  } else if (req.method === "PUT") {
    const { id } = req.query;
    const { courseId, instructorId, startTime, endTime } = req.body;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: "Missing or invalid ID" });
    }

    try {
      const updatedSchedule = await prisma.schedule.update({
        where: { id: parseInt(id) },
        data: {
          courseId: parseInt(courseId),
          instructorId: parseInt(instructorId),
          startTime: new Date(startTime),
          endTime: new Date(endTime),
        },
      });

      return res.status(200).json(updatedSchedule);
    } catch (err) {
      console.error("PUT /api/schedule error:", err);
      return res.status(500).json({ error: "Failed to update schedule" });
    }
  }

    else if (req.method === "DELETE") {
      const { id } = req.query;
  
      if (!id || Array.isArray(id)) {
        return res.status(400).json({ error: "Missing or invalid ID" });
      }
  
      try {
        await prisma.schedule.delete({
          where: { id: parseInt(id) },
        });
        return res.status(200).json({ message: "Schedule deleted successfully" });
      } catch (err) {
        console.error("DELETE /api/schedule error:", err);
  
        // Foreign key constraint (Prisma error code)
        if (err.code === "P2003") {
          return res.status(400).json({
            error:
              "Cannot delete schedule due to foreign key constraint. Instructor or course may still be linked.",
          });
        }
  
        return res.status(500).json({ error: "Failed to delete schedule" });
      }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
