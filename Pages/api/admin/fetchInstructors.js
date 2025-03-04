import sql from '../../../db';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const instructors = await sql`
            SELECT id, first_name, last_name, email, phone, hire_date, specialization
            FROM instructors
        `;

        const formattedInstructors = instructors.map((instructor) => ({
            ...instructor,
            hire_date: instructor.hire_date ? new Date(instructor.hire_date).toLocaleDateString() : 'N/A',
        }));

        res.status(200).json(formattedInstructors);
    } catch (error) {
        console.error('Error fetching instructors:', error);
        res.status(500).json({ error: 'Failed to fetch instructors' });
    }
}
