import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const students = await prisma.student.findMany({
          include: {
            studentApplication: {
              orderBy: { submissionDate: 'desc' },
              take: 1,
              include: {
                program: true, // ✅ Include the related program info
              },
            },
          },
        });
        

        const studentsWithStatus = students.map((student) => {
          const latestApp = student.studentApplication[0];
          const status = latestApp?.status === 'approved' ? 'Active' : 'Inactive';
          return {
            ...student,
            status,
          };
        });

        res.status(200).json(studentsWithStatus);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch students' });
      }
      break;

    case 'POST':
      try {
        const {
          studentNumber,
          firstName,
          middleName,
          lastName,
          dob,
          gender,
          age,
          nationality,
          placeOfBirth,
          email,
          phoneNumber,
          homeAddress,
          emergencyContactName,
          emergencyContactPhoneNumber,
          emergencyContactRelationship,
          previousSchools,
          yearOfGraduation,
          gpa,
        } = req.body;

        const newStudent = await prisma.student.create({
          data: {
            studentNumber,
            firstName,
            middleName,
            lastName,
            dob: new Date(dob),
            gender,
            age,
            nationality,
            placeOfBirth,
            email,
            phoneNumber,
            homeAddress,
            emergencyContactName,
            emergencyContactPhoneNumber,
            emergencyContactRelationship,
            previousSchools,
            yearOfGraduation,
            gpa,
          },
        });

        res.status(201).json(newStudent);
      } catch (error) {
        if (error.code === 'P2002') {
          return res
            .status(409)
            .json({ error: `Duplicate field: ${error.meta?.target}` });
        }
        res.status(500).json({ error: 'Failed to create student', detail: error.message });
      }
      break;

    case 'PUT':
      try {
        const {
          id,
          studentNumber,
          firstName,
          middleName,
          lastName,
          dob,
          gender,
          age,
          nationality,
          placeOfBirth,
          email,
          phoneNumber,
          homeAddress,
          emergencyContactName,
          emergencyContactPhoneNumber,
          emergencyContactRelationship,
          previousSchools,
          yearOfGraduation,
          gpa,
        } = req.body;

        const updatedStudent = await prisma.student.update({
          where: { id: Number(id) },
          data: {
            studentNumber,
            firstName,
            middleName,
            lastName,
            dob: new Date(dob),
            gender,
            age,
            nationality,
            placeOfBirth,
            email,
            phoneNumber,
            homeAddress,
            emergencyContactName,
            emergencyContactPhoneNumber,
            emergencyContactRelationship,
            previousSchools,
            yearOfGraduation,
            gpa,
          },
        });

        res.status(200).json(updatedStudent);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update student', detail: error.message });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;

        await prisma.student.delete({
          where: { id: Number(id) },
        });

        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete student', detail: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
