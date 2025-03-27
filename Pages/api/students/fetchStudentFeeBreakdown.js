// pages/api/admin/fetchStudentFeeBreakdown.js
import sql from '../../../db';

export default async function handler(req, res) {
  const { student_number } = req.query;

  if (!student_number) {
    return res.status(400).json({ error: 'Student number is required' });
  }

  try {
    // Get course fees via join from student_tuition_fees to fees
    const courseFees = await sql`
      SELECT f.base_fee, f.additional_fees, f.total_fee
      FROM student_tuition_fees stf
      JOIN fees f ON f.id = stf.fees_id
      WHERE stf.student_number = ${student_number}
    `;

    // Get miscellaneous fees
    const miscFees = await sql`
      SELECT fee_name, amount, fee_type, due_date
      FROM miscellaneous_fees
      WHERE student_number = ${student_number}
    `;

    // Get student summary info
    const [student] = await sql`
      SELECT student_number, program_id, payment_status
      FROM student_tuition_fees
      WHERE student_number = ${student_number}
      LIMIT 1
    `;

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    return res.status(200).json({
      student_number: student.student_number,
      program_id: student.program_id,
      payment_status: student.payment_status,
      course_fees: courseFees,
      misc_fees: miscFees,
    });
  } catch (error) {
    console.error('Error fetching breakdown:', error);
    return res.status(500).json({ error: 'Server error while fetching breakdown' });
  }
}
