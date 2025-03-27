import sql from "../../../../db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const result = await sql`
      SELECT 
        TO_CHAR(created_at, 'Mon') AS month,
        DATE_TRUNC('month', created_at) AS month_sort,
        SUM(f.base_fee + f.additional_fees + COALESCE(mf.amount, 0)) AS earnings
      FROM student_tuition_fees stf
      LEFT JOIN fees f ON stf.fees_id = f.id
      LEFT JOIN miscellaneous_fees mf ON stf.miscellaneous_id = mf.id
      WHERE stf.payment_status = 'Paid'
      GROUP BY month, month_sort
      ORDER BY month_sort;
    `;

    // Format for chart
    const monthly = result.map(row => ({
      month: row.month,
      earnings: Number(row.earnings),
    }));

    res.status(200).json({ monthly });
  } catch (error) {
    console.error("Error fetching monthly earnings:", error);
    res.status(500).json({ error: "Failed to fetch monthly earnings" });
  }
}
