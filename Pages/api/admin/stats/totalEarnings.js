import sql from "../../../../db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Fetch total tuition fees (PAID only)
    const tuitionResult = await sql`
      SELECT COALESCE(SUM(total_fee), 0) AS total FROM tuition_fees
      WHERE payment_status = 'Paid';
    `;

    // Fetch total course fees
    const courseFeeResult = await sql`
      SELECT COALESCE(SUM(total_fee), 0) AS total FROM fees;
    `;

    // Fetch total miscellaneous fees (PAID only)
    const miscResult = await sql`
      SELECT COALESCE(SUM(amount), 0) AS total FROM miscellaneous_fees
      WHERE payment_status = 'Paid';
    `;

    const totalEarnings =
      Number(tuitionResult[0].total) +
      Number(courseFeeResult[0].total) +
      Number(miscResult[0].total);

    res.status(200).json({ totalEarnings });
  } catch (error) {
    console.error("Error fetching total earnings:", error);
    res.status(500).json({ error: "Failed to fetch earnings" });
  }
}
