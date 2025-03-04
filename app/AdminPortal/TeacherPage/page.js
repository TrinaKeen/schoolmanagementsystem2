import sql from '../../../db';

async function fetchInstructors() {
    try {
        const instructors = await sql`
            SELECT id, first_name, last_name, email, phone, hire_date, specialization
            FROM instructors
        `;

        // Convert hire_date to string format (e.g., YYYY-MM-DD) for safe rendering
        return instructors.map((instructor) => ({
            ...instructor,
            hire_date: instructor.hire_date ? new Date(instructor.hire_date).toLocaleDateString() : 'N/A',
        }));
    } catch (error) {
        console.error('Error fetching instructors:', error);
        return [];
    }
}

export default async function TeacherPage() {
    const instructors = await fetchInstructors();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Instructors List</h1>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="">
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">First Name</th>
                        <th className="border border-gray-300 px-4 py-2">Last Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Phone</th>
                        <th className="border border-gray-300 px-4 py-2">Hire Date</th>
                        <th className="border border-gray-300 px-4 py-2">Specialization</th>
                    </tr>
                </thead>
                <tbody>
                    {instructors.length > 0 ? (
                        instructors.map((instructor) => (
                            <tr key={instructor.id}>
                                <td className="border border-gray-300 px-4 py-2">{instructor.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{instructor.first_name}</td>
                                <td className="border border-gray-300 px-4 py-2">{instructor.last_name}</td>
                                <td className="border border-gray-300 px-4 py-2">{instructor.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{instructor.phone || 'N/A'}</td>
                                <td className="border border-gray-300 px-4 py-2">{instructor.hire_date}</td>
                                <td className="border border-gray-300 px-4 py-2">{instructor.specialization || 'N/A'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center py-4">No instructors found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
