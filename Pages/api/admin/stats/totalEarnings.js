// /pages/api/admin/dashboard/totalEarnings.js

import sql from "../../../../db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Fetch total earnings only from PAID student_tuition_fees
    const result = await sql`
      SELECT 
        COALESCE(SUM(f.total_fee + mf.amount), 0) AS total
      FROM student_tuition_fees stf
      LEFT JOIN fees f ON stf.fees_id = f.id
      LEFT JOIN miscellaneous_fees mf ON stf.miscellaneous_id = mf.id
      WHERE stf.payment_status = 'Paid';
    `;

    const totalEarnings = Number(result[0].total);

    res.status(200).json({ totalEarnings });
  } catch (error) {
    console.error("Error fetching total earnings:", error);
    res.status(500).json({ error: "Failed to fetch earnings" });
  }
}
