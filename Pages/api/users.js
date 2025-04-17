import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
        },
      });
      return res.status(200).json(users);
    } catch (error) {
      console.error("GET error:", error);
      return res.status(500).json({ error: "Failed to fetch users" });
    }
  }

  if (req.method === "POST") {
    try {
      const { role, username, email, password } = req.body;

      const existing = await prisma.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      });

      if (existing) {
        return res
          .status(400)
          .json({ error: "Username or email already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          role,
          username,
          email,
          password: hashedPassword,
        },
      });

      return res.status(201).json(newUser);
    } catch (error) {
      console.error("POST error:", error);
      return res.status(500).json({ error: "Failed to create user" });
    }
  }

  if (req.method === "PUT") {
    try {
      const { id, role, username, email, password } = req.body;

      const data = {
        role,
        username,
        email,
      };

      if (password) {
        data.password = await bcrypt.hash(password, 10);
      }

      const updated = await prisma.user.update({
        where: { id },
        data,
      });

      return res.status(200).json(updated);
    } catch (error) {
      console.error("PUT error:", error);
      return res.status(500).json({ error: "Failed to update user" });
    }
  }

  if (req.method === "DELETE") {
    try {
      const { id } = req.body;

      await prisma.user.delete({ where: { id } });

      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("DELETE error:", error);
      return res.status(500).json({ error: "Failed to delete user" });
    }
  }

  // Fallback for unsupported methods
  return res.status(405).json({ error: "Method Not Allowed" });
}
