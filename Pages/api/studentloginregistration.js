import sqlite3 from 'sqlite3';
import path from 'path';
import bcrypt from 'bcryptjs';

// Define the path for the database
const dbPath = path.resolve('Database', 'studentsLogin1.db');
console.log("Database path:", dbPath);

// Open the database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Database opened successfully!');
  }
});

// Helper function to check user existence
const checkUserExistence = (username, email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT studentNumber FROM students WHERE username = ? OR email = ?';
    db.get(query, [username, email], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row); // Row is either user data or undefined
      }
    });
  });
};

// Helper function to get the latest student number
const getLatestStudentNumber = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT latest_student_number FROM student_meta WHERE id = 1';
    db.get(query, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row ? row.latest_student_number : 'SN-0000010001'); // Default if no record
      }
    });
  });
};

// Helper function to check if the student number exists
const checkStudentNumberExistence = (studentNumber) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT studentNumber FROM students WHERE studentNumber = ?';
    db.get(query, [studentNumber], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row); // If a row is found, the number exists
      }
    });
  });
};

// Function to generate a new student number by incrementing the previous one
const generateNewStudentNumber = async () => {
  let latestStudentNumber = await getLatestStudentNumber();
  let numberPart = parseInt(latestStudentNumber.split('-')[1], 10);
  let incrementedNumber = numberPart + 1;

  // Format the number to be 10 digits long
  const formattedNumber = incrementedNumber.toString().padStart(10, '0');
  let newStudentNumber = `SN-${formattedNumber}`;
  
  // Check if the new student number already exists
  let isExisting = await checkStudentNumberExistence(newStudentNumber);
  while (isExisting) {
    // Increment the number if it already exists
    incrementedNumber++;
    const formattedNewNumber = incrementedNumber.toString().padStart(10, '0');
    newStudentNumber = `SN-${formattedNewNumber}`;

    // Check again if the generated number is unique
    isExisting = await checkStudentNumberExistence(newStudentNumber);
  }

  return newStudentNumber;
};

// Helper function to update the student number in student_meta table
const updateLatestStudentNumber = (newStudentNumber) => {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE student_meta SET latest_student_number = ? WHERE id = 1';
    db.run(query, [newStudentNumber], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password, fullName, email, country } = req.body;

    console.log('Request Data:', req.body);

    // Ensure all fields are provided
    if (!username || !password || !fullName || !email || !country) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Registration logic
    try {
      // Step 1: Check if the username or email already exists
      console.log(`Checking if user exists with username: ${username} or email: ${email}`);
      const existingUser = await checkUserExistence(username, email);
      console.log('Existing User Check:', existingUser);
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Username or email already exists.' });
      }

      // Step 2: Hash the password
      console.log('Hashing password...');
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Password Hashing:', hashedPassword);

      // Step 3: Generate the student number
      const newStudentNumber = await generateNewStudentNumber();
      console.log(`Generated student number: ${newStudentNumber}`);

      // Step 4: Insert the new user into the database
      const query = 'INSERT INTO students (fullName, email, country, username, password, studentNumber) VALUES (?, ?, ?, ?, ?, ?)';
      db.run(query, [fullName, email, country, username, hashedPassword, newStudentNumber], function (err) {
        if (err) {
          console.error('Error inserting user:', err.message);
          return res.status(500).json({ success: false, message: 'Failed to register user.', error: err.message });
        }

        // Step 5: Update the latest student number in the student_meta table
        updateLatestStudentNumber(newStudentNumber)
          .then(() => {
            return res.status(201).json({ success: true, message: 'Registration successful!', studentNumber: newStudentNumber });
          })
          .catch((updateError) => {
            console.error('Failed to update student meta:', updateError.message);
            return res.status(500).json({ success: false, message: 'Failed to update student meta.' });
          });
      });
    } catch (error) {
      console.error('Error during registration:', error.message);
      return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
  } else {
    // Method not allowed for non-POST requests
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
