import { query } from '/Database/studentRegistrationDB'; // Adjust path if necessary

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const studentData = req.body;

        // Prepare the SQL query to insert data into the students table
        const queryText = `
            INSERT INTO students (
                firstname, middlename, lastname, dob, gender, age, nationality, placeofbirth, 
                email, phonenumber, homeaddress, emergencycontactname, emergencycontactphonenumber, 
                emergencycontactrelationship, previousschools, yearofgraduation, gpa, extracurricularactivities, 
                specialachievements, desiredprogram, modeofstudy, startdate, preferredcampus, identityproof, 
                transcripts, letterofrecommendation, resume, photo, termsandconditions, dataprivacyconsent, 
                studentnumber, applicationstatus, reviewername, approvaldate, rejectionreason, reviewercomments
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, 
                $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36)
        `;

        // Extract data from the request body
        const values = [
            studentData.firstname, studentData.middlename, studentData.lastname, studentData.dob, 
            studentData.gender, studentData.age, studentData.nationality, studentData.placeofbirth, 
            studentData.email, studentData.phonenumber, studentData.homeaddress, studentData.emergencycontactname, 
            studentData.emergencycontactphonenumber, studentData.emergencycontactrelationship, studentData.previousschools, 
            studentData.yearofgraduation, studentData.gpa, studentData.extracurricularactivities, studentData.specialachievements, 
            studentData.desiredprogram, studentData.modeofstudy, studentData.startdate, studentData.preferredcampus, 
            studentData.identityproof, studentData.transcripts, studentData.letterofrecommendation, studentData.resume, 
            studentData.photo, studentData.termsandconditions, studentData.dataprivacyconsent, studentData.studentnumber, 
            studentData.applicationstatus, studentData.reviewername, studentData.approvaldate, studentData.rejectionreason, 
            studentData.reviewercomments
        ];


   
      
        try {
            // First, check if the student number already exists
            const checkStudentNumberQuery = 'SELECT * FROM students WHERE studentnumber = $1';
            const checkResult = await query(checkStudentNumberQuery, [studentData.studentnumber]);
        
            if (checkResult.rows.length > 0) {
                // If the student number exists, send an error response
                return res.status(400).json({ error: 'Student number already exists. Please contact us to update your details.' });
            }
        
            // If no conflict, proceed with the insert
            console.log('Running query:', queryText);
            const result = await query(queryText, values);
            console.log('Query result:', result);
        
            res.status(201).json({ message: 'Application is successfully submitted!' });
        } catch (error) {
            console.error('Error inserting student data:', error.stack || error.message);
            res.status(500).json({
                error: 'Failed to submit another request!',
                details: error.message
            });
        }
        
    }
}