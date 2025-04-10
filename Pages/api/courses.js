import { PrismaClient } from "@prisma/client";
import { parse } from "path";

const prisma = new PrismaClient();

export default async function handler(req,res) {
    if (req.method === 'GET'){
        try {
            const courses = await prisma.course.findMany({
                include: {
                    instructor: true,
                    program: true,
                },
            });
            res.status(200).json(courses);
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch courses'});
        }
    } else if (req.method === 'POST') {
        const { courseCode, courseName, courseDescription, instructorId, programId } = req.body;
        
        try {
            const newCourse = await prisma.course.create({
                data: {
                    courseCode,
                    courseName,
                    courseDescription,
                    instructorId: parseInt(instructorId),
                    programId: programId ? parseInt(programId) : null,
                },
            });
            res.status(201).json(newCourse);
        } catch (err) {
            res.status(500).json({ error: 'Failed to create course'});
        }
    } else {
        res.status(405).json({ error: 'Method not allowed'});
    }
}