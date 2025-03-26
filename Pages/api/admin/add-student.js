import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Handle the POST request to add a new student
    const {
      first_name,
      middle_name,
      last_name,
      dob,
      age,
      gender,
      nationality,
      place_of_birth,
      email,
      phone_number,
      home_address,
      emergency_contact_relationship,
      emergency_contact_name,
      emergency_contact_phone,
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
      application_submitted_at,
    } = req.body;

    // Basic validation
    if (!first_name || !last_name || !email || !program_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // Step 1: Fetch the latest student_number
      const lastStudent = await sql`
        SELECT student_number FROM students ORDER BY student_number DESC LIMIT 1;
      `;

      let newStudentNumber;
      if (lastStudent.length > 0) {
        // Extract numeric part and increment
        const lastNumber = parseInt(lastStudent[0].student_number.replace("SN-", ""), 10);
        newStudentNumber = `SN-${String(lastNumber + 1).padStart(10, "0")}`;
      } else {
        // First student entry
        newStudentNumber = "SN-0000100001";
      }

      // Step 2: Insert the new student with the generated student_number
      const result = await sql`
        INSERT INTO students (
          student_number, first_name, middle_name, last_name, dob, age, gender, nationality, place_of_birth,
          email, phone_number, home_address, emergency_contact_relationship, emergency_contact_name, 
          emergency_contact_phone, previous_schools, year_of_graduation, gpa, program_id, diploma, 
          form137, identification_card, photo, marriage_certificate, birth_certificate, good_moral, 
          honorable_dismissal, report_card, terms_and_conditions, data_privacy_consent, application_submitted_at
        ) 
        VALUES (
          ${newStudentNumber}, ${first_name}, ${middle_name}, ${last_name}, ${dob}, ${age}, ${gender}, ${nationality},${place_of_birth},
          ${email}, ${phone_number}, ${home_address}, ${emergency_contact_relationship}, ${emergency_contact_name},
          ${emergency_contact_phone}, ${previous_schools}, ${year_of_graduation}, ${gpa}, ${program_id}, ${diploma},
          ${form137}, ${identification_card}, ${photo}, ${marriage_certificate}, ${birth_certificate}, ${good_moral},
          ${honorable_dismissal}, ${report_card}, ${terms_and_conditions}, ${data_privacy_consent}, ${application_submitted_at}
        ) 
        RETURNING *;
      `;

      // Step 3: Fetch the program details associated with the student
      const program = await sql`
        SELECT id, program_name, major 
        FROM programs 
        WHERE id = ${program_id};
      `;

      // Check if program exists
      if (program.length === 0) {
        return res.status(404).json({ error: "Program not found" });
      }

      // Step 4: Combine student data and program data in the response
      const student = result[0];
      student.program = program[0];

      return res.status(201).json({ message: "Student added successfully", student });
    } catch (error) {
      console.error("Error adding student:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    // Handle fetching programs
    try {
      const programs = await sql`SELECT id, program_name, major FROM programs;`;
      res.status(200).json(programs);
    } catch (error) {
      console.error("Error fetching programs:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
