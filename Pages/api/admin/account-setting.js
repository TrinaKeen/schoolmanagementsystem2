import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const result = await sql`SELECT * FROM employees`;
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch employees' });
    }
  } else if (req.method === 'POST') {
    const { employee_number, first_name, last_name, user_type, gender, father_name, mother_name, date_of_birth, religion, joining_date, email, contact_number, address, program, course, section, specification, username, password } = req.body;

    try {
      const result = await sql`
        INSERT INTO employees (employee_number, first_name, last_name, user_type, gender, father_name, mother_name, date_of_birth, religion, joining_date, email, contact_number, address, program, course, section, specification, username, password)
        VALUES (${employee_number}, ${first_name}, ${last_name}, ${user_type}, ${gender}, ${father_name}, ${mother_name}, ${date_of_birth}, ${religion}, ${joining_date}, ${email}, ${contact_number}, ${address}, ${program}, ${course}, ${section}, ${specification}, ${username}, ${password})
      `;
      res.status(201).json({ message: 'Employee added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add employee' });
    }
  } else if (req.method === 'PUT') {
    const { id, employee_number, first_name, last_name, user_type, gender, father_name, mother_name, date_of_birth, religion, joining_date, email, contact_number, address, program, course, section, specification, username, password } = req.body;

    try {
      const result = await sql`
        UPDATE employees
        SET employee_number = ${employee_number}, first_name = ${first_name}, last_name = ${last_name}, user_type = ${user_type}, gender = ${gender}, father_name = ${father_name}, mother_name = ${mother_name}, date_of_birth = ${date_of_birth}, religion = ${religion}, joining_date = ${joining_date}, email = ${email}, contact_number = ${contact_number}, address = ${address}, program = ${program}, course = ${course}, section = ${section}, specification = ${specification}, username = ${username}, password = ${password}
        WHERE id = ${id}
      `;
      res.status(200).json({ message: 'Employee updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update employee' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      const result = await sql`
        DELETE FROM employees WHERE id = ${id}
      `;
      res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete employee' });
    }
  }
}
