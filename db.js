import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';

// Load environment variables from .env file
dotenv.config();

// Ensure the database URL is defined
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is not defined in the .env file.');
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);

export async function query(text, params) {
  try {
    console.log('Running query:', text);
    console.log('With params:', params);
    const res = await sql(text, params);
    return res;
  } catch (err) {
    console.error('Database query error:', err);
    throw err;
  }
}

async function testDatabaseConnection() {
  try {
    console.log('Connecting to the Neon serverless database...');

    // Example query to test the connection
    const res = await sql('SELECT NOW()');  // A simple query to check the connection
    console.log('Database connected successfully!');
    console.log('Query result:', res);  // Log the result

  } catch (error) {
    console.error('Error connecting to the database:', error);
    // Enhanced error message for debugging
    console.error('Error details:', error.stack || error.message);
  }
}

// Test the database connection
testDatabaseConnection();
