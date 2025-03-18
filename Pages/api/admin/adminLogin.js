import { neon } from "@neondatabase/serverless";
import jwt from "jsonwebtoken"; // Make sure to install jsonwebtoken
import { serialize } from "cookie"; // To set the token cookie. Install cookie and cookie jsonwebtoken - Martin

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      // Fetch user from the database
      const userResult = await sql`
        SELECT * FROM admins_logins WHERE username = ${username}
      `;

      if (userResult.length === 0) {
        return res.status(401).json({ error: "Invalid username or password." });
      }

      const user = userResult[0];

      // Check password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid username or password." });
      }

      // Update last_login timestamp
      await sql`
        UPDATE admins_logins 
        SET last_login = NOW() 
        WHERE username = ${username}
      `;

      // Generate JWT token
      const token = jwt.sign(
        { username: user.username },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h", // Set token expiration
        }
      );

      // Added by Martin
      res.setHeader(
        "Set-Cookie",
        serialize("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Use secure flag in production
          sameSite: "strict",
          path: "/",
          maxAge: 3600, // 1 hour
        })
      );

      // Successful login
      res.status(200).json({
        message: "Login successful",
        user: {
          username: user.username,
          fullName: user.full_name,
        },
        token, // Include the token in the response
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: "An error occurred while logging in." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
