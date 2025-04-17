import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req,res) {
    if (req.method === 'GET'){
        try {
            const schedules = await prisma.course.findMany({
                include: {
                    course: true,
                    instructor: true,
                },
            });
            res.status(200).json(schedules);
        } catch (err) {
            res.status(500).json({ error: 'Failed to fetch schedule'});
        }
    } else if (req.method === 'POST') {
        const {  courseId, instructorId, startTime, endTime  } = req.body;
        
        try {
            const newSchedule = await prisma.course.create({
                data: {
                    courseId: parseInt(courseId),
                    instructorId: parseInt(instructorId),
                    programId: programId ? parseInt(programId) : null,
                    startTime,
                    endTime
                },
            });
            res.status(201).json(newSchedule);
        } catch (err) {
            res.status(500).json({ error: 'Failed to create schedule'});
        }
    } else {
        res.status(405).json({ error: 'Method not allowed'});
    }
}
