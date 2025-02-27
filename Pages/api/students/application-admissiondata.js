// Credits for google.com and ChatGPT for guiding me step by step on how I can connect this API to my frontend
// These comments provide references for auditing security, database practices, error handling, and compliance.

// ChatGPT Command: "Can you generate a reference for auditing JWT token authentication for a Node.js application? Include best practices for token signing, validation, and error handling."
// ChatGPT Reference: Best practices for JWT token verification, expiration handling, and secure token storage.

import { neon } from '@neondatabase/serverless';
import jwt from 'jsonwebtoken';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const token = req.headers.authorization?.split(' ')[1];

    // JWT Token Verification: Ensure token is provided and valid
    // ChatGPT Command: "Can you generate best practices for verifying JWT tokens in a Node.js application?"
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
      // Best practices for JWT authentication (secured token verification)
      // ChatGPT Command: "What are the best practices for securely verifying and decoding JWT tokens?"
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const studentNumber = req.query.studentNumber;

      // Secure logging of the decoded token and received student number for auditing
      console.log('Decoded token:', decoded);  // Be mindful not to log sensitive information in production
      console.log('Received student number:', studentNumber);

      // Input validation: Ensure student number is provided
      if (!studentNumber) {
        return res.status(400).json({ error: 'Student number is required' });
      }

      // Parameterized queries to prevent SQL injection
      // ChatGPT Command: "How can I prevent SQL injection in SQL queries for a Node.js application?"
      const result = await sql`
        SELECT 
          s.student_number,
          s.first_name,
          s.middle_name,
          s.last_name,
          s.dob,
          s.age,
          s.gender,
          s.nationality,
          s.email,
          s.phone_number,
          s.home_address,
          s.emergency_contact_relationship,
          s.emergency_contact_name,
          s.emergency_contact_phone,
          s.previous_schools,
          s.year_of_graduation,
          s.gpa,
          s.program_id,
          p.program_name,
          p.major,
          s.diploma,
          s.form137,
          s.identification_card,
          s.photo,
          s.marriage_certificate,
          s.birth_certificate,
          s.good_moral,
          s.honorable_dismissal,
          s.report_card,
          s.terms_and_conditions,
          s.data_privacy_consent,
          s.application_submitted_at,
          a.approval_date,
          a.rejection_reason,
          a.reviewer_name,
          a.reviewer_comments
        FROM 
          students s
        LEFT JOIN 
          programs p ON s.program_id = p.id  -- Join with programs table to get program_name and major
        LEFT JOIN 
          admin_approvals a ON s.student_number = a.student_number
        WHERE 
          s.student_number = ${studentNumber}
      `;

      // Validate the result: Ensure that student data is returned
      if (result.length === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }

      // Return the student data as a response
      const studentData = result[0];
      return res.status(200).json(studentData);
    } catch (error) {
      // Handle errors securely and ensure no sensitive information is exposed in production
      // ChatGPT Command: "What are best practices for error handling in a Node.js API to avoid exposing sensitive information?"
      console.error('Error fetching student details:', error.message || error);
      return res.status(500).json({ error: 'An error occurred while fetching student details.' });
    }
  } else {
    // Method Not Allowed error: Only GET method is allowed for this endpoint
    // ChatGPT Command: "How to handle non-supported HTTP methods in a Node.js API?"
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
