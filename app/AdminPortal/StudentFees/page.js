import sql from '../../../db';

async function fetchTuitionFees() {
    try {
        const fees = await sql`
            SELECT 
                id, 
                student_number, 
                program_id, 
                base_fee, 
                currency, 
                due_date, 
                additional_fees, 
                total_fee, 
                payment_status
            FROM tuition_fees
        `;

        return fees.map((fee) => ({
            ...fee,
            due_date: fee.due_date ? new Date(fee.due_date).toLocaleDateString() : 'N/A',
        }));
    } catch (error) {
        console.error('Error fetching tuition fees:', error);
        return [];
    }
}

export default async function StudentFeesPage() {
    const fees = await fetchTuitionFees();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Tuition Fees</h1>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="">
                        <th className="border border-gray-300 px-4 py-2">ID</th>
                        <th className="border border-gray-300 px-4 py-2">Student Number</th>
                        <th className="border border-gray-300 px-4 py-2">Program ID</th>
                        <th className="border border-gray-300 px-4 py-2">Base Fee</th>
                        <th className="border border-gray-300 px-4 py-2">Currency</th>
                        <th className="border border-gray-300 px-4 py-2">Due Date</th>
                        <th className="border border-gray-300 px-4 py-2">Additional Fees</th>
                        <th className="border border-gray-300 px-4 py-2">Total Fee</th>
                        <th className="border border-gray-300 px-4 py-2">Payment Status</th>
                    </tr>
                </thead>
                <tbody>
                    {fees.length > 0 ? (
                        fees.map((fee) => (
                            <tr key={fee.id}>
                                <td className="border border-gray-300 px-4 py-2">{fee.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{fee.student_number}</td>
                                <td className="border border-gray-300 px-4 py-2">{fee.program_id}</td>
                                <td className="border border-gray-300 px-4 py-2">{fee.currency} {fee.base_fee}</td>
                                <td className="border border-gray-300 px-4 py-2">{fee.currency}</td>
                                <td className="border border-gray-300 px-4 py-2">{fee.due_date}</td>
                                <td className="border border-gray-300 px-4 py-2">{fee.currency} {fee.additional_fees}</td>
                                <td className="border border-gray-300 px-4 py-2">{fee.currency} {fee.total_fee}</td>
                                <td className="border border-gray-300 px-4 py-2">{fee.payment_status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-center py-4">No tuition fees found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
