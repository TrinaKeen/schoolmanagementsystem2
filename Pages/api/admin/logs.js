// Chatgpt prompt create a feature to log the student registration status using neon postgres db
// Copy pasted the db.ts to ensure that it takes into account the serverless neondatabase
// Asked chatgpt for how to implement a button that allows the user to download the logs
// Added the button to the admin dashboard for now
// Does not work

// Example given of what the tables should look like in neon
// CREATE TABLE registration_logs (
//     id SERIAL PRIMARY KEY,
//     student_id UUID REFERENCES students(id),
//     admin_id UUID REFERENCES admins(id),
//     action VARCHAR(10) CHECK (action IN ('approved', 'rejected')),
//     timestamp TIMESTAMP DEFAULT NOW(),
//     comments TEXT
// );

// Table creation for logging in neon

import sql from '../../../db'; // Imports the database connection from the db file, allowing us to execute SQL queries
import { parse } from 'json2csv'; // Imports the json2csv library to convert JavaScript objects (logs) into CSV format for downloading

// Exporting the function to be used as an API route in Next.js
export default async function handler(req, res) {
    // `export default` makes this function the default export of the module,
    // allowing it to be easily imported in other parts of the application.

    // The function receives the request (`req`) and response (`res`) objects,
    // which represent the incoming HTTP request and outgoing response respectively.
    
    // Check if the request method is GET; if not, return an error
    if (req.method !== 'GET') { 
        // If the request is not a GET request, return an HTTP 405 error (Method Not Allowed)
        // This ensures the API endpoint is only used for fetching data and not for modification
        return res.status(405).json({ message: 'Method Not Allowed' }); 
    }

    try {
        // Attempt to fetch logs from the database using an SQL query
        // `await` ensures that the database query is executed asynchronously without blocking execution
        const logs = await sql`
            SELECT 
                registration_logs.id, // Selects the unique log ID for each registration action
                students.student_number AS student_number, // Retrieves the student's unique identification number
                students.first_name || ' ' || students.last_name AS student_name, // Concatenates first name and last name for better readability
                admins.username AS admin_username, // Retrieves the username of the admin who approved/rejected the registration
                registration_logs.action, // Fetches the action taken ('approved' or 'rejected')
                registration_logs.timestamp, // Retrieves the timestamp when the action was performed
                registration_logs.comments // Fetches any additional comments made by the admin regarding the decision
            FROM registration_logs // Specifies the table where registration logs are stored
            JOIN students ON registration_logs.student_id = students.id // Joins the students table to retrieve student details
            JOIN admins ON registration_logs.admin_id = admins.id // Joins the admins table to retrieve the admin details
            ORDER BY registration_logs.timestamp DESC; // Sorts the logs by timestamp in descending order to show the latest entries first
        `;

        // Convert the logs data into CSV format for easy downloading
        // json2csv takes the logs array and converts it into a CSV string format
        const csv = parse(logs, { fields: ["id", "student_number", "student_name", "admin_username", "action", "timestamp", "comments"] });
        // The 'fields' parameter specifies which database columns should be included in the CSV file

        // Set headers to inform the browser that this is a CSV file download
        res.setHeader('Content-Type', 'text/csv'); // Specifies that the response is of CSV format, so it can be downloaded as a file
        res.setHeader('Content-Disposition', 'attachment; filename=registration_logs.csv'); // Specifies the filename for the downloaded CSV file
        return res.status(200).send(csv); // Sends the CSV file as a response with HTTP status code 200 (OK)
        
    } catch (error) {
        console.error("Error fetching logs:", error); // Logs any error that occurs during execution to the console for debugging
        return res.status(500).json({ message: "Internal Server Error" }); // Returns an error response with status code 500 in case of failure
        // This prevents exposing detailed internal errors to the client, maintaining security
    }
}
