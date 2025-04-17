import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const employees = await prisma.admin.findMany();
        res.status(200).json(employees);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch employees" });
      }
      break;

    case "POST":
      try {
        const {
          employeeNumber,
          firstName,
          middleName,
          lastName,
          email,
          phoneNumber,
          dob,
          dateHired,
        } = req.body;
        const newEmployee = await prisma.admin.create({
          data: {
            employeeNumber,
            firstName,
            middleName,
            lastName,
            email,
            phoneNumber,
            dob: new Date(dob),
            dateHired: new Date(dateHired),
          },
        });

        res.status(201).json(newEmployee);
      } catch (error) {
        if (error.code === "P2002") {
          return res
            .status(409)
            .json({ error: `Duplicate ${error.meta.target}` });
        }
        res.status(500).json({ error: "Failed to create employee" });
      }
      break;

    case "PUT":
      try {
        const {
          id,
          employeeNumber,
          firstName,
          middleName,
          lastName,
          email,
          phoneNumber,
          dob,
          dateHired,
        } = req.body;

        const updatedEmployee = await prisma.admin.update({
          where: { id: Number(id) },
          data: {
            employeeNumber,
            firstName,
            middleName,
            lastName,
            email,
            phoneNumber,
            dob: new Date(dob),
            dateHired: new Date(dateHired),
          },
        });

        res.status(200).json(updatedEmployee);
      } catch (error) {
        res
          .status(500)
          .json({ error: "Failed to update employee", detail: error.message });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.query;

        await prisma.admin.delete({
          where: { id: Number(id) },
        });

        res.status(204).end();
      } catch (error) {
        res
          .status(500)
          .json({ error: "Failed to delete employee", detail: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
