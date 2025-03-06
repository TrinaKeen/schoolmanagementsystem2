import sql from '../../../db';

function convertToCSV(data) {
    const headers = [
        'Log ID', 'Student Number', 'Admin ID', 'Approval Status', 'Approval Date',
        'Rejection Reason', 'Approval Comments', 'Application Status', 'Reviewer Name', 'Reviewer Comments'
    ];

    const rows = data.map(log => [
        log.id,
        log.student_number,
        log.admin_id,
        log.approval_status,
        log.approval_date ? new Date(log.approval_date).toLocaleDateString() : 'N/A',
        log.rejection_reason || '',
        log.approval_comments || '',
        log.application_status || '',
        log.reviewer_name || '',
        log.reviewer_comments || ''
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
}

export default async function handler(req, res) {
    try {
        const logs = await sql`
            SELECT id, student_number, admin_id, approval_status, approval_date, rejection_reason, 
                   approval_comments, application_status, reviewer_name, reviewer_comments
            FROM admin_approvals
            ORDER BY approval_date DESC
        `;

        const csv = convertToCSV(logs);

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=student_registration_logs.csv');
        res.status(200).send(csv);
    } catch (error) {
        console.error('Error fetching logs:', error);
        res.status(500).json({ error: 'Failed to generate logs CSV' });
    }
}
