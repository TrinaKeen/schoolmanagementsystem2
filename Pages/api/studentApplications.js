import { PrismaClient } from '@prisma/client';
import formidable, { IncomingForm } from 'formidable';
import fs from 'fs';
import { generateStudentNumber } from '../lib/generateStudentNumber';

const prisma = new PrismaClient();

// Disable Next.js default body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const pendingApplications = await prisma.studentApplication.findMany({
        where: { status: 'pending' },
        include: { student: true, program: true },
      });
      return res.status(200).json(pendingApplications);
    } catch (error) {
      return res.status(500).json({ error: 'Error fetching student applications' });
    }
  }

  if (req.method === 'POST') {
    const form = new IncomingForm({ multiples: true, uploadDir: '/uploads/', keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error parsing the form' });
      }

      try {
        const {
          firstName, middleName, lastName, dob, gender, age, nationality, placeOfBirth,
          email, phoneNumber, homeAddress, emergencyContactName, emergencyContactPhoneNumber,
          emergencyContactRelationship, previousSchools, yearOfGraduation, gpa, programId
        } = fields;

        const nextStudentNumber = await generateStudentNumber();

        const newStudent = await prisma.student.create({
          data: {
            studentNumber: nextStudentNumber,
            firstName: String(firstName),
            middleName: String(middleName),
            lastName: String(lastName),
            dob: new Date(dob),
            gender: String(gender),
            age: parseInt(age, 10),
            nationality: String(nationality),
            placeOfBirth: String(placeOfBirth),
            email: String(email),
            phoneNumber: String(phoneNumber),
            homeAddress: String(homeAddress),
            emergencyContactName: String(emergencyContactName),
            emergencyContactPhoneNumber: String(emergencyContactPhoneNumber),
            emergencyContactRelationship: String(emergencyContactRelationship),
            previousSchools: String(previousSchools),
            yearOfGraduation: parseInt(yearOfGraduation, 10),
            gpa: parseFloat(gpa),
          },
        });

        const newApplication = await prisma.studentApplication.create({
            data: {
              studentId: newStudent.id,
              programId: parseInt(programId, 10),
              status: 'pending',
            },
          });
          

        const filesArray = Array.isArray(files) ? files : Object.values(files);

const documentUploads = await Promise.all(
  filesArray.flat().map(async (file) => {
    return await prisma.documentUpload.create({
      data: {
        studentId: newStudent.id,
        documentType: file.originalFilename || 'application_document',
        fileUrl: file.filepath.replace('/uploads/', '/'),
      },
    });
  })
);


        return res.status(201).json({
          student: newStudent,
          application: newApplication,
          documents: documentUploads,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error creating student application' });
      }
    });
  }

  if (req.method === 'PUT') {
    try {
      const { id, status, rejectionReason } = req.body;

      const updatedApplication = await prisma.studentApplication.update({
        where: { id },
        data: {
          status,
          rejectionReason,
          approvalDate: status === 'approved' ? new Date() : null,
        },
      });

      return res.status(200).json(updatedApplication);
    } catch (error) {
      return res.status(500).json({ error: 'Error updating application status' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
}
