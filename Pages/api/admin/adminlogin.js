import { neon } from "@neondatabase/serverless";
import jwt from "jsonwebtoken"; // Make sure to install jsonwebtoken
import { serialize } from "cookie"; // To set the token cookie. Install cookie and cookie jsonwebtoken - Martin

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      // I changed the student_login table to admins_logins to match the database schema
      // Fetch user from the database
      const userResult = await sql`
        SELECT * FROM admins_logins WHERE username = ${username}
      `;

      if (userResult.length === 0) {
        return res.status(401).json({ error: "Invalid username." });
      }

      const user = userResult[0];

      // Check password
      const isPasswordValid = password === user.password; // this is a placeholder, replace with bcrypt compare
      // const isPasswordValid = await bcrypt.compare(password, user.password);
      // I replaced the bcrypt compare with a simple password check for now since we're not using hash passwords

      // I also added console logs to check the password values
      console.log("Received password:", password);
      console.log("Stored password in DB:", user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password." });
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
      console.log("Error during login:", error);
      res.status(500).json({ error: "An error occurred while logging in." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

// I used the student login code as a reference to fix the admin login code
// OpenAI. (2025, February 26). Response to the prompt "why can't I log in after entering my details correctly after updating the code to match my database schema?"
// ChatGPT (Version 4.0). Accessed and retrieved on Feb 24, 2025 from https://chat.openai.com
// Thanks for my groupmates for helping me out <3
