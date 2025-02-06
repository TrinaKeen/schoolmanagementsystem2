import { query } from '/Database/studentRegistrationDB'; // Adjust path if necessary
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { studentNumber } = req.query;

        if (!studentNumber) {
            return res.status(400).json({ error: 'Student number is required' });
        }

        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                return res.status(401).json({ error: 'Authorization token missing' });
            }

            const token = authHeader.split(' ')[1];
            let decoded;
            try {
                decoded = jwt.verify(token, process.env.JWT_SECRET);
            } catch (jwtError) {
                return res.status(401).json({ error: 'Invalid or expired token' });
            }

            const result = await query(`
                SELECT 
                    studentnumber, firstname, middlename, lastname, dob, age, gender, nationality, 
                    placeofbirth, email, phonenumber, homeaddress, emergencycontactname, 
                    emergencycontactphonenumber, emergencycontactrelationship, previousschools, 
                    yearofgraduation, gpa, extracurricularactivities, specialachievements, 
                    desiredprogram, modeofstudy, startdate, preferredcampus, identityproof, 
                    transcripts, letterofrecommendation, resume, photo, termsandconditions, 
                    dataprivacyconsent, applicationstatus, reviewername, approvaldate, rejectionreason, 
                    reviewercomments, applicationsubmittedat, lastupdatedat
                FROM students WHERE studentnumber = $1
            `, [studentNumber]);

            if (result.rows.length === 0) {
                return res.status(404).json({ error: 'Student data not found' });
            }

            const studentData = result.rows[0];
            res.status(200).json(studentData);
        } catch (error) {
            console.error('Error fetching student data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
