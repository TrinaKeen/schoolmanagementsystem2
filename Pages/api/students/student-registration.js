import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const {
      studentnumber,
      firstname,
      middlename,
      lastname,
      dob,
      gender,
      age,
      nationality,
      placeofbirth,
      email,
      phonenumber,
      homeaddress,
      emergencycontactname,
      emergencycontactphonenumber,
      emergencycontactrelationship,
      previousschools,
      yearofgraduation,
      gpa,
      program_id, // Ensure this is passed from the frontend
      schoolterm, // Ensure this is passed from the frontend
      schoolcampus, // Ensure this is passed from the frontend
      identityproof,
      transcripts,
      letterofrecommendation,
      birthcertificate,
      photo,
      form138, // Adjusted to match your frontend input
      certificateofgoodmoral,
      certificateoflowincome,
      termsandconditions,
      dataprivacyconsent,
    } = req.body;

    try {
      // Insert the student data into the database
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
          school_term,
          school_campus,
          identity_proof,
          transcripts,
          letter_of_recommendation,
          birth_certificate,
          photo,
          form_138,
          certificate_of_good_moral,
          certificate_of_low_income,
          terms_and_conditions,
          data_privacy_consent
        ) VALUES (
          ${studentnumber},
          ${firstname},
          ${middlename},
          ${lastname},
          ${dob},
          ${gender},
          ${age},
          ${nationality},
          ${placeofbirth},
          ${email},
          ${phonenumber},
          ${homeaddress},
          ${emergencycontactname},
          ${emergencycontactphonenumber},
          ${emergencycontactrelationship},
          ${previousschools},
          ${yearofgraduation},
          ${gpa},
          ${program_id},
          ${schoolterm},
          ${schoolcampus},
          ${identityproof},
          ${transcripts},
          ${letterofrecommendation},
          ${birthcertificate},
          ${photo},
          ${form138},
          ${certificateofgoodmoral},
          ${certificateoflowincome},
          ${termsandconditions},
          ${dataprivacyconsent}
        )
      `;

      res.status(201).json({ message: 'Application submitted successfully' });
    } catch (error) {
      console.error('Error submitting application:', error);
      res.status(500).json({ error: 'An error occurred while submitting the application.' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
