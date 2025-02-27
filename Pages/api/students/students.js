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
    const result = await sql`
      INSERT INTO students (student_number, first_name, middle_name, last_name, dob, gender, age, nationality, place_of_birth, email, phone_number, home_address, emergency_contact_name, emergency_contact_phone, emergency_contact_relationship, previous_schools, year_of_graduation, gpa, program_id, diploma, form137, identification_card, letter_of_recommendation, birth_certificate, photo, terms_and_conditions, data_privacy_consent)
      VALUES (${student_number}, ${first_name}, ${middle_name}, ${last_name}, ${dob}, ${gender}, ${age}, ${nationality}, ${place_of_birth}, ${email}, ${phone_number}, ${home_address}, ${emergency_contact_name}, ${emergency_contact_phone}, ${emergency_contact_relationship}, ${previous_schools}, ${year_of_graduation}, ${gpa}, ${program_id}, ${diploma}, ${form137}, ${identification_card}, ${letter_of_recommendation}, ${birth_certificate}, ${photo}, ${terms_and_conditions}, ${data_privacy_consent})
      RETURNING *;
    `;
    res.status(201).json(result[0]);
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ error: 'Error registering student' });
  }
});


// Fetch programs
// In api/students/students.js
router.get('/programs', async (req, res) => {
    try {
      const result = await sql`SELECT id, program_name, major FROM programs;`;
      console.log('Fetched programs:', result); // Log the fetched programs
      res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching programs:', error);
      res.status(500).json({ error: 'Error fetching programs' });
    }
  });
  
  
  

  
  
  
  

export default router;
