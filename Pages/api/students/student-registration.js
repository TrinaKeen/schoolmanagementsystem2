// Credits for google.com and ChatGPT for guiding me step by step on how I can connect this API to my frontend
// These comments provide references for auditing security, database practices, error handling, and compliance.

// ChatGPT Command: "Can you guide me on how to securely handle student registration and data insertion into the database in a Node.js API?"
// ChatGPT Reference: Best practices for securely handling POST requests, ensuring safe data insertion, and avoiding common vulnerabilities like SQL injection.

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Handle student registration
    // ChatGPT Command: "How do I securely handle and sanitize user data for student registration?"
    const {
      student_number,
      first_name,
      middle_name,
      last_name,
      dob,
      gender,
      age,
      nationality,
      place_of_birth,
      email,
      phone_number,
      home_address,
      emergency_contact_name,
      emergency_contact_phone,
      emergency_contact_relationship,
      previous_schools,
      year_of_graduation,
      gpa,
      program_id,
      diploma,
      form137,
      identification_card,
      photo,
      marriage_certificate,
      birth_certificate,
      good_moral,
      honorable_dismissal,
      report_card,
      terms_and_conditions,
      data_privacy_consent,
    } = req.body;

    try {
      // Ensure safe data insertion with parameterized queries
      // ChatGPT Command: "What are the best practices to prevent SQL injection in Node.js APIs when inserting data into the database?"
      await sql`
        INSERT INTO students (
          student_number,
          first_name,
          middle_name,
          last_name,
          dob,
          gender,
          age,
          nationality,
          place_of_birth,
          email,
          phone_number,
          home_address,
          emergency_contact_name,
          emergency_contact_phone,
          emergency_contact_relationship,
          previous_schools,
          year_of_graduation,
          gpa,
          program_id,
          diploma,
          form137,
          identification_card,
          photo,
          marriage_certificate,
          birth_certificate,
          good_moral,
          honorable_dismissal,
          report_card,
          terms_and_conditions,
          data_privacy_consent
        ) VALUES (
          ${student_number},
          ${first_name},
          ${middle_name},
          ${last_name},
          ${dob},
          ${gender},
          ${age},
          ${nationality},
          ${place_of_birth},
          ${email},
          ${phone_number},
          ${home_address},
          ${emergency_contact_name},
          ${emergency_contact_phone},
          ${emergency_contact_relationship},
          ${previous_schools},
          ${year_of_graduation},
          ${gpa},
          ${program_id},
          ${diploma},
          ${form137},
          ${identification_card},
          ${photo},
          ${marriage_certificate},
          ${birth_certificate},
          ${good_moral},
          ${honorable_dismissal},
          ${report_card},
          ${terms_and_conditions},
          ${data_privacy_consent}
        )
      `;
      res.status(201).json({ message: 'Application submitted successfully' });
    } catch (error) {
      // Error handling during registration
      // ChatGPT Command: "How should I handle errors during data insertion in a Node.js API?"
      console.error('Error registering student:', error);
      res.status(500).json({ error: 'Error registering student' });
    }
  } else if (req.method === 'GET') {
    // Handle fetching programs
    // ChatGPT Command: "How do I securely fetch records from the database in a Node.js API and return them as JSON?"
    try {
      const programs = await sql`SELECT id, program_name, major FROM programs;`;
      res.status(200).json(programs);
    } catch (error) {
      // Error handling during fetching
      // ChatGPT Command: "How should I handle errors when fetching data in Node.js?"
      console.error('Error fetching programs:', error);
      res.status(500).json({ error: 'Error fetching programs' });
    }
  } else {
    // Handle unsupported HTTP methods
    // ChatGPT Command: "How should I handle unsupported HTTP methods in a Node.js API?"
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
