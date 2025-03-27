import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { employeeNumber } = req.query;

    if (!employeeNumber) {
      return res.status(400).json({ error: 'Employee number is missing' });
    }

    try {
      const employeeDetails = await sql`
        SELECT employee_number, first_name, last_name, email, user_type, username
        FROM employees
        WHERE employee_number = ${employeeNumber}
      `;

      if (employeeDetails.length === 0) {
        return res.status(404).json({ error: 'Employee not found' });
      }

      return res.status(200).json({
        employee_number: employeeDetails[0].employee_number,
        full_name: `${employeeDetails[0].first_name} ${employeeDetails[0].last_name}`,
        email: employeeDetails[0].email,
        user_type: employeeDetails[0].user_type,
        username: employeeDetails[0].username,
      });
    } catch (error) {
      console.error('Error fetching employee details:', error);
      return res.status(500).json({ error: 'An error occurred while fetching employee details' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
