// import { PrismaClient } from "@prisma/client";
// import { generateCourseCode } from "../lib/generateCourseCode";

// const prisma = new PrismaClient();
// // Instantiate a Prisma client which will be used to send queries to the database.
// // Only one Prisma Client instance will be created pre request

// // Main API handler
// export default async function handler(req, res){
//   if (req.method === "GET") {
//     try {
//       const courses = await prisma.course.findMany({
//         include: {
//           instructor: true, // include the instructor
//           program: true, // include the program
//         },
//       });
//       // Query the `courses` table and return all records as an array

//       return res.status(200).json(courses);
//     } catch (err) {
//       console.error("GET /api/courses error:", err);
//       return res.status(500).json({ error: "Failed to fetch courses" });
//     }
//   }

//   // Addin a new course
//   // Values coming from the frontend form
//   // Each field match a column in the prisma schema
//   if (req.method === "POST") {
//     const {
//       courseName,
//       courseDescription,
//       instructorId,
//       programId,
//     } = req.body;

//     // Insert Into Database
//     try {
//       const courseCode = await generateCourseCode(); // Auto generate code
//       // Prisma function that inserts a new record into the courses table
//       const newCourse = await prisma.course.create({
//         data: {
//           courseCode,
//           courseName,
//           courseDescription,
//           instructorId: parseInt(instructorId),
//           programId: programId? parseInt(programId) : null,
//         },
//       });

//       // Error logging
//       return res.status(201).json(newCourse);
//     } catch (err) {
//       console.error("POST /api/courses error:", err);
//       return res.status(500).json({ error: "Failed to add course" });
//     }
//   }

//   // Editing a course
//   if (req.method === "PUT") {
//     const {
//       courseCode,
//       courseName,
//       courseDescription,
//       instructorId,
//       programId,
//     } = req.body;

//     const { id } = req.query;

//     if (!id || Array.isArray(id)) {
//       return res.status(400).json({ error: "Missing or invalid ID" });
//     }

//     try {
//       const updatedCourse = await prisma.course.update({
//         where: { id: Number(id) },
//         data: {
//           courseCode,
//           courseName,
//           courseDescription,
//           instructorId: parseInt(instructorId),
//           programId: programId ? parseInt(programId) : null,
//         },
//       });

//       return res.status(200).json(updatedCourse);
//     } catch (err) {
//       console.error("PUT /api/courses error:", err);
//       return res.status(500).json({ error: "Failed to update courses" });
//     }
//   }

//   // Course deletion
//   if (req.method === "DELETE") {
//     const { id } = req.query;

//     if (!id || Array.isArray(id)) {
//       return res.status(400).json({ error: "Missing or invalid ID" });
//     }

//     try {
//       await prisma.course.delete({
//         where: { id: Number(id) },
//       });

//       return res.status(200).json({ message: "Course deleted" });
//     } catch (err) {
//       console.error("DELETE /api/courses error:", err);
//       return res.status(500).json({ error: "Failed to delete course" });
//     }
//   }

//   return res.status(405).json({ error: "Method not allowed" });
// }

import { PrismaClient } from "@prisma/client";
import { generateCourseCode } from "../lib/generateCourseCode";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const courses = await prisma.course.findMany({
        include: {
          instructor: true,
          program: true,
        },
      });
      return res.status(200).json(courses);
    } catch (err) {
      console.error("GET /api/courses error:", err);
      return res.status(500).json({ error: "Failed to fetch courses" });
    }
  }

  if (req.method === "POST") {
    const { courseName, courseDescription, instructorId, programId } = req.body;

    try {
      const courseCode = await generateCourseCode();

      const newCourse = await prisma.course.create({
        data: {
          courseCode,
          courseName,
          courseDescription,
          instructorId: parseInt(instructorId),
          programId: programId ? parseInt(programId) : null,
        },
      });

      return res.status(201).json(newCourse);
    } catch (err) {
      console.error("POST /api/courses error:", err);
      return res.status(500).json({ error: "Failed to add course" });
    }
  }

  if (req.method === "PUT") {
    const { courseCode, courseName, courseDescription, instructorId, programId } = req.body;
    const { id } = req.query;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: "Missing or invalid ID" });
    }

    try {
      const updatedCourse = await prisma.course.update({
        where: { id: Number(id) },
        data: {
          courseCode,
          courseName,
          courseDescription,
          instructorId: parseInt(instructorId),
          programId: programId ? parseInt(programId) : null,
        },
      });

      return res.status(200).json(updatedCourse);
    } catch (err) {
      console.error("PUT /api/courses error:", err);
      return res.status(500).json({ error: "Failed to update course" });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ error: "Missing or invalid ID" });
    }

    try {
      await prisma.course.delete({
        where: { id: Number(id) },
      });

      return res.status(200).json({ message: "Course deleted" });
    } catch (err) {
      console.error("DELETE /api/courses error:", err);

      if (err.code === "P2003") {
        return res.status(400).json({
          error: "Foreign key constraint failed. Course is still in use.",
        });
      }

      return res.status(500).json({ error: "Failed to delete course" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
