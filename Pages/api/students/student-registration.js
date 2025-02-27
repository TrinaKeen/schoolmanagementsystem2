import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Handle student registration
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
      console.error('Error registering student:', error);
      res.status(500).json({ error: 'Error registering student' });
    }
  } else if (req.method === 'GET') {
    // Handle fetching programs
    try {
      const programs = await sql`SELECT id, program_name, major FROM programs;`;
      res.status(200).json(programs);
    } catch (error) {
      console.error('Error fetching programs:', error);
      res.status(500).json({ error: 'Error fetching programs' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
