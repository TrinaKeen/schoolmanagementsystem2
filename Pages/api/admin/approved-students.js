import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const students = await sql`SELECT * FROM approved_students ORDER BY enrollment_date DESC`;
            res.status(200).json(students);
        } catch (error) {
            console.error("Error fetching approved students:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    } 
    
    else if (req.method === "POST") {
        try {
            const { student_number, first_name, last_name, email, dob, course, academic_year, admin_id } = req.body;

            const result = await sql`
                INSERT INTO approved_students (student_number, first_name, last_name, email, dob, course, academic_year, admin_id)
                VALUES (${student_number}, ${first_name}, ${last_name}, ${email}, ${dob}, ${course}, ${academic_year}, ${admin_id})
                RETURNING *`;

            res.status(201).json({ message: "Student approved successfully", student: result[0] });
        } catch (error) {
            console.error("Error approving student:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    } 
    
    else if (req.method === "PUT") {
        try {
            const { student_number, student_status } = req.body;

            await sql`
                UPDATE approved_students 
                SET student_status = ${student_status} 
                WHERE student_number = ${student_number}`;

            res.status(200).json({ message: "Student status updated successfully" });
        } catch (error) {
            console.error("Error updating student:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    } 
    
    else {
        res.setHeader("Allow", ["GET", "POST", "PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
