import sql from '../../../db';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const fees = await sql`
            SELECT id, student_number, program_id, base_fee, additional_fees, total_fee, currency, due_date, payment_status
            FROM tuition_fees
        `;

        const formattedFees = fees.map((fee) => ({
            ...fee,
            due_date: fee.due_date ? new Date(fee.due_date).toLocaleDateString() : 'N/A',
        }));

        res.status(200).json(formattedFees);
    } catch (error) {
        console.error('Error fetching student fees:', error);
        res.status(500).json({ error: 'Failed to fetch student fees' });
    }
}
