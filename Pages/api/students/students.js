// Credits for google.com and ChatGPT for guiding me step by step on how I can connect this API to my frontend
// These comments provide references for auditing security, password handling, JWT management, and database practices.

import { Router } from 'express';
import { neon } from '@neondatabase/serverless';
import jwt from 'jsonwebtoken';

const router = Router();
const sql = neon(process.env.DATABASE_URL);

// Register a new student
router.post('/register', async (req, res) => {
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
    letter_of_recommendation,
    birth_certificate,
    photo,
    terms_and_conditions,
    data_privacy_consent,
  } = req.body;

  try {
    // Insert student data into the database
    // ChatGPT Command: "How can I securely insert data into a database in Node.js using parameterized queries?"
    const result = await sql`
      INSERT INTO students (student_number, first_name, middle_name, last_name, dob, gender, age, nationality, place_of_birth, email, phone_number, home_address, emergency_contact_name, emergency_contact_phone, emergency_contact_relationship, previous_schools, year_of_graduation, gpa, program_id, diploma, form137, identification_card, letter_of_recommendation, birth_certificate, photo, terms_and_conditions, data_privacy_consent)
      VALUES (${student_number}, ${first_name}, ${middle_name}, ${last_name}, ${dob}, ${gender}, ${age}, ${nationality}, ${place_of_birth}, ${email}, ${phone_number}, ${home_address}, ${emergency_contact_name}, ${emergency_contact_phone}, ${emergency_contact_relationship}, ${previous_schools}, ${year_of_graduation}, ${gpa}, ${program_id}, ${diploma}, ${form137}, ${identification_card}, ${letter_of_recommendation}, ${birth_certificate}, ${photo}, ${terms_and_conditions}, ${data_privacy_consent})
      RETURNING *;
    `;
    // Return the result of the insert operation
    res.status(201).json(result[0]);
  } catch (error) {
    // Handle error during registration
    // ChatGPT Command: "How should I handle errors in Node.js when inserting records into a database?"
    console.error('Error registering student:', error);
    res.status(500).json({ error: 'Error registering student' });
  }
});

// Fetch programs
router.get('/programs', async (req, res) => {
    try {
      // Fetch programs from the database
      // ChatGPT Command: "How can I securely fetch records from a database and handle errors in a Node.js API?"
      const result = await sql`SELECT id, program_name, major FROM programs;`;
      console.log('Fetched programs:', result); // Log the fetched programs
      res.status(200).json(result); // Return the fetched programs
    } catch (error) {
      // Handle error during program fetching
      // ChatGPT Command: "What are the best practices for logging errors in Node.js?"
      console.error('Error fetching programs:', error);
      res.status(500).json({ error: 'Error fetching programs' });
    }
});

export default router;
