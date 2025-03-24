import sql from '../../../../db';

export async function GET() {
  try {
    // Fetch total tuition fees (PAID only)
    const tuitionResult = await sql`
      SELECT COALESCE(SUM(total_fee), 0) AS total FROM tuition_fees
      WHERE payment_status = 'Paid';
    `;

    // Fetch total course fees (if separated)
    const courseFeeResult = await sql`
      SELECT COALESCE(SUM(total_fee), 0) AS total FROM fees;
    `;

    // Fetch total miscellaneous fees (PAID only)
    const miscResult = await sql`
      SELECT COALESCE(SUM(amount), 0) AS total FROM miscellaneous_fees
      WHERE payment_status = 'Paid';
    `;

    // Add them all up
    const totalEarnings = 
      Number(tuitionResult[0].total) +
      Number(courseFeeResult[0].total) +
      Number(miscResult[0].total);

    return new Response(JSON.stringify({ totalEarnings }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error('Error fetching total earnings:', error);
    return new Response(JSON.stringify({ error: "Failed to fetch earnings" }), { status: 500 });
  }
}
