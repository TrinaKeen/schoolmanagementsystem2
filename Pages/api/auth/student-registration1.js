import { query } from '/Database/studentRegistrationDB.js';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';


// Inside the handler
const result = await query(queryText, values);
// Function to handle form data submission
export const config = {
  api: {
    bodyParser: false, // Disable default body parser to handle multipart form data
  },
};

// Improved email validation using regex
const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

// Convert file to base64 string
const fileToBase64 = (filePath) => {
  const fileBuffer = fs.readFileSync(filePath);
  return fileBuffer.toString('base64');
};

const handler = async (req, res) => {  // Ensure the handler function is async
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Ensure the upload directory exists
  const uploadDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true, // Preserve file extensions
    maxFileSize: 10 * 1024 * 1024, // Limit file size to 10MB
    filter: (part) => {
      // Only allow image and PDF file types (you can modify this as per your requirements)
      if (part.mimetype && !['image/jpeg', 'image/png', 'application/pdf'].includes(part.mimetype)) {
        return false;
      }
      return true;
    },
  });

  form.parse(req, async (err, fields, files) => {  // Ensure this function is async
    if (err) {
      console.error('Error parsing form data:', err);
      return res.status(500).json({ error: 'Error parsing form data', details: err.message });
    }

    // Sanitize and validate form fields
    const {
      firstname = '',
      middlename = '',
      lastname = '',
      dob = null,
      gender = '',
      age = null,
      nationality = '',
      placeofbirth = '',
      email = '',
      phonenumber = '',
      homeaddress = '',
      emergencycontactname = '',
      emergencycontactphonenumber = '',
      emergencycontactrelationship = '',
      previousschools = '',
      yearofgraduation = null,
      gpa = null,
      extracurricularactivities = '',
      specialachievements = '',
      desiredprogram = '',
      modeofstudy = '',
      startdate = null,
      preferredcampus = '',
      termsandconditions = false,
      dataprivacyconsent = false,
      studentnumber = '',
      applicationstatus = 'pending',
    } = fields;

    // Improved email validation
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Process files and save them
    const filesData = {
      identityproof: files.identityProof && files.identityProof.newFilename ? path.join('uploads', files.identityProof.newFilename) : null,
      transcripts: files.transcripts && files.transcripts.newFilename ? path.join('uploads', files.transcripts.newFilename) : null,
      letterofrecommendation: files.letterOfRecommendation && files.letterOfRecommendation.newFilename ? path.join('uploads', files.letterOfRecommendation.newFilename) : null,
      resume: files.resume && files.resume.newFilename ? path.join('uploads', files.resume.newFilename) : null,
      photo: files.photo && files.photo.newFilename ? path.join('uploads', files.photo.newFilename) : null,
    };

    // Convert files to base64 (optional)
    const base64FilesData = {
      identityproof: filesData.identityproof ? fileToBase64(filesData.identityproof) : null,
      transcripts: filesData.transcripts ? fileToBase64(filesData.transcripts) : null,
      letterofrecommendation: filesData.letterofrecommendation ? fileToBase64(filesData.letterofrecommendation) : null,
      resume: filesData.resume ? fileToBase64(filesData.resume) : null,
      photo: filesData.photo ? fileToBase64(filesData.photo) : null,
    };

    try {
      // Insert data into the PostgreSQL database
      const queryText = `
        INSERT INTO students (
          firstname, middlename, lastname, dob, gender, age, nationality, placeofbirth, 
          email, phonenumber, homeaddress, emergencycontactname, emergencycontactphonenumber, 
          emergencycontactrelationship, previousschools, yearofgraduation, gpa, extracurricularactivities, 
          specialachievements, desiredprogram, modeofstudy, startdate, preferredcampus, 
          identityproof, transcripts, letterofrecommendation, resume, photo, termsandconditions, 
          dataprivacyconsent, studentnumber, applicationstatus
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
          $21, $22, $23, $24, $25, $26, $27, $28, $29, $30
        ) RETURNING id;
      `;

      const values = [
        firstname, middlename, lastname, dob, gender, age, nationality, placeofbirth, 
        email, phonenumber, homeaddress, emergencycontactname, emergencycontactphonenumber, 
        emergencycontactrelationship, previousschools, yearofgraduation, gpa, extracurricularactivities, 
        specialachievements, desiredprogram, modeofstudy, startdate, preferredcampus, 
        filesData.identityproof, filesData.transcripts, filesData.letterofrecommendation, 
        filesData.resume, filesData.photo, termsandconditions, dataprivacyconsent, 
        studentnumber, applicationstatus,
      ];

      const result = await query(queryText, values);  // Ensure this is inside async function
      const studentId = result.rows[0]?.id;

      // Fetch the inserted student's data
      const studentQueryText = 'SELECT * FROM students WHERE id = $1';
      const studentResult = await query(studentQueryText, [studentId]);

      return res.status(200).json({ success: true, student: studentResult.rows[0] });
    } catch (error) {
      console.error('Error inserting data into database:', error);
      return res.status(500).json({ error: 'Error processing the form' });
    }
  });
};

export default handler;

