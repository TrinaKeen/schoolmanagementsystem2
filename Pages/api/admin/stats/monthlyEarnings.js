import sql from '../../../../db';

export default async function handler(req, res) {
  try {
    const result = await sql`
      SELECT TO_CHAR(due_date, 'Mon') AS month, SUM(total_fee) AS earnings
      FROM tuition_fees
      WHERE payment_status = 'Paid'
      GROUP BY month
      ORDER BY MIN(due_date)
    `;

    res.status(200).json({ monthly: result });
  } catch (err) {
    res.status(500).json({ error: 'Monthly earnings fetch failed.' });
  }
}
